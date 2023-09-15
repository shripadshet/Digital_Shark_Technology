
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");



const app = express();

app.use(cors());

app.use(express.json());


const index = require("../db/index")

const UserModel = require("../model/userModel");
const { model } = require("mongoose");



const CreateUser = async (req, res) => {
    await UserModel.create({
      firstName: req.body.name,
      lastName: req.body.lastname,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
    });
  
    res.json({
      status: "200 backend connected",
    });
  }

  const userLogin =  async (req, res) => {
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
  
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      console.log(token);
  
      return res.json({ status: "ok", user: token });
    } else if (!user) {
      return res.json({ status: "error", error: "Invalid login", user: false });
    } else {
      return res.json({ status: "error", user: false });
    }
  }

  const getUser = async (req, res) => {
    try {
      const allUser = await UserModel.find({});
  
      res.send({ users: allUser });
    } catch (error) {
      console.error(error);
    }
  }

  model.exports = {
    CreateUser,
    userLogin,
    getUser
  }


// app.post(register, async (req, res) => {
//     await UserModel.create({
//       firstName: req.body.name,
//       lastName: req.body.lastname,
//       email: req.body.email,
//       age: req.body.age,
//       password: req.body.password,
//     });
  
//     res.json({
//       status: "200 backend connected",
//     });
//   });

//   app.post(login, async (req, res) => {
//     const user = await UserModel.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     console.log(user);
  
//     if (user) {
//       const token = jwt.sign(
//         {
//           name: user.name,
//           email: user.email,
//         },
//         "secret123"
//       );
//       console.log(token);
  
//       return res.json({ status: "ok", user: token });
//     } else if (!user) {
//       return res.json({ status: "error", error: "Invalid login", user: false });
//     } else {
//       return res.json({ status: "error", user: false });
//     }
//   });

//   app.get(dashboard, async (req, res) => {
//     try {
//       const allUser = await UserModel.find({});
  
//       res.send({ users: allUser });
//     } catch (error) {
//       console.error(error);
//     }
//   });
