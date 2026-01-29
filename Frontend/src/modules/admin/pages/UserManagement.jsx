import React, { useState } from 'react';
import { Table, Button, Badge, InputGroup, Form } from 'react-bootstrap';
import { FaSearch, FaTrash, FaUserShield } from 'react-icons/fa';
import './AdminCommon.css';

const UserManagement = () => {
    // Mock Data
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joined: '2023-01-15', status: 'Active' },
        { id: 2, name: 'Admin User', email: 'admin@eshop.com', role: 'Admin', joined: '2022-11-01', status: 'Active' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joined: '2023-05-20', status: 'Inactive' },
        { id: 4, name: 'Guest User', email: 'guest@test.com', role: 'User', joined: '2023-08-10', status: 'Active' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const toggleRole = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, role: u.role === 'User' ? 'Admin' : 'User' } : u));
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="fw-bold mb-4">Users</h2>

            <div className="admin-table-container">
                <div className="mb-3 d-flex justify-content-end">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search users..."
                            className="border-start-0 ps-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <Table hover responsive className="align-middle">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="fw-semibold">{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Badge bg={user.role === 'Admin' ? 'danger' : 'info'} text={user.role === 'Admin' ? 'white' : 'dark'}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td>{user.joined}</td>
                                <td>
                                    <span style={{
                                        height: '10px', width: '10px', borderRadius: '50%',
                                        display: 'inline-block', marginRight: '5px',
                                        backgroundColor: user.status === 'Active' ? '#28a745' : '#dc3545'
                                    }}></span>
                                    {user.status}
                                </td>
                                <td>
                                    <div className="action-btn-group">
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            title="Toggle Role"
                                            onClick={() => toggleRole(user.id)}
                                        >
                                            <FaUserShield />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            title="Delete User"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserManagement;
