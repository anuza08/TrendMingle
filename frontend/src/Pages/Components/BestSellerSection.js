import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BestSellerSection = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const { products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log("Add to cart", product);
  };

  useEffect(() => {
    if (status === "idel") {
      dispatch(fetchProducts());
    }

    const bestSellerItems = products
      .filter((product) => product.isBestseller)
      .slice(0, 4);
    setBestSellers(bestSellerItems);
  }, [status, products]);

  return (
    <div className="flex mt-5 gap-6 mb-20 overflow-x-auto px-20">
      {bestSellers.map((product) => (
        <div key={product._id} className="w-full sm:w-full md:w-full lg:w-full">
          <div className="w-full h-[250px] relative bg-[#F7F7F7] group">
            <LazyLoadImage
              src={product.imageUrl[0]}
              alt={product.productName}
              className="w-full h-full object-cover"
              effect="blur"
              width="100%"
              // className="w-full h-full object-cover"
              placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 250'%3E%3Crect width='300' height='250' fill='%23F7F7F7'/%3E%3C/svg%3E"
            />
            <button
              className="absolute font-roboto bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          <div className="p-2">
            <div className="font-roboto font-medium text-lg">
              {/* <b>{product.productName}</b> */}
            </div>
            {/* <div className="text-red-500 font-roboto">$ {product.price}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSellerSection;
