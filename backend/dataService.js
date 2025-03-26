const ProductModel = require("./ProductModel");
const { CartItem } = require("./CartItem");

async function getProductsByColor(color) {
  return await ProductModel.find({
    productName: { $regex: color, $options: "i" },
  });
}

async function getCartItemsByUser(userId) {
  return await CartItem.findOne({ userId }).populate("products.productId");
}

module.exports = { getProductsByColor, getCartItemsByUser };
