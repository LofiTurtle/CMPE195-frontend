// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/api/user');
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
});

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
        state.username = action.payload.username;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUsernameInput, clearUsername } = userSlice.actions;
export default userSlice.reducer;