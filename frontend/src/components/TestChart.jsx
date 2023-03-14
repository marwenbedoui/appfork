import React, { useEffect } from "react";
import * as echarts from "echarts";

const TestChart = ({ values }) => {
  const xAxisData = values.map((data) => data.timestamp);
  const cpuData = values.map((data) => parseFloat(data.cpu));
  const memoryData = values.map((data) => parseFloat(data.memory));

  const chartOptions = {
    title: {
      text: "CPU and Memory Usage",
    },
    tooltip: {},
    legend: {
      data: ["CPU", "Memory"],
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: [
      {
        type: "value",
        name: "CPU",
        axisLabel: {
          formatter: "{value} %",
        },
      },
      {
        type: "value",
        name: "Memory",
        axisLabel: {
          formatter: "{value} MB",
        },
      },
    ],
    series: [
      {
        name: "CPU",
        type: "line",
        data: cpuData,
        yAxisIndex: 0,
      },
      {
        name: "Memory",
        type: "line",
        data: memoryData,
        yAxisIndex: 1,
      },
    ],
  };
 
  useEffect(() => {
      console.log(memoryData);
       const chart = echarts.init(document.getElementById("my-chart"));
       chart.setOption(chartOptions);
     });
  return <div id="my-chart" style={{ width: "100%", height: 500 }}></div>;


};

export default TestChart;
