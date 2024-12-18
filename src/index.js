const express = require('express');
const cookieParser = require('cookie-parser');
const ServerConfig =require('./config/ServerConfig');
const connectDB = require('./config/dbConfig');
const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');
const cors = require('cors');

const app=express();

app.use(cors({
    origin: ServerConfig.FRONTEND_URL, // allow all origins
    credentials: true // allow session cookie from browser to passthrough
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended : true }));

//Routing middleware
app.use('/users', userRouter); 
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter); 
app.use('/orders', orderRouter); 

app.get('/ping',(req,res) =>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({mesaage: "Pong"});
});


app.listen(ServerConfig.PORT, async ()=>{
    await connectDB();
    console.log(`Server Started at ${ServerConfig.PORT}`);
});