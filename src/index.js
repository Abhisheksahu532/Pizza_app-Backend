const express = require('express');

const ServerConfig =require('./config/ServerConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');

const app=express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended : true }));

app.listen(ServerConfig.PORT, async ()=>{
    await connectDB();
    console.log(`Server Started at ${ServerConfig.PORT}`);

    // const newUser =await User.create({
    //     firstName: "Abhishek",
    //     lastName: "kumar",
    //     email: "kumar@gmail.com",
    //     mobileNumber: "1231231230",
    //     password : "123456"
    // });

    // console.log("Created a new User");
    // console.log(newUser);
});