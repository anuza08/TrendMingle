const ProductModel = require("../Models/Product");

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      price,
      imageUrl,
      category,
      subCategory,
      gender,
      sizes,
      stock,
      isBestseller,
    } = req.body;
    console.log({ productName, productDescription, price, imageUrl });

    const newProduct = new ProductModel({
      productName,
      productDescription,
      price,
      imageUrl,
      category,
      subCategory,
      gender,
      sizes,
      stock,
      isBestseller,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      savedProduct,
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error adding product", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      products,
      message: "fetched product data successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({
      message: error,
      success: false,
      message: "Error in fetching data",
    });
  }
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = ProductModel.fintdById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Error fetching product", error, success: false });
    }
    res
      .status(200)
      .json({ product, message: "Product fetched succesfully", success: true });
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = { addProduct, getAllProduct, getProductById };
