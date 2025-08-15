import { apiFetch } from "./api";

export async function register(email: string, name: string, password: string) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, name, password }),
  });

  localStorage.setItem("accessToken", data.tokens.accessToken);
  localStorage.setItem("refreshToken", data.tokens.refreshToken);

  return data.user;
}

export async function login(email: string, password: string) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("accessToken", data.tokens.accessToken);
  localStorage.setItem("refreshToken", data.tokens.refreshToken);

  return data.user;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
