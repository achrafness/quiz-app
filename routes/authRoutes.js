const express = require("express");
const router = express.Router();
const { login , logout , register } = require("../controllers/authController")


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
module.exports = router;
