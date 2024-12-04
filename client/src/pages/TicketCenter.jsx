import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const TicketCenter = () => {
  const [tickets, setTickets] = React.useState([
    { id: 1, subject: "Problema con pedido", status: "Abierto", description: "El pedido llegó dañado." },
    { id: 2, subject: "No puedo acceder a mi cuenta", status: "Cerrado", description: "Problema con la recuperación de contraseña." },
    { id: 3, subject: "Pago duplicado", status: "Abierto", description: "Se cobró dos veces por el mismo pedido." },
    { id: 4, subject: "Problema con entrega", status: "Abierto", description: "El pedido no ha llegado a la dirección indicada, a pesar de estar marcado como entregado." },
    { id: 5, subject: "Producto defectuoso", status: "En Proceso", description: "El producto recibido presenta fallas en su funcionamiento y no enciende correctamente." },
    { id: 6, subject: "Reembolso solicitado", status: "Cerrado", description: "El cliente ha solicitado un reembolso debido a un error en la facturación." }
  ]);

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Abierto":
        return "success";
      case "En Proceso":
        return "warning";
      case "Cerrado":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Centro de Tickets
      </Typography>
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket.id}>
            <Card sx={{ m: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ticket #{ticket.id} - {ticket.subject}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {ticket.description}
                </Typography>
                <Chip label={ticket.status} color={getStatusChipColor(ticket.status)} sx={{ mb: 2, mx: 1, mt: 2 }} />
                <Button variant="contained" color="primary">
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TicketCenter;
