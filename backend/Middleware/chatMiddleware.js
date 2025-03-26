const { body, validationResult } = require("express-validator");

const validateChatRequest = [
  body("message").trim().notEmpty().withMessage("Message cannot be empty"),
  body("userId").optional().isMongoId().withMessage("Invalid user ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const logChatRequest = (req, res, next) => {
  console.log(
    `Chat request from ${req.ip}: ${req.body.message.substring(0, 50)}...`
  );
  next();
};

module.exports = {
  validateChatRequest,
  logChatRequest,
};
