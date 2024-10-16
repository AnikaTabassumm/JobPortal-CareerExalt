import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const fetchAdminDetails  = createAsyncThunk(
    'admin/fetchAdminDetails',
    async (id, { rejectWithValue }) => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        console.log('Token:', token); 
        const response = await api.get(`/api/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        // Parse the experience field from LONGTEXT (string) to JSON
        const adminData = response.data;
        // jobSeekerData.experience = JSON.parse(jobSeekerData.experience || '[]'); // Use an empty array as fallback
        
        return adminData;
      } catch (error) {
        console.error('Error fetching admin:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      adminInfo: null,
      token: null,
      loading: false,
      error: null,
    },
    reducers: {
      logoutAdmin: (state) => {
        state.adminInfo = null;
        state.token = null;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch Admin Details
        .addCase(fetchAdminDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAdminDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.adminInfo = action.payload;
        })
        .addCase(fetchAdminDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { logoutAdmin } = adminSlice.actions;
  export default adminSlice.reducer;