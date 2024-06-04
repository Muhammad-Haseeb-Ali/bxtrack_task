const { user, super_admin } = require('../constents/role&permissions');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {ProfilesModel} = require('../models/Profiles')
const Roles = require('../models/Roles');

const getAllUsers = async (req, res) => {
    try {
        const userRole = await Roles.findOne({role: user})

        if(!userRole){
            return res.status(404).json({
                message: "User Role not exist"
            })
        }

        const users = await ProfilesModel.find({role: userRole._id}).populate({
            path: 'role',
            select: 'role'
        }).select('-password');

        res.status(200).json(users);

    } catch (error) {
        console.log({error})
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const {id} = req.params

        const userDoc = await ProfilesModel.findById(id).select('-password').populate({
            path: 'role',
            select: 'role'
        });

        if(
            !userDoc
            ||
            (req.user.role.role == user && adminDoc._id != req.user._id)
        ) {
            return res.status(404).json({
                message: "User is not available with id: " + id
            })
        }

        res.json(userDoc);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body

        if(!username || !email || !password){
            return res.status(400).json({
                message: "req body is not valid."
            })
        }

        const role = await roleMiddleware(user)

        if(!role){
            return res.status(404)
            .json({
                message: user + " does not exist in db"
            })
        }

        const newUser = ProfilesModel({
            username,
            email,
            password,
            role
        })

        newUser.save()
        .then(async (user)=>{
            await user.populate({path: "role", select: "role"})
            return res.status(200).json(user);
        }) 
        .catch(error=>{
            return res.status(500).json({ message: error.message });
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {

    try {
        const {id} = req.params
        const role = req.body.role

        const userRoleId = await roleMiddleware(user) 
    
        const targetedProfile = await ProfilesModel.findOne({_id: id, role: userRoleId}).populate("role")
    
        if(!targetedProfile){
            return res.status(404)
            .json({
                message: "User Profile does not exist with id " + id
            })
        }
    
        if(req.user.role.role == user && (req.user._id == targetedProfile._id)){
            return res.status(400)
            .json({
                message: "Access Denied"
            })
        }
    
        if(role){
            if(req.user.role.role != super_admin){
                return res.status(400)
                .json({
                    message: "Profile role only can be changed by super admin"
                })
            }
    
            const userUpdatedRole = await roleMiddleware(role)
    
            if(!userUpdatedRole){
                return res.status(404).json({
                    message: "Such Role does not exist"
                })
            }
    
            req.body.role = userUpdatedRole
        }

        const userDoc = await ProfilesModel.findOneAndUpdate(
            {_id: id}, 
            req.body, 
            { new: true 
        })
        .populate({
            path: "role",
            select: "role"
        });

        return res.status(200).json(userDoc)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const role = await roleMiddleware(user)

        if(!role){
            return res.status(404)
            .json({
                message: user + " role does not exist in db"
            })
        }

        if(req.user.role.role == user && req.user._id != id){
            return res.status(400)
            .json({
                message: "you cannot delete other's account"
            })
        }

        ProfilesModel.findOneAndDelete({_id: id , role})
        .then(()=>{
            return res.status(200)
            .json({
                message: "User is Deleted"
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
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}
