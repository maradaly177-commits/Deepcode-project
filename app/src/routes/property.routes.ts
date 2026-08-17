import { Router } from "express";
import { createProperty, getProperty } from "../controllers/Property.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createProperty);
router.get("/:id", getProperty);

export default router;
