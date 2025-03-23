const { CartItem } = require("../Models/CartItem.js");
const ProductModel = require("../Models/Product.js");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

   
    console.log("Product Details:", product);

    let cart = await CartItem.findOne({ userId });

    if (cart) {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add only the first image (index 0) from the imageUrl array
        cart.products.push({
          productId,
          productName: product.productName,
          imageUrl: product.imageUrl[0], // Use only the first image URL
          quantity,
          price: product.price,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      await cart.save();
    } else {
      // Add only the first image (index 0) from the imageUrl array
      cart = await CartItem.create({
        userId,
        products: [
          {
            productId,
            productName: product.productName,
            imageUrl: product.imageUrl[0], // Use only the first image URL
            quantity,
            price: product.price,
          },
        ],
        totalPrice: product.price * quantity,
      });
    }

    // Debugging: Log the cart details
    console.log("Cart Details:", cart);

    res.status(201).json({ status: 201, cart });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};
// Get cart items
const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartItem.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart items", error: error.message });
  }
};

// Edit cart item (quantity update)
const editCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await CartItem.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    cart.products[itemIndex].quantity = quantity;

    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart item", error: error.message });
  }
};

// Delete entire cart
const deleteCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartItem.findOneAndDelete({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart", error: error.message });
  }
};

// Delete single cart item
const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await CartItem.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    if (cart.products.length === 0) {
      await CartItem.findOneAndDelete({ userId });
      return res.status(200).json({ message: "Cart is empty and deleted" });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
};
module.exports = {
  addToCart,
  getCartItems,
  editCartItem,
  deleteCart,
  deleteCartItem,
};
