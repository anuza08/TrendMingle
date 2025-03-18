import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { FaTruck, FaRedo } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const location = useLocation();
  const data = location.state?.product;
  const [product, setProduct] = useState(data);
  const [selectedImage, setSelectedImage] = useState(product.images);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const storedUser = localStorage.getItem("id");
  const dispatch = useDispatch();
  console.log("userId", storedUser);
  const handleAddToCart = () => {
    console.log("Adding to cart");
    if (!storedUser) {
      alert("Please login to add product to cart");
      return;
    }

    const cartData = {
      userId: storedUser,
      productId: product._id,
      quantity,
    };

    fetch("http://localhost:8080/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          console.log("Cart data:", data.cart);
          dispatch(setCart(data.cart));
          toast.success(data.message || "Product added to cart successfully");
        } else {
          toast.error(data.message || "Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        toast.error(data.message || "Failed to add product to cart");
      });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 lg:p-10">
      <Toaster position="top-center" />
      <div className="flex lg:flex-col gap-2">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg cursor-pointer ${
            selectedImage === product.imageUrl ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedImage(product.imageUrl)}
        />
      </div>

      <div className="flex-1">
        <img
          src={product.imageUrl}
          alt="Main Product"
          className="w-full rounded-lg"
        />
      </div>

      <div className="flex-1 space-y-4">
        <h1 className="text-2xl lg:text-3xl font-roboto font-semibold">
          {product.productName}
        </h1>
        <p className="text-yellow-500">
          ★★★★☆ ({product.reviews} Reviews){" "}
          {product.inStock && (
            <span className="text-green-500"> | In Stock</span>
          )}
        </p>
        <h2 className="text-xl lg:text-2xl font-semibold">${product.price}</h2>
        <p className="text-gray-600 border-b pb-2">
          {product.productDescription}
        </p>

        <div>
          <h3 className="font-semibold">Size:</h3>
          <div className="flex gap-2 mt-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`border px-3 py-1 rounded-md ${
                  selectedSize === size ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center border rounded-md">
            <button
              className="px-3 py-1"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <button className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto">
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded-md w-full sm:w-auto"
          >
            Add to Cart
          </button>
          <button className="border px-3 py-2 rounded-md w-full sm:w-auto">
            ♡
          </button>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaTruck />
            <p>
              Free Delivery{" "}
              <span className="underline cursor-pointer">
                Enter your postal code for Delivery Availability
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaRedo />
            <p>
              Return Delivery{" "}
              <span className=" underline cursor-pointer">
                Free 30 Days Delivery Returns. Details
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
