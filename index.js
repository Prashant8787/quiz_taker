const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const SignUpSchema = require("./models/SignUpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const quizRoutes = require("./router/quizRoutes.js");
const createQUizRoutes = require("./router/createQuizRoutes.js");
const addQuestionRoutes = require("./router/addQuestion.js")

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((resp) => {
    console.log("Connection established");
  })
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection succesful");
});

app.post("/SignUp", async (req, res) => {
  const name = req.body.Name;
  const email = req.body.Email;
  const designation = req.body.Designation;
  const password = req.body.Password;
  const mobile = req.body.Mobile;

  // if (referralCode) {
  //   const Refrerral = await SignUpSchema.findOne({
  //     ReferralCode: referralCode,
  //   });
  //   if (Refrerral) {
  //     try {
       

  //       const resultData = await SignUpSchema.findByIdAndUpdate(
  //         id,
  //         { $push: { referralCodeUsedBy: name } },
  //         { $set: { Coins: coin } }
  //       );
  //       await SignUpSchema.findByIdAndUpdate(id, { $set: { Coins: coin } });

  //       await resultData.save();
  //     } catch (err) {
  //       res.status(500).json({
  //         success: "fail",
  //         result: { error: err, message: "Unable to update at the moment" },
  //       });
  //     }
  //   }
  // }
  if (!name || !email || !password || !mobile) {
    res.json({ message: "Please fill all the data" });
  } else {
    
    const SignUp = new SignUpSchema({
      Name: name,
      Email: email,
      Mobile: mobile,
      Designation: designation,
      Password: password,
    });

    const data = await SignUp.save()
      .then((result) => {
        res.status(200).json({ message: "Your Registration Is Successful" });
        console.log("Data Saved");
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) res.json({ error: "Please fill all the data" });
    else {
      console.log(email, password);
      const userLogin = await SignUpSchema.findOne({ Email: email });

      if (userLogin) {
        const token = await userLogin.generateAuthToken();
        res.cookie("jwt", "hello");
        console.log(token);
        if (userLogin.Password == password) {
          res.json({ message: "Login Succesful", user: userLogin });
        } else {
          res.status(400).json({ err: "Please Enter Correct Password" });
        }
      } else {
        res.status(400).json({ err: "Enter the correct details" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.use(quizRoutes);
app.use(createQUizRoutes);
app.use(addQuestionRoutes);

app.get("/check", (req, res) => {
  res.send("hello everyone");
});

if(process.env.NODE_ENV === 'production'){
  
  const path = require("path");
  app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname, 'quiz-tracker', 'build')));
    res.sendFile(path.resolve(__dirname, 'quiz-tracker', 'build', 'index.html'));
  })
}
app.listen(port, () => {
  console.log("server is listenling port no. 4000");
});
