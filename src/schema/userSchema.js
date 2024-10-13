const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : [true, "First name is required"],
        minlength: [3, "First name should be at least 3 characters"],
        lowercase : true,
        trim : 20,
        maxlength : [20," First name should not exceed 20 characters"]
    },

    lastName :{
        type : String,
        required : [true, "Last name is required"],
        minlength: [4, "Last name should be at least 4 characters"],
        lowercase : true,
        trim : 20,
        maxlength : [20," Last name should not exceed 20 characters"]
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

    },

    role : {
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER" 
    },

    address :{
        type: String
    }
},{
    timestamps : true
});

userSchema.pre("save", async function() {
    //Here u modify your user before it is saved in mongodb
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema); //collection

module.exports = User;