import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaHeart, FaStar, FaShoppingCart, FaTruck, FaUndo } from 'react-icons/fa';
import './Products.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60');

    // Mock Product Data
    const product = {
        id: id,
        name: 'Pastel Premium Hoodie',
        price: 1999,
        description: 'Elevate your casual wardrobe with our Pastel Premium Hoodie. Crafted from ultra-soft cotton blend fabric, this hoodie offers both comfort and style. Featuring a modern relaxed fit and a cozy kangaroo pocket.',
        rating: 4.5,
        reviews: 124,
        images: [
            'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Mock Extra 1
            'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'  // Mock Extra 2
        ]
    };

    return (
        <div className="product-detail-page">
            <Container>
                <div className="bg-white rounded-3 shadow-sm p-4">
                    <Row>
                        {/* Image Gallery */}
                        <Col md={6} className="mb-4">
                            <div className="product-gallery">
                                <img src={mainImage} alt={product.name} className="main-image" />
                                <div className="thumbnail-container">
                                    {product.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumb ${index}`}
                                            className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                                            onClick={() => setMainImage(img)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Col>

                        {/* Product Info */}
                        <Col md={6}>
                            <div className="product-info">
                                <Badge bg="dark" className="mb-2">New Arrival</Badge>
                                <h1 className="product-title">{product.name}</h1>

                                <div className="product-rating">
                                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar className="text-muted" />
                                    <span className="text-muted ms-2 small">({product.reviews} reviews)</span>
                                </div>

                                <div className="product-price">₹{product.price}</div>

                                <p className="text-muted mb-4">{product.description}</p>

                                {/* Size Selector */}
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Select Size</h6>
                                    <div className="size-selector">
                                        {['S', 'M', 'L', 'XL'].map(size => (
                                            <button
                                                key={size}
                                                className={selectedSize === size ? 'active' : ''}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="quantity-control">
                                        <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                        <input type="text" className="quantity-input" value={quantity} readOnly />
                                        <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                                    </div>
                                    <Button className="btn-add-cart flex-grow-1">
                                        <FaShoppingCart className="me-2" /> Add to Cart
                                    </Button>
                                    <Button variant="outline-danger" className="rounded-circle p-3">
                                        <FaHeart />
                                    </Button>
                                </div>

                                {/* Extras */}
                                <div className="border-top pt-4 mt-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <FaTruck className="text-primary me-3 fs-4" />
                                        <div>
                                            <h6 className="m-0 fw-bold">Free Shipping</h6>
                                            <small className="text-muted">On all orders over $50</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FaUndo className="text-primary me-3 fs-4" />
                                        <div>
                                            <h6 className="m-0 fw-bold">Easy Returns</h6>
                                            <small className="text-muted">30 days money back guarantee</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default ProductDetail;
