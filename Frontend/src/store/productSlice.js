import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../api/productApi';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            const data = await productApi.getProducts(params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await productApi.getProductById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const data = await productApi.createProduct(productData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const data = await productApi.updateProduct(id, productData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await productApi.deleteProduct(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

const initialState = {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
    page: 1,
    pages: 1,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products || action.payload; // Adjust based on API response structure
                state.page = action.payload.page || 1;
                state.pages = action.payload.pages || 1;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Product By ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.currentProduct = action.payload;
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p._id !== action.payload);
            });
    },
});

export default productSlice.reducer;
