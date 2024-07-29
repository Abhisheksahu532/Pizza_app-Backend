const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true, "Product name is required"],
        minlength: [10, "Product name should be at least 10 characters"],
        trim: true
    },
    description: {
        type : String,
        minlength: [10, "Product name should be at least 10 characters"],
        trim: true
    }, 
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    category: {
        type: String,
        enum: ['veg','non-veg','drinks','sides'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        required: [true, "In stock is required"],
        default: true
    }
},{
    timestamps: true

});

const Product = mongoose.model("Product", productSchema); //collection

module.exports = Product;