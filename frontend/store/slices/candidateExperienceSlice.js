import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

// Define initial state
const initialState = {
  experiences: [],
  loading: false,
  error: null,
};

// Async thunk for fetching experiences
export const fetchExperiences = createAsyncThunk(
  "experiences/fetchExperiences",
  async (userId) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) throw new Error("Token is missing, user might not be authenticated.");
    
    const response = await api.get(`/api/experiences/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log('API response:', response);
    return response.data.experiences || []; // Default to an empty array
  }
);

// Async thunk for creating an experience
export const createExperience = createAsyncThunk(
  "experiences/createExperience",
  async ({ experienceData, userId }, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) throw new Error("Token is missing, user might not be authenticated.");

      const response = await api.post("/api/experiences", { ...experienceData, userId }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data.data; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Async thunk for updating an experience
export const updateExperience = createAsyncThunk(
  "experiences/updateExperience",
  async ({ id, experienceData }) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const response = await api.put(`/api/experiences/${id}`, experienceData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    return response.data.updatedExperience;
  }
);

// Async thunk for deleting an experience
export const deleteExperience = createAsyncThunk(
  "experiences/deleteExperience",
  async (id) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    await api.delete(`/api/experiences/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    return id; // return the id of the deleted experience
  }
);

// Create the slice
const candidateExperienceSlice = createSlice({
  name: "candidateExperience",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        console.log('Fetched experiences:', action.payload); 
        state.loading = false;
        state.experiences = action.payload; // Directly set the fetched experiences
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.push(action.payload); // Add new experience
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create experience";
      })
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.experiences.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload; // Update the experience
        }
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
      });
  },
});

export const { clearErrors } = candidateExperienceSlice.actions;
export default candidateExperienceSlice.reducer;
