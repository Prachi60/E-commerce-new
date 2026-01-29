import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from '../api/orderApi';

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const data = await orderApi.createOrder(orderData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const data = await orderApi.getOrders();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            const data = await orderApi.getMyOrders();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch my orders');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await orderApi.getOrderById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const data = await orderApi.updateOrderStatus(id, status);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
        }
    }
);

const initialState = {
    orders: [],
    myOrders: [],
    currentOrder: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload);
                state.myOrders.push(action.payload);
            })
            // Fetch Orders (Admin)
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch My Orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.myOrders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Order By ID
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Order Status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex(o => o._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
                if (state.currentOrder && state.currentOrder._id === action.payload._id) {
                    state.currentOrder = action.payload;
                }
            });
    },
});

export default orderSlice.reducer;
