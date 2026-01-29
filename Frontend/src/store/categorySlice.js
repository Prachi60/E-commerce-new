import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const data = await categoryApi.getCategories();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            const data = await categoryApi.createCategory(categoryData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create category');
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            await categoryApi.deleteCategory(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Category
            .addCase(createCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Delete Category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c._id !== action.payload);
            });
    },
});

export default categorySlice.reducer;
