// create a result contain a username , score and date
const mongoose = require('mongoose');
const ResultSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    score: {
        type: Number,
        required: [true, 'Please provide a score'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Result', ResultSchema);