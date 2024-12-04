import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialRows = [
    { id: 1, clientName: 'Juan Pérez', product: 'Laptop', quantity: 2, price: 500, total: 1000 },
    { id: 2, clientName: 'Maria Gómez', product: 'Teléfono', quantity: 1, price: 700, total: 700 },
    { id: 3, clientName: 'Carlos Herrera', product: 'Monitor', quantity: 3, price: 150, total: 450 },
    { id: 4, clientName: 'Ana Torres', product: 'Teclado', quantity: 5, price: 30, total: 150 },
    { id: 5, clientName: 'Luis Ramírez', product: 'Ratón', quantity: 4, price: 25, total: 100 },
];

export default function SalesTable() {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [saleData, setSaleData] = useState({
        clientName: '',
        product: '',
        quantity: 0,
        price: 0,
        total: 0,
    });

    const handleOpen = () => {
        setEditMode(false);
        setSaleData({
            clientName: '',
            product: '',
            quantity: 0,
            price: 0,
            total: 0,
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSaleData((prevData) => ({
            ...prevData,
            [name]: value,
            total: name === 'quantity' || name === 'price' ? prevData.quantity * prevData.price : prevData.total,
        }));
    };

    const handleSubmit = () => {
        if (editMode && selectedSale) {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === selectedSale.id
                        ? { ...row, ...saleData }
                        : row
                )
            );
        } else {
            setRows((prevRows) => [
                ...prevRows,
                { id: prevRows.length + 1, ...saleData },
            ]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleEdit = (sale) => {
        setSelectedSale(sale);
        setSaleData(sale);
        setEditMode(true);
        setOpen(true);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                textAlign: 'center',
                mt: 2,
                px: { xs: 2, md: 3 },
            }}
        >
            {/* Título y botón "Agregar Venta" */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '80%', mb: 2 }}>
                <Grid item>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        Ventas
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
                        Agregar Venta
                    </Button>
                </Grid>
            </Grid>

            {/* Tabla Simple */}
            <div style={{ width: '80%', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center' }}>ID Venta</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Nombre del Cliente</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Producto</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Cantidad</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Precio Unitario</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Total</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.id}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.clientName}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.product}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.quantity}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>${row.price}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>${row.total}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>
                                    <Button onClick={() => handleEdit(row)} color="primary" size="small" startIcon={<EditIcon />}>
                                        Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(row.id)} color="secondary" size="small" startIcon={<DeleteIcon />}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para agregar o editar venta */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                }}>
                    <Typography variant="h6" gutterBottom>
                        {editMode ? 'Editar Venta' : 'Agregar Nueva Venta'}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Cliente"
                                fullWidth
                                name="clientName"
                                value={saleData.clientName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Producto"
                                fullWidth
                                name="product"
                                value={saleData.product}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Cantidad"
                                fullWidth
                                type="number"
                                name="quantity"
                                value={saleData.quantity}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Precio Unitario"
                                fullWidth
                                type="number"
                                name="price"
                                value={saleData.price}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Total: ${saleData.total}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                {editMode ? 'Guardar Cambios' : 'Guardar'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}
