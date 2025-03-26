const ChatService = require("../Services/chatService");
const ProductModel = require("../Models/Product");
const chatController = {
  handleMessage: async (req, res) => {
    try {
      const { message, userId } = req.body;
      const intent = await ChatService.classifyIntent(message);

      let response;
      switch (intent) {
        case "product_search":
          let searchQuery = await ChatService.extractSearchQuery(message);
          if (!searchQuery || searchQuery.toLowerCase().includes("all")) {
            const allProducts = await ProductModel.find().limit(50); // Adjust limit as needed
            return res.json(
              chatController.formatProductResponse(allProducts, "all products")
            );
          }

          const products = await ChatService.searchProducts(searchQuery);
          response =
            products.length > 0
              ? chatController.formatProductResponse(products, searchQuery)
              : {
                  type: "error",
                  message: `No products found for "${searchQuery}"`,
                };
          break;

        case "cart_details":
          if (!userId) {
            return res.json({
              type: "auth_required",
              message: "Please log in to view your cart",
            });
          }
          try {
            const cart = await ChatService.getCartDetails(userId);
            if (!cart || cart.products.length === 0) {
              return res.json({
                type: "empty",
                message: "Your cart is empty",
              });
            }
            return res.json(chatController.formatCartResponse(cart));
          } catch (error) {
            console.error("Cart error:", error);
            return res.status(500).json({
              type: "error",
              message: "Failed to load cart details",
            });
          }

        default:
          const aiResponse = await ChatService.getGeneralResponse(message);
          response = { type: "general", message: aiResponse };
      }

      // Only send response here if not already returned
      if (response) {
        res.json(response);
      }
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({
        type: "error",
        message: "Failed to process your request",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },

  formatProductResponse: (products, query) => ({
    type: "product_list",
    message: `Found ${products.length} products matching "${query}"`,
    products: products.map((p) => ({
      id: p._id,
      name: p.productName,
      category: p.category,
      price: p.price,
      image: p.imageUrl[0],
      description: p.productDescription,
    })),
  }),

  formatCartResponse: (cart) => ({
    type: "cart_details",
    message: `Your cart contains ${cart.products.length} items`,
    items: cart.products.map((item) => ({
      id: item.productId._id,
      name: item.productId.productName, // Fixed: access productName from productId
      quantity: item.quantity,
      price: item.productId.price, // Fixed: access price from productId
      subtotal: item.quantity * item.productId.price,
    })),
    total: cart.totalPrice,
  }),
};

module.exports = chatController;
