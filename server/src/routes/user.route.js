import express from "express";
import passport from "passport";
import { register, login } from "../controllers/user.controller.js";
import validateInput from "../middleware/validateInput.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../utils/validationSchemas.js";

const router = express.Router();

router.post("/register", validateInput(userRegistrationSchema), register);
router.post("/login", validateInput(userLoginSchema), login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { user, token } = req.user;
    // redirect to actual frontend URL in production later
    res.redirect(
      `http://localhost:3000/dashboard?token=${token}&userId=${user._id}`
    );
  }
);

export default router;
