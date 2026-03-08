const express = require('express');
require('dotenv').config();
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running in port ${process.env.PORT}...`);
})