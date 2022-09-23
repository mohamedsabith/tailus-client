import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  active: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.signUpUserApi(userData);

      if (!response.data) {
        let message =
          response.data.error || "Something went wrong try again later";
        return rejectWithValue(message);
      }

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      let message =
        error.response.data.error || "Something went wrong try again later";
      return rejectWithValue(message);
    }
  }
);

// User Registration with google
export const googleSignup = createAsyncThunk(
  "auth/googleSignup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.googleSignupApi(data);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      let message =
        error.response.data.error || "Something went wrong try again later";
      return rejectWithValue(message);
    }
  }
);

// Verify Otp
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.otpVerificationApi(data);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      let message =
        error.response.data.error || "Something went wrong try again later";
      return rejectWithValue(message);
    }
  }
);

// User Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.signInUserApi(userData);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      let message =
        error.response.data.error || "Something went wrong try again later";
      return rejectWithValue(message);
    }
  }
);

// User Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPasssword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.forgetPasswordApi(data);

      return response.data;
    } catch (error) {
      let message =
        error.response.data.error || "Something went wrong try again later";
      return rejectWithValue(message);
    }
  }
);

// User Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPasssword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.resetPasswordApi(data);

      return response.data;
    } catch (error) {
      let message =
        error.response.data.error || "Something went wrong try again later";
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.active = true;
        state.user = payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        state.active = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(googleSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        state.active = true;
      })
      .addCase(googleSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
