const mongoose = require('mongoose');
const { passwordHash, passwordCompare } = require('../utils/passwordHash');
const { passwordMiddleware } = require('../middleware/passwordMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const ProfileSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
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
        type: mongoose.Schema.ObjectId, 
        ref: 'roles',
    }
});

ProfileSchema.set('validateBeforeSave', false);

ProfileSchema.pre("save", async function(next){
    this.password = await passwordMiddleware(this.password, next)
})

ProfileSchema.methods.checkPassword = async function(password){
    return await passwordCompare(password, this.password)
}

const ProfilesModel = mongoose.model('profiles', ProfileSchema);


module.exports = {ProfilesModel}
