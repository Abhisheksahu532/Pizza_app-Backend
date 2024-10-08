const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/ServerConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next){
    const token = req.cookies['authToken'];
    // console.log(token);

    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded){
            throw new UnauthorisedError();
        }
        // if reached here, then user is authenticated allow them to access api

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
        // console.log("This is user details",req.user);
        
        next();

    } catch(error){
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid Token provided"
        }); 
    }  
}

/**
 *isAdmin fucntion checks if the user logged is an admin or not
 *Because we will call isAdmin after isLoggenIn thats why we will recieve user details
 */
function isAdmin(req, res, next){
    const loggedInUser  = req.user;
    // console.log(loggedInUser);
    if(loggedInUser.role == "ADMIN"){
        // console.log("User is an admin");
        next();
    }
    else{

        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not an authorised for this action",
            error:{
                statusCode : 401,
                reason: "Unauthorised user for this action"
            }
    
        })
    }

}

module.exports ={
    isLoggedIn,
    isAdmin
}