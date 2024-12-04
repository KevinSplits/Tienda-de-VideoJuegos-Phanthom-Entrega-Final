import { useState, useEffect } from "react";
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
import { useSuppliers } from "../context/SuppliersContext";

export default function SuppliersTable() {
  const {
    suppliers,
    getSuppliers,
    createSupplier,
    deleteSupplier,
    updateSupplier,
  } = useSuppliers();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierData, setSupplierData] = useState({ companyName: "", contactName: "", phoneNumber: "", email: "", country: "" });

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setSupplierData({ companyName: "", contactName: "", phoneNumber: "", email: "", country: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (editMode && selectedSupplier) {
      await updateSupplier(selectedSupplier._id, supplierData);
    } else {
      await createSupplier(supplierData);
    }
    getSuppliers();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    getSuppliers();
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierData({ companyName: supplier.companyName, contactName: supplier.contactName, phoneNumber: supplier.phoneNumber, email: supplier.email, country: supplier.country });
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
            Proveedores
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
              <th style={{ padding: "10px", textAlign: "center" }}>Nombre de la Empresa</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Nombre del contacto</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Número de teléfono</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Correo Electrónico</th>
              <th style={{ padding: "10px", textAlign: "center" }}>País</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>{supplier.companyName}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{supplier.contactName}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{supplier.phoneNumber}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{supplier.email}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{supplier.country}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Button
                    onClick={() => handleEdit(supplier)}
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(supplier._id)}
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar o editar tarea */}
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
            {editMode ? "Editar Proveedor" : "Agregar Nueva Proveedor"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre de la Empresa"
                fullWidth
                name="companyName"
                value={supplierData.companyName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre del Contacto"
                fullWidth
                name="contactName"
                value={supplierData.contactName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número de Teléfono"
                fullWidth
                name="phoneNumber"
                value={supplierData.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo Electrónico"
                fullWidth
                name="email"
                value={supplierData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="País"
                fullWidth
                name="country"
                value={supplierData.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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
