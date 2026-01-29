import axiosInstance from './axiosInstance';

const categoryApi = {
    getCategories: async () => {
        const response = await axiosInstance.get('/categories');
        return response.data;
    },
    createCategory: async (categoryData) => {
        const response = await axiosInstance.post('/categories', categoryData);
        return response.data;
    },
    deleteCategory: async (id) => {
        const response = await axiosInstance.delete(`/categories/${id}`);
        return response.data;
    },
};

export default categoryApi;
