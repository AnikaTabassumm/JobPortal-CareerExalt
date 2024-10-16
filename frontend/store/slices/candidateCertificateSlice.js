import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Define initial state
const initialState = {
    certificates: [],
    loading: false,
    error: null,
};

// Async thunk for fetching certificates
export const fetchCertificates = createAsyncThunk(
    'certificates/fetchCertificates',
    async (userId) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) throw new Error("Token is missing, user might not be authenticated.");

        const response = await api.get(`/api/certificates/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          console.log('API response:', response);
        return response.data.certificate || [];
    }
);

// Async thunk for creating a certificate
export const createCertificate = createAsyncThunk(
    'certificates/createCertificate',
    async ({certificateData, userId}, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) throw new Error("Token is missing, user might not be authenticated.");

            const response = await api.post('/api/certificates', { ...certificateData, userId}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

// Async thunk for updating a certificate
export const updateCertificate = createAsyncThunk(
    'certificates/updateCertificate',
    async ({ id, certificateData }, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const response = await api.put(`/api/certificates/${id}`, certificateData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return response.data.updatedCertificate;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting a certificate
export const deleteCertificate = createAsyncThunk(
    'certificates/deleteCertificate',
    async (id, { rejectWithValue }) => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            await api.delete(`/api/certificates/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create the slice
const candidateCertificateSlice = createSlice({
    name: 'candidateCertificate',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCertificates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCertificates.fulfilled, (state, action) => {
                state.loading = false;
                state.certificates = action.payload;
            })
            .addCase(fetchCertificates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCertificate.fulfilled, (state, action) => {
                state.loading = false;
                state.certificates.push(action.payload);
            })
            .addCase(createCertificate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCertificate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to create';
            })
            .addCase(updateCertificate.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.certificates.findIndex(cert => cert.id === action.payload.id);
                if (index !== -1) {
                    state.certificates[index] = action.payload;
                }
            })
            .addCase(deleteCertificate.fulfilled, (state, action) => {
                state.loading = false;
                state.certificates = state.certificates.filter(cert => cert.id !== action.payload);
            });
    },
});

// Export actions and reducer
export const { clearErrors } = candidateCertificateSlice.actions;
export default candidateCertificateSlice.reducer;
