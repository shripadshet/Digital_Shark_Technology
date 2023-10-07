const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test-collection");

const app = express();

app.use(cors());

app.use(express.json());

app.use(`/api`, require("./Route/UserRoute"));

app.listen(1337, () => {
  console.log("server 5000 started");
});

