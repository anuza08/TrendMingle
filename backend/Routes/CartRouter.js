const {
  addToCart,
  getCartItems,
  editCartItem,
  deleteCart,
  deleteCartItem,
} = require("../Controller/CartItem");

const router = require("express").Router();

router.post("/add", addToCart); // POST /cart/add
router.get("/:userId", getCartItems); // GET /cart/:userId
router.put("/edit", editCartItem); // PUT /cart/edit
router.delete("/delete/:userId", deleteCart); // DELETE /cart/delete/:userId
router.delete("/delete-item", deleteCartItem); // DELETE /cart/delete-item

module.exports = router;
