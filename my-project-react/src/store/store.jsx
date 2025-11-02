import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import hostelReducer from './slices/hostelSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    hostel: hostelReducer,
  },
});

export default store;