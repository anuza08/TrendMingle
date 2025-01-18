const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  quantity: {
    type: Number,
    required: true,
  },
});