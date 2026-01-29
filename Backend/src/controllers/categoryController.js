const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const AppError = require('../utils/appError');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        return next(new AppError('Category already exists', 400));
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        // Soft delete or hard delete?
        // Hard for now as per requirements usually, but let's do soft to be safe or hard based on preference.
        await category.deleteOne();
        res.json({ message: 'Category removed' });
    } else {
        return next(new AppError('Category not found', 404));
    }
});

module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
};
