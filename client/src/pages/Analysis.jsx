import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, List, ListItem, ListItemText, Divider, LinearProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Chart from 'chart.js/auto';



const Analysis = () => {


const suppliers = [
    { name: "Game Suppliers Inc.", performance: 80, delivery: "A tiempo", cost: "Moderado" },
    { name: "VideoGames Unlimited", performance: 65, delivery: "Retraso leve", cost: "Alto" },
    { name: "Gaming World", performance: 90, delivery: "A tiempo", cost: "Bajo" },
  ];

  const barData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas por Mes',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55]
      }
    ]
  };

  const cities = [
    { name: "San Miguel", lat: -12.076707905159928, lng: -77.08220316931151 },
    { name: "Jockey Plaza", lat: -12.086138940532926, lng: -76.97773028836062 },
    { name: "Tienda Puruchuco", lat: -12.038261121591061, lng: -76.931977 },
    { name: "Centro Cívico", lat: -12.056296789316637, lng: -77.03736445767214 },
    { name: "Santa Anita", lat: -12.056555742676238, lng: -76.97079091534425 },
    { name: "Mall del Sur", lat: -12.154595885398011, lng: -76.98209708465576 },
    { name: "Plaza Norte", lat: -12.00666272941323, lng: -77.06025737301637 },
    { name: "Tienda Salaverry", lat: -12.08958170976282, lng: -77.05257378922079 },
    { name: "Tienda Larcomar", lat: -12.131573898590519, lng: -77.03048408465575 },
    { name: "La Rambla San Borja", lat: -12.088339781264985, lng: -77.00486208465574 },
    { name: "Tienda Mega Plaza", lat: -11.994054667086134, lng: -77.06179 },
    { name: "Trujillo", lat: -8.10195375197262, lng: -79.04804391534425 },
    { name: "Piura", lat: -5.1819285457517195, lng: -80.62224545767214 },
    { name: "Cuzco", lat: -13.52383347080274, lng: -71.95047836441803 },
    { name: "Chimbote", lat: -9.10210215663841, lng: -78.55790054232787 },
    { name: "Chiclayo", lat: -6.777715807444322, lng: -79.83260716931152 },
    { name: "Arequipa", lat: -16.389912750397254, lng: -71.54656345767214 },
    { name: "Arequipa", lat: -16.417291542969267, lng: -71.51377600000002 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', mt: 2 }}>Análisis de Proveedores y Métricas Clave</Typography>

      {/* Grid de tarjetas */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h6">Visitantes</Typography>
              <Typography variant="h4">2,540</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h6">Actividad</Typography>
              <Typography variant="h4">1,200</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h6">Tiempo Real</Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h6">Tasa de Rebote</Typography>
              <Typography variant="h4">35%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico de barras */}
      <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
        Actividad por Mes
      </Typography>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper
          sx={{
            width: '80%',
            p: 2,
            borderRadius: '8px', // Bordes redondeados
            boxShadow: 3 // Sombra opcional
          }}
        >
          <Box sx={{ height: '400px', width: '100%' }}> {/* Ajustar altura */}
            <Bar
              data={barData}
              options={{
                responsive: true, // Hace el gráfico adaptable
                maintainAspectRatio: false, // Permite ajustar la altura sin distorsión
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return value + ' unidades'; // Añadir texto a las etiquetas
                      },
                    },
                  },
                },
              }}
            />
          </Box>
        </Paper>
      </Box>


      {/* Mapa */}
      <Box mt={4} sx={{ m: 3 }}> {/* Agregar margen en todos los lados */}
        <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
          Tiendas Phantom en Perú
        </Typography>

        <MapContainer
          center={[-9.19, -75.0152]}
          zoom={5}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {cities.map((city, index) => (
            <Marker key={index} position={[city.lat, city.lng]}>
              <Popup>{city.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      {/* Lista de Proveedores */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ m: 2 }}>Análisis de Proveedores</Typography>
        <List>
          {suppliers.map((supplier, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={supplier.name}
                  secondary={`Entrega: ${supplier.delivery}, Costo: ${supplier.cost}`}
                />
                <Box sx={{ width: '30%', marginLeft: '20px' }}>
                  <Typography variant="body2">Rendimiento: {supplier.performance}%</Typography>
                  <LinearProgress variant="determinate" value={supplier.performance} />
                </Box>
              </ListItem>
              {index < suppliers.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Analysis;