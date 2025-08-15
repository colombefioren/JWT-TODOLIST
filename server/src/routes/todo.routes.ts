import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate); // all routes below require authentication
router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
