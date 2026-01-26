const Project = require("../../models/Project");


async function updateProject(req, res) {
    try {
        /**
         * Find and update project ONLY if it belongs to the logged-in user
         */
        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        /**
         * If no project is found or user does not own it
         */
        if (!project) {
            return res.status(404).json({
                message: "No project found or not authorized.",
            });
        }

        /**
         * Respond with updated project
         */
        res.json(project);
    } catch (error) {
        /**
         * Server error
         */
        res.status(500).json({
            message: "Update failed.",
            error: error.message,
        });
    }
}

module.exports = updateProject;
