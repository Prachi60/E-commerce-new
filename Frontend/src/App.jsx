import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './modules/user/routes/UserRoutes';
import AdminRoutes from './modules/admin/routes/AdminRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Module Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User Module Routes */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
