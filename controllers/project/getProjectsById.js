const Project = require("../../models/Project");

async function getProjectById(req, res) {
    try {
        /**
         * Fetch a single product by ID that belongs to the logged-in user
         */
        const project = await Project.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        /**
         *  Reponse if there is not project or else
         */
        if (!project) {
            return res
                .status(404)
                .json({ message: "No project found or not authorized." });
        }

        /**
         * Response fetch specified project by id for its owner only
         */
        res.json(project);
    } catch (error) {
        /**
         * Server error
         */
        res.status(500).json({
            message: "Could not fetch project.",
            error: error.message,
        });
    }
}

module.exports = getProjectById;
