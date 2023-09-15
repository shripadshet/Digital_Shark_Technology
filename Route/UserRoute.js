const login = "/login";

const register ="/register";

const dashboard = "/dashboard";

const express = require ("express");

const { CreateUser, userLogin, getUser} = require ("../Controller/UserCtrl");



const router = express.Router();

router.post("/register", CreateUser);
router.post("/login", userLogin);
router.post("/dashboard", getUser);

module.exports = router;


