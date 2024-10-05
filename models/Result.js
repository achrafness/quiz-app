const mongoose = require('mongoose');
const ResultSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    score: {
      type: Number,
      required: [true, "Please provide a score"],
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Result', ResultSchema);