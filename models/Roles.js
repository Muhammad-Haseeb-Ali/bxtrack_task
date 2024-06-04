const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role: { 
        type: String, 
        required: true, 
        unique: true 
    },
    permissions: [String]
});

RoleSchema.index("role")

const RoleModel = mongoose.model('roles', RoleSchema);


module.exports = RoleModel
