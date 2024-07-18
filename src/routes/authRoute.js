const express = require('express');
const { login } = require('../controllers/authController');

//we neeed to initialize a router to add router
//Routers are used for segregating your routes in different modules

const authRouter = express.Router();

authRouter.post('/login', login);

module.exports = authRouter;