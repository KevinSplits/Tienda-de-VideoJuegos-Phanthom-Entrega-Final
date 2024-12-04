import { useState } from 'react';
import { Box, Button, Modal, TextField, Grid, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialRows = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '555-1234', address: 'Calle Falsa 123' },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com', phone: '555-5678', address: 'Avenida Siempre Viva 742' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', phone: '555-8765', address: 'Paseo del Parque 45' },
];

export default function ClientesTable() {
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientData, setClientData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleOpen = () => {
        setEditMode(false);
        setClientData({
            name: '',
            email: '',
            phone: '',
            address: '',
        });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (editMode && selectedClient) {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.id === selectedClient.id
                        ? { ...row, ...clientData }
                        : row
                )
            );
        } else {
            setRows((prevRows) => [
                ...prevRows,
                { id: prevRows.length + 1, ...clientData },
            ]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setClientData(client);
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
            <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 2 }}>
                <Grid item>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        Clientes
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', textAlign: 'center' }}>ID</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Nombre</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Email</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Teléfono</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Dirección</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.id}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.name}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.email}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.phone}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.address}</td>
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
            </Paper>

            {/* Modal para agregar o editar cliente */}
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
                        {editMode ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                fullWidth
                                name="name"
                                value={clientData.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                name="email"
                                value={clientData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Teléfono"
                                fullWidth
                                name="phone"
                                value={clientData.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Dirección"
                                fullWidth
                                name="address"
                                value={clientData.address}
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
