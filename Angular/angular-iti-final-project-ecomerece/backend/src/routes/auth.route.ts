import { Router } from "express";
import { getMe, login, signup } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, getMe);

export default router;
