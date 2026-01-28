const Task = require("../../models/Task");
const Project = require("../../models/Project");

async function updateTask(req, res) {
    try {
        /**
         * Find and update task ONLY if it belongs to the logged-in user
         */
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found.",
            });
        }

        /**
         * Find the parent project
         */
        const project = await Project.findById(task.project);

        if (!project) {
            return res.status(404).json({
                message: "Parent project not found.",
            });
        }

        /**
         *  Ownership check
         */
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to update this task.",
            });
        }

        /**
         * Update the task
         */
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        /**
         * Respond with updated task
         */
        res.json(updatedTask);
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

module.exports = updateTask;
