const Test = require("../models/testModel");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const osUtils = require("os-utils");
const { performance } = require("perf_hooks");
const FastSpeedtest = require("fast-speedtest-api");
const { getTemplate } = require("../test/template/getTemplate");

const executeTest = async (req, res) => {
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
  exec(jmeterCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`JMeter test failed: ${stderr}`);
      res.status(500).send({ message: "JMeter test failed" });
    } else {
      console.log(`JMeter test started: ${stdout}`);
      fs.readFile(reportPath, "utf-8", (err) => {
        if (err) {
          console.log(`Error reading report file: ${err}`);
          res.status(500).send({ message: "Error reading report file" });
        } else {
          console.log(`Report file saved successfully: ${reportPath}`);
        }
      });
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
        console.log(results);
        await test
          .save()
          .then((data) => {
            res.send(data);
          })
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

//exports
exports.executeTest = executeTest;
exports.getAllTests = getAllTests;
exports.getResults = getResults;
