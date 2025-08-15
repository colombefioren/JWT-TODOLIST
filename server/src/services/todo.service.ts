import { prisma } from "../db";

export async function createTodo(userId: string, title: string) {
  return await prisma.todo.create({
    data: { title, userId }
  });
}

export async function getTodos(userId: string) {
  return await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateTodo(id: string, userId: string, updates: { title?: string, completed?: boolean }) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId) throw new Error('Not authorized or todo not found');
  return await prisma.todo.update({ where: { id }, data: updates });
}

export async function deleteTodo(id: string, userId: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId) throw new Error('Not authorized or todo not found');
  return await prisma.todo.delete({ where: { id } });
}
