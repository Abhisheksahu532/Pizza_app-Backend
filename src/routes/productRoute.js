const express = require('express');
const { addProduct, getProduct, deleteProduct, getProducts } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

//we neeed to initialize a router to add router
//Routers are used for segregating your routes in different modules

const productRouter = express.Router();

productRouter.post(
    '/',
     isLoggedIn,
      isAdmin,
       uploader.single('productImage'),
        addProduct
    );
productRouter.get('/:id', getProduct);
productRouter.get('/', getProducts);
productRouter.delete('/:id',deleteProduct);

module.exports = productRouter;