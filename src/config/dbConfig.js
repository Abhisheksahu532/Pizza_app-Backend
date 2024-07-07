const mongoose = require('mongoose');
const ServerConfig = require('./ServerConfig');

async function connectDB (){

    try {
        await mongoose.connect(ServerConfig.DB_URL);
        console.log("Sucessfully connected to database")
        
    } catch (error) {
        console.log("Database is not connected");
        console.log(error);
    }

}

module.exports = connectDB