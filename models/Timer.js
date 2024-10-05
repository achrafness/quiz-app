const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Timer', TimerSchema);