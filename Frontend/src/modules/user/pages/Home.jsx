import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { addToWishlist } from '../../../store/wishlistSlice';
import { FaShippingFast, FaHeadset, FaUndo, FaShieldAlt, FaGift, FaShoppingCart, FaHeart } from 'react-icons/fa';
import accessoriesImg from '../../../assets/accessories-category.png';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items: cartItems } = useSelector((state) => state.cart);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    const categories = [
        { id: 1, name: 'Women Fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
        { id: 2, name: 'Men Collection', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
        { id: 3, name: 'Accessories', img: accessoriesImg },
    ];

    const trendingProducts = [
        { id: 1, name: 'Pastel Hoodie', price: 49.99, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', badge: 'New' },
        { id: 2, name: 'Urban Jacket', price: 129.99, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', badge: 'Hot' },
        { id: 3, name: 'Classic Sneakers', price: 89.99, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', badge: 'Sale' },
        { id: 4, name: 'Silk Scarf', price: 29.99, img: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', badge: '' },
    ];

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        alert(`${product.name} added to cart!`);
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
        alert(`${product.name} added to wishlist!`);
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <Container>
                    <Row>
                        <Col lg={6} md={8}>
                            <div className="hero-content">
                                <span className="hero-badge">New Arrival</span>
                                <h1 className="hero-title">Discover Your <br /> <span>Unique Style</span></h1>
                                <p className="hero-text">
                                    Explore our premium collection of designer clothing and accessories.
                                    Elevate your wardrobe with the latest trends tailored just for you.
                                </p>
                                <Link to="/products">
                                    <button className="btn-hero">Shop Collection</button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Authenticated User Banner */}
            {isAuthenticated && (
                <section className="user-welcome-banner mt-5 mx-3">
                    <Container fluid>
                        <div className="welcome-banner-content">
                            <div className="welcome-text">
                                <h2>Welcome back, {user?.name?.split(' ')[0]}! <span role="img" aria-label="wave">👋</span></h2>
                                <p>We missed you! Here is an exclusive offer just for you.</p>
                            </div>
                            <div className="welcome-offer">
                                <div className="offer-badge">
                                    <FaGift className="me-2" />
                                    <span>FLAT 20% OFF</span>
                                </div>
                                <p className="offer-code">Use Code: <strong>WELCOME20</strong></p>
                            </div>
                        </div>
                    </Container>
                </section>
            )}

            {/* Features Info Section */}
            <section className="features-section mt-5 mb-5 mx-3">
                <Container>
                    <Row>
                        <Col md={3} xs={6} className="mb-4">
                            <div className="feature-box">
                                <div className="feature-icon-wrapper">
                                    <FaShippingFast />
                                </div>
                                <h5>Free Shipping</h5>
                                <p className="text-muted small">On all orders over $50</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6} className="mb-4">
                            <div className="feature-box">
                                <div className="feature-icon-wrapper">
                                    <FaUndo />
                                </div>
                                <h5>Easy Returns</h5>
                                <p className="text-muted small">30 Days money back</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6} className="mb-4">
                            <div className="feature-box">
                                <div className="feature-icon-wrapper">
                                    <FaHeadset />
                                </div>
                                <h5>24/7 Support</h5>
                                <p className="text-muted small">Dedicated support</p>
                            </div>
                        </Col>
                        <Col md={3} xs={6} className="mb-4">
                            <div className="feature-box">
                                <div className="feature-icon-wrapper">
                                    <FaShieldAlt />
                                </div>
                                <h5>Secure Payment</h5>
                                <p className="text-muted small">100% secure checkout</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Shop by Category */}
            <section className="categories-section">
                <Container>
                    <h2 className="section-title">Shop by Category</h2>
                    <Row>
                        {categories.map(cat => (
                            <Col md={4} key={cat.id} className="mb-4">
                                <div className="category-card">
                                    <img src={cat.img} alt={cat.name} className="category-img" />
                                    <div className="category-overlay">
                                        <h3>{cat.name}</h3>
                                        <Link to="/products" className="text-white text-decoration-none">Explore &rarr;</Link>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Trending Section */}
            <section className="trending-section py-5 bg-white">
                <Container>
                    <h2 className="section-title">Trending Now</h2>
                    <Row>
                        {trendingProducts.map(product => (
                            <Col lg={3} md={6} xs={12} key={product.id} className="mb-4">
                                <Card className="product-card-home h-100 shadow-sm border-0">
                                    <div className="product-img-wrapper">
                                        <img src={product.img} alt={product.name} className="product-img-home" />
                                        {product.badge && <span className="product-badge">{product.badge}</span>}
                                        <div className="product-actions-home">
                                            <button
                                                className="action-btn-home"
                                                style={{ color: cartItems.find(i => i.id === product.id) ? '#e91e63' : 'inherit' }}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                <FaShoppingCart />
                                            </button>
                                            <button
                                                className="action-btn-home"
                                                style={{ color: wishlistItems.find(i => i.id === product.id) ? '#e91e63' : 'inherit' }}
                                                onClick={() => handleAddToWishlist(product)}
                                            >
                                                <FaHeart />
                                            </button>
                                        </div>
                                    </div>
                                    <Card.Body className="text-center">
                                        <Card.Title className="h6 fw-bold">{product.name}</Card.Title>
                                        <Card.Text className="fw-bold text-danger">₹{product.price}</Card.Text>
                                        <Link to={`/products/${product.id}`}>
                                            <Button variant="outline-dark" size="sm" className="w-100 rounded-pill mt-2">View Details</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Newsletter */}
            <section className="py-5 text-center text-white" style={{ background: 'linear-gradient(45deg, #ff4b2b, #ff416c)' }}>
                <Container>
                    <h2 className="mb-3">Stay in the Loop</h2>
                    <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
                    <div className="d-flex justify-content-center">
                        <div className="bg-white p-1 rounded-pill d-flex" style={{ maxWidth: '500px', width: '100%' }}>
                            <input type="email" className="form-control border-0 rounded-pill shadow-none" placeholder="Your email address" />
                            <Button variant="dark" className="rounded-pill px-4 ms-2">Subscribe</Button>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Home;
