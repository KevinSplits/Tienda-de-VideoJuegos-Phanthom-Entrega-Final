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
import { useProducto } from "../context/ProductosContext";

const ProductoRow = ({ producto, onEdit, onDelete }) => {
  return (
    <tr key={producto._id} style={{ borderBottom: "1px solid #ddd" }}>
      <td style={{ padding: "10px", textAlign: "center" }}>{producto.title}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>{producto.description}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>{producto.platform}</td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        ${producto.price.toFixed(2)}
      </td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        <Button
          onClick={() => onEdit(producto)}
          color="primary"
          size="small"
          startIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Button
          onClick={() => onDelete(producto._id)}
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

export default function ProductosTable() {
  const {
    productos,
    getProductos,
    createProducto,
    deleteProducto,
    updateProducto,
  } = useProducto();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [productoData, setProductoData] = useState({
    title: "",
    description: "",
    platform: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getProductos();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!productoData.title.trim()) newErrors.title = "El nombre del juego es obligatorio.";
    if (!productoData.description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!productoData.platform.trim()) newErrors.platform = "La plataforma es obligatoria.";
    if (!productoData.price || isNaN(productoData.price) || productoData.price <= 0)
      newErrors.price = "El precio debe ser un número mayor a 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = () => {
    setEditMode(false);
    setProductoData({
      title: "",
      description: "",
      platform: "",
      price: "",
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? (value ? parseFloat(value) : "") : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editMode && selectedProducto) {
      await updateProducto(selectedProducto._id, productoData);
    } else {
      await createProducto(productoData);
    }
    getProductos();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    getProductos();
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setProductoData({
      title: producto.title,
      description: producto.description,
      platform: producto.platform,
      price: producto.price,
    });
    setEditMode(true);
    setErrors({});
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
            Productos
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
              <th style={{ padding: "10px", textAlign: "center" }}>Juego</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Descripción</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Plataforma</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Precio</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ProductoRow
                key={producto._id}
                producto={producto}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

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
            {editMode ? "Editar Producto" : "Agregar Nuevo Producto"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Juego"
                fullWidth
                name="title"
                value={productoData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                fullWidth
                name="description"
                value={productoData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Plataforma"
                fullWidth
                name="platform"
                value={productoData.platform}
                onChange={handleInputChange}
                error={!!errors.platform}
                helperText={errors.platform}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Precio"
                type="number"
                fullWidth
                name="price"
                value={productoData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
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
