import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import './AdminCommon.css';

const ProductManagement = () => {
    // Mock Data
    const [products, setProducts] = useState([
        { id: 1, name: 'Pastel Hoodie', price: 1499, category: 'Men', stock: 15, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=60' },
        { id: 2, name: 'Urban Jacket', price: 3999, category: 'Men', stock: 8, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=60' },
        { id: 3, name: 'Summer Dress', price: 2499, category: 'Women', stock: 20, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=60' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null); // null for add, object for edit
    const [searchTerm, setSearchTerm] = useState('');

    // Handlers
    const handleClose = () => {
        setShowModal(false);
        setCurrentProduct(null);
    };

    const handleShowAdd = () => {
        setCurrentProduct(null);
        setShowModal(true);
    };

    const handleShowEdit = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newProduct = {
            id: currentProduct ? currentProduct.id : Date.now(),
            name: formData.get('name'),
            price: formData.get('price'),
            category: formData.get('category'),
            stock: formData.get('stock'),
            img: formData.get('img') || 'https://via.placeholder.com/50'
        };

        if (currentProduct) {
            // Edit Logic
            setProducts(products.map(p => p.id === currentProduct.id ? newProduct : p));
        } else {
            // Add Logic
            setProducts([...products, newProduct]);
        }
        handleClose();
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Products</h2>
                <Button variant="primary" onClick={handleShowAdd} className="d-flex align-items-center gap-2">
                    <FaPlus /> Add Product
                </Button>
            </div>

            <div className="admin-table-container">
                <div className="mb-3 d-flex justify-content-end">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                        <Form.Control
                            placeholder="Search products..."
                            className="border-start-0 ps-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <Table hover responsive className="align-middle">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td><img src={product.img} alt={product.name} className="product-thumb" /></td>
                                <td className="fw-semibold">{product.name}</td>
                                <td><span className="badge bg-light text-dark border">{product.category}</span></td>
                                <td>₹{product.price}</td>
                                <td>
                                    <span className={`badge ${product.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-btn-group">
                                        <Button variant="outline-primary" size="sm" onClick={() => handleShowEdit(product)}><FaEdit /></Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}><FaTrash /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control name="name" defaultValue={currentProduct?.name} required />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select name="category" defaultValue={currentProduct?.category || 'Men'}>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Shoes">Shoes</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" name="stock" defaultValue={currentProduct?.stock || 0} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price (₹)</Form.Label>
                                    <Form.Control type="number" name="price" defaultValue={currentProduct?.price} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="url" name="img" defaultValue={currentProduct?.img} placeholder="https://..." />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" type="submit">{currentProduct ? 'Update Product' : 'Save Product'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;
