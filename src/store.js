// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Components/slices/userSlice';  // Import the user slice

const store = configureStore({
  reducer: {
    user: userReducer,  // Add user reducer to the store
  },
});

export default store;
