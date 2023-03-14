const Test = require("../models/testModel");
const util = require("util");
const { exec } = require("child_process");
const jwt = require("jsonwebtoken");
const execPromise = util.promisify(require("child_process").exec);
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const osUtils = require("os-utils");
const { performance } = require("perf_hooks");
const FastSpeedtest = require("fast-speedtest-api");
const { getTemplate } = require("../test/template/getTemplate");
const bytes = require("bytes");
const pidusage = require("pidusage");
const moment = require("moment");

const executeTest = async (req, res) => {
  const statsArray = [];
  //initialzing a void status
  const status = "";

  //creating a new test
  const test = new Test({
    protocol: req.body.protocol,
    url: req.body.url,
    port: req.body.port,
    path: req.body.path,
    method: req.body.method,
    createdBy: req.body.createdBy,
    status,
    testName: req.body.testName,
  });

  const savedTest = await test.save();
  const testId = savedTest._id;
  const testFileName = `test_${testId}.jmx`;

  //the path to the jmx file
  const jmxOutputPath = path.join(
    __dirname,
    "../",
    "/test/tests",
    testFileName
  );
  // the jmx template

  fs.writeFileSync(jmxOutputPath, getTemplate(test), "utf-8");
  const reportFileName = `reports_${testId}.csv`;
  const reportPath = path.join(
    __dirname,
    "../",
    "/test/reports",
    reportFileName
  );

  //jmeter command the path should be updated
  const jmeterCommand = `${process.env.JMETERPATH} -n -t ${jmxOutputPath} -l ${reportPath}`;

  //executing the jmeter command and writing in the reports.csv
  exec(jmeterCommand, async (err, stdout, stderr) => {
    if (err) {
      console.error(`JMeter test failed: ${stderr}`);
      res.status(500).send({ message: "JMeter test failed" });
    }
    console.log(`JMeter test started: ${stdout}`);
    try {
      // Execute the jps command to list all Java processes
      const { stdout: jpsStdout, stderr: jpsStderr } = await execPromise("jps");
      if (jpsStderr) {
        console.error(`exec error: ${jpsStderr}`);
        return res.status(500).send("Error getting JVM metrics");
      }
      // Parse the output of the jps command to find the process ID of the JVM
      const lines = jpsStdout.split("\n");
      let processId = null;
      lines.forEach((line) => {
        if (line.includes("TestApplication")) {
          const parts = line.split(" ");
          processId = parts[0];
        }
      });
      if (!processId) {
        console.error("Could not find JVM process");
        for (i = 0; i < 11; i++) {
          const now = new Date();

          const day = String(now.getDate()).padStart(2, "0");
          const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 car les mois commencent à 0
          const year = now.getFullYear();

          const hour = String(now.getHours()).padStart(2, "0");
          const minute = String(now.getMinutes()).padStart(2, "0");
          const second = String(now.getSeconds()).padStart(2, "0");

          const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${
            parseInt(second) + i
          }`;

          statsArray.push({
            memory: `0 MB`,
            cpu: `0 %`,
            timestamp: formattedDate,
          });
        }

        test.detail = statsArray;
        test.save();
        return res.status(200).json(statsArray);
      }

      const intervalId = () => {
        const interval = setInterval(async () => {
          const stats = await pidusage(processId);
          statsArray.push({
            cpu: stats.cpu.toFixed(2) + "%",
            memory: bytes(stats.memory),
            timestamp: moment(stats.timestamp).format("YYYY-MM-DD HH:mm:ss"),
          });
          if (statsArray.length >= 16) {
            console.log(statsArray);
            clearInterval(interval); // Clear the interval when statsArray has 5 elements
          }
        }, 1000);
        return interval; // Return the interval ID
      };

      const output = intervalId();

      setTimeout(() => {
        clearInterval(output);
        test.detail = statsArray;
        test.save();
        res.json({
          jvm: statsArray,
        });
      }, 15000);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ error: "errrrrrrrrrrrrrrrrrrrrrrrrreeeeru" });
    }
  });

  //getting the status from the csv file and saving the test with the new status
  setTimeout(() => {
    const results = [];
    fs.createReadStream(reportPath)
      .pipe(csv())
      .on("data", (data) => results.push(data["success"]))
      .on("end", async () => {
        results[2] === "true"
          ? (test.status = "Passed")
          : (test.status = "failed");
        await test
          .save()
          // .then((data) => res.send(data))
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Error",
            });
          });
      });
  }, 10000);
};

const getAllTests = (req, res) => {
  Test.find();
  var total = Test.count();
  Test.find()
    .populate("createdBy")
    .exec()
    .then((data) => {
      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", total);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error",
      });
    });
};

const TestStatePerUser = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const currentUser = jwt.verify(token, process.env.TOKEN_KEY);
  Test.find({ createdBy: currentUser.userId }).then((total) => {
    Test.find({ createdBy: currentUser.userId, status: "Passed" })
      .then((passed) => {
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        Test.find({
          createdBy: currentUser.userId,
          status: "failed",
        }).then((failed) => {
          res.status(200).json({
            runPerUser: total.length,
            passedTests: passed.length,
            failedTests: failed.length,
          });
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error",
        });
      });
  });
};

const TestsPerUser = (req, res) => {
  Test.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ])
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

const getResults = (req, res) => {
  osUtils.cpuUsage(function (cpuUsage) {
    const start = performance.now();

    const speedtest = new FastSpeedtest({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: FastSpeedtest.UNITS.Mbps,
    });

    speedtest.getSpeed().then((networkSpeed) => {
      const end = performance.now();

      const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

      const performanceData = {
        cpuUsage: cpuUsage * 100,
        diskIoTime: end - start,
        networkSpeed,
        memoryUsage,
      };

      res.json(performanceData);
    });
  });
};

const getTestById = async (req, res) => {
  const id = req.params.id;
  await Test.findById(id)
    .then((response) => {
      res.status(200).send(response.detail);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

//exports
exports.executeTest = executeTest;
exports.getAllTests = getAllTests;
exports.getResults = getResults;
exports.TestStatePerUser = TestStatePerUser;
exports.TestsPerUser = TestsPerUser;
exports.getTestById = getTestById;
