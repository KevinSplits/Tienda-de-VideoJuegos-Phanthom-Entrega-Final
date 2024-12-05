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
import { useSales } from "../context/SalesContext";

export default function SalesTable() {
  const {
    sales,
    getSales,
    createSale,
    deleteSale,
    updateSale,
  } = useSales();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [saleData, setSaleData] = useState({
    customerName: "",
    productName: "",
    amount: "",
    unitPrice: "",
    total: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSales();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setSaleData({
      customerName: "",
      productName: "",
      amount: "",
      unitPrice: "",
      total: 0,
    });
    setOpen(true);
  };

  const validate = () => {
    const newErrors = {};

    if (!saleData.customerName.trim()) {
      newErrors.customerName = "El nombre del cliente es obligatorio.";
    } else if (
      saleData.customerName.length < 3 ||
      saleData.customerName.length > 50
    ) {
      newErrors.customerName = "Este campo debe tener entre 3 y 50 caracteres.";
    }

    if (!saleData.productName.trim()) {
      newErrors.productName = "El nombre del producto es obligatorio.";
    } else if (
      saleData.productName.length < 3 ||
      saleData.productName.length > 100
    ) {
      newErrors.productName = "Este campo debe tener entre 3 y 100 caracteres.";
    }

    if (!saleData.amount) {
      newErrors.amount = "La cantidad es obligatoria.";
    } else if (!/^\d+$/.test(saleData.amount) || parseInt(saleData.amount, 10) <= 0) {
      newErrors.amount = "Debe ser un número entero positivo.";
    }

    if (!saleData.unitPrice) {
      newErrors.unitPrice = "El precio unitario es obligatorio.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(saleData.unitPrice)) {
      newErrors.unitPrice = "Debe ser un número válido con hasta dos decimales.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSaleData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: name === "amount" || name === "unitPrice" ? parseFloat(value) || 0 : value,
      };
      if (name === "amount" || name === "unitPrice") {
        updatedData.total = updatedData.amount * updatedData.unitPrice;
      }
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (editMode && selectedSale) {
      await updateSale(selectedSale._id, saleData);
    } else {
      await createSale(saleData);
    }
    getSales();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteSale(id);
    getSales();
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setSaleData({
      customerName: sale.customerName,
      productName: sale.productName,
      amount: sale.amount,
      unitPrice: sale.unitPrice,
      total: sale.total,
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
      <Grid container justifyContent="space-between" alignItems="center" sx={{ width: "100%", mb: 2 }}>
        <Grid item>
          <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
            Ventas
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
            Agregar
          </Button>
        </Grid>
      </Grid>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "center" }}>Nombre del Cliente</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Nombre del Producto</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Cantidad</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Precio Unitario</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Total</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>{sale.customerName}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{sale.productName}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{sale.amount}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{sale.unitPrice}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{sale.total}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Button onClick={() => handleEdit(sale)} color="primary" size="small" startIcon={<EditIcon />}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(sale._id)} color="secondary" size="small" startIcon={<DeleteIcon />}>
                    Eliminar
                  </Button>
                </td>
              </tr>
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
            {editMode ? "Editar Venta" : "Agregar Nueva Venta"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre del Cliente"
                fullWidth
                name="customerName"
                value={saleData.customerName}
                onChange={handleInputChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre del Producto"
                fullWidth
                name="productName"
                value={saleData.productName}
                onChange={handleInputChange}
                error={!!errors.productName}
                helperText={errors.productName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cantidad"
                fullWidth
                name="amount"
                value={saleData.amount}
                onChange={handleInputChange}
                type="number"
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Precio Unitario"
                fullWidth
                name="unitPrice"
                value={saleData.unitPrice}
                onChange={handleInputChange}
                type="number"
                error={!!errors.unitPrice}
                helperText={errors.unitPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total"
                fullWidth
                value={saleData.total.toFixed(2)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                {editMode ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
