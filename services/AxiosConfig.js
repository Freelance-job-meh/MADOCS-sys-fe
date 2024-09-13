import axios from "axios";

// Dynamically get the token from localStorage or Vuex
const getToken = () => {
  const userDetail = JSON.parse(localStorage.getItem("userdetails"));
  return userDetail ? userDetail.access_token : null;
};

// Dynamically get the refresh token from localStorage
const getRefreshToken = () => {
  const userDetail = JSON.parse(localStorage.getItem("userdetails"));
  return userDetail ? userDetail.refresh_token : null;
};

// Helper function to refresh token (placeholder for your refresh logic)
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await axios.post(`${process.env.TARGET_API_BASE_URL || "http://localhost:8000/api/"}auth/refresh`, {
      token: refreshToken
    });
    // Save new tokens to localStorage or Vuex
    localStorage.setItem("userdetails", JSON.stringify({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    }));
    return response.data.access_token;
  } catch (error) {
    console.error("Token refresh failed", error);
    return null;
  }
};

// Create an Axios instance
const clientAPI = axios.create({
  baseURL: process.env.TARGET_API_BASE_URL || "http://localhost:8000/api/",  // Use environment variables for the base URL
  timeout: 30000,  // 30-second timeout
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach token to every request
clientAPI.interceptors.request.use(
  async config => {
    let token = getToken();
    
    // If token exists, attach it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Retry request with exponential backoff
const retryRequest = (error) => {
  const config = error.config;

  // If there's no retry field, it means we haven't retried this request yet
  if (!config || !config.retry) {
    config.retry = 0;
  }

  // Limit retries to 3 attempts
  if (config.retry >= 3) {
    return Promise.reject(error);
  }

  config.retry += 1;

  // Use exponential backoff for retries
  const delay = Math.pow(2, config.retry) * 1000;
  return new Promise(resolve => setTimeout(() => resolve(clientAPI(config)), delay));
};

// Response Interceptor for error handling and token refresh logic
clientAPI.interceptors.response.use(
  response => response,  // Simply return the response if successful
  async error => {
    const { response } = error;
    
    // If unauthorized (401), attempt token refresh logic
    if (response && response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Retry the failed request with the new token
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return clientAPI(error.config);
      } else {
        // If token refresh fails, redirect to login
        window.location.href = '/login';
      }
    }

    // Retry failed request with exponential backoff
    if (error.config) {
      return retryRequest(error);
    }

    // Log any other error types
    console.error('API error:', response || error.message);
    return Promise.reject(error);
  }
);

export default clientAPI;
