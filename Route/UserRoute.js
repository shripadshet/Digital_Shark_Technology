const route = require("express").Router();

const UserCtrl = require("../Controller/UserCtrl");
route.post("/register", UserCtrl.register);
route.post("/login", UserCtrl.login);
route.get("/dashboard", UserCtrl.getUser);
route.post("/searchUsers", UserCtrl.searchUsers);
route.post("/filterUsers", UserCtrl.filterUsers);
route.post("/emailExists", UserCtrl.emailExists);

module.exports = route;
