const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRouter');
const connectDB = require("./utils/db");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server running in port ${process.env.PORT}...`);
    connectDB(process.env.MONGO_URI);
})