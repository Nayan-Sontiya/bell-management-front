import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Replace with your actual API base URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage or wherever it's stored
    const token = localStorage.getItem("token"); // Adjust if your token is stored elsewhere

    if (token) {
      // Add the token to the headers
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Utility functions for different types of requests
export const get = (url, config = {}) =>
  api.get(url, config).then((response) => response.data);
export const post = (url, body, config = {}) =>
  api.post(url, body, config).then((response) => response.data);
export const put = (url, body, config = {}) =>
  api.put(url, body, config).then((response) => response.data);
export const del = (url, config = {}) =>
  api.delete(url, config).then((response) => response.data);
