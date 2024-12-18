const { getCart, modifyCart, clearProductsFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res ){
    try {
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            error: {},
            data: cart
        });
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

async function modifyProductToCart(req, res ){
    try {
        const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add");
        return res.status(200).json({
            success: true,
            message: "Product added successfully to cart",
            error: {},
            data: cart
        });
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
            error: error.message
        });
  }

}

async function clearCartById( req, res){
    try {
        const cart = await clearProductsFromCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully cleared all products from the cart",
            error: {},
            data: cart
        });
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
            error: error.message
        });
  }
}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCartById
}