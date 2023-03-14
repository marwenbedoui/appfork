import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import TesterService from "../services/TesterServices/TesterService";

const LineCharts = () => {
  const [myChart, setMyChart] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const chartDom = document.getElementById("main");
    const newChart = echarts.init(chartDom);
    setMyChart(newChart);
    return () => {
      newChart.dispose();
    };
  }, []);

  useEffect(() => {
    TesterService.fetchTestsPerUser().then(
      (a) => {
        setData(a);
      },
      [data]
    );
    console.log(data);
    const option = {
      title: {
        text: "Nombre de tests exécutés par jour",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: data.map((item) => item.date),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Test exécuté",
          type: "bar",
          barWidth: "60%",
          data: data.map((item) => item.count),
        },
      ],
    };
    myChart && myChart.setOption(option);
  }, [myChart, data]);

  return <div id="main" style={{ width: "100%", height: 500 }} />;
};

export default LineCharts;
