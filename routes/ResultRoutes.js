const express = require("express");
const router = express.Router();
const {
  createResult,
  getResults,
  getStatistics,
} = require("../controllers/resultController");

router.route("/").post(createResult).get(getResults);
router.route("/statistics").get(getStatistics);
module.exports = router;
