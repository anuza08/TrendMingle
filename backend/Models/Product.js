const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
