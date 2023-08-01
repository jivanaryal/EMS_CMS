import React from "react";
import { Bar } from "react-chartjs-2";

const MyBarChart = ({ task }) => {
  const datas = task.filter((val) => val.status === "pending");
  const datas1 = task.filter((val) => val.status === "inprogress");
  const datas2 = task.filter((val) => val.status === "completed");

  const pendingNum = datas.length;
  const inprogressNum = datas1.length;
  const completedNum = datas2.length;

  const data = {
    labels: ["Pending Task", "Inprogress Task", "Completed Task"],
    datasets: [
      {
        label: "Task Details",
        data: [pendingNum, inprogressNum, completedNum],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16,
            weight: "bold",
            color: "white",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16,
            weight: "bold",
            color: "white",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black",
        },
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        bodyFont: {
          size: 18,
        },
        displayColors: false,
        cornerRadius: 0,
      },
    },
    height: 80,
  };

  return <Bar data={data} options={options} className="h-96" />;
};

export default MyBarChart;
