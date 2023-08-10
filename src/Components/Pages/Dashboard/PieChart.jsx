import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js/auto";

import { Pie } from "react-chartjs-2";

const PieChart = ({ employee }) => {
  const datas = employee.filter((val) => val.gender === "male");
  const datas1 = employee.filter((val) => val.gender === "female");
  const datas2 = employee.filter((val) => val.gender === "others");

  const maleNumber = datas.length;
  const femaleNumber = datas1.length;
  const otherNumber = datas2.length;

  const data = {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        id: 1,
        label: "Total Employee",
        data: [maleNumber, femaleNumber, otherNumber],
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
                color: "black", // Set the label color to white
                font: {
                  size: 16,
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
