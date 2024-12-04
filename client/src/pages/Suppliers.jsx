import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialRows = [
    { id: 1, companyName: 'Game Suppliers Inc.', contactName: 'John Doe', phoneNumber: '555-1234', email: 'john.doe@gamesuppliers.com', country: 'EEUU' },
    { id: 2, companyName: 'VideoGames Unlimited', contactName: 'Jane Smith', phoneNumber: '555-5678', email: 'jane.smith@videogamesunlimited.com', country: 'Canadá' },
    // Resto de los datos iniciales...
];

export default function DataTable() {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [providerData, setProviderData] = useState({
        companyName: '',
        contactName: '',
        phoneNumber: '',
        email: '',
        country: '',
    });

    const handleOpen = () => {
        setEditMode(false);
        setProviderData({
            companyName: '',
            contactName: '',
            phoneNumber: '',
            email: '',
            country: '',
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProviderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (editMode && selectedProvider) {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === selectedProvider.id
                        ? { ...row, ...providerData }
                        : row
                )
            );
        } else {
            setRows((prevRows) => [
                ...prevRows,
                { id: prevRows.length + 1, ...providerData },
            ]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleEdit = (provider) => {
        setSelectedProvider(provider);
        setProviderData(provider);
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
            {/* Título y botón "Agregar Proveedor" */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
                <Grid item>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        Proveedores
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>

            <div style={{ width: '100%', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center' }}>ID</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Nombre de la Empresa</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Nombre del Contacto</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Número de Teléfono</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Correo Electrónico</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>País</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.id}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.companyName}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.contactName}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.phoneNumber}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.email}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{row.country}</td>
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

            {/* Modal para agregar o editar proveedor */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 },
                    bgcolor: 'background.paper',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                }}>
                    <Typography variant="h6" gutterBottom>
                        {editMode ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre de la Empresa"
                                fullWidth
                                name="companyName"
                                value={providerData.companyName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Contacto"
                                fullWidth
                                name="contactName"
                                value={providerData.contactName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Número de Teléfono"
                                fullWidth
                                name="phoneNumber"
                                value={providerData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo Electrónico"
                                fullWidth
                                name="email"
                                value={providerData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="País"
                                fullWidth
                                name="country"
                                value={providerData.country}
                                onChange={handleInputChange}
                            />
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
