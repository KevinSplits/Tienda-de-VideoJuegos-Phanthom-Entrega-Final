import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Paper } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';  // Import necesario para Chart.js v3+

const dailySalesData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
        {
            label: 'Ventas Diarias ($)',
            data: [500, 800, 600, 900, 1200, 1500, 1000],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

export default function DailySalesSummary() {
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Resumen de Ventas Diarias
            </Typography>

            {/* Gráfico de ventas */}
            <Paper sx={{ width: '80%', p: 2 }}>
                <Bar
                    data={dailySalesData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return '$' + value;
                                    },
                                },
                            },
                        },
                    }}
                    height={400}
                />
            </Paper>

            {/* Total de ventas del día */}
            <Typography variant="h5" sx={{ mt: 2 }}>
                Total de ventas hoy: $1200
            </Typography>

            {/* Desglose por producto */}
            <Paper sx={{ mt: 3, p: 2, width: '80%' }}>
                <Typography variant="h6">Desglose por Producto</Typography>
                <ul>
                    <li>Plantas contra Zombies: 10 unidades vendidas ($200)</li>
                    <li>Lethal Company: 15 unidades vendidas ($450)</li>
                    <li>The Coffin of Andy and Leyley: 5 unidades vendidas ($150)</li>
                </ul>
            </Paper>
        </Box>
    );
}
