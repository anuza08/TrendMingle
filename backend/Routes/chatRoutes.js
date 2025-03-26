const express = require("express");
const router = express.Router();
const chatController = require("../Controller/chatController");
const {
  validateChatRequest,
  logChatRequest,
} = require("../Middleware/chatMiddleware");
const authMiddleware = require("../Middleware/AuthValidation");
console.log("Debug - Imported values:", {
  chatController: !!chatController,
  validateChatRequest: !!validateChatRequest,
  logChatRequest: !!logChatRequest,
  authMiddleware: !!authMiddleware,
  authAuthenticate: !!authMiddleware?.authenticate,
});
router.post(
  "/public",
  validateChatRequest,
  logChatRequest,
  chatController.handleMessage
);

// Authenticated endpoint for user-specific queries
router.post(
  "/",
  // authMiddleware,
  validateChatRequest,
  logChatRequest,
  chatController.handleMessage
);

module.exports = router;
