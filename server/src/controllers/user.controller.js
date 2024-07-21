import User from "../models/user.model.js";
import { generateToken } from "../utils/helper.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.validatedData;

    // Check if password is provided for non-Google registration
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
