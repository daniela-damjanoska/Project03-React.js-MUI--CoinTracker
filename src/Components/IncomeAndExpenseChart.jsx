import React, { useContext } from "react";
import { Context } from "../Context/Context";

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

import IncomeAndExpenseWrapper from "./IncomeAndExpenseWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function IncomeAndExpenseChart() {
  const { labels, entriesInCurrentMonth } = useContext(Context);

  let expenseAmountSums = [],
    incomeAmountSums = [];

  //make an arrays of objects for income and expense entries
  labels.forEach((label) => incomeAmountSums.push({ date: label }));
  labels.forEach((label) => expenseAmountSums.push({ date: label }));

  const incomeEntriesInCurrentMonth = entriesInCurrentMonth.filter(
    (entry) => entry.type === "income"
  );

  const expenseEntriesInCurrentMonth = entriesInCurrentMonth.filter(
    (entry) => entry.type === "expense"
  );

  //make a sum of the income entries amount for each day in the current month
  if (incomeEntriesInCurrentMonth) {
    incomeAmountSums.forEach((el) => {
      const totalAmount = incomeEntriesInCurrentMonth.reduce(
        (accumulation, entry) => {
          if (entry.date === el.date) {
            return accumulation + parseInt(entry.amount);
          } else {
            return accumulation;
          }
        },
        0
      );

      el.sumIncome = totalAmount;
    });
  }

  //make a sum of the expense entries amount for each day in the current month
  if (expenseEntriesInCurrentMonth) {
    expenseAmountSums.forEach((el) => {
      const totalAmount = expenseEntriesInCurrentMonth.reduce(
        (accumulation, entry) => {
          if (entry.date === el.date) {
            return accumulation + parseInt(entry.amount);
          } else {
            return accumulation;
          }
        },
        0
      );

      el.sumExpense = totalAmount;
    });
  }

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeAmountSums.map((el) => el.sumIncome),
        backgroundColor: "rgba(0,128,0,0.2)",
        borderColor: "rgba(0,128,0,1)",
        hoverBackgroundColor: "rgba(0,128,0,0.4)",
        yAxisID: "y",
      },
      {
        label: "Expenses",
        data: expenseAmountSums.map((el) => el.sumExpense),
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <IncomeAndExpenseWrapper
      title="Income & Expenses Entries"
      customTopMarginMob={0}
      customBottomMarginMob={13}
      customLeftMarginPC={4}
      customLeftMarginMob={0}
      array={labels}
      type=""
      additionalInfo={true}
      popperContent="These are your monthly statistics for income and expense entries. They are reset at the beginning of each month."
    >
      <Line options={options} data={data} />
    </IncomeAndExpenseWrapper>
  );
}
