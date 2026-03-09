const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect(url);
        console.log("MONGODB CONNECTED...", conn.connection.host);
    } catch (error) {
        console.log("Failed to connect with MONGODB", error);
    }
}
module.exports = connectDB;