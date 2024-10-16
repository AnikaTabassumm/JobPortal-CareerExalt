import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

const initialState = {
    education: [],
    loading: false,
    error: null,
};

// Thunk to create education
export const createEducation = createAsyncThunk(
    'education/createEducation',
    async ({educationData, userId}, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) throw new Error("Token is missing, user might not be authenticated.");

            const response = await api.post('/api/educations', { ...educationData, userId}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

// Async thunk for fetching experiences
export const fetchEducation = createAsyncThunk(
    "education/fetchEducation",
    async (userId) => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) throw new Error("Token is missing, user might not be authenticated.");
      
      const response = await api.get(`/api/educations/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log('API response:', response);
      return response.data.education || []; // Default to an empty array
    }
  );

// Thunk to update education
export const updateEducation = createAsyncThunk(
    'education/updateEducation',
    async ({ id, educationData }, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const response = await api.put(`/api/educations/${id}`, educationData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return response.data.updatedEducation;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunk to delete education
export const deleteEducation = createAsyncThunk(
    'education/deleteEducation',
    async (id, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            await api.delete(`/api/educations/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create slice
const candidateEducationSlice = createSlice({
    name: 'candidateEducation',
    initialState,
    reducers: {
        clearErrors(state) {
            state.error = null;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchEducation.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchEducation.fulfilled, (state, action) => {
            console.log('Fetched eduaction:', action.payload); 
            state.loading = false;
            state.education = action.payload; // Directly set the fetched experiences
          })
          .addCase(fetchEducation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
            .addCase(createEducation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEducation.fulfilled, (state, action) => {
                state.loading = false;
                state.education.push(action.payload);
            })
            .addCase(createEducation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create education';
            })
            .addCase(updateEducation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.education.findIndex((edu) => edu.id === action.payload.id);
                if (index !== -1) {
                    state.education[index] = action.payload;
                }
            })
            .addCase(updateEducation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEducation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEducation.fulfilled, (state, action) => {
                state.loading = false;
                state.education = state.education.filter((edu) => edu.id !== action.payload);
            })
            .addCase(deleteEducation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer
export default candidateEducationSlice.reducer;
