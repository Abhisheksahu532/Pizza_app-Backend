const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
           
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    statue:{
        type: String,
        enum: ['ORDERED', 'DELIVERED', 'CANCELLED', 'OUT_FOR_DELIVERY', 'PROCESSING'],
        default: 'ORDERED'
    },

    address: {
        type: String,
        minlength: [10, "Address should be at least 10 characters"],
    },

    payment: {
        type: String,
        enum: ['COD', 'ONLINE'],
        default: 'COD'
    }

},{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;