const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/ServerConfig");

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainpassword = authDetails.password;

    // 1. Check if there is a registered user with the given mail
    const user = await findUser({ email });

    if(!user){
        throw {message: "No user found with the given email", statusCode: 404}
    }

    // 2. If the user is found we need to compare password with hashed password
    const isPasswordValidated = await bcrypt.compare(plainpassword, user.password);
    
    if(!isPasswordValidated){
        throw {message: "Invalid password, Please try again", statusCode: 401};
    }

    const userRole = user.role ? user.role : "USER";
    console.log(userRole);
    
    // 3. If the password is validated, create a token
    const token = jwt.sign({
        email: user.email,
        id: user._id,
        role: userRole
    }, JWT_SECRET,{
        expiresIn: JWT_EXPIRY
    });

    return token;
}

module.exports = {
    loginUser
}