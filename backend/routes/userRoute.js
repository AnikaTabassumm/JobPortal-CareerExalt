const express = require('express');
const router = express.Router();
const {registerUser, loginUser, verifyOTP, resetPassword, resetPasswordRequest, logout} = require('../controllers/userController');
const {protect, authorize} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
// router.post('/adminreg', registerAdmin);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP)
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

// router.use(protect);

// router.get('/admin-route', authorize('admin'), (req, res) => {
//     res.send("Admin access granted");
// })

module.exports = router;