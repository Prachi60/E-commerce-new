import React from 'react';
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell, FaBars } from 'react-icons/fa';

const Topbar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    return (
        <Navbar bg="white" className="shadow-sm px-3 px-lg-4" style={{ height: '70px' }}>
            <Container fluid className="p-0">
                {/* Mobile Sidebar Toggle */}
                <Button
                    variant="link"
                    className="d-lg-none me-2 text-dark p-0"
                    onClick={toggleSidebar}
                >
                    <FaBars size={24} />
                </Button>

                <div className="d-flex align-items-center ms-auto gap-3">
                    {/* Notification Icon */}
                    <div className="position-relative me-3" style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#555' }}>
                        <FaBell />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </div>

                    {/* User Dropdown */}
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center border-0 bg-transparent text-dark p-0" style={{ boxShadow: 'none' }}>
                            <FaUserCircle size={28} className="me-2 text-primary" />
                            <span className="fw-semibold d-none d-md-inline">{user?.name || 'Admin'}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow border-0 mt-2">
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
        </Navbar>
    );
};

export default Topbar;
