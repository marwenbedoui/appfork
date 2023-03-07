const Test = require("../models/testModel");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser')

// const jm_tem = ("../tests/jmeter_template.jmx")

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

  //the path to the jmx file
  const jmxOutputPath = path.join(__dirname + "/tests", 'test.jmx');
  // the jmx template
  const jmxContent = `<?xml version="1.0" encoding="UTF-8"?>
  <jmeterTestPlan version="1.2" properties="5.0" jmeter="5.5">
    <hashTree>
      <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
        <stringProp name="TestPlan.comments"></stringProp>
        <boolProp name="TestPlan.functional_mode">false</boolProp>
        <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
        <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
        <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
          <collectionProp name="Arguments.arguments"/>
        </elementProp>
        <stringProp name="TestPlan.user_define_classpath"></stringProp>
      </TestPlan>
      <hashTree>
        <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
          <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
          <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
            <boolProp name="LoopController.continue_forever">false</boolProp>
            <stringProp name="LoopController.loops">1</stringProp>
          </elementProp>
          <stringProp name="ThreadGroup.num_threads">10</stringProp>
          <stringProp name="ThreadGroup.ramp_time">1</stringProp>
          <boolProp name="ThreadGroup.scheduler">false</boolProp>
          <stringProp name="ThreadGroup.duration"></stringProp>
          <stringProp name="ThreadGroup.delay"></stringProp>
          <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
        </ThreadGroup>
        <hashTree>
          <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
            <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
              <collectionProp name="Arguments.arguments"/>
            </elementProp>
            <stringProp name="HTTPSampler.domain">${test.url}</stringProp>
            <stringProp name="HTTPSampler.port">${test.port}</stringProp>
            <stringProp name="HTTPSampler.protocol">${test.protocol}</stringProp>
            <stringProp name="HTTPSampler.contentEncoding"></stringProp>
            <stringProp name="HTTPSampler.path">${test.path}</stringProp>
            <stringProp name="HTTPSampler.method">${test.method.toUpperCase()}</stringProp>
            <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
            <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
            <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
            <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
            <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
            <stringProp name="HTTPSampler.connect_timeout"></stringProp>
            <stringProp name="HTTPSampler.response_timeout"></stringProp>
          </HTTPSamplerProxy>
          <hashTree/>
          <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="View Results Tree" enabled="true">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>false</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
          <ResultCollector guiclass="SummaryReport" testclass="ResultCollector" testname="Summary Report" enabled="true">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>false</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </jmeterTestPlan>  
  `

  fs.writeFileSync(jmxOutputPath, jmxContent, 'utf-8');

  const reportPath = path.join(__dirname + "/reports", 'report.csv');
  // Check if reportPath exists : if exists delete it
  fs.access(reportPath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist
      console.error('File does not exist');
    }
    // Delete file
    fs.unlink(reportPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });

  //jmeter command the path should be updated
  const jmeterCommand = `D:/programs/apache-jmeter-5.5/bin/jmeter.bat -n -t ${jmxOutputPath} -l ${reportPath}`;

  //executing the jmeter command and writing in the reports.csv
  exec(jmeterCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`JMeter test failed: ${stderr}`);
      res.status(500).send({ message: 'JMeter test failed' });
    } else {
      console.log(`JMeter test started: ${stdout}`);
      fs.readFile(reportPath, 'utf-8', (err) => {
        if (err) {
          console.log(`Error reading report file: ${err}`);
          res.status(500).send({ message: 'Error reading report file' });
        } else {
          console.log(`Report file saved successfully: ${reportPath}`);
          //res.send({ message: 'JMeter test succeeded' });
        }
      });
    }
  });
  //getting the status from the csv file and saving the test with the new status
  setTimeout(() => {
    const results = [];
    fs.createReadStream(reportPath)
      .pipe(csv())
      .on('data', (data) => results.push(data["success"]))
      .on('end', async () => {
        results[2] === 'true' ? test.status = "Passed" : test.status = "failed"
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

  }, 5000)
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

//exports
exports.executeTest = executeTest;
exports.getAllTests = getAllTests;
