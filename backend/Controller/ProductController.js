const cloudinary = require("cloudinary").v2;
const ProductModel = require("../Models/Product");

cloudinary.config({
  cloud_name: "dpwugcpvq",
  api_key: "663984361978425",
  api_secret: "RNaxCNmlQLxHm6FB-qgE3OXjp0Q",
});

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      price,
      category,
      subCategory,
      gender,
      sizes,
      stock,
      imageUrl,
      isBestseller,
    } = req.body;

    let imageUrls = [];

    if (req.files) {
      for (let file of req.files.image1) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          folder: "product_images",
        });
        imageUrls.push(uploadedImage.secure_url);
      }
    }
    if (imageUrl && imageUrl.length > 0) {
      imageUrls = imageUrl;
    }

    const newProduct = new ProductModel({
      productName,
      productDescription,
      price,
      imageUrl: imageUrls,
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
      message: "Fetched product data successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({
      message: error,
      success: false,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.status(200).json({
      product,
      message: "Product fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).json({ message: error, success: false });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(401)
        .json({ success: false, message: "Product not found" });
    }

    if (product.imageUrl && product.imageUrl.length > 0) {
      for (const imageUrl of product.imageUrl) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`product_images/${publicId}`);
      }
    }

    await ProductModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Product Deleted successfully" });
  } catch (error) {
    console.log("Error deleting product", error);
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
};
