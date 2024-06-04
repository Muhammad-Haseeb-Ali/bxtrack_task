const { passwordHash } = require("../utils/passwordHash")
const { validatePassword } = require("../utils/validators")

async function passwordMiddleware (password, next) {
    const [isPasswordValid, validationError] = validatePassword(password)

    console.log({password, isPasswordValid})

    if(!isPasswordValid){
        const error = new Error(validationError)
        next(error)
    }
    else {
        return await passwordHash(password)
    }
}

module.exports = {
    passwordMiddleware
}