const ProductAuth = require("../Middleware/ProductAuth");

const router = require("express").Router();

const {
  addProduct,
  getAllProduct,
  getProductById,
} = require("../Controller/ProductController");
const upload = require("../Middleware/Multre");

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  ProductAuth,
  addProduct
);

router.get("/", getAllProduct);

router.get("/:id", getProductById);

module.exports = router;
