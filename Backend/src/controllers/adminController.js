const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const AppError = require('../utils/appError');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
// dnwdveg
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Block / Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
const toggleBlockUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isBlocked = !user.isBlocked;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isBlocked: updatedUser.isBlocked
        });
    } else {
        return next(new AppError('User not found', 404));
    }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    // Calculate total revenue
    const orders = await Order.find({ orderStatus: { $ne: 'Cancelled' } });
    const totalRevenue = orders.reduce((acc, order) => acc += order.totalAmount, 0);

    // Recent orders
    const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name');

    res.json({
        usersCount,
        productsCount,
        ordersCount,
        totalRevenue,
        recentOrders
    });
});

module.exports = {
    getUsers,
    toggleBlockUser,
    getDashboardStats
};
