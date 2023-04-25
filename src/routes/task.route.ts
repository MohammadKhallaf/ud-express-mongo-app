import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  listAllTasks,
  updateTask,
} from "../controllers/task.controller";

const router = Router();
// C R U D

router.post("/", createTask);

router.get("/:taskId", getTask);

router.get("/", listAllTasks);

router.put("/:taskId", updateTask); // the update function takes the full updated object

router.delete("/:taskId", deleteTask);

export default router;
