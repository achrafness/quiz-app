const express = require("express");
const router = express.Router();
const { createResult, getResults } = require("../controllers/resultController");

router.route("/").post(createResult).get(getResults);
module.exports = router;
