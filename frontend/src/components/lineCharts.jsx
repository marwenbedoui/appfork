import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import TesterService from "../services/TesterServices/TesterService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineCharts = ({ attribute, name, color }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: name,
        data: [],
        fill: false,
        borderColor: color,
        tension: 0.1,
      },
    ],
  });

  const [result, setResult] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}:${seconds}`;
      TesterService.fetchDataTest().then((res) => {
        switch (attribute) {
          case "cpuUsage":
            setResult(res.cpuUsage);
            break;
          case "diskIoTime":
            setResult(res.diskIoTime);
            break;
          case "networkSpeed":
            setResult(res.networkSpeed);
            break;
          case "memoryUsage":
            setResult(res.memoryUsage);
            break;
          default:
            break;
        }
      });
      setData((prevState) => {
        const newLabels = [...prevState.labels, timeString];
        const newData = [...prevState.datasets[0].data, result];
        return {
          labels: newLabels,
          datasets: [{ ...prevState.datasets[0], data: newData }],
        };
      });
    }, 1500);
    return () => clearInterval(intervalId);
  }, [attribute, result]);

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineCharts;
