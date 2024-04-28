const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorization = require("../middleware/authorization");
const { Mail } = require("../Email_Setup");
const secretKey = process.env.SECRET;

router.get("/getAllStudents", authorization, async (req, res) => {
  try {
    const students = await User.find({ isAdmin: false });
    res.send(students);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getAllStudentsByYear", authorization, async (req, res) => {
  const { year } = req.body;
  try {
    const students = await User.find({ year: year, isAdmin: false });
    res.send(students);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/getStudentByIds", authorization, async (req, res) => {
  const { user_ids } = req.body;
  //  console.log(user_ids);
  try {
    const students = await Promise.all(
      user_ids.map(async (user_id) => {
        const student = await User.findOne(
          { _id: user_id },
          { password: 0, isAdmin: 0 }
        );
        // console.log(student)
        return student ? student : null;
      })
    );
    res.send(students);
  } catch (err) {
    // console.log(err)
    res.status(400).json({ message: err });
  }
});

///////////////////// Register User    ////////////////////////
router.post("/addUser", authorization, async (req, res) => {
  const { name, email, mobile, registration_no, password, year } = req.body;
  if (!name || !email || !mobile || !registration_no || !password || !year) {
    return res.status(422).json({ error: "plz fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ registration_no: registration_no });
    if (userExist) {
      return res.status(422).json({ error: "Student already exist" });
    } else {
      const student = new User({
        name,
        email,
        mobile,
        registration_no,
        password,
        year,
      });
      //hashing password
      await student.save();

      Mail({
        email: email,
        subject: "Login Credentials for MCA Examination Portal.",
        userId: registration_no,
        password: password,
      });

      res.status(201).json({ message: "user registered sucessfully" });
    }
  } catch (err) {
    res.status(400).json({
      error: "bad request",
    });
  }
});

router.post("/login", async (req, res) => {
  const { registration_no, password } = req.body;
  if (!registration_no || !password) {
    return res
      .status(422)
      .json({ message: "Please fill the fields properly.." });
  }
  try {
    const user = await User.findOne({ registration_no: registration_no });
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (isMatch) {
        const accessToken = await jwt.sign(
          {
            userId: user.id,
            isAdmin: user.isAdmin,
            name: user.name,
            year: user.year,
          },
          secretKey
        );

        res.cookie("jwtoken", accessToken, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        const UserData = {
          _id: user._id,
          email: user.email,
          name: user.name,
          mobile: user.mobile,
          registration_no: user.registration_no,
          isAdmin: user.isAdmin,
        };
        return res
          .status(200)
          .json({ message: "login successful..", user: UserData });
      } else {
        return res.status(422).json({ message: "Invalid credentials..." });
      }
    } else {
      return res.status(422).json({ message: "Invalid Credentials.." });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong..." });
  }
});

router.get("/rootUser", authorization, async (req, res) => {
  const userId = req.userId;
  const year = req.year;
  const resp = await User.findOne(
    { _id: userId, year: year },
    { password: 0, _id: 0 }
  );
  // console.log(resp)
  res.send(resp);
});

router.get("/logout", authorization, (req, res) => {
  //  console.log('Hello my About');
  // res.send(`Hello About world from the server`)
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

router.post("/updateUser", authorization, async (req, res) => {
  const user = req.body;
  // console.log(user);
  try {
    const resp = await User.updateOne(
      { _id: user.userId },
      {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        registration_no: user.registration_no,
        year: user.year,
      }
    );
    if (!resp) {
      res.status(500).json({ message: "something went wrong" });
    }
    res.send("successfully Updated...");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/deleteUser", authorization, async (req, res) => {
  const userId = req.body;
  // console.log(userId)
  try {
    const resp = await User.findOneAndDelete({ _id: userId._id });
    if (resp) {
      res.send("user deleted successfully..");
    } else {
      res.status(400).json({ message: "bad request" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
