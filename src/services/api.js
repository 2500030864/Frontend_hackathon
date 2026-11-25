const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function apiRequest(path, options = {}) {
  if (!API_BASE) throw new Error("Backend API is not configured. Set VITE_API_BASE_URL in the frontend .env file.");
  const token = localStorage.getItem("esportsarena_api_token");
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
  return payload;
}

export const backendAuth = {
  async login(email, password) {
    const result = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    localStorage.setItem("esportsarena_api_token", result.token);
    return result;
  },
  async register(details) {
    const result = await apiRequest("/auth/register", { method: "POST", body: JSON.stringify(details) });
    localStorage.setItem("esportsarena_api_token", result.token);
    return result;
  },
  me: () => apiRequest("/auth/me"),
  logout: () => localStorage.removeItem("esportsarena_api_token")
};
