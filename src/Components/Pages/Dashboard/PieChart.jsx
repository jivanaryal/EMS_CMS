import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js/auto";

import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        id: 1,
        label: "",
        data: [10, 8],
      },
    ],
  };
  return (
    <div className="shadow-sm shadow-gray-400 p-2">
      <Pie
        datasetIdKey="id"
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 10,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
