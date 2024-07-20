import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to the databse
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Management API" });
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
