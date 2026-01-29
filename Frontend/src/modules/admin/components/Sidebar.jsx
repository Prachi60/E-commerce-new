import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers, FaClipboardList, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggle }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <span className="brand-text">ADMIN</span>
                <button className="btn-close-sidebar d-lg-none" onClick={toggle}>
                    <FaTimes />
                </button>
            </div>

            <div className="sidebar-nav">
                <Link to="/admin/dashboard" className={`sidebar-link ${isActive('/admin/dashboard')}`} onClick={() => window.innerWidth < 992 && toggle()}>
                    <FaTachometerAlt className="sidebar-icon" /> Dashboard
                </Link>
                <Link to="/admin/products" className={`sidebar-link ${isActive('/admin/products')}`} onClick={() => window.innerWidth < 992 && toggle()}>
                    <FaBox className="sidebar-icon" /> Products
                </Link>
                <Link to="/admin/orders" className={`sidebar-link ${isActive('/admin/orders')}`} onClick={() => window.innerWidth < 992 && toggle()}>
                    <FaClipboardList className="sidebar-icon" /> Orders
                </Link>
                <Link to="/admin/users" className={`sidebar-link ${isActive('/admin/users')}`} onClick={() => window.innerWidth < 992 && toggle()}>
                    <FaUsers className="sidebar-icon" /> Users
                </Link>
            </div>

            <div className="sidebar-footer">
                <div className="sidebar-link" style={{ cursor: 'pointer' }}>
                    <FaSignOutAlt className="sidebar-icon" /> Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
