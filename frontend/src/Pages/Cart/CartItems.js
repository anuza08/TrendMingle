import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, removeFromCart } from "../../redux/slices/cartSlice";
import { FaTimes } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const CartItems = () => {
  const { items, totalPrice, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useSelector((state) => console.log(state.cart));
  const handleRemove = (product) => {
    console.log("Removing item from cart:", product);
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("Please login to remove items from the cart");
      return;
    }

    console.log("Dispatching removeFromCart with payload:", {
      userId,
      productId: product.productId,
    });

    dispatch(removeFromCart({ userId, productId: product.productId }))
      .unwrap()
      .then(() => {
        toast.success("Item removed from cart");
      })
      .catch((error) => {
        toast.error("Failed to remove item from cart");
        console.error("Error removing item from cart:", error);
      });
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCartItems());
    }
  }, [dispatch, status]);

  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/collection");
    }, 1000);
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg mb-4">Your cart is empty!</p>
        <button
          onClick={handleNavigate}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg max-w-4xl mx-auto mt-10">
      <Toaster />
      <div className="grid font-roboto grid-cols-4 font-semibold text-center shadow mb-4 pb-2">
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>

      {items.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-4 font-roboto text-center shadow items-center p-2 py-4 mb-2"
        >
          <div className="relative w-16 h-16">
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-full h-full object-cover rounded"
            />
            <FaTimes
              className="absolute top-0 right-0 text-red-500 cursor-pointer bg-white rounded-full p-1 shadow-md"
              onClick={() => handleRemove(item)}
              title="Remove Item"
            />
          </div>
          <div>${item.price}</div>
          <div>
            <input
              type="number"
              className="w-12 border rounded text-center"
              value={item.quantity}
              readOnly
            />
          </div>
          <div>${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}

      <div className="flex justify-between items-center py-4">
        <button
          onClick={handleNavigate}
          className="border font-roboto border-black px-4 py-2 rounded"
        >
          Return To Shop
        </button>
        <button className="border font-roboto border-black px-4 py-2 rounded">
          Update Cart
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center py-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="flex-grow p-2 border border-black rounded mr-2 focus:outline-none"
          />
          <button className="bg-red-500 rounded font-roboto text-white px-2 py-2">
            Apply Coupon
          </button>
        </div>

        <div className="border border-black p-4 rounded">
          <h3 className="font-semibold font-roboto text-lg">Cart Total</h3>
          <div className="flex font-roboto justify-between py-2 border-b">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex font-roboto justify-between py-2 border-b">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex font-roboto justify-between py-2">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="bg-red-500 font-roboto rounded text-white w-full py-2 mt-4">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
