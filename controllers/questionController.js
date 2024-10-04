const Question = require("../models/Question");

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.status(200).json({ questions });
}

const getQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  if (!question) {
    return res.status(404).send("There is no question with that id");
  }
  res.status(200).json({ question });
}

const postQuestion = async (req, res) => {
  const { question, answer, options } = req.body;
  if (!question || !answer || !options) {
    return res.status(400).send("Please provide question, answer and options");
  }
  const questionCreated = await Question.create(
    {
      question,
      answer,
      options,
    }
  );
  res.status(201).json({ questionCreated });
}

const patchQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, answer, options } = req.body;
  if (!question || !answer || !options) {
    return res.status(400).send("Please provide question, answer and options");
  }
  const questionUpdated = await Question.findByIdAndUpdate(
    id,
    {
      question,
      answer,
      options,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ questionUpdated });
}

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndDelete(id);
  if (!question) {
    return res.status(404).send("There is no question with that id");
  }
  res.status(204).send();
}

module.exports = {
  getAllQuestions,
  getQuestion,
  postQuestion,
  patchQuestion,
  deleteQuestion,
};