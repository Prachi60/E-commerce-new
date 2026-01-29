import React from 'react';
import { Container, Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../../store/cartSlice';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { items, totalQuantity } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalAmount = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    if (items.length === 0) {
        return (
            <Container className="text-center py-5">
                <div className="mb-4">
                    <FaShoppingCart size={80} className="text-muted opacity-25" />
                </div>
                <h3>Your cart is empty</h3>
                <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products">
                    <Button variant="danger" className="rounded-pill px-4">Start Shopping</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">Shopping Cart ({totalQuantity} items)</h2>
            <Row>
                <Col lg={8}>
                    <div className="bg-white rounded-3 shadow-sm overflow-hidden mb-4">
                        <Table responsive hover className="align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4">Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th className="text-end pe-4">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                <img src={item.img} alt={item.name} className="rounded" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                <div className="ms-3">
                                                    <div className="fw-bold">{item.name}</div>
                                                    {item.size && <small className="text-muted">Size: {item.size}</small>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹{item.price}</td>
                                        <td>{item.quantity || 1}</td>
                                        <td>₹{item.price * (item.quantity || 1)}</td>
                                        <td className="text-end pe-4">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Button variant="link" className="text-danger p-0 text-decoration-none" onClick={() => dispatch(clearCart())}>
                        Clear Shopping Cart
                    </Button>
                </Col>
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-3">
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Shipping</span>
                                <span className="text-success">Free</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fw-bold h5">Total</span>
                                <span className="fw-bold h5 text-danger">₹{totalAmount}</span>
                            </div>
                            <Button variant="dark" className="w-100 py-3 fw-bold rounded-pill">
                                PROCEED TO CHECKOUT
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
