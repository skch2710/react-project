import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST } from "../../utils/axiosHelper";
import { HOSTELLER_SAVE_OR_UPDATE_API } from "../../utils/constants";

export const saveOrUpdateHosteller = createAsyncThunk(
  "hostel/saveOrUpdateHosteller",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await POST(HOSTELLER_SAVE_OR_UPDATE_API, payload);
      return response?.data || {};
    } catch (error) {
      console.error("API error in Redux :", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to save or update hosteller";
      return rejectWithValue(message);
      throw error;
    }
  }
);

const hostelSlice = createSlice({
  name: "hostel",
  initialState: {
    loading: false,
    gridLoading: false,
    data: null,
    error: null,

  },
  reducers: {
    resetHostellerState: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
    setGridLoading: (state, action) => {
      state.gridLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveOrUpdateHosteller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOrUpdateHosteller.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveOrUpdateHosteller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetHostellerState, setGridLoading } = hostelSlice.actions;
export default hostelSlice.reducer;
