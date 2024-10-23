import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import VerifyRoutes from "./verifyRoutes.js";
const router = Router();

router.use("/api", AuthRoutes);
router.use("/", VerifyRoutes);

export default router;
