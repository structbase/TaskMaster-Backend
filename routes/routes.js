const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/auth");

const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");

const createProject = require("../controllers/createProjects");
const getProjects = require("../controllers/getProjects")
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

module.exports = router;
