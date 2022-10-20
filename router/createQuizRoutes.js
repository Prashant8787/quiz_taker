const express = require("express");
const router = express.Router();
const createQuizModel = require("../models/CreateQuizModel.js");
const { route } = require("./quizRoutes.js");

router.post("/createquiz", async (req, res) => {
  const {
    quizId,
    quizName,
    quizSubject,
    
   
  } = req.body;
  console.log(quizName);
  if (
    !quizId ||
    !quizName ||
    !quizSubject 
    
  ) {
    res.status(400).json({ message: "please fill all the quiz data" });
  } else {
    const createQuizData = new createQuizModel({ 
      quizId,
      quizName,
      quizSubject,
      

    });
   
    try {
      console.log(createQuizData);
      await createQuizData.save();
      res
        .status(200)
        .json({ success: "ok", message: "created quiz data is saved" });
    } catch (err) {
      console.log(createQuizData);
      res.status(500).json({
        success: "fail",
        result: {
          message: "unable to save the created quiz data",
          error: err,
        },
      });
    }
   }
});

router.get("/getcreatequiz", async (req, res) => {
  try {
    const createQuizData = await createQuizModel.find();
    res.status(200).json({ success: "ok", result: createQuizData });
  } catch (err) {
    res.status(500).json({
      success: "fail",
      result: {
        message: "unable to get the data",
        error: err,
      },
    });
  }
});

router.get("/showquizname/:id",async (req , res)=>{
  const quizId = req.params.id;
  // console.log(quizId);
  try {

   const questionData = await createQuizModel.find({quizId:quizId});
   // console.log(questionData);
   res.status(200).json({msg:"Data of question of particular subject", result:questionData});
   
  } catch (err) {
   res.status(400).json({error:err, result:"Question is not added"});
  } 
  

});

module.exports = router;
