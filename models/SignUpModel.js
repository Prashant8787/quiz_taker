const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignUpSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
    unique: [true, "Email id already present"],
  },
  Mobile: {
    type: String,
    require: true,
  },
  Designation: {
    type: String,
    require: true,
  },

  Password: {
    type: String,
    require: true,
  },
  
  
  Tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
},{timestamps:true});

SignUpSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    console.log("hello");
    this.Password = bcrypt.hash(this.Password, 12);
  }
  next();
});

SignUpSchema.methods.generateAuthToken = async function () {
  try {
    console.log("generate");
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.Tokens = this.Tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  } 
};

const SignUp = mongoose.model("signup", SignUpSchema);
module.exports = SignUp;
