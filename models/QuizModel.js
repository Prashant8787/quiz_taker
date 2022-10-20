const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
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

});

module.exports = mongoose.model('quiz' , quizSchema);