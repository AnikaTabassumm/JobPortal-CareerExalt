import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Fetch jobSeeker data by ID
export const fetchJobSeeker = createAsyncThunk(
  'jobSeeker/fetchJobSeeker',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      console.log('Token:', token); 
      const response = await api.get(`/api/jobSeekers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(`Fetching job seeker with ID: ${id}`); // Log the ID
      console.log(`Fetching URL: /api/jobSeekers/${id}`); // Log the URL
      // Parse the experience field from LONGTEXT (string) to JSON
      const jobSeekerData = response.data;
      // jobSeekerData.experience = JSON.parse(jobSeekerData.experience || '[]'); // Use an empty array as fallback
      
      return jobSeekerData;
    } catch (error) {
      console.error('Error fetching job seeker:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  'jobseeker/uploadProfilePicture',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      const  {data} = await api.post(`/api/jobSeekers/${id}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Error uploading profile picture' });
    }
  }
);

export const deleteProfilePicture = createAsyncThunk(
  'jobseeker/deleteProfilePicture',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.delete(`/api/jobSeekers/${id}/profile-picture`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update jobSeeker data
// export const updateJobSeeker = createAsyncThunk(
//   'jobSeeker/updateJobSeeker',
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

//       // Convert experience field to string before sending to the server
//       const updatedData = {
//         ...formData,
//         experience: JSON.stringify(formData.experience), // Convert JSON to string
//       };

//       const response = await api.put(`/api/jobSeekers/${id}`, updatedData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("Update Response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating job seeker:", error.response.data);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Delete jobSeeker data
export const deleteJobSeeker = createAsyncThunk(
  'jobSeeker/deleteJobSeeker',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/jobSeekers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jobSeekerSlice = createSlice({
  name: 'jobSeeker',
  initialState: {
    profilePicture: null,
    jobSeeker: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetJobSeeker: (state) => {
      state.jobSeeker = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobSeeker
      .addCase(fetchJobSeeker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobSeeker.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobSeeker = action.payload;
      })
      .addCase(fetchJobSeeker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update jobSeeker
      // .addCase(updateJobSeeker.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateJobSeeker.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   console.log("Payload after update:", action.payload); 
      //   // state.jobSeeker = action.payload;
      //   if (action.payload && Array.isArray(action.payload.experience)) {
      //     state.jobSeeker.data = action.payload;
      // } else {
      //     console.error('Payload is not in expected format:', action.payload);
      //     // Handle the error case as needed
      // }
      // })
      // .addCase(updateJobSeeker.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })
      // Delete jobSeeker
      .addCase(deleteJobSeeker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJobSeeker.fulfilled, (state) => {
        state.status = 'succeeded';
        state.jobSeeker = null;
      })
      .addCase(deleteJobSeeker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profilePicture = action.payload.profilePicture;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profilePicture = null; // Clear the profile picture from the state
      })
      .addCase(deleteProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetJobSeeker } = jobSeekerSlice.actions;

export default jobSeekerSlice.reducer;
