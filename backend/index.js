const express = require("express");
require("./Models/db");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const AuthRo = require("./Routes/Authrouter");
const chatRoutes = require("./Routes/chatRoutes");
const ProductRouter = require("./Routes/ProductRouter");
const CartRouter = require("./Routes/CartRouter");
const adminRouter = require("./Routes/adminRouter");
app.use(bodyParser.json());
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/auth", AuthRo);
app.use("/products", ProductRouter);
app.use("/admin", adminRouter);
app.use("/cart", CartRouter);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
