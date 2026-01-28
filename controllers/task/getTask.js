const Task = require("../../models/Task");
const Project = require("../../models/Project");

async function getTask(req, res) {
    try {
        /**
         * Find the parent project
         */
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
            });
        }

        /**
         * Ownership check
         */
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to view tasks for this project.",
            });
        }

        /**
         * Fetch tasks for that project
         */
        const tasks = await Task.find({ project: project._id }).sort({
            createdAt: -1,
        });

        /**
         * Respond
         */
        res.json(tasks);
    } catch (error) {
        /**
         * Response & Error handling
         * Either Server error and something unknown
         */
        res.status(500).json({
            message: "Could not fetch task.",
            error: error.message,
        });
    }
}

module.exports = getTask;
