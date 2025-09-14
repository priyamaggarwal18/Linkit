import axios from "axios";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // Check if running on localhost, then use local API
    if (window.location.hostname === "localhost") {
      return "http://localhost:8080/api";
    }
  }
  // Default to production API URL
  return "https://linkit-two.vercel.app/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
