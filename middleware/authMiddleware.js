// authMiddleware.js
const jwt = require('jsonwebtoken');
const {ProfilesModel} = require('../models/Profiles');


const authMiddleware = (endpoint)=>{

    return async (req, res, next) => {
        
        const authHeader = req.header('Authorization')
        if (!authHeader) {
            return res.status(401).json({ message: 'No Authorization Headers, authorization denied' });
        }

        const token = req.header('Authorization').replace('Bearer ', '');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await ProfilesModel.findById(decoded.id).select('-password').populate('role');

            if(!user){
                return res.status(400)
                .json({
                    message: "JWT's Profile is Deletes"
                })
            }
    
            const havePermissions = user.role.permissions.includes(endpoint)

            if(!havePermissions){
                return res.status(400).json({
                    message: ` '${endpoint}' permission is required`
                })
            }
            else{
                req.user = user
                return next();
            }
        } catch (err) {
            console.log(err, token)
            res.status(401).json({ message: 'Token is not valid' });
        }
    };

}

module.exports = authMiddleware;