const Task = require("../../models/Task");
const Project = require("../../models/Project");

async function deleteTask(req, res) {
    try {
        /**
         *  Find the task by the ID provided in the URL parameters
         */
        const task = await Task.findById(req.params.taskId);

        /**
         * If no task is found, return 404
         */
        if (!task) {
            return res.status(404).json({
                message: "Task not found.",
            });
        }

        /**
         * Verify
         * By find is parent project
         */

        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Parent project not found.",
            });
        }

        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You do not have permission to delete this task.",
            });
        }

        /**
         * deleting the actul bookmakr
         */
        await task.deleteOne();

        /**
         * response confirm deletion
         */
        res.json({ message: "Task deleted successfully." });
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

module.exports = deleteTask;
