import { Response } from "express";
import * as todoService from "../services/todo.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth";

export const createTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { title } = req.body;
    const todo = await todoService.createTodo(req.user!.sub, title);
    res.status(201).json({ ok: true, todo });
  }
);

export const getTodos = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const todos = await todoService.getTodos(req.user!.sub);
    res.json({ ok: true, todos });
  }
);

export const updateTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const todo = await todoService.updateTodo(id, req.user!.sub, updates);
    res.json({ ok: true, todo });
  }
);

export const deleteTodo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await todoService.deleteTodo(id, req.user!.sub);
    res.json({ ok: true });
  }
);
