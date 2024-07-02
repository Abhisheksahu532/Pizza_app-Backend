const express =require('express');

const ServerConfig =require('./config/ServerConfig')

const app=express();

app.listen(ServerConfig.PORT,()=>{
    console.log(`Server Started at ${ServerConfig.PORT}`);
})