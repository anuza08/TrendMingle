const ProductModel = require("../Models/Product");
const { CartItem } = require("../Models/CartItem");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL,
    "X-Title": process.env.YOUR_APP_NAME,
  },
});
class ChatService {
  static async searchProducts(query) {
    if (!query || query.trim() === "") {
      return await ProductModel.find().limit(50);
    }

    return await ProductModel.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { productDescription: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).limit(50);
  }

  static async getCartDetails(userId) {
    console.log("Fetching cart for user:", userId); // Debug log
    const cart = await CartItem.findOne({ userId }).populate(
      "products.productId"
    );
    console.log("Cart found:", cart); // Debug log
    return cart;
  }

  static async classifyIntent(message) {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content: `Classify intent into: product_search, cart_details, or general_question. Respond ONLY with the category name.`,
        },
        { role: "user", content: message },
      ],
    });
    return response.choices[0].message.content.trim();
  }

  static async extractSearchQuery(message) {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "Extract the product search query. Respond ONLY with the query terms.",
        },
        { role: "user", content: message },
      ],
    });
    return response.choices[0].message.content.trim();
  }

  static async getGeneralResponse(message) {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [{ role: "user", content: message }],
    });
    return response.choices[0].message.content;
  }
}

module.exports = ChatService;
