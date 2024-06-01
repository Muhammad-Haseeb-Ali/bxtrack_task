const express = require('express');
const router = express.Router();
const { getUserDetails, updateUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/profile', authMiddleware, getUserDetails);
router.put('/profile', authMiddleware, roleMiddleware('User'), updateUserDetails);

module.exports = router;