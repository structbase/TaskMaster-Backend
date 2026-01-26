require("dotenv").config();
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        },

        username: {
            type: String,
            trim: true,
            unique: true,
            sparse: true, // allows OAuth users without username
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Must use a valid email address"],
        },

        // LOCAL AUTH (optional)
        password: {
            type: String,
            minlength: 8,
            select: false,
        },

        // OAUTH (GitHub)
        githubId: {
            type: String,
            unique: true,
            sparse: true, // allows multiple users with no githubId
        },
    },
    {
        timestamps: true,
    },
);

/**
 * Pre-save hook
 * Hash password ONLY if it exists and is new/modified
 */
userSchema.pre("save", async function () {
    if ((this.isNew || this.isModified("password")) && this.password) {
        const saltRounds = Number(process.env.SALTING_ROUNDS) || 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

/**
 * Compare passwords for local login
 */
userSchema.methods.isCorrectPassword = async function (password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
