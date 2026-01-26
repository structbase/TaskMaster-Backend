const Project = require("../../models/Project");

async function deleteProject(req, res) {
    try {
        /**
         *  Find the project by the ID provided in the URL parameters
         */
        const project = await Project.findById(req.params.id);

        /**
         * If no project is found, return 404
         */
        if (!project) {
            return res.status(404).json({
                message: "No project found",
            });
        }

        /**
         * Verify Ownership
         */
        if (project.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Unauthorized: You do not own this note." });
        }

        /**
         * deleting the actul bookmakr
         */
        await project.deleteOne();

        /**
         * response confirm deletion
         */
        res.json({ message: "Project deleted successfully." });
    } catch (error) {
        /**
         * Server error
         */
        res.status(500).json({
            message: "Server error during deletion.",
            error: error.message,
        });
    }
}

module.exports = deleteProject;
