import axios from "axios";

export const API_URL = "http://localhost:3000/api";

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
    console.log("Fetched tasks:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
export const createTask = (taskData) => api.post("/tasks", taskData);
export const updateTask = (taskId, taskData) =>
  api.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
