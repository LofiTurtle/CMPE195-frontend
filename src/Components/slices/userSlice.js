import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '/src/Services/api.js';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const data = await api.getMe();
    return data.user;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user');
  }
});

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ username, email }) => {
    try {
      const updatedUser = await api.updateUserProfile({ username, email });
      return updatedUser;
    } catch (error) {
      throw new Error(error.message || 'Failed to update user profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    status: 'idle',
    error: null,
  },
  reducers: {    
    setUsernameInput: (state, action) => {
      
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload.id;
        state.username = action.payload.username; // Access the username from the user object
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUsernameInput, clearUsername } = userSlice.actions;
export default userSlice.reducer; 