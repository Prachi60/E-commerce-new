import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminApi from '../api/adminApi';

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const data = await adminApi.getUsers();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

export const toggleBlockUser = createAsyncThunk(
    'admin/toggleBlockUser',
    async (id, { rejectWithValue }) => {
        try {
            const data = await adminApi.toggleBlockUser(id);
            return data; // Assuming backend returns updated user or message
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to block/unblock user');
        }
    }
);

export const fetchDashboardStats = createAsyncThunk(
    'admin/fetchDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const data = await adminApi.getDashboardStats();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
        }
    }
);

const initialState = {
    users: [],
    stats: null,
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Toggle Block User
            .addCase(toggleBlockUser.fulfilled, (state, action) => {
                // If the API returns the updated user, update it in the list
                // If it returns a message, we might need to re-fetch or optimistically update.
                // Assuming it returns the updated user or we find it by ID.
                // Let's assume we need to find the user in state.users and toggle their status.
                // If the payload is the user object:
                if (action.payload && action.payload._id) {
                    const index = state.users.findIndex(u => u._id === action.payload._id);
                    if (index !== -1) {
                        state.users[index] = action.payload;
                    }
                }
            })
            // Fetch Stats
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
