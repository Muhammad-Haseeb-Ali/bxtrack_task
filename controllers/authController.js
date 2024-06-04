const {ProfilesModel} = require('../models/Profiles')
const Roles = require('../models/Roles');
const generateToken = require('../utils/generateToken');

const { 
    passwordHash,
    passwordCompare
    } = require("../utils/passwordHash");
const { super_admin, admin, user } = require('../constents/role&permissions');
const { validatePassword } = require('../utils/validators');

const register = async (req, res) => {
    var { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400)
        .json({
            message: "Req body is not valid"
        })
    }

    const userRole = await Roles.findOne({role: user})

    if(!userRole){
        return res.status(404).json({
            message: "User Role is deleted from db"
        })
    }

    const role = userRole._id
    password = await passwordHash(password)

    try {
        const profile = new ProfilesModel({ 
            username, 
            email, 
            password, 
            role 
        });

        profile.save()
        .then(profile=>{
            return res.status(200)
            .json({ message: 'User registered successfully' })
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'Email and password is required' })
        }

        const user = await ProfilesModel.findOne({ email }).populate('role');

        if (user && await user.checkPassword(password)) {
            res.json({ token: generateToken(user._id) });
        } 
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    register,
    login
}