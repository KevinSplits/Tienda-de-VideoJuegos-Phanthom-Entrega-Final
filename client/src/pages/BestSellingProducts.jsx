import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Paper } from '@mui/material';
import { Chart as ChartJS } from 'chart.js/auto';

const mostSoldProductsData = {
    labels: ['The Legend of Zelda', 'God of war', 'Ciberpunk 2077', 'Minecraft', 'Terraria'],
    datasets: [
        {
            label: 'Unidades Vendidas',
            data: [150, 200, 180, 220, 170],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export default function BestSellingProducts() {
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Productos Más Vendidos
            </Typography>

            {/* Gráfico de barras con los productos más vendidos */}
            <Paper sx={{ width: '80%', p: 2 }}>
                <Bar
                    data={mostSoldProductsData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return value + ' unidades';
                                    },
                                },
                            },
                        },
                    }}
                    height={400}
                />
            </Paper>

            {/* Resumen adicional sobre el producto más vendido */}
            <Typography variant="h5" sx={{ mt: 2 }}>
                El producto más vendido: Minecraft (220 unidades)
            </Typography>
        </Box>
    );
}
