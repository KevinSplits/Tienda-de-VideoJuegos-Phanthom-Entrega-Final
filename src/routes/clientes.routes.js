import { Router } from "express";
import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} from "../controllers/cliente.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClienteSchema } from "../schemas/clientes.schema.js";

const router = Router();

router.get("/clientes", authRequired, getClientes);

router.post("/clientes", authRequired, validateSchema(createClienteSchema), createCliente);

router.get("/clientes/:id", authRequired, getCliente);

router.put("/clientes/:id", authRequired, updateCliente);

router.delete("/clientes/:id", authRequired, deleteCliente);

export default router;