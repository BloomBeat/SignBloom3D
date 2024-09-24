import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://your-production-domain.com/api/" // Production URL
      : "http://localhost:5173/api/", // Development URL (points to your Express server)
  timeout: 5000, // Increase timeout to give more room for slow connections
  headers: {
    "Content-Type": "application/json", // Adjust the content type as needed
    
    // Add any other default headers here
  },
});

// Optional: You can set up interceptors for handling errors or adding tokens
// api.interceptors.request.use(
//   (config) => {
//     // Modify config before the request is sent (e.g., add authorization tokens)
//     // const token = localStorage.getItem("authToken");
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally, e.g., redirect to login on 401
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default api;
