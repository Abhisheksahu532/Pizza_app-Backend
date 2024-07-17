const express = require('express');
const { createUser } = require('../controllers/userController');

//we neeed to initialize a router to add router
//Routers are used for segregating your routes in different modules

const userRouter = express.Router();

userRouter.post('/', createUser);

module.exports = userRouter;