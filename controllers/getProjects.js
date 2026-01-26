const Project = require("../models/Project");

async function getProjects(req, res) {
    try {
        /**
         * Fetching
         * gets all projects owned by logged-in user
         */
        const projects = await Project.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        /**
         * Response
         * getting all project
         */
        res.json(projects);
    } catch (error) {
        /**
         * Response & Error handling
         * Either Server error and something unknown
         */
        res.status(500).json({ message: "Could not fetch projects." });
    }
}

module.exports = getProjects;
