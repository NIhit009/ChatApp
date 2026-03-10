const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post("/signUp", authController.signUp);

module.exports = authRouter;