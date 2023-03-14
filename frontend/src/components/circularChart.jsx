import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import TesterService from "../services/TesterServices/TesterService";

const CircularChart = () => {
  const [myChart, setMyChart] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const chartDom = document.getElementById("circular");
    const newChart = echarts.init(chartDom);
    setMyChart(newChart);
    return () => {
      newChart.dispose();
    };
  }, []);

  useEffect(() => {
    TesterService.fetchTestStatePerUser().then(
      (a) => {
        setData(a);
      },
      [data]
    );
    console.log(data);
    const option = {
      title: {
        text: "Pourcentage des status du test",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "20%",
        left: "center",
        selectedMode: false,
      },
      series: [
        {
          name: "Nombre de tests exécutés",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "70%"],
          startAngle: 180,
          label: {
            show: true,
            formatter(param) {
              return param.name + " (" + param.percent * 2 + "%)";
            },
          },
          data: [
            {
              value: data.failedTests,
              name: "Failed",
              itemStyle: {
                color: "#CC0000",
                decal: {
                  symbol: "none",
                },
              },
            },
            {
              value: data.passedTests,
              name: "Passed",
              itemStyle: {
                color: "#00934C",
                decal: {
                  symbol: "none",
                },
              },
            },
            {
              value: data.runPerUser,
              itemStyle: {
                color: "none",
                decal: {
                  symbol: "none",
                },
              },
              label: {
                show: false,
              },
            },
          ],
        },
      ],
    };
    myChart && myChart.setOption(option);
  }, [myChart, data]);

  return <div id="circular" style={{ width: "100%", height: 500 }} />;
};

export default CircularChart;
