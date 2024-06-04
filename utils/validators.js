function validatePassword(password) {

        var minNumberofChars = 8;
        var regularExpression  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    
        if(password.length < minNumberofChars){
            return [false, "Minimum eight characters, at least one letter, and one number"]
        }
        if(!regularExpression.test(password)) {
            return [false, "Minimum eight characters, at least one letter, and one number"]
        }

        return [true]

}

console.log(validatePassword("123"))

module.exports = {
    validatePassword
}