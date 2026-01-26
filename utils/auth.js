require("dotenv").config();
const jwt = require("jsonwebtoken");

// Secret key used to sign and verify tokens—must be kept private in .env
const secret = process.env.JWT_SECRET;
const expiration = "2h";

module.exports = {
    /**
     * authMiddleware
     * Incepts requests to protected routes to verify the user's identity.
     */
    authMiddleware: function (req, res, next) {
        let token;

        // Token Extraction: Look for the token in three possible locations
        // Authorization Header (Standard: "Bearer <token>")
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ").pop().trim();
        }
        // Request Body (Backup for certain front-end setups)
        else if (req.body && req.body.token) {
            token = req.body.token;
        }
        // URL Query String (Useful for quick testing)
        else if (req.query && req.query.token) {
            token = req.query.token;
        }

        // If no token is found, stop the request early
        if (!token) {
            return res
                .status(401)
                .json({ message: "You must be logged in to do that." });
        }

        // Check if the token is valid and not expired
        try {
            // jwt.verify decodes the payload and checks the signature against our 'secret'
            const { data } = jwt.verify(token, secret, { maxAge: expiration });

            // Attach user data to the request object
            // This allows the next controller (like getNotes) to know who the user is.
            req.user = data;

            //Proceed to the next middleware or controller
            next();
        } catch (err) {
            console.log("Invalid token");
            // If the token is tampered with or expired, deny access
            return res.status(401).json({ message: "Invalid token." });
        }
    },

    /**
     * signToken
     * Creates a new JWT containing non-sensitive user data.
     */
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        // We wrap the payload in a 'data' object to stay consistent with the middleware
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
