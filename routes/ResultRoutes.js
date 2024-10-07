const express = require("express");
const router = express.Router();
const {
  createResult,
  getResults,
  getStatistics,
} = require("../controllers/resultController");
const { authenticate } = require("../middleware/authentication");
router.route("/").post(createResult).get(getResults);
router.route("/statistics").get(authenticate,getStatistics);
module.exports = router;
