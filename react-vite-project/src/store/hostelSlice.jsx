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

const initialSearchForm = {
  "pageNumber": 0,
  "pageSize": 5,
  "sortBy": "",
  "sortOrder": "",
  "columnFilters": [
  ],
  "export": false,
  "fullName": "",
  "emailId": ""
}

const initialState = {
  hostellers: {},
  currentFormData: initialFormData, // Initialize currentFormData here
  searchForm: initialSearchForm,
  totalElements: 0,
  status: '',
  error: null,
  loading: false,
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
      state.searchForm = initialSearchForm,
      state.totalElements = 0,
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
    updateSearchForm: (state, action) => {
      state.searchForm = {
        ...state.searchForm,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostellers.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchHostellers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hostellers = action.payload;
        state.loading = false;
        if(action.payload && action.payload.statusCode === 200 ){
          state.totalElements = action.payload.data.totalElements;
        }else{
          state.totalElements = 0;
        }
      })
      .addCase(fetchHostellers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
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

export const { clearHostellersState, updateFormData, resetFormData ,updateSearchForm} = hostelSlice.actions;

export default hostelSlice.reducer;
