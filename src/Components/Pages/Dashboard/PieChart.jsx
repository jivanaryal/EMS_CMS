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
        data: [maleNumber, femaleNumber],
      },
    ],
  };
  return (
    <div>
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