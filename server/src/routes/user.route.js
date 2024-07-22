import express from "express";
import passport from "passport";
import { register, login } from "../controllers/user.controller.js";
import validateInput from "../middleware/validateInput.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../utils/validationSchemas.js";
import { generateToken } from "../utils/helper.js";

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
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { user, token } = req.user;
    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard?token=${token}&userId=${user._id}`
    );
  }
);

export default router;
