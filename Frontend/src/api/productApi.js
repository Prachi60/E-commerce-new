import axiosInstance from './axiosInstance';

const productApi = {
    getProducts: async (params = {}) => {
        const response = await axiosInstance.get('/products', { params });
        return response.data;
    },
    getProductById: async (id) => {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    },
    createProduct: async (productData) => {
        // For file uploads, headers usually need 'multipart/form-data', 
        // but if the backend expects JSON, use simple object.
        // Assuming backend handles JSON or FormData. 
        // If image upload is involved, usually FormData is used.
        // I'll assume JSON for now unless I see file upload logic in backend.
        const response = await axiosInstance.post('/products', productData);
        return response.data;
    },
    updateProduct: async (id, productData) => {
        const response = await axiosInstance.put(`/products/${id}`, productData);
        return response.data;
    },
    deleteProduct: async (id) => {
        const response = await axiosInstance.delete(`/products/${id}`);
        return response.data;
    },
};

export default productApi;
