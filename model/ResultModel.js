const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    exam_id:{
        type: String,
        required: true
    },
    answers:[],
    percentage:{
        type:Number,
        required: true
    },
    s_count:{
        type:Number,
        required: true
    }
    
},
{timestamps : true});

const Result = mongoose.model("results",resultSchema);

module.exports = Result;