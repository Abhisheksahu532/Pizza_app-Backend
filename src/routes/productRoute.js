const express = require('express');
const { addProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');

//we neeed to initialize a router to add router
//Routers are used for segregating your routes in different modules

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct);

module.exports = productRouter;