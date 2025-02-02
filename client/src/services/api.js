import axios from "axios";

export const API_URL = "https://task-manager-196x.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response;
  } catch (error) {
    throw error;
  }
};
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (taskId, taskData) =>
  api.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

// Add a test endpoint to check CORS
export const testCORS = () => api.get("/");

export default api;
