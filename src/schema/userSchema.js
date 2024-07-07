const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : [true, "First name is required"],
        minlength: [5, "First name should be at least 5 characters"],
        lowercase : true,
        trim : 20,
        maxlength : [20," First name should not exceed 20 characters"]
    },

    lastName :{
        type : String,
        required : [true, "First name is required"],
        minlength: [5, "First name should be at least 5 characters"],
        lowercase : true,
        trim : 20,
        maxlength : [20," First name should not exceed 20 characters"]
    },

    mobileNumber :{
        type: Number,
        trim : true,
        minlength : [10, "Phone number should be of 10 numbers"],
        minlength : [10, "Phone number should be of 10 numbers"],
        unique : [true, "Phone number is already used"],
        required : [true, "Phone number is reqired"]
    },

    email :{
        type: String,
        trim : true,
        unique : [true, "Phone number is already used"],
        required : [true, "Phone number is reqired"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password : {
        type : String,
        required : [true, "Password should be required"],
        minlength : [6, "Minimum 6 characters required"]

    }
},{
    timestamps : true
});

const User = mongoose.model("User", userSchema); //collection

module.exports = User;