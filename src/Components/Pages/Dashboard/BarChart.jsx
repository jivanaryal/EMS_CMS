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

  // Update options to set label color to white and adjust height
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16,
            weight: "bold", // Make X-axis labels bold
            color: "white", // Set X-axis label color to white
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, // Increase Y-axis label font size
            weight: "bold", // Make Y-axis labels bold
            color: "white", // Set Y-axis label color to white
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Set legend label color to white
        },
      },
      tooltip: {
        // Custom CSS styles for the tooltip
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        bodyFont: {
          size: 16,
        },
        displayColors: false,
        cornerRadius: 0,
      },
    },
    // Set the height of the chart to 100
    height: 80,
  };

  return <Bar data={data} options={options} />;
};

export default MyBarChart;
