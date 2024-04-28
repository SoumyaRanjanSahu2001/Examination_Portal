const express = require("express");
const Result = require("../model/ResultModel");
const authorization = require("../middleware/authorization");
const SubResult = require("../model/SubResultModel");
const router = express.Router();

router.get("/getResults", authorization, async (req, res) => {
  const results = await Result.find({});
  res.send(results);
});

router.post("/setResult", authorization, async (req, res) => {
  const { exam_id, answers, percentage, count } = req.body;
  const user_id = req.userId;
  // console.log(count)
  try {
    const result = new Result({
      user_id,
      exam_id,
      answers,
      percentage,
      s_count: count,
    });

    await result.save();
    res.status(201).send("Result added successfully..");
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getResultByExamId", authorization, async (req, res) => {
  const { exam_id } = req.body;

  try {
    const resp = await Result.find({ exam_id: exam_id });
    res.send(resp);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getResultByUserId", authorization, async (req, res) => {
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

router.post("/getResultByUserIds", authorization, async (req, res) => {
  const exam_ids = req.body;
  const user_id = req.userId;
  try {
    const results = await Promise.all(
      exam_ids.map(async (exam_id) => {
        const result = await Result.findOne({
          exam_id: exam_id,
          user_id: user_id,
        });
        return result ? result : null;
      })
    );
    res.send(results);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

////////////////////////////// Routes For Subjective results //////////////////

router.get("/getSubResults", authorization, async (req, res) => {
  const results = await SubResult.find({});
  res.send(results);
});

router.post("/setSubResult", authorization, async (req, res) => {
  const { exam_id, sanswer, lanswer, isCompleted, count } = req.body;
  const user_id = req.userId;
  // console.log(count)
  try {
    const result = new SubResult({
      user_id,
      exam_id,
      short_q_answers: sanswer,
      long_q_answers: lanswer,
      isCompleted: isCompleted,
      s_count: count,
    });
    await result.save();
    res.status(201).send("Result added successfully..");
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getSubResultByExamId", authorization, async (req, res) => {
  const { exam_id } = req.body;

  try {
    const resp = await SubResult.find({ exam_id: exam_id });
    res.send(resp);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getSubResultByUserId", authorization, async (req, res) => {
  const { exam_id } = req.body;
  // console.log(exam_id);
  const user_id = req.userId;
  try {
    const data = await SubResult.find({ exam_id: exam_id, user_id: user_id });
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

router.post("/getSubResultByUserIds", authorization, async (req, res) => {
  const exam_ids = req.body;
  const user_id = req.userId;
  try {
    const results = await Promise.all(
      exam_ids.map(async (exam_id) => {
        const result = await SubResult.findOne({
          exam_id: exam_id,
          user_id: user_id,
        });
        return result ? result : null;
      })
    );
    res.send(results);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/setSubMarks",async(req,res)=>{
  const {_id,sq_marks,lq_marks,percentage} = req.body;
  try{
    const resp = await SubResult.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          sq_marks,
          lq_marks,
          percentage
        },
      }
    )

    if(resp){
      res.send("successfully submitted...")
    }else{
      res.status(400).send("error occured...")
    }
  }catch(err){
    res.status(500).json({message:err})
  }
})

module.exports = router;
