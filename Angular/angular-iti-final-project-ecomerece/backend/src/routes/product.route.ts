import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  add,
  deleteAll,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/product.controller";
import { uploadProductImages } from "../middlewares/multer.middleware";
import roleMiddleware from "../middlewares/role.middleware";
const router = Router();

router.post(
  "",
  authenticate,
  roleMiddleware(["admin"]),
  uploadProductImages,
  add,
);
router.get("", getAll);
router.get("/:id", getById);
router.put(
  "/:id",
  authenticate,
  roleMiddleware(["admin"]),
  uploadProductImages,
  updateById,
);
router.delete("/", authenticate, roleMiddleware(["admin"]), deleteAll);
router.delete("/:id", authenticate, roleMiddleware(["admin"]), deleteById);

export default router;
