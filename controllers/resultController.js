const Result = require("../models/Result");
const Question = require("../models/Question");
const { StatusCodes } = require("http-status-codes");

const createResult = async (req, res) => {
  const { username, answers } = req.body;
  if (!username || !answers) {
    return res.status(StatusCodes.BAD_REQUEST).send("Please provide username and answers");
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

  res.status(StatusCodes.CREATED).json({ result });
};


const getResults = async (req, res) => {
  const results = await Result.find({}).sort({ score: -1 });
  res.status(StatusCodes.OK).json({ results });
};

const getStatistics = async (req, res) => {
  try {
    const results = await Result.find({});

    if (results.length === 0) {
      return res.status(StatusCodes.OK).json({
        totalParticipants: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        scoreDistribution: {},
      });
    }

    const totalParticipants = results.length;
    const totalScore = results.reduce((acc, result) => acc + result.score, 0);
    const averageScore = (totalScore / totalParticipants).toFixed(2); // Calculate average score
    const highestScore = Math.max(...results.map((result) => result.score)); // Get highest score
    const lowestScore = Math.min(...results.map((result) => result.score)); // Get lowest score

    // Score distribution (example: ranges 0-3, 4-6, 7-10)
    const scoreDistribution = {
      "0-3": results.filter((result) => result.score >= 0 && result.score <= 3)
        .length,
      "4-6": results.filter((result) => result.score >= 4 && result.score <= 6)
        .length,
      "7-10": results.filter(
        (result) => result.score >= 7 && result.score <= 10
      ).length,
    };

    res.status(StatusCodes.OK).json({
      totalParticipants,
      averageScore,
      highestScore,
      lowestScore,
      scoreDistribution,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error fetching statistics");
  }
};

module.exports = {
  createResult,
  getResults,
  getStatistics,  
};
