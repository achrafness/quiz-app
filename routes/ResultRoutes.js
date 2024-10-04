const express = require("express");
const router = express.Router();
const { createResult, getResults } = require("../controllers/ResultController");

router.route("/").post(createResult).get(getResults);
module.exports = router;
