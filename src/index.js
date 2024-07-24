const express = require('express');
const cookieParser = require('cookie-parser');
const ServerConfig =require('./config/ServerConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');

const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended : true }));

//Routing middleware
app.use('/users', userRouter); 
app.use('/carts', cartRouter);
app.use('/auth', authRouter);

app.get('/ping', isLoggedIn, (req,res) =>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({mesaage: "Pong"});
})

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