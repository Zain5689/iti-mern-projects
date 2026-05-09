import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  add,
  update,
  clear,
  getAll,
  removeItem,
} from "../controllers/cart.controller";
const router = Router();

router.post("", authenticate, add);
router.get("", authenticate, getAll);
router.patch("/:id", authenticate, update);
router.delete("/:id", authenticate, removeItem);
router.delete("/", authenticate, clear);

export default router;
