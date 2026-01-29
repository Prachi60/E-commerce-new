import axiosInstance from './axiosInstance';

const adminApi = {
    getUsers: async () => {
        const response = await axiosInstance.get('/admin/users');
        return response.data;
    },
    toggleBlockUser: async (id) => {
        const response = await axiosInstance.put(`/admin/users/${id}/block`);
        return response.data;
    },
    getDashboardStats: async () => {
        const response = await axiosInstance.get('/admin/stats');
        return response.data;
    },
};

export default adminApi;
