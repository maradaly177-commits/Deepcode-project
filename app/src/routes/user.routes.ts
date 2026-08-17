import { Router } from "express";
import { register, login } from "../controllers/User.controller";
import { validateUser } from "../validators/user.validator";


const router = Router();

router.post("/register", validateUser, register);
router.post("/login", validateUser, login);

export default router;
