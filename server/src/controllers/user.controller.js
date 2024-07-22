import User from "../models/user.model.js";
import { generateToken } from "../utils/helper.js";
import bcrypt from "bcrypt";

// export const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.validatedData;

//     console.log("Registering user:", { username, email });

//     // Check if password is provided for non-Google registration
//     if (!password) {
//       return res.status(400).json({ error: "Password is required" });
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Hashed password:", hashedPassword);

//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();
//     const token = generateToken(user._id);
//     res.status(201).json({ user: { id: user._id, username, email }, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.validatedData;
//     console.log("Login attempt:", { email });
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     console.log("User found:", user ? "Yes" : "No");

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     console.log("Password match:", isMatch ? "Yes" : "No");

//     const token = generateToken(user._id);
//     res.json({
//       user: { id: user._id, username: user.username, email: user.email },
//       token,
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Registering user:", { username, email });

    if (!username || !email || !password) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("Hashed password:", hashedPassword);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    console.log("User saved to database");

    const token = generateToken(user._id);
    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("Searching for user with email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("User found, comparing passwords");
    console.log("Input password:", password);
    console.log("Stored hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("Password matched, generating token");
    const token = generateToken(user._id);

    console.log("Login successful");
    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
