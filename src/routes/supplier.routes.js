import { Router } from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplier.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createSupplierSchema } from "../schemas/supplier.schema.js";

const router = Router();

router.get("/suppliers", authRequired, getSuppliers);

router.post("/suppliers", authRequired, validateSchema(createSupplierSchema), createSupplier);

router.get("/suppliers/:id", authRequired, getSupplier);

router.put("/suppliers/:id", authRequired, updateSupplier);

router.delete("/suppliers/:id", authRequired, deleteSupplier);

export default router;