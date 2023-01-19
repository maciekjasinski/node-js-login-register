require("dotenv").config({ path: "../.env"});
const express = require("express");
const mongoose = require("mongoose");
const controller = require("./controler/controller")

const app = express();
app.use(express.json());

const dbUrl = `mongodb+srv://${process.env.MONGO_DB_LOGIN}:${process.env.MONGO_DB_PASSWORD}@cluster0.ubracyf.mongodb.net/database`;
mongoose.connect(dbUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true
}).then(() => {
  console.log(`Server listening on port ${process.env.PORT}`)
  return app.listen(`${process.env.PORT}`);
}).catch((err) => {
  console.log(err);
  return null;
});

app.post("/login/", controller.login)
app.post("/register/", controller.signup)
