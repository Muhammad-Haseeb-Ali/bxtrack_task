const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const { get_all_users, get_user, post_user, put_user, delete_user } = require('../constents/role&permissions');

router.get('/users', authMiddleware(get_all_users), getAllUsers);

router.get('/users/:id', authMiddleware(get_user), getUser);

router.post('/users/new', authMiddleware(post_user), addUser);

router.patch('/users/:id', authMiddleware(put_user), updateUser);

router.delete('/users/:id', authMiddleware(delete_user), deleteUser);

module.exports = router;