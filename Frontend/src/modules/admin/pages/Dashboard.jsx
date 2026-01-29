import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaShoppingCart, FaDollarSign, FaBoxOpen } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    // Mock Data for Charts
    const salesData = [
        { name: 'Jan', sales: 4000, revenue: 2400 },
        { name: 'Feb', sales: 3000, revenue: 1398 },
        { name: 'Mar', sales: 2000, revenue: 9800 },
        { name: 'Apr', sales: 2780, revenue: 3908 },
        { name: 'May', sales: 1890, revenue: 4800 },
        { name: 'Jun', sales: 2390, revenue: 3800 },
        { name: 'Jul', sales: 3490, revenue: 4300 },
    ];

    return (
        <div className="admin-dashboard">
            <h2 className="mb-4 fw-bold text-dark">Dashboard Overview</h2>

            {/* Stats Cards */}
            <Row className="mb-4">
                <Col md={3} sm={6} className="mb-3">
                    <Card className="stat-card h-100 p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted mb-2">Total Revenue</h6>
                                <h3 className="fw-bold mb-0">$45,231</h3>
                            </div>
                            <div className="stat-icon-wrapper bg-gradient-success">
                                <FaDollarSign />
                            </div>
                        </div>
                        <small className="text-success mt-2 d-block">
                            <span className="fw-bold">+12%</span> vs last month
                        </small>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="stat-card h-100 p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted mb-2">Total Orders</h6>
                                <h3 className="fw-bold mb-0">1,205</h3>
                            </div>
                            <div className="stat-icon-wrapper bg-gradient-primary">
                                <FaShoppingCart />
                            </div>
                        </div>
                        <small className="text-success mt-2 d-block">
                            <span className="fw-bold">+5%</span> vs last month
                        </small>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="stat-card h-100 p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted mb-2">Total Products</h6>
                                <h3 className="fw-bold mb-0">340</h3>
                            </div>
                            <div className="stat-icon-wrapper bg-gradient-warning">
                                <FaBoxOpen />
                            </div>
                        </div>
                        <small className="text-muted mt-2 d-block">
                            Inventory updated
                        </small>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="stat-card h-100 p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-muted mb-2">Total Users</h6>
                                <h3 className="fw-bold mb-0">10,540</h3>
                            </div>
                            <div className="stat-icon-wrapper bg-gradient-danger">
                                <FaUsers />
                            </div>
                        </div>
                        <small className="text-success mt-2 d-block">
                            <span className="fw-bold">+8%</span> vs last month
                        </small>
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row>
                <Col lg={8} className="mb-4">
                    <Card className="chart-card p-4">
                        <h5 className="chart-header fw-bold">Sales Overview</h5>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ff4b2b" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#ff4b2b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="revenue" stroke="#ff4b2b" fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card className="chart-card p-4">
                        <h5 className="chart-header fw-bold">Order Stats</h5>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#1c1c1e" radius={[5, 5, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
