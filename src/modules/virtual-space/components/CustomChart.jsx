import React, { useState } from "react";
import { Box } from "@mui/system";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js"

Chart.register(CategoryScale, LinearScale, BarElement)

export default function CustomCharts({ labels = [], data = [] }) {
    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: "#103F9A"
            }
        ]
    });

    return (
        <Box>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    legend: { display: true, position: "bottom" }
                }}
            />
        </Box>
    );
}
