const express = require('express');
const Result = require('../model/ResultModel');
const authorization = require('../middleware/authorization');
const router = express.Router();


router.get('/getResults',authorization,async(req,res)=>{
    const results = await Result.find({});
    res.send(results);
});

router.post('/setResult',authorization,async(req,res)=>{
    const {exam_id,answers,percentage,count} = req.body;
    const user_id = req.userId;
    // console.log(count)
    try{
        const result = new Result({user_id,exam_id,answers,percentage,s_count:count});

        await result.save();
        res.status(201).send("Result added successfully..");
    }catch(err){
        res.status(400).json({message:err});
    }

});

router.post('/getResultByExamId',authorization,async(req,res)=>{
    const {exam_id} = req.body;

    try{
        const resp = await Result.find({exam_id: exam_id});
        res.send(resp);
    }catch(err){
        res.status(400).json({message:err})
    }
});

router.post('/getResultByUserId', authorization,async (req, res) => {
    const { exam_id } = req.body;
    // console.log(exam_id);
    const user_id = req.userId;
    try {
      const data = await Result.find({ exam_id: exam_id, user_id: user_id });
    //   console.log(data);
    if (data.length === 0) {
      // No data found in the database
      res.send(null);
    } else {
      // Data found, send the results
      // console.log(data);
      res.send(data);
    }

    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  router.post("/getResultByUserIds",authorization,async(req,res)=>{
    const exam_ids = req.body;
    const user_id = req.userId;
   try{
       const results = await Promise.all(exam_ids.map(async(exam_id)=>{
           const result = await Result.findOne({exam_id: exam_id, user_id: user_id});
           return (result ?  result :null)
       }))
       res.send(results);
   }catch(err){
       res.status(400).json({message:err})
   }
  })





module.exports = router;