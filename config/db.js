const mongoose = require('mongoose');
var RoleModel = require('../models/Roles')
var {ProfilesModel} = require('../models/Profiles')

var collInitialization = require('../utils/collInitialization')

var {
    super_admin, get_all_admins, get_admin, post_admin, put_admin, delete_admin, get_all_users, get_user, post_user, put_user, delete_user, admin, user
} = require('../constents/role&permissions')


const { 
    passwordHash,
    passwordCompare
    } = require("../utils/passwordHash")

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected...');

        const roles = [
            {
                role: super_admin,
                permissions: [
                    get_all_admins,
                    get_admin,
                    post_admin,
                    put_admin,
                    delete_admin,

                    get_all_users,
                    get_user,
                    post_user,
                    put_user,
                    delete_user
                ]
            },
            {
                role: admin,
                permissions: [
                    get_admin,
                    put_admin,

                    get_all_users,
                    get_user,
                    post_user,
                    put_user,
                    delete_user
                ]
            },
            {
                role: user,
                permissions: []
            },
        ]

        const rolesInDB = await collInitialization(RoleModel, roles)

        const super_admin_id = rolesInDB.find(role=>role.role==super_admin)?._id

        const superAdmin = [
            {
                username: "super_admin",
                email: "superadmin@mail.com",
                password: await passwordHash("super_admin"),
                role: super_admin_id
            }
        ]

        await collInitialization(ProfilesModel, superAdmin)

        console.log("Collections Setuped")

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
