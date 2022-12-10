import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js"

Chart.register(CategoryScale, LinearScale, BarElement)

export default function CustomCharts() {
    const [chartData, setChartData] = useState({
        labels: ["Boston", "Worcester", "Springfield", "Lowel", "Cambridge"],
        datasets: [
            {
                label: "Population",
                data: [117594, 181455, 153060, 106519, 105162],
                backgroundColor: "#303F9F"
            }
        ]
    });

    return (
        <>
            <Typography variant="h6">Bar Chart</Typography>
            <Bar
                data={chartData}
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: "Largest cities of Massachusetts"
                    },
                    legend: { display: true, position: "bottom" }
                }}
            />
        </>
    );
}
