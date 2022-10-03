import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';

const initialState = {
  User: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getUserData = createAsyncThunk(
  'user/currentUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserData(userId);
      console.log(data);
      if (!data) {
        let message = data.error || 'Something went wrong try again later';
        return rejectWithValue(message);
      }
      return data;
    } catch (error) {
      let message = error.response.data.error || 'Something went wrong try again later';
      return rejectWithValue(message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.User = payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
