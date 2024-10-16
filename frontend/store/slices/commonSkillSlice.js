import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Fetch all common skills
export const fetchCommonSkills = createAsyncThunk(
  'commonSkill/fetchCommonSkills',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/commonSkills');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add a new common skill
export const addCommonSkill = createAsyncThunk(
  'commonSkill/addCommonSkill',
  async (skillData, thunkAPI) => {
    try {
      const response = await api.post('/api/commonSkills', skillData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Assign a skill to a job seeker
export const assignSkillToJobSeeker = createAsyncThunk(
  'commonSkill/assignSkillToJobSeeker',
  async ({ jobSeekerId, skillId }, thunkAPI) => {
    try {
      const response = await api.post(`/api/jobSeekerSkills/${jobSeekerId}/add-skill`, { skillId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete skill assignment
export const deleteJobSeekerSkill = createAsyncThunk(
  'commonSkill/deleteJobSeekerSkill',
  async ({ jobSeekerId, skillId }, thunkAPI) => {
    try {
      const response = await api.delete(`/api/jobSeekerSkills/${jobSeekerId}/delete-skill/${skillId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commonSkillSlice = createSlice({
  name: 'commonSkill',
  initialState: {
    commonSkills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommonSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.commonSkills = action.payload;
      })
      .addCase(fetchCommonSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCommonSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommonSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.commonSkills.push(action.payload);
      })
      .addCase(addCommonSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(assignSkillToJobSeeker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignSkillToJobSeeker.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(assignSkillToJobSeeker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteJobSeekerSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJobSeekerSkill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteJobSeekerSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default commonSkillSlice.reducer;
