const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    quizId:{
          type:String,
          require:true
    },
    question:{
        type:String,
        require:true
    },
    option1:{
        type:String,
        require:true
    },
    option2:{
        type:String,
        require:true
    },
    option3:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true
    }

},{timeStamps:true});

module.exports = mongoose.model('subjectquiz' , QuestionSchema);