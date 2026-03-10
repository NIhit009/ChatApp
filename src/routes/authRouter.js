const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post("/signUp", authController.signUp);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

module.exports = authRouter;