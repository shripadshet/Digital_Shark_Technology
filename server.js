// const userRoute = require("./Route/UserRoute");

// const UserCtrl = require("./Controller/UserCtrl");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const UserModel = require("./model/userModel");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test-collection");

const app = express();

app.use(cors());

app.use(express.json());

app.listen(1337, () => {
  console.log("server 5000 started");
});

app.post("/register", async (req, res) => {
  await UserModel.create({
    firstName: req.body.name,
    lastName: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
    role: req.body.role,
  });

  res.json({
    status: "200 backend connected",
  });
});

app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token, logedInUser: user });
  } else if (!user) {
    return res.json({ status: "error", error: "Invalid login", user: false });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const allUser = await UserModel.find({});

    res.send({ users: allUser });
  } catch (error) {
    console.error(error);
  }
});
