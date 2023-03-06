const Test = require("../models/testModel");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// const jm_tem = ("../tests/jmeter_template.jmx")

const executeTest = async (req, res) => {
  const status = Math.random() < 0.5 ? "Passed" : "Failed";
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

  //const testPlan = jm_tem
  const jmxOutputPath = path.join(__dirname + "/tests", 'test.jmx');
  const jmxContent = `<?xml version="1.0" encoding="UTF-8"?>
  <jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">
    <hashTree>
      <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
        <stringProp name="TestPlan.comments"></stringProp>
        <boolProp name="TestPlan.functional_mode">false</boolProp>
        <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
        <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
          <collectionProp name="Arguments.arguments">
            <elementProp name="protocol" elementType="Argument">
              <stringProp name="Argument.name">protocol</stringProp>
              <stringProp name="Argument.value">${test.protocol}</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>
            </elementProp>
            <elementProp name="host" elementType="Argument">
              <stringProp name="Argument.name">url</stringProp>
              <stringProp name="Argument.value">${test.url}</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>
            </elementProp>
            <elementProp name="port" elementType="Argument">
              <stringProp name="Argument.name">port</stringProp>
              <stringProp name="Argument.value">${test.port}</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>
            </elementProp>
            <elementProp name="path" elementType="Argument">
              <stringProp name="Argument.name">path</stringProp>
              <stringProp name="Argument.value">${test.path}</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>
            </elementProp>
          </collectionProp>
        </elementProp>
        <stringProp name="TestPlan.user_define_classpath"></stringProp>
      </TestPlan>
      <hashTree/>
      <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="${test.testName}" enabled="true">
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
            <xml>true</xml>
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
      </ResultCollector>
      <hashTree/>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">10</stringProp>
        <stringProp name="ThreadGroup.ramp_time">5</stringProp>
        <longProp name="ThreadGroup.start_time">1646500273000</longProp>
        <longProp name="ThreadGroup.end_time">1646500273000</longProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"></stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
          <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
          <stringProp name="HTTPSampler.domain">${test.url}</stringProp>
          <stringProp name="HTTPSampler.port">${test.port}</stringProp>
          <stringProp name="HTTPSampler.protocol">${test.protocol}</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">${test.path}</stringProp>
          <stringProp name="HTTPSampler.method">${test.method}</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
            <collectionProp name="HeaderManager.headers">
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">User-Agent</stringProp>
                <stringProp name="Header.value">ApacheJMeter</stringProp>
              </elementProp>
            </collectionProp>
          </HeaderManager>
          <hashTree/></hashTree>
      </hashTree>
    </hashTree>
  </jmeterTestPlan>
  `

  fs.writeFileSync(jmxOutputPath, jmxContent, 'utf-8');

  const reportPath = path.join(__dirname + "/reports", 'report.csv');
  const jmeterCommand = `D:/programs/apache-jmeter-5.5/bin/jmeter.bat -n -t ${jmxOutputPath} -l ${reportPath}`;

  const jmeterProcess = exec(jmeterCommand, (err, stdout, stderr) => {
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
