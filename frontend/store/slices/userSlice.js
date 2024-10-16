import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/register", userData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login", loginData);
      return response.data; 
    } catch (error) {
      const errorMessage =
        error.response?.status === 401 && error.response?.data?.message === "Invalid password"
          ? "The password you entered is incorrect. Please try again."
          : error.response?.data?.message || "An error occurred. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  'admin/register',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/admin/adminreg', adminData);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      return rejectWithValue(errorMsg);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/verify-otp", otpData, {
        withCredentials: true,
      });

      if (!response.data.token) {
        throw new Error("Token not found in response");
      }
      const token = response.data.token; // Ensure you get the token
      document.cookie = `token=${token}; path=/;`;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendResetPasswordEmail = createAsyncThunk(
  "user/sendResetPasswordEmail",
  async (reqData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/users/reset-password-request",
        reqData
      );
      return response.data; // OTP sent for password reset
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (newPassData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/reset-password", newPassData);
      return response.data; // Password reset success message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      console.log('Token:', token);

      // Send a POST request to logout
      const response = await api.post('/api/users/logout', {}, { // Change the path if needed
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Check if the response status indicates success (status code 2xx)
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to log out');
      }

      return; // Successful logout
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const initialState = {
  token: null,
  // other initial state...
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    isAuthenticated: false,
    otpSent: false,
    otpVerified: false,
    loading: false,
    error: null,
    resetPasswordStatus: null,
    resetPasswordError: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpVerified = false;
      state.otpSent = false;
      if (typeof window !== "undefined") {
        document.cookie = "token=; Max-Age=0; path=/;"; // Clear the JWT cookie
      }
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true; // OTP sent upon registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true; // OTP sent upon login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.otpVerified = true; // OTP verified, user is authenticated
      
        // Check if action.payload is defined
        if (action.payload) {
          state.userInfo = action.payload.userInfo; // Save user data after OTP verification
          // Assuming token is returned separately in action.payload.token
          if (action.payload.token) {
            state.token = action.payload.token; // Store the token in the state
            document.cookie = `token=${action.payload.token}; path=/;`; // Set the cookie
            localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo)); // Save user info to local storage
          }
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP Verification failed";
      })
      .addCase(sendResetPasswordEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendResetPasswordEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true; // OTP sent for password reset
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset email";
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = "succeeded";
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.resetPasswordError = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null; // Clear user info on successful logout
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save the error message
      })
      // Admin Registration
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload; // Store admin info if needed
        state.error = null; // Clear any previous errors
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message from rejected thunk
      });
      
  },
});

export const { logout, setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
