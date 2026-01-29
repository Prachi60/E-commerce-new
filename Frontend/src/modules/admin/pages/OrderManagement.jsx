import React, { useState } from 'react';
import { Table, Button, Dropdown, Badge, InputGroup, Form } from 'react-bootstrap';
import { FaSearch, FaEye, FaEllipsisV } from 'react-icons/fa';
import './AdminCommon.css';

const OrderManagement = () => {
    // Mock Data
    const [orders, setOrders] = useState([
        { id: '#ORD-001', user: 'John Doe', date: '2023-10-15', total: 4599, status: 'Completed', items: 3 },
        { id: '#ORD-002', user: 'Jane Smith', date: '2023-10-16', total: 1999, status: 'Processing', items: 1 },
        { id: '#ORD-003', user: 'Mike Ross', date: '2023-10-16', total: 8500, status: 'Pending', items: 5 },
        { id: '#ORD-004', user: 'Rachel Green', date: '2023-10-17', total: 3200, status: 'Cancelled', items: 2 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'success';
            case 'processing': return 'primary';
            case 'pending': return 'warning';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="fw-bold mb-4">Orders</h2>

            <div className="admin-table-container">
                <div className="mb-3 d-flex justify-content-end">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search orders..."
                            className="border-start-0 ps-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <Table hover responsive className="align-middle">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td className="fw-bold text-primary">{order.id}</td>
                                <td>{order.user}</td>
                                <td>{order.date}</td>
                                <td>{order.items}</td>
                                <td>₹{order.total}</td>
                                <td>
                                    <Badge bg={getStatusBadge(order.status)} className="px-3 py-2 rounded-pill">
                                        {order.status}
                                    </Badge>
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" size="sm" className="border-0">
                                            <FaEllipsisV />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { }}>
                                                <FaEye className="me-2 text-primary" /> View Details
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Header>Update Status</Dropdown.Header>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'Processing')}>Processing</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'Completed')}>Completed</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'Cancelled')} className="text-danger">Cancelled</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default OrderManagement;
