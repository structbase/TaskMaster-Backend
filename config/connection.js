require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Connect using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        // Log error and stop the app if connection fails
        console.error("Connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
