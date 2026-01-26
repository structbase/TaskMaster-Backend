const User = require("../../models/User");
const { signToken } = require("../../utils/auth");

async function userRegister(req, res) {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        // Uniqueness Check: Ensure email or username isn't already in use
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Creation: Pass raw data as an object
        const user = await User.create({
            firstname,
            lastname,
            username,
            email,
            password,
        });

        // Sign JWT
        const token = signToken(user);

        // Cleanup: Convert Mongoose doc to JS object and remove password hash
        const userData = user.toObject();
        delete userData.password;

        // Respond with token and user
        res.status(201).json({ token, user: userData });
    } catch (error) {
        console.error("userRegister error:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = userRegister;
