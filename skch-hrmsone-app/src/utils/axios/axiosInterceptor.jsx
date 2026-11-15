import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInterceptor.interceptors.request.use(
  (config) => {
    // Add request-specific headers if required
    config.headers.set("X-Client", "React");
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize errors centrally
    const normalizedError = {
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong",

      status: error.response?.status ?? null,
      data: error.response?.data ?? null,
      code: error.code ?? null,

      isNetworkError: !error.response && !error.request,
      isCanceled: axios.isCancel(error),
    };

    // Do not swallow the original error
    return Promise.reject(normalizedError);
  },
);

export default axiosInterceptor;
