import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Async Thunks
export const getEmployer = createAsyncThunk(
  'employer/getEmployer',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const response = await api.get(`/api/employers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch employer');
    }
  }
);

export const updateEmployer = createAsyncThunk(
  'employer/updateEmployer',
  async ({ id, employerData }, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      const response = await api.put(`/api/employers/${id}`, employerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update employer');
    }
  }
);

export const uploadCompanyLogo = createAsyncThunk(
  'employer/uploadCompanyLogo',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      // const formData = new FormData();
      // formData.append('file', file);
      const {data} = await api.post(`/api/employers/${id}/company-logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to upload company logo');
    }
  }
);

export const deleteCompanyLogo = createAsyncThunk(
  'employer/deleteCompanyLogo',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      const response = await api.delete(`/api/employers/${id}/company-logo`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to delete company logo');
    }
  }
);

export const deleteEmployer = createAsyncThunk(
  'employer/deleteEmployer',
  async (id, { rejectWithValue }) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      const response = await api.delete(`/api/employers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to delete employer');
    }
  }
);

// Slice
const employerSlice = createSlice({
  name: 'employer',
  initialState: {
    employer: null,
    companyLogo: null,
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
      .addCase(getEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
      })
      .addCase(getEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Employer
      .addCase(updateEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = action.payload;
        state.message = 'Employer updated successfully';
      })
      .addCase(updateEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Company Logo
      .addCase(uploadCompanyLogo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
        state.loading = false;
        // state.employer = { ...state.employer, companyLogo: action.payload.companyLogo };
        state.companyLogo = action.payload.companyLogo;
        state.message = 'Logo uploaded successfully';
      })
      .addCase(uploadCompanyLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Company Logo
      .addCase(deleteCompanyLogo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompanyLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.companyLogo = null;
        state.message = action.payload.message;
      })
      .addCase(deleteCompanyLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Employer
      .addCase(deleteEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.employer = null;
        state.message = action.payload.message;
      })
      .addCase(deleteEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = employerSlice.actions;

export default employerSlice.reducer;
