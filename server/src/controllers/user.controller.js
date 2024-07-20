import User from "../models/user.model.js";
import { generateToken } from "../utils/helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.validatedData;
    const user = new User({ username, email, password });
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
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.json({ user: { id: user._id, username: user.username, email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Todo implement Google login
