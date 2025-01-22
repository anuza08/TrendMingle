const ProductAuth = require("../Middleware/ProductAuth");

const router = require("express").Router();

const {
  addProduct,
  getAllProduct,
  getProductById,
} = require("../Controller/ProductController");

router.post("/add", ProductAuth, addProduct);

router.get("/", getAllProduct);

router.get("/:id", getProductById);

module.exports = router;
