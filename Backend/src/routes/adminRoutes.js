const express = require('express');
const {
    getUsers,
    toggleBlockUser,
    getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.put('/users/:id/block', toggleBlockUser);
router.get('/stats', getDashboardStats);

module.exports = router;
