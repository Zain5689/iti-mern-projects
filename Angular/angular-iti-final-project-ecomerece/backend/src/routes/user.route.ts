import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { deleteById, getAll } from "../controllers/user.controller";
import roleMiddleware from "../middlewares/role.middleware";
const router = Router();

router.get("", authenticate, roleMiddleware(["admin"]), getAll);
router.delete("/:id", authenticate, deleteById);

export default router;
