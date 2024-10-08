const { findUser, createUser } = require("../repositories/userRepository");
const { createCart } = require('../repositories/cartRepository');

async  function registerUser(userDetails){
    // it will create a brand new user in database
    // 1. check if the user with same email exist or not
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber

    });

    if(user){
        //we found user
        throw { reason : 'User with the given email and mobile number already present', statusCode : 400}
    }
    // 2. if not then create user

    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });
    
    if(!newUser){
        throw { reason : 'Something went wrong, cannot create user', statusCode : 500}
        
    }

    await createCart(newUser._id);

    
    // 3. return the details of created user
    return newUser;
}



module.exports = {
    registerUser
};