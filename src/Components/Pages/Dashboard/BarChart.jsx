import React from "react";
import { Bar } from "react-chartjs-2";

const MyBarChart = ({ task }) => {
  // Extract the data from the task prop
  const datas = task.filter((val) => val.status === "pending");
  const datas1 = task.filter((val) => val.status === "inprogress");
  const datas2 = task.filter((val) => val.status === "completed");

  const pendingNum = datas.length;
  const inprogressNum = datas1.length;
  const completedNum = datas2.length;

  // Update the data object
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

  // Define options (unchanged)
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: "bold", // Make X-axis labels bold
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, // Increase Y-axis label font size
            weight: "bold", // Make Y-axis labels bold
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MyBarChart;
