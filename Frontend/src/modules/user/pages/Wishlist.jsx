import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../store/wishlistSlice';
import { addToCart } from '../../../store/cartSlice';
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { items } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const handleMoveToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        dispatch(removeFromWishlist(product.id));
        alert(`${product.name} moved to cart!`);
    };

    if (items.length === 0) {
        return (
            <Container className="text-center py-5">
                <div className="mb-4">
                    <FaHeart size={80} className="text-muted opacity-25" />
                </div>
                <h3>Your wishlist is empty</h3>
                <p className="text-muted">Save your favorite items here!</p>
                <Link to="/products">
                    <Button variant="danger" className="rounded-pill px-4">Browse Products</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">My Wishlist</h2>
            <Row>
                {items.map((item) => (
                    <Col lg={3} md={4} sm={6} key={item.id} className="mb-4">
                        <Card className="product-grid-card h-100 shadow-sm border-0">
                            <div className="product-grid-img-wrapper">
                                <img src={item.img} alt={item.name} className="product-grid-img" />
                                <div className="product-actions">
                                    <button
                                        className="action-btn text-danger"
                                        onClick={() => dispatch(removeFromWishlist(item.id))}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <Card.Body className="text-center">
                                <Card.Title className="my-2 h6 fw-bold">{item.name}</Card.Title>
                                <h5 className="fw-bold mb-3" style={{ color: '#ff4b2b' }}>₹{item.price}</h5>
                                <Button
                                    variant="dark"
                                    size="sm"
                                    className="w-100 rounded-pill d-flex align-items-center justify-content-center"
                                    onClick={() => handleMoveToCart(item)}
                                >
                                    <FaShoppingCart className="me-2" /> Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Wishlist;
