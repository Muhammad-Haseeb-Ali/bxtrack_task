const { admin, super_admin } = require('../constents/role&permissions');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {ProfilesModel} = require('../models/Profiles');
const Roles = require('../models/Roles');
const { passwordHash } = require('../utils/passwordHash');
const { validatePassword } = require('../utils/validators');

const getAllAdmins = async (req, res) => {
    try {
        const adminRole = await Roles.findOne({role: admin})

        if(!adminRole){
            return res.status(404).json({
                message: "Admin Role not exist"
            })
        }

        const admins = await ProfilesModel.find({role: adminRole._id}).populate({
            path: 'role',
            select: 'role'
        }).select('-password');

        res.status(200).json(admins);

    } catch (error) {
        console.log({error})
        res.status(500).json({ message: error.message });
    }
};

const getAdmin = async (req, res) => {
    try {
        const {id} = req.params

        const role = await roleMiddleware(admin)

        const adminDoc = await ProfilesModel.findOne({_id: id, role}).select('-password').populate({
            path: 'role',
            select: 'role'
        });

        if(!adminDoc || (req.user.role.role == admin && adminDoc._id != req.user._id)) {

            return res.status(404).json({
                message: "Admin is not available with id: " + id
            })
        }

        res.json(adminDoc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAdmin = async (req, res) => {
    try {
        var {
            username,
            email,
            password
        } = req.body

        if(!username || !email || !password){
            return res.status(400).json({
                message: "req body is not valid."
            })
        }

        const role = await roleMiddleware(admin)

        if(!role){
            return res.status(404)
            .json({
                message: admin + " does not exist in db"
            })
        }

        const newAdmin = ProfilesModel({
            username,
            email,
            password,
            role
        })

        newAdmin.save()
        .then((admin)=>{
            return res.status(200).json(admin);
        })
        .catch(error=>{
            console.log(error)
            return res.status(500).json({ message: error.message });
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const {id} = req.params
        const role = req.body.role
    
    
        if(role){
            if(req.user.role.role != super_admin){
                return res.status(400)
                .json({
                    message: "Profile role only can be changed by super admin"
                })
            }
            
            const adminUpdatedRole = await roleMiddleware(role)
    
            if(!adminUpdatedRole){
                return res.status(404).json({
                    message: "Such Role does not exist"
                })
            }
    
            req.body.role = adminUpdatedRole
        }

        const adminRoleId = await roleMiddleware(admin)

        const adminDoc = await ProfilesModel.findOneAndUpdate(
            {_id: id, role: adminRoleId}, 
            req.body, 
            { new: true 
        })
        .populate({
            path: "role",
            select: "role"
        });

        return res.status(200).json(adminDoc)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const {id} = req.params

        const role = await roleMiddleware(admin)

        if(!role){
            return res.status(404)
            .json({
                message: admin + " role does not exist in db"
            })
        }

        ProfilesModel.findOneAndDelete({_id: id, role})
        .then(()=>{
            return res.status(200)
            .json({
                message: "Admin is Deleted"
            })
        })
        .catch(error=>{
            return res.status(500)
            .json({
                message: error.message
            })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAdmins,
    getAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin
}
