const express = require("express");
const router = express.Router();
const QuestionsModel = require("../model/QuestionsModel");
const SubjectiveQuestion = require("../model/SubjectQuestionModel");

// router.get("/getAllQuestions",async(req,res)=>{
//     try{
//         const questions = await QuestionsModel.find({});
//         res.send(questions);
//     }catch(err){
//         res.status(400).json({message:err})
//     }
// });

//get All questions of an exam

router.post("/getAllQuestions", async (req, res) => {
  const { exam_id } = req.body; // The ID of the exam
  //  console.log(exam_id)
  try {
    const questions = await QuestionsModel.find({ exam_id: exam_id });
    //  console.log(questions);
    res.send(questions);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//Add Questions

router.post("/addNewQuestion", async (req, res) => {
  const ques = req.body;
  //   console.log(ques)
  //   console.log(ques.questions)
  try {
    const question = new QuestionsModel({
      exam_id: ques.exam_id,
      questions: ques.questions,
    });
    // const resp = await QuestionsModel.findByIdAndUpdate(exam_id, { $push: { questions: questions } });
    // console.log(resp);
    await question.save();
    res.status(201).send("Question added successfully..");
  } catch (err) {
    // console.log(err)
    res.status(400).json({ message: err });
  }
});

//Update Existing question

router.post("/updateQuestion", async (req, res) => {
  const data = req.body;
  // console.log(data.code)
  const updatedQuestion = {
    title: data.title,
    code: data.code,
    options: data.options,
    answer: data.answer,
  };
  try {
    await QuestionsModel.findOneAndUpdate(
      { exam_id: data.exam_id, "questions._id": data.questionId },
      {
        $set: {
          "questions.$.title": updatedQuestion.title,
          "questions.$.code": updatedQuestion.code,
          "questions.$.options": updatedQuestion.options,
          "questions.$.answer": updatedQuestion.answer,
        },
      }
    );

    res.status(200).send("Question updated successfully.");
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//delete a Question

router.post("/deleteQuestion", async (req, res) => {
  const QID = req.body;

  //  console.log(QID)
  // console.log(questionIndex);
  try {
    // Construct the update query
    const query = { _id: QID.QuestionsId }; // Search for the question
    const update = { $pull: { questions: { _id: QID._id } } }; // delete the perticular question
    // Execute the update query
    const resp = await QuestionsModel.updateOne(query, update);

    // console.log(resp)
    if (!resp) {
      res.status(500).json({ message: "somthing went wrong..." });
    } else {
      res.status(200).send("Question deleted successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/insertQuestion", async (req, res) => {
  const { exam_id, questions } = req.body;
  // console.log(exam_id,questions)
  try {
    const resp = await QuestionsModel.findOneAndUpdate(
      { exam_id: exam_id },
      { $push: { questions: questions } }
    );
    if (!resp) {
      res.status(500).json({ message: "something went wrong..." });
    } else {
      res.send("successfully added...");
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// ///////////////////////////Routes For Long Question///////////////////////////////

router.post("/addNewSQuestion", async (req, res) => {
  const ques = req.body;
  // console.log(ques.sMark);
  try {
    const question = new SubjectiveQuestion({
      exam_id: ques.exam_id,
      shortquestions: ques.sQuestion,
      longquestions: ques.lQuestion,
      smark: ques.sMark,
      lmark: ques.lMark,
    });
    await question.save();
    // console.log(resp)
    res.status(201).send("Question added successfully..");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

//get All questions of an exam

router.post("/getAllSubQuestions", async (req, res) => {
  const { exam_id } = req.body; // The ID of the exam
  // console.log(exam_id);
  try {
    const questions = await SubjectiveQuestion.find({ exam_id: exam_id });
    // console.log(questions);
    res.send(questions);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/insertSubSQuestion", async (req, res) => {
  const { exam_id, sQuestion } = req.body;
  // console.log(exam_id,questions)
  try {
    const resp = await SubjectiveQuestion.findOneAndUpdate(
      { exam_id: exam_id },
      { $push: { shortquestions: sQuestion } }
    );
    if (!resp) {
      res.status(500).json({ message: "something went wrong..." });
    } else {
      res.send("successfully added...");
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post("/insertSubLQuestion", async (req, res) => {
  const { exam_id, lQuestion } = req.body;
  // console.log(exam_id,questions)
  try {
    const resp = await SubjectiveQuestion.findOneAndUpdate(
      { exam_id: exam_id },
      { $push: { longquestions: lQuestion } }
    );
    if (!resp) {
      res.status(500).json({ message: "something went wrong..." });
    } else {
      res.send("successfully added...");
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//Update Existing short question

router.post("/updateShortQuestion", async (req, res) => {
  const data = req.body;
  // console.log(data.code)
  const updatedQuestion = {
    sQTitle: data.sQTitle,
    code: data.code,
  };
  try {
    await SubjectiveQuestion.findOneAndUpdate(
      { exam_id: data.exam_id, "shortquestions._id": data.questionId },
      {
        $set: {
          "shortquestions.$.sQTitle": updatedQuestion.sQTitle,
          "shortquestions.$.code": updatedQuestion.code,
        },
      }
    );

    res.status(200).send("Question updated successfully.");
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//Update Existing Long question

router.post("/updateLongQuestion", async (req, res) => {
  const data = req.body;
  // console.log(data.code)
  const updatedQuestion = {
    lQTitle: data.lQTitle,
  };
  try {
    await SubjectiveQuestion.findOneAndUpdate(
      { exam_id: data.exam_id, "longquestions._id": data.questionId },
      {
        $set: {
          "longquestions.$.lQTitle": updatedQuestion.lQTitle,
        },
      }
    );

    res.status(200).send("Question updated successfully.");
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//delete Short Question

router.post("/deleteShortQuestion", async (req, res) => {
  const QID = req.body;

  //  console.log(QID)
  // console.log(questionIndex);
  try {
    // Construct the update query
    const query = { _id: QID.QuestionsId }; // Search for the question
    const update = { $pull: { shortquestions: { _id: QID._id } } }; // delete the perticular question
    // Execute the update query
    const resp = await SubjectiveQuestion.updateOne(query, update);

    // console.log(resp)
    if (!resp) {
      res.status(500).json({ message: "somthing went wrong..." });
    } else {
      res.status(200).send("Question deleted successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete Long Question

router.post("/deleteLongQuestion", async (req, res) => {
  const QID = req.body;

  //  console.log(QID)
  // console.log(questionIndex);
  try {
    // Construct the update query
    const query = { _id: QID.QuestionsId }; // Search for the question
    const update = { $pull: { longquestions: { _id: QID._id } } }; // delete the perticular question
    // Execute the update query
    const resp = await SubjectiveQuestion.updateOne(query, update);

    // console.log(resp)
    if (!resp) {
      res.status(500).json({ message: "somthing went wrong..." });
    } else {
      res.status(200).send("Question deleted successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
