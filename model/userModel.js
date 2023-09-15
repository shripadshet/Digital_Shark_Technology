const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    confirmPassword: { type: String },
    role : {type:String, required : true}
  },
  {
    collection: "user_data",
  }
);

const model = mongoose.model("UserData", userModel);

module.exports = model;
