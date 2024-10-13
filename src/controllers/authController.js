const { loginUser } = require("../services/authService");

async function logout(req, res){
    res.cookie("authToken","");
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
        data: {},
        error: {}
    })
}
async function login(req,res){
    
    //auth service
    
    try{
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);

        res.cookie("authToken", response,{
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7

        })

        return res.status(200).json({
            response: true,
            message: "Logged in successfully",
            data: {},
            error: {}
        })
    } catch(error){
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            error: error

        })

    }
}

module.exports = {
    login,
    logout
}