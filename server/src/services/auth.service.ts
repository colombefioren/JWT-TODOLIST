import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../utils/jwt';
import { prisma } from '../db';
import { JwtPayload } from '../middleware/auth';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export async function register(email: string, name: string, password: string): Promise<{ user: any, tokens: Tokens }> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already exists');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, name, passwordHash } });
  const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role, tokenVersion: user.tokenVersion };
  const tokens = { accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
  return { user, tokens };
}

export async function login(email: string, password: string): Promise<{ user: any, tokens: Tokens }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');
  const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role, tokenVersion: user.tokenVersion };
  const tokens = { accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
  return { user, tokens };
}
