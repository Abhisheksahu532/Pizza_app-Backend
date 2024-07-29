const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepository');
const fs = require('fs/promises');



async function createProduct(productDetails) {

    // 1. We should check if an image os coming to the product, then we should first upload it in cloudinary

    const imagePath = productDetails.imagePath;

    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            fs.unlink(imagePath);

        } catch(error){
            console.log(error);
            throw {reason: "Product not created", statusCode: 500};
        }
    }


    // 2. then use the url from cloudinary and other product details to add product in db

    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    if(!product){
        throw {reason: "Product not created after uploading", statusCode: 500};
    }

    return product;
}

module.exports = {
    createProduct
};