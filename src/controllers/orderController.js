const { createOrder } = require("../services/orderService");
const AppError = require("../utils/appError");

async function createNewOrder(req, res){

    try {

        const order = await createOrder(req.user.id, req.body.paymentMathod);
        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            error: {},
            data: order 

        })

    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {},
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: {},
            error: error
        });
    }
}

module.exports ={
    createNewOrder
}