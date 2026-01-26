const express = require("express");
const router = express.Router();

const userRegister = require("../controllers/userRegister");
const userLogin = require("../controllers/userLogin");


/**
 * Public Routes
 */
router.post("/register", userRegister);
router.post("/login", userLogin);


module.exports = router;
