const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    permissions: [String]
});

const RoleModal = mongoose.model('Role', RoleSchema);

module.exports = RoleModal
