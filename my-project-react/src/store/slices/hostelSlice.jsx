import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../utils/axiosHelper";

const SAVE_API = "/hostel/save-update-hosteller";

export const addHosteller = createAsyncThunk(
  "hostel/addHosteller",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await POST(SAVE_API, payload);
      // Ensure the response has data
      return response?.data || {};
    } catch (error) {
      // More robust error handling
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to add hosteller";
      return rejectWithValue(message);
    }
  }
);

const hostelSlice = createSlice({
  name: "hostel",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    resetHostellerState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHosteller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHosteller.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addHosteller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetHostellerState } = hostelSlice.actions;
export default hostelSlice.reducer;
