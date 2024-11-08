import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import VerifyRoutes from "./verifyRoutes.js";
import ClashRoutes from "./clashRoutes.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.use("/api", AuthRoutes);
router.use("/api/clash", ClashRoutes);
router.use("/", VerifyRoutes);

export default router;
