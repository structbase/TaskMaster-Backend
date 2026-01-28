const Task = require("../../models/Task");
const Project = require("../../models/Project");

async function createTask(req, res) {
    try {
        /**
         * Validation
         * Ensuring the required fields are present
         */
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({
                message: "Task must have title and description.",
            });
        }

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
         * Validatio checking of authorization
         * ensure user owns the project
         */
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message:
                    "You do not have permission to add tasks to this project.",
            });
        }

        /**
         * Creating the actual task
         * Explicit mapping of what user enter and data fields in schema
         */
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status, // optional
            project: req.params.projectId,
        });

        /**
         * Reponse
         * Status reponse 201 and created task
         */
        res.status(201).json(task);
    } catch (error) {
        /**
         * Response & Error handling
         * Either Server error and something unknown
         */
        res.status(500).json({
            message: "Could not create task.",
        });
    }
}

module.exports = createTask;
