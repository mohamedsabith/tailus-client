import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';


const initialState = {
  post: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const timelinePosts = createAsyncThunk(
  'posts/timeline',
  async (userId, { rejectWithValue }) => {
    try { 
        
        const token = localStorage.getItem("token")
        
        const { data } = await api.getTimelinePosts(userId, token);
       
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

export const createNewPost = createAsyncThunk(
  'posts/newPost',
  async (postData,{ rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
 
        const { data } = await api.createNewPost(postData,token);

        if (!data) {
          let message = data.error || 'Something went wrong try again later';
          return rejectWithValue(message);
        }
        return data;
    } catch (error) {
      console.log(error);
      let message = error.response.data.error || 'Something went wrong try again later';
      return rejectWithValue(message);
    }
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(timelinePosts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(timelinePosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    })
    .addCase(timelinePosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
      state.post = null;
    })
    .addCase(createNewPost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createNewPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
    })
    .addCase(createNewPost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
  }
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;