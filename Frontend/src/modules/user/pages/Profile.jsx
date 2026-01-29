import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaShoppingBag, FaEdit, FaCheck, FaTimes, FaCamera } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com',
        phone: '+91 9876543210',
        address: '123, Fashion Street, Mumbai, Maharashtra',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // Dispatch update profile action if needed
        alert('Profile updated successfully!');
    };

    return (
        <div className="profile-page py-5 bg-light">
            <Container>
                <Row>
                    {/* Left Side - User Summary */}
                    <Col lg={4} className="mb-4">
                        <Card className="border-0 shadow-sm text-center p-4 rounded-4">
                            <div className="profile-avatar-wrapper mx-auto mb-3">
                                <div className="profile-avatar bg-gradient-pink shadow-sm">
                                    {formData.name.charAt(0)}
                                </div>
                                <button className="avatar-edit-btn"><FaCamera size={12} /></button>
                            </div>
                            <h4 className="fw-bold mb-1">{formData.name}</h4>
                            <p className="text-muted small mb-3">{formData.email}</p>
                            <Badge bg="dark" className="rounded-pill px-3 py-2 mb-4">
                                {user?.role?.toUpperCase() || 'USER'}
                            </Badge>

                            <ListGroup variant="flush" className="text-start custom-list-group">
                                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                    <span className="text-muted"><FaShoppingBag className="me-2" /> Total Orders</span>
                                    <span className="fw-bold">12</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                                    <span className="text-muted"><FaUser className="me-2" /> Joined On</span>
                                    <span className="fw-bold">Oct 2023</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    {/* Right Side - Profile Details */}
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm p-4 rounded-4 h-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold m-0">Account Information</h4>
                                {!isEditing ? (
                                    <Button variant="outline-dark" size="sm" className="rounded-pill px-3" onClick={() => setIsEditing(true)}>
                                        <FaEdit className="me-1" /> Edit Profile
                                    </Button>
                                ) : (
                                    <div className="d-flex gap-2">
                                        <Button variant="success" size="sm" className="rounded-pill px-3" onClick={handleSave}>
                                            <FaCheck className="me-1" /> Save
                                        </Button>
                                        <Button variant="outline-danger" size="sm" className="rounded-pill px-3" onClick={() => setIsEditing(false)}>
                                            <FaTimes className="me-1" /> Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Form>
                                <Row g={3}>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-uppercase text-secondary">Full Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="py-2 border-0 bg-light rounded-3"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-uppercase text-secondary">Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="py-2 border-0 bg-light rounded-3"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-uppercase text-secondary">Mobile Number</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="py-2 border-0 bg-light rounded-3"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-3">
                                        <Form.Group>
                                            <Form.Label className="small fw-bold text-uppercase text-secondary">Shipping Address</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="py-2 border-0 bg-light rounded-3"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>

                            <hr className="my-4" />

                            <h5 className="fw-bold mb-3">Security</h5>
                            <Button variant="link" className="text-danger p-0 text-decoration-none small fw-bold">
                                Change Password &rarr;
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
