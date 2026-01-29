const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const AppError = require('../utils/appError');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return next(new AppError('No order items', 400));
    } else {
        const order = new Order({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalAmount,
        });

        const createdOrder = await order.save();

        // Optional: Decrease stock
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock = product.stock - item.quantity;
                await product.save();
            }
        }

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product', 'name images');

    if (order) {
        // Ensure user can only see their own order (unless admin)
        if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
            return next(new AppError('Not authorized to view this order', 403));
        }
        res.json(order);
    } else {
        return next(new AppError('Order not found', 404));
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name').sort('-createdAt');
    res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.orderStatus = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        return next(new AppError('Order not found', 404));
    }
});

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderStatus,
};
