const express = require("express");
const DBCONN = require("./db_conn/Conn");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { Mail } = require("./Email_Setup");

//dotenv config
dotenv.config();

//Database conn
DBCONN();

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
//routes
app.use("/api/question", require("./routes/Question_route"));
app.use("/api/exam", require("./routes/Exam_route"));
app.use("/api/user", require("./routes/User_routes"));
app.use("/api/result", require("./routes/Result_route"));

//static files
// app.use(express.static(path.join(__dirname,'./client/build')));

// app.get('*', (req,res)=>{
//     res.sendFile(path.join(__dirname,'./client/build/index.html'));
// })

///////// sending emails///////////////
app.post("/api/email", Mail);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
