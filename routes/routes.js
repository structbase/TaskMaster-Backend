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
/**
 * Public Routes
 */
router.post("/register", userRegister);
router.post("/login", userLogin);

/**
 * Authenticated Routes
 */
router.use(authMiddleware);

/**
 * Protected Routes
 */
router.post("/projects", createProject);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById)
router.put("/projects/:id", updateProject)
router.delete("/projects/:id", deleteProject)

module.exports = router;
