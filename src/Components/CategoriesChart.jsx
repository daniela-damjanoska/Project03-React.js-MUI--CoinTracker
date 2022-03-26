import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import Typography from '@mui/material/Typography';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoriesChart({
    array,
    backgroundColor,
    borderColor,
    hoverBackgroundColor,
    type,
}) {
    const labels = [];
    const chartData = [];

    if (array) {
        array.forEach(category => {
            labels.push(category.name);
            chartData.push(parseInt(category.entriesAmount));
        });
    }

    const options = {
        indexAxis: 'y',
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
                label: 'Amount',
                data: chartData,
            },
        ],
    };

    return (
        <>
            {array?.length ? (
                <Bar data={chartSet} options={options} />
            ) : (
                <Typography
                    variant="body"
                    component="p"
                    padding={2}
                    color="secondary"
                >
                    There is no data for {type} categories
                </Typography>
            )}
        </>
    );
}
