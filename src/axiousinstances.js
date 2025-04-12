import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Flask backend URL
  timeout: 5000, // Timeout after 5 seconds
});

export default axiosInstance;