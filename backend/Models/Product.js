const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    require: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  isBestseller: {
    type: Boolean,
    required: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
