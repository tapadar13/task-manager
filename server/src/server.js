import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import passport from "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle pre-flight requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(helmet());
app.use(passport.initialize());

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Management API" });
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
