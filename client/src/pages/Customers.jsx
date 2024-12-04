import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useCliente } from "../context/ClientesContext";

const ClienteRow = ({ cliente, onEdit, onDelete }) => {
  return (
    <tr key={cliente._id} style={{ borderBottom: "1px solid #ddd" }}>
      <td style={{ padding: "10px", textAlign: "center" }}>{cliente.name}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>{cliente.email}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>{cliente.phone}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>{cliente.address}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        <Button
          onClick={() => onEdit(cliente)}
          color="primary"
          size="small"
          startIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Button
          onClick={() => onDelete(cliente._id)}
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
};

export default function ClientesTable() {
  const {
    clientes,
    getClientes,
    createCliente,
    deleteCliente,
    updateCliente,
  } = useCliente();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [clienteData, setClienteData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getClientes();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setClienteData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (editMode && selectedCliente) {
      await updateCliente(selectedCliente._id, clienteData); // Usar clienteData
    } else {
      await createCliente(clienteData);
    }
    getClientes();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteCliente(id);
    getClientes();
  };

  const handleEdit = (cliente) => {
    console.log("Cliente a editar:", cliente._id); // Verificar si el cliente tiene un _id
    setSelectedCliente(cliente);
    setClienteData({
      name: cliente.name,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
    });
    setEditMode(true);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        textAlign: "center",
        mt: 2,
        px: { xs: 2, md: 3 },
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", mb: 2 }}
      >
        <Grid item>
          <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
            Clientes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "center" }}>Nombre</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Correo</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Teléfono</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Dirección</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <ClienteRow
                key={cliente._id}
                cliente={cliente}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar o editar cliente */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editMode ? "Editar Cliente" : "Agregar Nuevo Cliente"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                fullWidth
                name="name"
                value={clienteData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                fullWidth
                name="email"
                value={clienteData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                fullWidth
                name="phone"
                value={clienteData.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                fullWidth
                name="address"
                value={clienteData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!clienteData.name || !clienteData.email || !clienteData.phone}
              >
                {editMode ? "Guardar Cambios" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
