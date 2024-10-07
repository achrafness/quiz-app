const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  getQuestion,
  postQuestion,
  patchQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { authenticate } = require("../middleware/authentication");
router.route("/").get(getAllQuestions).post(authenticate,postQuestion);
router
  .route("/:id")
  .get(getQuestion)
  .patch(authenticate, patchQuestion)
  .delete(authenticate,deleteQuestion);



module.exports = router;