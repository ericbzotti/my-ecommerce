export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL?.toString() || "http://localhost:3001";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text}`);
  }
  return (await res.json()) as T;
}
