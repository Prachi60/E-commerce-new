import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { addToWishlist } from '../../../store/wishlistSlice';
import { FaHeart, FaShoppingCart, FaSearch, FaFilter } from 'react-icons/fa';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();
    const { items: cartItems } = useSelector((state) => state.cart);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    // Mock Data
    const products = [
        { id: 1, name: 'Pastel Hoodie', price: 1499, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', category: 'Men' },
        { id: 2, name: 'Urban Jacket', price: 3999, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', category: 'Men' },
        { id: 3, name: 'Summer Dress', price: 2499, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', category: 'Women' },
        { id: 4, name: 'Comfy Sneakers', price: 2999, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', category: 'Shoes' },
        { id: 5, name: 'Leather Bag', price: 4599, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', category: 'Accessories' },
        { id: 6, name: 'Denim Jeans', price: 1999, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', category: 'Men' },
    ];

    const [filterCategory, setFilterCategory] = useState([]);
    const [priceRange, setPriceRange] = useState(10000);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryChange = (category) => {
        setFilterCategory(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        alert(`${product.name} added to cart!`);
    };

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist(product));
        alert(`${product.name} added to wishlist!`);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory.length === 0 || filterCategory.includes(product.category);
        const matchesPrice = product.price <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="products-page">
            <div className="products-page-header">
                <Container>
                    <h1 className="fw-bold">Our Collection</h1>
                    <p className="text-muted">Discover the latest trends in fashion</p>
                </Container>
            </div>

            <Container className="mb-5">
                <Row>
                    {/* Sidebar Filters */}
                    <Col lg={3} className="mb-4">
                        <div className="filter-sidebar">
                            <div className="filter-section">
                                <div className="filter-title">
                                    Search <FaSearch className="text-muted" size={14} />
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="Search products..."
                                    className="rounded-pill"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="filter-section">
                                <div className="filter-title">
                                    Categories <FaFilter className="text-muted" size={14} />
                                </div>
                                {['Men', 'Women', 'Shoes', 'Accessories'].map((cat) => (
                                    <Form.Check
                                        type="checkbox"
                                        key={cat}
                                        label={cat}
                                        className="mb-2 custom-checkbox"
                                        checked={filterCategory.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    />
                                ))}
                            </div>

                            <div className="filter-section">
                                <div className="filter-title">Price Range</div>
                                <Form.Range
                                    min={0}
                                    max={10000}
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="price-range-slider"
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>₹0</span>
                                    <span>₹{priceRange}</span>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Product Grid */}
                    <Col lg={9}>
                        <Row>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
                                        <Link to={`/products/${product.id}`} className="text-decoration-none">
                                            <Card className="product-grid-card h-100">
                                                <div className="product-grid-img-wrapper">
                                                    <img src={product.img} alt={product.name} className="product-grid-img" />
                                                    <div className="product-actions">
                                                        <button
                                                            className="action-btn"
                                                            style={{ color: cartItems.find(i => i.id === product.id) ? '#e91e63' : 'inherit' }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleAddToCart(product);
                                                            }}
                                                        >
                                                            <FaShoppingCart />
                                                        </button>
                                                        <button
                                                            className="action-btn"
                                                            style={{ color: wishlistItems.find(i => i.id === product.id) ? '#e91e63' : 'inherit' }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleAddToWishlist(product);
                                                            }}
                                                        >
                                                            <FaHeart />
                                                        </button>
                                                    </div>
                                                </div>
                                                <Card.Body className="text-center">
                                                    <small className="text-muted text-uppercase">{product.category}</small>
                                                    <Card.Title className="my-2 text-dark">{product.name}</Card.Title>
                                                    <h5 className="fw-bold" style={{ color: '#ff4b2b' }}>₹{product.price}</h5>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12} className="text-center py-5">
                                    <h4 className="text-muted">No products found matching filters.</h4>
                                    <Button variant="outline-danger" onClick={() => {
                                        setSearchQuery('');
                                        setFilterCategory([]);
                                        setPriceRange(10000);
                                    }}>Clear Filters</Button>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Products;
