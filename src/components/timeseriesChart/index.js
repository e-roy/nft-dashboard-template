import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./style.css";

const TimeSeriesChart = ({ quote, wei }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: 14,
          },
          margin: "20px",
        },
      },
    },
    scales: {
      A: {
        title: "USD",
        type: "linear",
        position: "left",
        ticks: {
          color: "#FF4C8B",
          callback: function (value, index, values) {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              return "$" + value;
            }
          },
        },
      },
      B: {
        type: "linear",
        position: "right",
        ticks: {
          color: "#00D8D5",
          max: 1,
          min: 0,
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  const graphData = {
    datasets: [
      {
        label: "Floor Price Quote 7 Days USD ($) ",
        yAxisID: "A",
        data: quote,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Floor Price ETH 7 Days",
        yAxisID: "B",
        data: wei,
        borderColor: "rgb(	0	,216,	213)",
        backgroundColor: "rgba(	0,	216	,213, 0.5)",
      },
    ],
  };

  return <Line options={options} data={graphData} />;
};

export default TimeSeriesChart;
