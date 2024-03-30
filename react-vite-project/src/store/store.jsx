import { configureStore } from '@reduxjs/toolkit';
import hostelReducer from './hostelSlice';

export default configureStore({
  reducer: {
    hostellers: hostelReducer,
  },
});
