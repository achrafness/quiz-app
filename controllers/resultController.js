const Result = require("../models/Result");
const Question = require("../models/Question");

const createResult = async (req, res) => {
  const { username, answers } = req.body;
  if (!username || !answers) {
    return res.status(400).send("Please provide username and answers");
  }

  const questions = await Question.find({});
  let score = 0;

  questions.forEach((question) => {
    if (answers[question._id] === question.options[question.answer]) {
      score += 1;
    }
  });

  const result = await Result.create({ username, score });
  const results = await Result.find({}).sort({ score: -1 });

  // Emit updated scores using Socket.IO instance from the app
  const io = req.app.get("io");
  io.emit("scoreboardUpdate", results);

  res.status(201).json({ result });
};


// Get all results (for the scoreboard page)
const getResults = async (req, res) => {
  const results = await Result.find({}).sort({ score: -1 });
  res.status(200).json({ results });
};

module.exports = {
  createResult,
  getResults,
};
