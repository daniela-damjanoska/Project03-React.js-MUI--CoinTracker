import React, { useContext } from 'react';
import { Context } from '../Context/Context';

// import { format } from 'date-fns';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import IncomeAndExpenseWrapper from './IncomeAndExpenseWrapper';
import CategoriesChart from '../Components/CategoriesChart';

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
    const { filteredIncomeCategories, filteredExpenseCategories, labels } =
        useContext(Context);

    let chartDataExpense = [];

    if (filteredExpenseCategories) {
        filteredExpenseCategories.forEach(category => {
            chartDataExpense.push(+category.entriesAmount);
        });
    }

    let chartDataIncome = [];

    if (filteredIncomeCategories) {
        filteredIncomeCategories.forEach(category => {
            chartDataIncome.push(+category.entriesAmount);
        });
    }

    console.log(chartDataExpense);
    console.log(chartDataIncome);

    // console.log(chartData);

    // const labels = [];
    // const today = new Date();
    // const date = format(today, 'yyyy-MM-dd');
    // const day = +date.slice(-2);
    // // console.log(day);

    // // for (let i = 1; i < day + 1; i++) labels.push(i);
    // const thirtyDaysAgo = new Date().setDate(new Date().getDate() - 30);

    // const labels = datesBetween(thirtyDaysAgo, today);

    // console.log(thirtyDaysAgo);

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    // console.log(labels);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: chartDataIncome,
                backgroundColor: 'rgba(0,128,0,0.2)',
                borderColor: 'rgba(0,128,0,1)',
                hoverBackgroundColor: 'rgba(0,128,0,0.4)',
                yAxisID: 'y',
            },
            {
                label: 'Expenses',
                data: chartDataExpense,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                yAxisID: 'y1',
            },
        ],
    };

    // const thirtyDaysAgo = new Date().setDate(new Date().getDate() - day);
    // const labels30 = datesBetween(thirtyDaysAgo, today);
    // console.log(labels30);

    return (
        <Paper
            elevation={6}
            sx={{
                width: '500px',
                height: 'fit-content',
                mt: 11,
                mb: 11,
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                sx={{
                    backgroundColor: '#f4f4f4',
                    paddingY: 2,
                    paddingX: 2,
                    borderTopRightRadius: '3px',
                    borderTopLeftRadius: '3px',
                    color: 'secondary.light',
                }}
            >
                Categories
            </Typography>
            <Line options={options} data={data} />
        </Paper>
    );
}
