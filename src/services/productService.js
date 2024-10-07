const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {

    // 1. We should check if an image os coming to the product, then we should first upload it in cloudinary

    const imagePath = productDetails.imagePath;
    

    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            // console.log(productImage);
            
            // console.log(__dirname);
            // console.log(process.cwd());
            fs.unlink(process.cwd() + "/" + imagePath);

        } catch(error){
            console.log(error);
            throw new InternalServerError();
        }
    }


    // 2. then use the url from cloudinary and other product details to add product in db

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });
    return product;
}

async function getProductById(productId){
    const response = await ProductRepository.getProductById(productId)
    if(!response){
        throw new NotFoundError("Product");
    }
    return response;
}

async function deleteProductById(productId){
    const response = await ProductRepository.deleteProductById(productId);
    console.log(response);

    if(!response){
        throw new NotFoundError('Producct');
    }
    return response;

}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};