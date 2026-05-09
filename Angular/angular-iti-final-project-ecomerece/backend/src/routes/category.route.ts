import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  add,
  deleteAll,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/category.controller";
import { uploadCategoryImage } from "../middlewares/multer.middleware";
import roleMiddleware from "../middlewares/role.middleware";
const router = Router();

router.post(
  "",
  authenticate,
  roleMiddleware(["admin"]),
  uploadCategoryImage,
  add,
);
router.get("", getAll);
router.get("/:id", getById);
router.patch(
  "/:id",
  authenticate,
  roleMiddleware(["admin"]),
  uploadCategoryImage,
  updateById,
);
router.delete("/:id", authenticate, roleMiddleware(["admin"]), deleteById);
router.delete("/", authenticate, roleMiddleware(["admin"]), deleteAll);

export default router;
