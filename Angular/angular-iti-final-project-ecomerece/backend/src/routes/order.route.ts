import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  create,
  getMyOrders,
  getAll,
  cancel,
} from "../controllers/order.controller";
import roleMiddleware from "../middlewares/role.middleware";
const router = Router();

router.post("", authenticate, create);
router.get("/my-orders", authenticate, getMyOrders);
router.get("", authenticate, roleMiddleware(["admin"]), getAll);
router.delete("/:id", authenticate, cancel);

export default router;
