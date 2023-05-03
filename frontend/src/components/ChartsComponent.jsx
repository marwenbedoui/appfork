import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as echarts from "echarts";
import TesterService from "../services/TesterServices/TesterService";
import AdminServices from "../services/AdminServices/AdminServices";

export const TestChart = ({ values, field }) => {
  const xAxisData = values.map((data) => data.timestamp);
  const cpuData = values.map((data) => parseFloat(data.cpu));
  const memoryData = values.map((data) => parseFloat(data.memory));
  const diskUse = values.map((data) => parseFloat(data.disk));
  const recievedNet = values.map((data) => parseFloat(data.network.received));
  const transféréNet = values.map((data) =>
    parseFloat(data.network.transferred)
  );
  let result, color, format;
  switch (field) {
    case "CPU":
      color = "#006064";
      result = cpuData;
      format = "%";
      break;
    case "Mémoire":
      color = "orange";
      result = memoryData;
      format = "MB";
      break;
    case "Disque":
      color = "red";
      result = diskUse;
      format = "%";
      break;
    case "Réseau":
      result = { recievedNet, transféréNet };
      break;
    default:
      console.log("Unknown command");
  }

  const chartOptions = {
    title: {
      text: `utilisation du ${field}`,
    },
    tooltip: {},
    legend: {
      data: field === "Réseau" ? ["Reçu", "transféré"] : [field],
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis:
      field === "Réseau"
        ? [
            {
              type: "value",
              name: "Reçu",
              axisLabel: {
                formatter: "{value} MB",
              },
            },
            {
              type: "value",
              name: "transféré",
              axisLabel: {
                formatter: "{value} MB",
              },
            },
          ]
        : [
            {
              type: "value",
              name: field,
              axisLabel: {
                formatter: `{value} ${format}`,
              },
            },
          ],
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series:
      field === "Réseau"
        ? [
            {
              name: "Reçu",
              type: "line",
              data: result.recievedNet,
              yAxisIndex: 0,
            },
            {
              name: "transféré",
              type: "line",
              data: result.transféréNet,
              yAxisIndex: 1,
              lineStyle: {
                type: "dashed",
              },
            },
          ]
        : [
            {
              name: field,
              type: "line",
              data: result,
              yAxisIndex: 0,
              color: color,
            },
          ],
  };

  useEffect(() => {
    const chart = echarts.init(document.getElementById(field));
    chart.setOption(chartOptions);
  });
  return <div id={field} style={{ width: "100%", height: 500 }}></div>;
};

export const LineCharts = () => {
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
    TesterService.fetchTestsPerUser().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  useEffect(() => {
    if (!myChart || !data) {
      return;
    }

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
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: "Test exécuté",
          type: "bar",
          barWidth: "60%",
          data: data.map((item) => item.count),
          itemStyle: {
            color: "#008F7A",
            decal: {
              symbol: "none",
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  }, [myChart, data]);

  return <div id="main" style={{ width: "100%", height: 500 }} />;
};

export const CircularChart = ({ isAdmin, id, name }) => {
  const [myChart, setMyChart] = useState(null);
  const [data, setData] = useState([]);

  const fetchTestData = useCallback(() => {
    const service = isAdmin ? AdminServices : TesterService;
    const method = isAdmin
      ? "getTestsStatusPerUserId"
      : "fetchTestStatePerUser";
    service[method](id).then((a) => {
      setData(a);
    });
  }, [isAdmin, id]);

  useEffect(() => {
    const chartDom = document.getElementById(name);
    const newChart = echarts.init(chartDom);
    setMyChart(newChart);
    return () => {
      newChart.dispose();
    };
  }, [name]);
  const option = useMemo(
    () => ({
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
                color: "#A91B1E",
                decal: {
                  symbol: "none",
                },
              },
            },
            {
              value: data.passedTests,
              name: "Passed",
              itemStyle: {
                color: "green",
                decal: {
                  symbol: "none",
                },
              },
            },
            {
              value: data.runPerUser === 0 ? 1 : data.runPerUser,
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
    }),
    [data]
  );
  useEffect(() => {
    fetchTestData();

    myChart?.setOption(option);
  }, [myChart, data, fetchTestData, option]);

  return <div id={name} style={{ width: "100%", height: 500 }} />;
};
