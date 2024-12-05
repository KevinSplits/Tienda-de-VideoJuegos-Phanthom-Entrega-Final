import { Router } from "express";
import {
  createSale,
  deleteSale,
  getSale,
  getSales,
  updateSale,
} from "../controllers/sale.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createSaleSchema } from "../schemas/sale.schema.js";

const router = Router();

router.get("/sales", authRequired, getSales);

router.post("/sales", authRequired, validateSchema(createSaleSchema), createSale);

router.get("/sales/:id", authRequired, getSale);

router.put("/sales/:id", authRequired, updateSale);

router.delete("/sales/:id", authRequired, deleteSale);

export default router;