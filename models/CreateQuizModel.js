const mongoose = require("mongoose");

const createQuizSchema = mongoose.Schema(
  {
    quizId: {
      type: String,
      require: true,
    },
    quizName: {
      type: String,
      require: true,
    },
    quizSubject: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("createQuiz", createQuizSchema);
