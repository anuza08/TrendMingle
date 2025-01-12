const ProductAuth = require("../Middleware/ProductAuth");

const router = require("express").Router();

router.get("/", ProductAuth, req, (res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 2000,
    },
    {
      name: "tv",
      price: 24000,
    },
  ]);
});
module.exports = router;
