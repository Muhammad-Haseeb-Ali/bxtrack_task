const User = require('../models/User');

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('role');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 10);
            }
            await user.save();
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getUserDetails,
    updateUserDetails
}
