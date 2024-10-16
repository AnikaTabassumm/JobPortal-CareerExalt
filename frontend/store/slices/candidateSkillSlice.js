// store/slices/candidateSkillSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

// const initialState = {
//   skills: [],
//   loading: false,
//   error: null,
// };

// Create a skill
export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async ({ skillData, userId }, thunkAPI) => {
    try {
      console.log("skillData: ",skillData);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (!token)
        throw new Error("Token is missing, user might not be authenticated.");

      const response = await api.post(
        "/api/skills",
        { skill: skillData, jobSeekerId: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data.skills;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get skills by userId
export const getSkillsByUserId = createAsyncThunk(
  "skills/getSkillsByUserId",
  async (jobSeekerId, thunkAPI) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (!token)
        throw new Error("Token is missing, user might not be authenticated.");

      const response = await api.get(`/api/skills/${jobSeekerId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log("API response:", response.data);
      return response.data.skills || [];
      // return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update a skill
export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, skill }, thunkAPI) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await api.put(
        `/api/skills/${id}`,
        { skill },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data.updatedSkill;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a skill
export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id, thunkAPI) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      await api.delete(`/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const skillSlice = createSlice({
  name: "candidateSkill",
   initialState: {
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills.push(action.payload);
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkillsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getSkillsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch skills";
      })
      .addCase(getSkillsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(
          (skill) => skill.id === action.payload.id
        );
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(
          (skill) => skill.id !== action.payload
        );
      })

      .addCase(updateSkill.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = skillSlice.actions;
export default skillSlice.reducer;
