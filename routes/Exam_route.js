const express = require('express');
const router = express.Router();
const ExaminationModel = require('../model/ExaminationModel');
const authorization = require('../middleware/authorization');
const QuestionModel = require('../model/QuestionsModel');

router.get("/getAllExams",authorization,async(req,res)=>{
    const user_id = req.userId;
    try{
        const exams = await ExaminationModel.find({teacher_id:user_id});
        // console.log(exams)
        res.send(exams);
    }catch(err){
        res.status(400).json({message:err})
    }
});

router.get("/getAllExamsByYear",authorization,async(req,res)=>{
    const year = req.year;
    try{
        const exams = await ExaminationModel.find({year:year});
        res.send(exams);
    }catch(err){
        res.status(400).json({message:err})
    }
});

//Create a exam

router.post("/createExam",authorization,async(req,res)=>{
    const exam = req.body;
    // console.log(exam);
    // console.log(req.userId);
    // console.log(req.name)
    console.log(exam.exam_time);
    try{
        const newExam = new ExaminationModel({
            exam_name: exam.exam_name,
            teacher_id: req.userId,
            teacher_name: req.name,
            exam_type: exam.exam_type,
            exam_time: exam.exam_time,
            exam_date: exam.exam_date,
            year:exam.year
        });
        // console.log(newExam)
        const resp = await newExam.save();
        //  console.log(resp)
        res.status(201).send(resp);
    }catch(error){
        res.status(400).json({message:error})
    }
});

//get Exam by id

router.post('/getExamById',async(req,res)=>{
    const {exam_id} = req.body;
    //  console.log(exam_id)
    try{
        const resp = await ExaminationModel.findOne({_id : exam_id});
        //  console.log(resp)
        res.send(resp);
    }catch(err){
        res.status(400).json({message:err})
    }
})

router.post('/getYearByID',async(req,res)=>{
    const {exam_id} = req.body;
    //   console.log(exam_id)
    try{
        const resp = await ExaminationModel.findOne({_id : exam_id});
        const year = resp.year;
        res.send({year:year});
    }catch(err){
        res.status(400).json({message:err})
    }
})

router.post('/getExamByName',async(req,res)=>{
    const {exam_name} = req.body;
    //  console.log(exam_name)
    try{
        const resp = await ExaminationModel.findOne({exam_name : exam_name});
        //  console.log(resp)
        res.send(resp);
    }catch(err){
        res.status(400).json({message:err})
    }
});

router.post('/deleteByID',async(req,res)=>{
    const {exam_id} = req.body;
    // console.log(exam_id)
    try{
        const resp = await ExaminationModel.findByIdAndDelete(exam_id);
        const respo = await QuestionModel.deleteMany({exam_id:exam_id})
        if(!resp){
            return res.status(404).json({message:"Exam not found"});
        }else{
            res.json({message:"Deleted successfully.."})
        }
        
    }catch(err){
        res.status(500).json({message:"error while deleting",err})
    }
});

router.post('/updateIsActive', async(req,res)=>{
    const examId = req.body;
    try{
        const resp = await ExaminationModel.findOneAndUpdate(
            {_id:examId.exam_id},
            {isActive: true}
        )
        if(!resp){
            res.status(400).json({message:"Bad request..."});
        }else{
            res.status(200).send("Activated successfully...");
        } 
    }catch(err){
        res.status(500).json({message:"error while updating",err})
    }
});

router.post('/updateExam',authorization,async(req,res)=>{
    const exam = req.body;
    // console.log(exam);
    try{
        const resp = await ExaminationModel.updateOne(
            {_id: exam.exam_id},
            {
                $set: {
                  exam_name: exam.exam_name,
                  teacher_id: exam.teacher_id,
                  teacher_name: exam.teacher_name,
                  exam_date: exam.exam_date,
                  exam_type: exam.exam_type,
                  exam_time: exam.exam_time,
                  year: exam.year,
                  isActive: exam.isActive
                }
              }
        )
        if(!resp){
            res.status(500).json({"message":"something went wrong"});
        }
        res.send("successfully Updated...")
        
    }catch(err){
        res.status(500).json({message:"some thing went wrong..."})
    }
});


module.exports = router