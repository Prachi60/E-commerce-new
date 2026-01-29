import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Verify admin login logic
        if (email && password) {
            const mockAdmin = { name: 'Admin', email, role: 'admin' };
            dispatch(loginSuccess({ user: mockAdmin, token: 'mock-admin-token' }));
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #2a2a40 100%)' }}>
            <Card style={{ width: '400px', borderRadius: '15px' }} className="p-4 shadow-lg border-0">
                <div className="text-center mb-4">
                    <div className="bg-light rounded-circle d-inline-flex p-3 mb-3 shadow-sm">
                        <FaUserShield size={40} className="text-dark" />
                    </div>
                    <h3 className="fw-bold text-dark">Admin Portal</h3>
                    <p className="text-muted small">Secure Access Only</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold small text-uppercase text-secondary">Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="py-2"
                            placeholder="admin@eshop.com"
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold small text-uppercase text-secondary">Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="py-2"
                            placeholder="••••••••"
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="w-100 py-2 fw-bold" style={{ borderRadius: '8px' }}>
                        LOGIN TO DASHBOARD
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <small className="text-muted">Return to <a href="/" className="text-decoration-none text-dark">User Site</a></small>
                </div>
            </Card>
        </div>
    );
};

export default AdminLogin;
