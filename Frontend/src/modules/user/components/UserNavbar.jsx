import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './UserNavbar.css';

const UserNavbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { totalQuantity } = useSelector((state) => state.cart);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <Navbar expand="lg" className="navbar-custom sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-custom">
                    E-SHOP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-4">
                        <Nav.Link as={Link} to="/" className={`nav-link-custom ${isActive('/')}`}>
                            HOME
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" className={`nav-link-custom ${isActive('/products')}`}>
                            PRODUCTS
                        </Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        <Nav.Link as={Link} to="/wishlist" className={`nav-link-custom me-3 ${isActive('/wishlist')}`}>
                            <div className="d-flex align-items-center position-relative">
                                <FaHeart className="nav-icon" /> <span className="ms-1">Wishlist</span>
                                {wishlistItems.length > 0 && (
                                    <Badge className="badge-custom">{wishlistItems.length}</Badge>
                                )}
                            </div>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/cart" className={`nav-link-custom me-3 ${isActive('/cart')}`}>
                            <div className="d-flex align-items-center position-relative">
                                <FaShoppingCart className="nav-icon" /> <span className="ms-1">Cart</span>
                                {totalQuantity > 0 && (
                                    <Badge className="badge-custom">{totalQuantity}</Badge>
                                )}
                            </div>
                        </Nav.Link>

                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className={`nav-link-custom user-profile-link me-3 ${isActive('/profile')}`}>
                                    <FaUser className="nav-icon" /> {user?.name?.split(' ')[0]}
                                </Nav.Link>
                                <Button className="btn-logout-custom" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button className="btn-auth-custom">
                                    Login / Sign Up
                                </Button>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default UserNavbar;
