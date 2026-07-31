import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});