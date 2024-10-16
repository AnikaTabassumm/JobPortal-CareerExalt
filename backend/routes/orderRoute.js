const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder, 
    paymentSuccess,
    paymentFailed,
    paymentCancel
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a new order
router.post('/create', protect, authorize('employer'), createOrder);

// Route to get all orders
router.get('/', protect, authorize('admin'), getAllOrders);

// Route to get a specific order by ID
router.get('/:id', protect, authorize('admin'), getOrderById);

// Route to update order status by ID
router.put('/update/:id', protect, authorize('admin'), updateOrderStatus);

// Route to delete an order by ID
router.delete('/:id', protect, authorize('admin'), deleteOrder);

router.post('/payment-success', paymentSuccess);
router.post('/payment-fail', paymentFailed);
router.post('/payment-cancel', paymentCancel);

module.exports = router;
