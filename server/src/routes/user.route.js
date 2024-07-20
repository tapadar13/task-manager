import express from "express";
import { register, login } from "../controllers/user.controller.js";
import validateInput from "../middleware/validateInput.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../utils/validationSchemas.js";

const router = express.Router();

router.post("/register", validateInput(userRegistrationSchema), register);
router.post("/login", validateInput(userLoginSchema), login);

// todo Google OAuth routes

export default router;
