import axiosInstance from './axiosInstance';

const orderApi = {
    createOrder: async (orderData) => {
        const response = await axiosInstance.post('/orders', orderData);
        return response.data;
    },
    getOrders: async () => {
        const response = await axiosInstance.get('/orders');
        return response.data;
    },
    getMyOrders: async () => {
        const response = await axiosInstance.get('/orders/myorders');
        return response.data;
    },
    getOrderById: async (id) => {
        const response = await axiosInstance.get(`/orders/${id}`);
        return response.data;
    },
    updateOrderStatus: async (id, status) => {
        const response = await axiosInstance.put(`/orders/${id}/status`, { status });
        return response.data;
    },
};

export default orderApi;
