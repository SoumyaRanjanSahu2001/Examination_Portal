const mongoose = require('mongoose');

const squestionSchema = mongoose.Schema({
    sQTitle: { type: String },
    code: {type: String}
  });

  const lquestionSchema = mongoose.Schema({
    lQTitle: { type: String }
  });

const Questions = mongoose.Schema({
    exam_id:{
        type: String,
        required: true
    },
    smark: {type: Number},
    lmark: {type: Number},
    shortquestions:[squestionSchema],
    longquestions:[ lquestionSchema]
    
});

const SubjectiveQuestion =  mongoose.model("SubQuestions",Questions);

module.exports = SubjectiveQuestion;