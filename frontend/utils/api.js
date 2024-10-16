import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Point to backend
});

// Response interceptor to handle token expiration
// api.interceptors.response.use(
//   (response) => {
//     // If the response is successful, just return the response
//     return response;
//   },
//   (error) => {
//     // Check if the response status indicates token expiration
//     if (error.response && error.response.status === 401) {
//       const errorMessage = error.response.data.message || '';
//       const errorCode = error.response.data.code || '';

//       if (errorCode === 'TOKEN_EXPIRED' || errorMessage === 'Token expired') {
//         // Clear token and user info from localStorage
//         localStorage.removeItem('token');
//         localStorage.removeItem('userInfo');

//         // Optionally, redirect to the login page
//         window.location.href = '/login';

//         // Reject the promise with a custom error message
//         return Promise.reject(new Error('Session expired. Please log in again.'));
//       }
//     }

//     // If the error is not related to token expiration, reject the promise with the original error
//     return Promise.reject(error);
//   }
// );

export default api;
