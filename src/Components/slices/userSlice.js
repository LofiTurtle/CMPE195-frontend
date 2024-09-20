// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



// Async thunk to fetch user data
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const { user } = await axiosApi.getMe(); // Assuming getMe() returns the user object
  return user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    id: null,
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    logoutUser(state) {
      state.username = '';
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.id = action.payload.id;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;


