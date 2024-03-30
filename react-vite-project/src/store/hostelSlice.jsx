import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosApi from '../utils/AxiosApi';
import moment from 'moment'; // Import moment for date formatting

const initialFormData = {
  hostellerId: 0,
  fullName: '',
  emailId: '',
  phoneNumber: '',
  fee: '',
  joiningDate: '',
  address: '',
  proof: '',
  reason: '',
  vacatedDate: '',
  createdById: 1,
  modifiedById: 1,
};

const initialState = {
  hostellers: {},
  currentFormData: initialFormData, // Initialize currentFormData here
  status: '',
  error: null,
};

// Your existing createAsyncThunk and other code...
export const fetchHostellers = createAsyncThunk('hostel/fetchHostellers', async (searhForm) => {
  try {
    const response = await AxiosApi("http://localhost:8061/hostel/get-hostellers", "post", searhForm);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Save Hosteller Thunk
export const saveHosteller = createAsyncThunk('hostel/saveHosteller', async (formData) => {
  try {
    const formattedData = {
      ...formData,
      joiningDate: moment(formData.joiningDate).format("L"),
    };
    const response = await AxiosApi("http://localhost:8061/hostel/save-update-hosteller", "post", formattedData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const hostelSlice = createSlice({
  name: 'hostel',
  initialState,
  reducers: {
    clearHostellersState: (state) => {
      state.hostellers = {};
      state.status = '';
      state.error = null;
    },
    updateFormData: (state, action) => {
      state.currentFormData = {
        ...state.currentFormData,
        ...action.payload,
      };
    },
    resetFormData: (state) => {
      state.currentFormData = initialFormData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostellers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHostellers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hostellers = action.payload;
      })
      .addCase(fetchHostellers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveHosteller.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveHosteller.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentFormData = initialFormData; // Reset form data after successful save
      })
      .addCase(saveHosteller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearHostellersState, updateFormData, resetFormData } = hostelSlice.actions;

export default hostelSlice.reducer;
