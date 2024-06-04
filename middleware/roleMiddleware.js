const Roles = require('../models/Roles');

async function roleMiddleware (role, req, res) {
    console.log({role})
    const roleDoc = await Roles.findOne({role})

    return(roleDoc?._id)
}

module.exports = {
    roleMiddleware
}