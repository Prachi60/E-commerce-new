import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './components/UserNavbar';
import UserFooter from './components/UserFooter';

const UserLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <UserNavbar />
            <main className="flex-grow-1 py-3">
                <Outlet />
            </main>
            <UserFooter />
        </div>
    );
};

export default UserLayout;
