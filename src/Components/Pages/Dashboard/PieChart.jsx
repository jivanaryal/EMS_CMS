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

  const maleNumber = datas.length;
  const femaleNumber = datas1.length;

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        id: 1,
        label: "",
<<<<<<< HEAD
        data: [maleNumber, femaleNumber],
=======
        data: [10, 8],
>>>>>>> 41a40bfa9d9a99ffaa05590f1ace7a73a46eef9c
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
