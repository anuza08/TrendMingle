require("dotenv").config();
const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONNECT;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
  });
