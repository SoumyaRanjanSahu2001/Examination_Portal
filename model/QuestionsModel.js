const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: { type: String, required: true },
    options: [],
    answer: { type: Number, required: true },
  });

const Questions = mongoose.Schema({
    exam_id:{
        type: String,
        required: true
    },
    questions:[ questionSchema ]
    
});

const Question =  mongoose.model("Questions",Questions);

module.exports = Question;