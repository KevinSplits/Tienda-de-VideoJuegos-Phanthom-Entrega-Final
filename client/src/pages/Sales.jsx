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
  const [saleData, setSaleData] = useState({ customerName: "", productName: "", amount: "", unitPrice: "", total: 0});

  useEffect(() => {
    getSales();
  }, []);

  const handleOpen = () => {
    console.log("Abriendo modal...");
    setEditMode(false);
    setSaleData({ customerName: "", productName: "", amount: "", unitPrice: "", total: 0});
    setOpen(true);
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
    console.log("Datos enviados:", saleData);
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
    setSaleData({ customerName: sale.customerName, productName: sale.productName, amount: sale.amount, unitPrice: sale.unitPrice, total: sale.total});
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
            Ventas
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
                  <Button
                    onClick={() => handleEdit(sale)}
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(sale._id)}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre de Producto"
                fullWidth
                name="productName"
                value={saleData.productName}
                onChange={handleInputChange}
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
              />
            </Grid>
            <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                Total: ${saleData.total}
                            </Typography>
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
