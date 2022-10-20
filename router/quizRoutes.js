const express = require("express");
const router = express.Router();
const quizSchema = require("../models/QuizModel.js");

router.post("/quiz", async (req, res) => {
  const { question, option1, option2, option3, answer } = req.body;
  if (!question || !option1 || !option2 || !option3 || !answer) {
    res.status(204).json({ message: "Please fill all the data" });
  } else {
    const quiz = new quizSchema({
      question,
      option1,
      option2,
      option3,
      answer,
    });
    await quiz
      .save()
      .then(() => {
        console.log("saved");
        res.status(200).json({ message: "Question is saved successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
});

router.get("/getquiz", async (req, res) => {
  try {
    const resultData = await quizSchema.find();
    res.status(200).json({ success: "ok", result: resultData });
  } catch (err) {
    res
      .status(500)
      .json({
        success: "fail",
        result: {
          message: "Unable to find the data at the moment",
          error: err,
        },
      });
  }
});

module.exports = router;
