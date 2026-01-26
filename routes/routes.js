const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/auth");

const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");
const createProject = require("../controllers/createProject");

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

router.post("/project", createProject);

module.exports = router;
