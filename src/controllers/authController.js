const { check, validationResult } = require('express-validator');
require('dotenv').config();
const User = require('../models/User')
const jwt = require('../utils/jwt');
const nodemailer = require('nodemailer');
exports.signUp = [
    check('fullName')
        .trim()
        .isString()
        .withMessage("Full Name must be a String..")
        .isLength({ min: 2, max: 40 })
        .notEmpty()
        .withMessage("Full Name cannot be empty"),
    check("email")
        .trim()
        .isEmail()
        .withMessage("Email must be in a correct format..")
        .isString()
        .withMessage("Email must be a String")
        .notEmpty()
        .withMessage("Email cannot be empty.."),
    check("password")
        .trim()
        .isStrongPassword()
        .withMessage("Need a strong password")
        .isLength({ min: 4, max: 10 })
        .withMessage("Password cannot be more than 10 and less than 4 characters")
        .notEmpty()
        .withMessage("Password cannot be empty.."),
    async (req, res, next) => {
        const { fullName, email, password } = req.body;
        const errors = validationResult(req);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.user_gmail,
                pass: process.env.user_pass
            }
        })
        if (errors.isEmpty()) {
            try {
                const user = await User.findOne({ email: email });
                if (user) {
                    return res.status(404).json({ message: "The user already exsist. Maybe try a different email.." })
                }
            }catch(err){
                return res.status(500).json({message: "Error while finding the user..."});
            }
            const newUser = new User({fullName, email, password});
            const mailOptions = {
                from: process.env.user_gmail,
                to: email,
                subject: "Welcome Message",
                html: "<h1> Welcome to the messaging app or the chat app </h1>"
            }
            jwt.generateToken(email, res);
            await newUser.save();
            transporter.sendMail(mailOptions, (error, info) => {
                if (error){
                    console.log("Error while sending the email")
                }
                else{
                    console.log("Sent email successfully")
                }
            })
            return res.status(201).json({message: "User created successfully.."})
        }
        return res.status(404).json({message: "Some errors occured..", errors});

    }]