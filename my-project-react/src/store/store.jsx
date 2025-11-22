import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import hostelReducer from './slices/hostelSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    hostel: hostelReducer,
    user: userReducer,
  },
});

export default store;