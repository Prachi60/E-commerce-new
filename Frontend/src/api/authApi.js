import axiosInstance from './axiosInstance';

const authApi = {
    login: async (credentials) => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData) => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    },
    getProfile: async () => {
        const response = await axiosInstance.get('/auth/profile');
        return response.data;
    },
};

export default authApi;
