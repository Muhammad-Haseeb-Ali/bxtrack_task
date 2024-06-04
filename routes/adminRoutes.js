const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { get_admin, get_all_admins, post_admin, put_admin, delete_admin } = require('../constents/role&permissions');
const { getAllAdmins, getAdmin, addAdmin, updateAdmin, deleteAdmin, } = require('../controllers/adminController')

router.get('/admins', authMiddleware(get_all_admins), getAllAdmins);

router.get('/admins/:id', authMiddleware(get_admin), getAdmin);

router.post('/admins/new', authMiddleware(post_admin), addAdmin);

router.patch('/admin/:id', authMiddleware(put_admin), updateAdmin);

router.delete('/admin/:id', authMiddleware(delete_admin), deleteAdmin);

module.exports = router;