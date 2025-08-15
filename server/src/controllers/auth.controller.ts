import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const result = await authService.register(email, name, password);
  res.status(201).json({ ok: true, user: result.user, tokens: result.tokens });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ ok: true, user: result.user, tokens: result.tokens });
});
