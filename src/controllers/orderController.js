const { createOrder, getAllOrdersCreatedByUser, updateOrder, getOrdersDetailsById } = require("../services/orderService");
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

async function getAllOrdersByUser(req, res){

    try {

        const order = await getAllOrdersCreatedByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
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

async function getOrder(req, res){

    try {

        const order = await getOrdersDetailsById(req.params.orderId);
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
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

async function cancelOrder(req, res){

    try {

        const order = await updateOrder(req.params.orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
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

async function changeOrderStatus(req, res){

    try {
        console.log("Order ID in controller:", req.params.orderId);
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
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
    createNewOrder,
    getAllOrdersByUser,
    getOrder,
    cancelOrder,
    changeOrderStatus
}