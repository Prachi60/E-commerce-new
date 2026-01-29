import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/Dashboard';
import ProductManagement from '../pages/ProductManagement';
import OrderManagement from '../pages/OrderManagement';
import UserManagement from '../pages/UserManagement';
import ProtectedRoute from '../../../shared/components/ProtectedRoute';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/users" element={<UserManagement />} />
                    {/* Default redirect to dashboard */}
                    <Route path="/" element={<Dashboard />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
