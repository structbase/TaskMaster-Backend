const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/auth");

const userRegister = require("../controllers/user/userRegister");
const userLogin = require("../controllers/user/userLogin");

const createProject = require("../controllers/project/createProjects");
const getProjects = require("../controllers/project/getProjects");
const getProjectById = require("../controllers/project/getProjectsById")
const updateProject = require("../controllers/project/updateProject")
const deleteProject = require("../controllers/project/deleteProject")

const createTask = require("../controllers/task/createTask")
const getTask = require("../controllers/task/getTask");
const updateTask = require("../controllers/task/updateTask");
const deleteTask = require("../controllers/task/deleteTask");


/**
 * Public Routes
 */
router.post("/users/register", userRegister);
router.post("/users/login", userLogin);

/**
 * Authenticated Routes
 */
router.use(authMiddleware);

/**
 * Protected Routes (all routes below are authenticated)
 */

/**
 * Route for CRUD Project
 */
router.post("/projects", createProject);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById)
router.put("/projects/:id", updateProject)
router.delete("/projects/:id", deleteProject)

/**
 * Route for CRUD Task
 */
router.post("/projects/:projectId/tasks", createTask);
router.get("/projects/:projectId/tasks", getTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);


module.exports = router;
