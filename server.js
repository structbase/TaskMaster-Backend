require("dotenv").config();
const express = require("express");

const connectDB = require("./config/connection");
const routes = require("./routes/routes");


const app = express();
const PORT = process.env.PORT || 3001;

/**
 * MIDDLEWARE
 * These parse incoming request data so they are available under req.body.
 */
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (from HTML forms)
app.use(express.json()); // Parses JSON data (from API requests)

/**
 * API ROUTES
 * Prefixing with '/api/users', ensure all backend routes (e.g., /api/users/notes)
 */
app.use("/api/users", routes);

/**
 * DATABASE INITIALIZATION
 * Waiting for a successful MongoDB connection before starting the server.
 */
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
