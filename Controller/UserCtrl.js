const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const UserCtrl = {
  register: async (req, res) => {
    try {
      const mailer = require("./Mailer");
      const user = await UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
        role: req.body.role,
      });
      mailer.sendGmail(req.body.email);
      res.json({
        createdUser: user,
        status: "200 backend connected",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  login: async (req, res) => {
    try {
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
        return res.json({ status: "ok", user: token });
      } else if (!user) {
        return res.json({
          status: "error",
          error: "Invalid login",
          user: false,
        });
      } else {
        return res.json({ status: "error", user: false });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getUser: async (req, res) => {
    try {
      const allUser = await UserModel.find({});
      res.send({ users: allUser });
    } catch (error) {
      console.error(error);
    }
  },

  searchUsers: async (req, res) => {
    let payload = req.body;
    await UserModel.find({
      $or: [
        { firstName: { $regex: `^${payload.payload}.*`, $options: "i" } },
        { lastName: { $regex: `^${payload.payload}.*`, $options: "i" } },
        { email: { $regex: `^${payload.payload}.*`, $options: "i" } },
      ],
    })
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => console.error(err));
  },
  filterUsers: async (req, res) => {
    const enteredAge = req.body.payload1;
    const enteredRole = req.body.payload2;
    await UserModel.find({
      age: { $lt: enteredAge },
      role: { $eq: enteredRole },
    })
      .then((data) => {
        res.send({ data });
      })
      .catch((err) => console.error(err));
  },

  emailExists: async (req, res) => {
    try {
      const userCount = await UserModel.countDocuments({
        email: req.body.emailExist,
      });
      if (userCount > 0) {
        res.json({ IsUserExist: true });
      } else {
        res.json({ IsUserExist: false });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
module.exports = UserCtrl;
