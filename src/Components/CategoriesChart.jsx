import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoriesChart({
  array,
  backgroundColor,
  borderColor,
  hoverBackgroundColor,
}) {
  const labels = [],
    chartData = [];

  if (array) {
    array.forEach((category) => {
      labels.push(category.name);
      chartData.push(+category.budget);
    });
  }

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        backgroundColor,
        borderColor,
        borderWidth: 1,
        hoverBackgroundColor,
      },
    },
    responsive: true,
    labels,
  };

  const chartSet = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: chartData,
      },
    ],
  };

  return <Bar data={chartSet} options={options} />;
}
