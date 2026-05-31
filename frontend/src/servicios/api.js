import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_USERS_API_URL || "http://127.0.0.1:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((configuracion) => {
  const token = localStorage.getItem("psicoconecta_token");
  if (token) {
    configuracion.headers.Authorization = `Bearer ${token}`;
  }
  return configuracion;
});

export default api;
