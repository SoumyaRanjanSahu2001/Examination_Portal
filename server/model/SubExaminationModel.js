const mongoose = require("mongoose");

// const questionSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     options: [],
//     answer: { type: Number, required: true },
//   });

const Examinations = mongoose.Schema(
  {
    exam_name: {
      type: String,
      required: true,
      unique: true,
    },
    teacher_id: {
      type: String,
      required: true,
    },
    teacher_name: {
      type: String,
      required: true,
    },
    // objective:{
    //     type: Boolean,
    //     required: true
    // },
    examTime: {
      type: Number,
      // required: true
    },
    exam_date: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const SubExamination = mongoose.model("SubExaminations", Examinations);

module.exports = SubExamination;
