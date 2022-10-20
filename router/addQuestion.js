const express = require("express");
const questionModel = require("../models/QuestionModel.js");
const router = express.Router();
const createQuizModel = require("../models/CreateQuizModel.js");
router.post("/addquestion", async(req,res)=>{
      const {quizId , question , option1 , option2 , option3 , answer} = req.body;
      if(!quizId || !question || !option1 || !option2 || !option3 || !answer){
        res.status(400).json({err:"Please fill all the data"});
      }
      else{
        try {
            const questionData = new questionModel({quizId , question , option1 , option2 , option3 , answer});
            await questionData.save();
            res.status(200).json({result:questionData});
        } catch (err) {
            res.status(400).json({error:err, result:"Question is not added"});
        }
      }
});

router.post("/showquestion",async (req , res)=>{
       const {quizId} = req.body;
      //  console.log(quizId);
       try {

        const questionData = await questionModel.find({quizId:quizId});
        // console.log(questionData);
        res.status(200).json({msg:"Data of question of particular subject", result:questionData});
        
       } catch (err) {
        res.status(400).json({error:err, result:"Question is not added"});
       }
       

});

router.delete("/deletequiz/:id", async (req , res)=>{
    const {id} = req.params;
    console.log(id);
    try {
      const deletedata = await createQuizModel.deleteOne({_id:id});
      res.status(200).json({msg:"Quiz is deleted", result : deletedata});
    } catch (err) {
      res.status(400).json({msg:"Error Occured , not deleted" , error :err});
    }
});

router.get("/getallquiz", async (req,res)=>{
  try {
    const resultdata = await createQuizModel.find();
    res.status(200).json({msg:"got all quiz data" , result:resultdata});
  } catch (error) {
    res.status(400).json({msg:"error occured" , err:error});
  }

})

module.exports = router;