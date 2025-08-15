import { apiFetch } from "./api";

export async function getTodos() {
  return await apiFetch("/todos", { method: "GET" });
}

export async function createTodo(title: string) {
  return await apiFetch("/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function updateTodo(
  id: string,
  updates: { title?: string; completed?: boolean }
) {
  return await apiFetch(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteTodo(id: string) {
  return await apiFetch(`/todos/${id}`, { method: "DELETE" });
}
