const Project = require("../../models/Project");

async function createProject(req, res) {
    try {
        /**
         * Validation
         * Ensuring the required fields are present
         */
        if (!req.body.name || !req.body.description)
            return res.status(400).json({
                message: "Please make sure project has name and description.",
            });
        /**
         * Creating the actual Project
         * Explicit mapping of what user enter and data fields in schema
         */
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            user: req.user._id,
        });

        /**
         * Reponse
         * Status reponse 201 and created project
         */
        res.status(201).json(project);
    } catch (error) {
        /**
         * Response & Error handling
         * Either Server error and something unknown
         */
        res.status(400).json({
            message: error.message,
        });
    }
}

module.exports = createProject;
