import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // Base URL for your API
  withCredentials: true, // Ensures cookies are sent with requests
});

// Optional: Set up response interceptors for error handling, etc.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific errors like token expiration, etc.
    if (error.response?.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
