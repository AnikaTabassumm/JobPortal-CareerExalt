import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

const initialState = {
    applications: [],
    loading: false,
    error: null,
};

// Async thunk to create a job application
export const createJobApplication = createAsyncThunk(
    'jobApplication/create',
    async ({ jobPostId, jobSeekerId, resume, coverLetter }, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
          const applicationData = new FormData();
          applicationData.append('resume', resume);
          applicationData.append('coverLetter', coverLetter);
          applicationData.append('jobSeekerId', jobSeekerId);
    
          const response = await api.post(`/api/jobApplications/jobPosts/${jobPostId}`, applicationData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        //   'Content-Type': 'multipart/form-data',
        });
        return response.data; // Return the created application
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const updateJobApplicationStatus = createAsyncThunk(
    'jobApplication/updateStatus',
    async ({ applicationId, status }, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            const response = await api.put(`/api/jobApplications/${applicationId}/status`, 
            { status }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            return response.data.jobApplication; // Return the updated application
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

  export const fetchJobApplicationsByJobSeekerId = createAsyncThunk(
    'jobApplication/fetchByJobSeekerId',
    async (jobSeekerId) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        const response = await api.get(`/api/jobApplications/job-seeker/${jobSeekerId}`,{
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          //   'Content-Type': 'multipart/form-data',
          });
        return response.data;
    }
);
  

// Async thunk to fetch job applications by job post ID
export const fetchJobApplicationsByJobPostId = createAsyncThunk(
    'jobApplication/fetchByJobPostId',
    async (jobPostId, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            const response = await api.get(`/api/jobApplications/jobPosts/${jobPostId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return response.data; // Return the list of applications
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Async thunk to delete a job application
export const deleteJobApplication = createAsyncThunk(
    'jobApplication/delete',
    async (applicationId, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            await api.delete(`/api/jobApplications/${applicationId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return applicationId; // Return the ID of the deleted application
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Create the job application slice
const jobApplicationSlice = createSlice({
    name: 'jobApplication',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create job application
            .addCase(createJobApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJobApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.applications.push(action.payload); // Add the new application to the state
            })
            .addCase(createJobApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch job applications by job post ID
            .addCase(fetchJobApplicationsByJobPostId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobApplicationsByJobPostId.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload; // Set the fetched applications in the state
            })
            .addCase(fetchJobApplicationsByJobPostId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchJobApplicationsByJobSeekerId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobApplicationsByJobSeekerId.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchJobApplicationsByJobSeekerId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete job application
            .addCase(deleteJobApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJobApplication.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted application from the state
                state.applications = state.applications.filter(app => app.id !== action.payload);
            })
            .addCase(deleteJobApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateJobApplicationStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateJobApplicationStatus.fulfilled, (state, action) => {
                state.loading = false;
                // Find the application in the state and update its status
                const index = state.applications.findIndex(app => app.id === action.payload.id);
                if (index !== -1) {
                    state.applications[index] = action.payload;
                }
            })
            .addCase(updateJobApplicationStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the async thunks
// export { createJobApplication, fetchJobApplicationsByJobPostId, deleteJobApplication };

// Export the reducer
export default jobApplicationSlice.reducer;
