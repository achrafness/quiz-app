// add model for questions in mongoDB with qsm 
const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please provide a question'],
    },
    answer: {
        type: Number,
        required: [true, 'Please provide an answer'],
    },
    options: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('Question', QuestionSchema);