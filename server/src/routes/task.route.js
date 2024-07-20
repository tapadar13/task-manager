import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import auth from "../middleware/auth.js";
import validateInput from "../middleware/validateInput.js";
import { taskSchema } from "../utils/validationSchemas.js";

const router = express.Router();

router.use(auth);

router.post("/", validateInput(taskSchema), createTask);
router.get("/", getTasks);
router.put("/:id", validateInput(taskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
