const User = require("../models/User");
const { signToken } = require("../utils/auth");

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Identity Check: Look up the user by email and explicitly include password
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            // Use a generic error message
            return res
                .status(400)
                .json({ message: "Incorrect email or password." });
        }

        // Secret Verification: Compare provided password with stored hash
        const isMatch = await user.isCorrectPassword(password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Incorrect email or password." });
        }

        // Token Generation: Issue a JWT if credentials are valid.
        const token = signToken(user);

        // Response: Send token and basic user info (exclude sensitive data).
        return res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("userLogin error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = userLogin;
