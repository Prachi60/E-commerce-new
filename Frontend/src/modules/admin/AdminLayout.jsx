import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './components/Sidebar.css'; // Import styles for layout classes

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="d-flex admin-container">
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay d-lg-none"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div className="admin-main-content flex-grow-1">
                <Topbar toggleSidebar={toggleSidebar} />
                <div className="p-3 p-lg-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
