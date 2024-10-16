import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Thunks
export const fetchJobSeekerExperiences = createAsyncThunk(
  'jobSeekerExperience/fetchExperiences',
  async (jobSeekerId, thunkAPI) => {
    try {
      const response = await api.get(`/api/jobSeekerExperience/${jobSeekerId}/experiences`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addExperienceToJobSeeker = createAsyncThunk(
  'jobSeekerExperience/addExperience',
  async ({ jobSeekerId, experienceId }, thunkAPI) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.post(`/api/jobSeekerExperience/${jobSeekerId}/add-experience`, {
        experienceId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateJobSeekerExperience = createAsyncThunk(
  'jobSeekerExperience/updateExperience',
  async ({ jobSeekerId, oldExperienceId, experienceId }, thunkAPI) => {
    try {
      const response = await api.put(
        `/api/jobSeekerExperience/${jobSeekerId}/update-experience/${oldExperienceId}`,
        { experienceId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteJobSeekerExperience = createAsyncThunk(
  'jobSeekerExperience/deleteExperience',
  async ({ jobSeekerId, experienceId }, thunkAPI) => {
    try {
      const response = await api.delete(`/api/jobSeekerExperience/${jobSeekerId}/delete-experience/${experienceId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchJobSeekersByExperience = createAsyncThunk(
  'jobSeekerExperience/fetchJobSeekersByExperience',
  async (experienceId, thunkAPI) => {
    try {
      const response = await api.get(`/api/jobSeekerExperience/experience/${experienceId}/job-seekers`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const commonExperienceSlice = createSlice({
  name: 'commonExperience',
  initialState: {
    experiences: [],
    jobSeekersByExperience: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Experiences
    builder.addCase(fetchJobSeekerExperiences.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobSeekerExperiences.fulfilled, (state, action) => {
      state.loading = false;
      state.experiences = action.payload;
    });
    builder.addCase(fetchJobSeekerExperiences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add Experience
    builder.addCase(addExperienceToJobSeeker.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addExperienceToJobSeeker.fulfilled, (state, action) => {
      state.loading = false;
      state.experiences.push(action.payload);
    });
    builder.addCase(addExperienceToJobSeeker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Experience
    builder.addCase(updateJobSeekerExperience.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateJobSeekerExperience.fulfilled, (state, action) => {
      state.loading = false;
      // Find and update the relevant experience
      const index = state.experiences.findIndex((exp) => exp.experienceId === action.payload.experienceId);
      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    });
    builder.addCase(updateJobSeekerExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Experience
    builder.addCase(deleteJobSeekerExperience.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteJobSeekerExperience.fulfilled, (state, action) => {
      state.loading = false;
      // Remove the deleted experience
      state.experiences = state.experiences.filter((exp) => exp.experienceId !== action.payload.experienceId);
    });
    builder.addCase(deleteJobSeekerExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Job Seekers by Experience
    builder.addCase(fetchJobSeekersByExperience.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJobSeekersByExperience.fulfilled, (state, action) => {
      state.loading = false;
      state.jobSeekersByExperience = action.payload;
    });
    builder.addCase(fetchJobSeekersByExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default commonExperienceSlice.reducer;
