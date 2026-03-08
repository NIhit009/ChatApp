const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.get("/signUp", authController.signUp);

module.exports = authRouter;