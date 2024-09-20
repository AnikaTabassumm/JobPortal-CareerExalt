const express = require('express');
const router = express.Router();
const {registerUser, loginUser,registerAdmin, resetPassword, resetPasswordRequest} = require('../controllers/userController');
const {protect, authorize} = require('../middleware/authMiddleware');
const { verifyOTP } = require('../utils/otpUtils');

router.post('/register', registerUser);
router.post('/adminreg', registerAdmin);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP)
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);

router.use(protect);

router.get('/admin-route', authorize('admin'), (req, res) => {
    
})

module.exports = router;