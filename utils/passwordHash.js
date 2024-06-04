const bcrypt = require('bcrypt');
const saltRounds = 10;

function passwordHash (password) {
    return bcrypt.hash(password, saltRounds)
}


function passwordCompare (password, hash) {
    return bcrypt.compare(password, hash)
}


module.exports = {
    passwordHash,
    passwordCompare
}