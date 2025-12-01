import axios from "axios";
import { toast } from "react-toastify";
import { isTokenExpired } from "../utils/tokenUtils";
import { REFRESH_TOKEN_API, LOGIN_API } from "./constants";

// Create an Axios instance
const axiosHelper = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let pendingQueue = [];

axiosHelper.interceptors.request.use(async (config) => {
  if (config.url.includes(LOGIN_API) || config.url.includes(REFRESH_TOKEN_API)) {
    return config;
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user?.jwtDTO?.access_token;
  const refreshToken = user?.jwtDTO?.refresh_token;

  // ✅ If access token valid → attach and go
  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  console.log("Access token expired or missing.");
  // ✅ If refreshing already → wait in queue
  if (isRefreshing) {
    return new Promise((resolve) => {
      pendingQueue.push((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }

  // ✅ Start refresh flow
  isRefreshing = true;

  try {
    const response = await refreshAxios.post(REFRESH_TOKEN_API, {
      refresh_token: refreshToken,
    });

    // ✅ Update session
    const updatedUser = {
      ...user,
      jwtDTO: {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      },
    };

    console.log("Token refreshed successfully:", updatedUser);

    sessionStorage.setItem("user", JSON.stringify(updatedUser));

    // ✅ Retry queued calls
    pendingQueue.forEach((cb) => cb(response.data.access_token));
    pendingQueue = [];

    // ✅ Attach token to original request
    config.headers.Authorization = `Bearer ${response.data.access_token}`;
    return config;
  } catch (err) {
    pendingQueue = [];
    sessionStorage.clear();
    window.location.href = "/login";
    return Promise.reject(err);
  } finally {
    isRefreshing = false;
  }
});

// GET request
export const GET = async (endpoint, params = {}) => {
  try {
    const response = await axiosHelper.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    toast.error("Something went wrong!");
    throw error;
  }
};

// POST request
export const POST = async (endpoint, payload) => {
  try {
    const response = await axiosHelper.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    toast.error(error.response?.data?.errorMessage || error.message);
    throw error;
  }
};

export default axiosHelper;
