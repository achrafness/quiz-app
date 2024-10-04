const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  getQuestion,
  postQuestion,
  patchQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

router.route("/").get(getAllQuestions).post(postQuestion);
router.route("/:id").get(getQuestion).patch(patchQuestion).delete(deleteQuestion);



module.exports = router;