import { Bar, Doughnut } from 'react-chartjs-2';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Datos de ventas anuales
const annualSalesData = {
  labels: ['2020', '2021', '2022', '2023', '2024'],
  datasets: [
    {
      label: 'Ventas Anuales ($)',
      data: [50000, 80000, 60000, 90000, 120000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

// Clientes más frecuentes
const frequentClientsData = {
  labels: ['Juan Pérez', 'María Gómez', 'Carlos López', 'Ana Torres', 'Luis Fernández'],
  datasets: [
    {
      label: 'Clientes Más Frecuentes',
      data: [50, 30, 20, 15, 10],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  ],
};

// Datos para fuentes de tráfico (Tabla)
const trafficSources = [
  { fuente: 'Google', usuarios: 1023, sesiones: 1265, tasaRebote: '30%', duracionSesion: '00:06:25' },
  { fuente: 'Directo', usuarios: 872, sesiones: 1077, tasaRebote: '63%', duracionSesion: '00:09:18' },
  { fuente: 'Redes Sociales', usuarios: 693, sesiones: 856, tasaRebote: '28%', duracionSesion: '00:05:56' },
  { fuente: 'Publicidad Online', usuarios: 500, sesiones: 600, tasaRebote: '56%', duracionSesion: '00:09:12' },
  { fuente: 'Recomendaciones', usuarios: 300, sesiones: 400, tasaRebote: '20%', duracionSesion: '00:04:42' },
];

// Datos para ubicaciones en Perú (Tabla)
const userLocations = [
  { ciudad: 'Lima', usuarios: 500, porcentaje: '50%' },
  { ciudad: 'Arequipa', usuarios: 300, porcentaje: '30%' },
  { ciudad: 'Cusco', usuarios: 200, porcentaje: '10%' },
  { ciudad: 'Trujillo', usuarios: 150, porcentaje: '7%' },
  { ciudad: 'Chiclayo', usuarios: 100, porcentaje: '3%' },
];

export default function VideoGameDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Tienda de Videojuegos
      </Typography>

      <Grid container spacing={3}>
        {/* Ventas anuales */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ventas Anuales
            </Typography>
            <Bar data={annualSalesData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        {/* Clientes más frecuentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Clientes Más Frecuentes
            </Typography>
            <Doughnut data={frequentClientsData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        {/* Fuentes de tráfico y ubicaciones de usuarios (Tablas) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fuentes de Tráfico
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fuente</TableCell>
                    <TableCell>Usuarios</TableCell>
                    <TableCell>Sesiones</TableCell>
                    <TableCell>Tasa de Rebote</TableCell>
                    <TableCell>Duración Promedio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trafficSources.map((row) => (
                    <TableRow key={row.fuente}>
                      <TableCell>{row.fuente}</TableCell>
                      <TableCell>{row.usuarios}</TableCell>
                      <TableCell>{row.sesiones}</TableCell>
                      <TableCell>{row.tasaRebote}</TableCell>
                      <TableCell>{row.duracionSesion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ubicaciones de Usuarios en Perú
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Usuarios</TableCell>
                    <TableCell>Porcentaje</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userLocations.map((row) => (
                    <TableRow key={row.ciudad}>
                      <TableCell>{row.ciudad}</TableCell>
                      <TableCell>{row.usuarios}</TableCell>
                      <TableCell>{row.porcentaje}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
