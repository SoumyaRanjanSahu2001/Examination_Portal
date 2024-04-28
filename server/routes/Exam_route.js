const express = require("express");
const router = express.Router();
const ExaminationModel = require("../model/ExaminationModel");
const authorization = require("../middleware/authorization");
const QuestionModel = require("../model/QuestionsModel");
const SubExamination = require("../model/SubExaminationModel");
const SubjectiveQuestion = require("../model/SubjectQuestionModel");
const SubResult = require("../model/SubResultModel");

router.get("/getAllExams", authorization, async (req, res) => {
  const user_id = req.userId;
  try {
    const exams = await ExaminationModel.find({ teacher_id: user_id });
    // console.log(exams)
    res.send(exams);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/getAllExamsByYear", authorization, async (req, res) => {
  const year = req.year;
  try {
    const exams = await ExaminationModel.find({ year: year });
    res.send(exams);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//Create a exam

router.post("/createExam", authorization, async (req, res) => {
  const exam = req.body;
  // console.log(exam);
  // console.log(req.userId);
  // console.log(req.name)
  // console.log(exam.exam_time);
  try {
    const newExam = new ExaminationModel({
      exam_name: exam.exam_name,
      teacher_id: req.userId,
      teacher_name: req.name,
      objective: exam.objective,
      exam_type: exam.exam_type,
      exam_time: exam.exam_time,
      exam_date: exam.exam_date,
      year: exam.year,
    });
    // console.log(newExam)
    const resp = await newExam.save();
    //  console.log(resp)
    res.status(201).send(resp);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//get Exam by id

router.post("/getExamById", async (req, res) => {
  const { exam_id } = req.body;
  //  console.log(exam_id)
  try {
    const resp = await ExaminationModel.findOne({ _id: exam_id });
    //  console.log(resp)
    res.send(resp);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getYearByID", async (req, res) => {
  const { exam_id } = req.body;
  //   console.log(exam_id)
  try {
    const resp = await ExaminationModel.findOne({ _id: exam_id });
    const year = resp.year;
    res.send({ year: year });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getExamByName", async (req, res) => {
  const { exam_name } = req.body;
  //  console.log(exam_name)
  try {
    const resp = await ExaminationModel.findOne({ exam_name: exam_name });
    //  console.log(resp)
    res.send(resp);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/deleteByID", authorization, async (req, res) => {
  const { exam_id } = req.body;
  // console.log(exam_id)
  try {
    const resp = await ExaminationModel.findByIdAndDelete(exam_id);
    const respo = await QuestionModel.deleteMany({ exam_id: exam_id });
    if (!resp) {
      return res.status(404).json({ message: "Exam not found" });
    } else {
      res.json({ message: "Deleted successfully.." });
    }
  } catch (err) {
    res.status(500).json({ message: "error while deleting", err });
  }
});

router.post("/updateIsActive", authorization, async (req, res) => {
  const examId = req.body;
  try {
    const resp = await ExaminationModel.findOneAndUpdate(
      { _id: examId.exam_id },
      { isActive: true }
    );
    if (!resp) {
      res.status(400).json({ message: "Bad request..." });
    } else {
      res.status(200).send("Activated successfully...");
    }
  } catch (err) {
    res.status(500).json({ message: "error while updating", err });
  }
});

router.post("/updateExam", authorization, async (req, res) => {
  const exam = req.body;
  console.log(exam.exam_id);
  try {
    const resp = await ExaminationModel.updateOne(
      { _id: exam.exam_id },
      {
        $set: {
          exam_name: exam.exam_name,
          teacher_id: exam.teacher_id,
          teacher_name: exam.teacher_name,
          exam_date: exam.exam_date,
          exam_type: exam.exam_type,
          exam_time: exam.exam_time,
          year: exam.year,
          isActive: exam.isActive,
        },
      }
    );
    if (!resp) {
      res.status(500).json({ message: "something went wrong" });
    }
    res.send("successfully Updated...");
  } catch (err) {
    res.status(500).json({ message: "some thing went wrong..." });
  }
});

//////////////////////Routes For Subjective Exams/////////////////////

router.post("/createSubExam", authorization, async (req, res) => {
  const exam = req.body;
  // console.log(exam);
  // console.log(req.userId);
  // console.log(req.name)
  // console.log(exam.exam_time);
  try {
    const newExam = new SubExamination({
      exam_name: exam.exam_name,
      teacher_id: req.userId,
      teacher_name: req.name,
      examTime: exam.examTime,
      exam_date: exam.exam_date,
      year: exam.year,
    });
    // console.log(newExam)
    const resp = await newExam.save();
    //  console.log(resp)
    res.status(201).send(resp);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/getAllSubExams", authorization, async (req, res) => {
  const user_id = req.userId;
  try {
    const exams = await SubExamination.find({ teacher_id: user_id });
    // console.log(exams);
    res.send(exams);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/getAllSubExamsByYear", authorization, async (req, res) => {
  const year = req.year;
  try {
    const exams = await SubExamination.find({ year: year });
    res.send(exams);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//get Exam by id

router.post("/getSubExamById", async (req, res) => {
  const { exam_id } = req.body;
  //  console.log(exam_id)
  try {
    const resp = await SubExamination.findOne({ _id: exam_id });
    //  console.log(resp)
    res.send(resp);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getSubExamByName", async (req, res) => {
  const { exam_name } = req.body;
  //  console.log(exam_name)
  try {
    const resp = await SubExamination.findOne({ exam_name: exam_name });
    //  console.log(resp)
    res.send(resp);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/deleteSubEByID", authorization, async (req, res) => {
  const { exam_id } = req.body;
  // console.log(exam_id)
  try {
    const resp = await SubExamination.findByIdAndDelete(exam_id);
    const respo = await SubjectiveQuestion.deleteMany({ exam_id: exam_id });
    if (!resp) {
      return res.status(404).json({ message: "Exam not found" });
    } else {
      res.json({ message: "Deleted successfully.." });
    }
  } catch (err) {
    res.status(500).json({ message: "error while deleting", err });
  }
});

router.post("/updateSubIsActive", authorization, async (req, res) => {
  const examId = req.body;
  try {
    const resp = await SubExamination.findOneAndUpdate(
      { _id: examId.exam_id },
      { isActive: true }
    );
    if (!resp) {
      res.status(400).json({ message: "Bad request..." });
    } else {
      res.status(200).send("Activated successfully...");
    }
  } catch (err) {
    res.status(500).json({ message: "error while updating", err });
  }
});

router.post("/updateSubExam", authorization, async (req, res) => {
  const exam = req.body;
  console.log(exam);
  try {
    const resp = await SubExamination.updateOne(
      { _id: exam.exam_id },
      {
        $set: {
          exam_name: exam.exam_name,
          // teacher_id: exam.teacher_id,
          teacher_name: exam.teacher_name,
          exam_date: exam.exam_date,
          // exam_type: exam.exam_type,
          examTime: exam.examTime,
          year: exam.year,
          isActive: exam.isActive,
        },
      }
    );
    if (!resp) {
      res.status(500).json({ message: "something went wrong" });
    }
    res.send("successfully Updated...");
  } catch (err) {
    res.status(500).json({ message: "some thing went wrong..." });
  }
});

router.post("/getSubYearByID", async (req, res) => {
  const { exam_id } = req.body;
  //   console.log(exam_id)
  try {
    const resp = await SubExamination.findOne({ _id: exam_id });
    const year = resp.year;
    res.send({ year: year });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});



module.exports = router;
