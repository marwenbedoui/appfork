import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import TesterService from "../services/TesterServices/TesterService";

const MyChart = () => {
  const [myChart, setMyChart] = useState(null);
  const [data, setData] = useState([]);
  const [base, setBase] = useState(+new Date());
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const chartDom = document.getElementById("main");
    const newChart = echarts.init(chartDom);
    setMyChart(newChart);
    return () => {
      newChart.dispose();
    };
  }, []);

  useEffect(() => {
    const option = {
      title: {
        text: "Dynamic Data & Time Access",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
        formatter: function (params) {
          const date = new Date(params[0].value[0]);
          return (
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds() +
            " - " +
            params[0].value[1].toFixed(2)
          );
        },
        backgroundColor: "rgba(245, 245, 245, 0.8)",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        textStyle: {
          color: "#000",
        },
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: "CPU Usage",
          type: "line",
          showSymbol: false,
          hoverAnimation: false,
          data: data,
        },
      ],
      dataZoom: [
        {
          type: "inside",
        },
        {
          start: 0,
          end: 20,
        },
      ],
    };
    myChart && myChart.setOption(option);
  }, [myChart, data]);

  useEffect(() => {
    // start timer to update data every second
    const newTimer = setInterval(() => {
      TesterService.fetchDataTest().then((response) => {
        let c = response.cpuUsage;
        const newData = {
          value: [base, c],
        };
        setData([...data, newData]);
        // remove data points that are more than 20 seconds old
        setData((prevData) => {
          const newBase = prevData.length > 0 ? prevData[0].value[0] : base;
          if (base - newBase > 20000) {
            return prevData.slice(1);
          }
          return prevData;
        });
        setBase(base + 1000);
      });
    }, 1000);
    setTimer(newTimer);
    return () => {
      // clear timer when unmounting
      clearInterval(newTimer);
    };
  }, [data, base]);

  return <div id="main" style={{ width: "100%", height: 500 }} />;
};

export default MyChart;
