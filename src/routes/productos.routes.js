import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
  updateProducto,
} from "../controllers/producto.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductoSchema } from "../schemas/productos.schema.js";

const router = Router();

router.get("/productos", authRequired, getProductos);

router.post("/productos", authRequired, validateSchema(createProductoSchema), createProducto);

router.get("/productos/:id", authRequired, getProducto);

router.put("/productos/:id", authRequired, updateProducto);

router.delete("/productos/:id", authRequired, deleteProducto);

export default router;