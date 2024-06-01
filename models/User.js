const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    }
});

const UserModal = mongoose.model('User', UserSchema);

module.exports = UserModal
