export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`http://localhost:7000/api${endpoint}`, {
    ...options,
    headers,
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "API error");
  return data;
}
