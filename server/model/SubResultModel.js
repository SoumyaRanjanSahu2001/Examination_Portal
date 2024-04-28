const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    exam_id: {
      type: String,
      required: true,
    },
    short_q_answers: [],
    long_q_answers: [],
    sq_marks: [],
    lq_marks: [],
    percentage: {
      type: String,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    s_count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SubResult = mongoose.model("subresults", resultSchema);

module.exports = SubResult;
