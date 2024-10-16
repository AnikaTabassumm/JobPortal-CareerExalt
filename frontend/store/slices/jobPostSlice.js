import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Async Thunks
export const createJobPost = createAsyncThunk(
  'jobPost/createJobPost',
  async (jobPostData, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.post('/api/jobPosts/createJob', jobPostData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create job post');
    }
  }
);

export const getAllJobPosts = createAsyncThunk(
  'jobPost/getAllJobPosts',
  async (_, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.get('/api/jobPosts/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch job posts');
    }
  }
);

export const getJobPostById = createAsyncThunk(
  'jobPost/getJobPostById',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.get(`/api/jobPosts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log('Fetched job post: ', response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch job post');
    }
  }
);

export const getJobPostsByEmployer = createAsyncThunk(
  'jobPost/getJobPostsByEmployer',
  async (employerId, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.get(`/api/jobPosts/employer/${employerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch job posts by employer');
    }
  }
);

export const updateJobPost = createAsyncThunk(
  'jobPost/updateJobPost',
  async ({ id, jobPostData }, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.put(`/api/jobPosts/${id}`, jobPostData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in updateJobPost thunk:', error);
      return rejectWithValue(error.response.data.message || 'Failed to update job post');
    }
  }
);

export const deleteJobPost = createAsyncThunk(
  'jobPost/deleteJobPost',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.delete(`/api/jobPosts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to delete job post');
    }
  }
);

// Slice
const jobPostSlice = createSlice({
  name: 'jobPost',
  initialState: {
    jobPosts: [],
    jobPost: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPosts.push(action.payload);
        state.message = 'Job post created successfully';
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Job Posts
      .addCase(getAllJobPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPosts = action.payload;
      })
      .addCase(getAllJobPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Job Post By ID
      .addCase(getJobPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPost = action.payload; // Store the retrieved job post
        state.error = null; // Clear previous errors
      })
      .addCase(getJobPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Job Posts By Employer
      .addCase(getJobPostsByEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobPostsByEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPosts = action.payload; // Update the jobPosts list
      })
      .addCase(getJobPostsByEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Job Post
      .addCase(updateJobPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJobPost.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated job post
        const index = state.jobPosts.findIndex((jobPost) => jobPost.id === action.payload.id);
        if (index !== -1) {
          state.jobPosts[index] = action.payload; // Update the existing job post
        }
        state.message = 'Job post updated successfully';
      })
      .addCase(updateJobPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Job Post
      .addCase(deleteJobPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJobPost.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPosts = state.jobPosts.filter((jobPost) => jobPost.id !== action.payload.id); // Remove the deleted job post
        state.message = 'Job post deleted successfully';
      })
      .addCase(deleteJobPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = jobPostSlice.actions;
export default jobPostSlice.reducer;