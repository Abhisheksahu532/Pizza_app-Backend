const express = require('express');
const { login, logout } = require('../controllers/authController');

//we neeed to initialize a router to add router
//Routers are used for segregating your routes in different modules

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/logout', logout);

module.exports = authRouter;