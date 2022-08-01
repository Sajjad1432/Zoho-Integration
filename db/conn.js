const mongoose = require("mongoose");
const keys = require('../config/keys');

const DB = keys.mongoURI;

mongoose.connect(DB).then(()=> {
  console.log("DB Connection Successful")
}) .catch((err)=> console.log("No DB Connection"))
