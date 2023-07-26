const mongoose = require('mongoose');

// const questionSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     options: [],
//     answer: { type: Number, required: true },
//   });

const Examinations = mongoose.Schema({
    exam_name:{
        type: String,
        required : true,
        unique:true
    },
    teacher_id:{
        type: String,
        required : true
    },
    teacher_name:{
        type: String,
        required : true
    },
    // objective:{
    //     type: Boolean,
    //     required: true
    // },
    exam_date:{
        type: String,
        required:true
    },
    exam_type:{
        type: Boolean,
        // required: true
    },
    exam_time:{
        type: Number,
        // required: true
    },
    year: {
        type: Number,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true,
        default: false
    }
},
{timestamps : true});

const Examination =  mongoose.model("Examinations",Examinations);

module.exports = Examination;




