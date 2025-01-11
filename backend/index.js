const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const AuthRouter = require("./Routes/Authrouter");

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});

app.use("/auth", AuthRouter);
