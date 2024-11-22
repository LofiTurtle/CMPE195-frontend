// src/slices/userSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../Services/api'; // Adjust the path if necessary

// Thunk to fetch the current user
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const data = await api.getMe();
    return data.user;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user');
  }
});

// Thunk to update the user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ newUsername, newBio, newPassword, image }, { rejectWithValue }) => {
    try {
      const data = await api.updateUserProfile(newUsername, newBio, newPassword, image);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.error || 'Failed to update user profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: 'idle',
    error: null
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Handle updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUsernameInput, clearUsername, resetStatus } = userSlice.actions;
export default userSlice.reducer;