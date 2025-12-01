import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../utils/axiosHelper";
import { LOGIN_API } from "../../utils/constants";

const initialState = {
  login: {
    loading: false,
    data: null,
    error: null,
  },
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      payload.requestVerifyToken = import.meta.env.VITE_REQUEST_VERIFY_TOKEN;
      const response = await POST(LOGIN_API, payload);
      if (response.statusCode === 200 && response.data) {
        console.log("Login successful:", response);
        sessionStorage.setItem("user", JSON.stringify(response.data));
      } else {
        console.log("Login failed:", response);
        return rejectWithValue(response.errorMessage || "Login failed");
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.errorMessage || error.message || "Login failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetLoginState(state) {
      state.login = { loading: false, data: null, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      });
  },
});

export const { resetLoginState } = userSlice.actions;
export default userSlice.reducer;
