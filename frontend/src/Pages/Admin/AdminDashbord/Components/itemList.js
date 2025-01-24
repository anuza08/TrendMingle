import React, { useEffect, useState } from "react";
import { handleError } from "../../../../Utils";

const ItemList = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getAllItem = async () => {
      const url = "http://localhost:8080/products";
      try {
        const result = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();
        if (data.success) {
          setProductData(data.products);
        } else {
          console.log("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        handleError(error);
      }
    };

    getAllItem();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {productData.length > 0 ? (
        <div className="flex overflow-x-auto gap-6">
          {productData.map((product, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-md flex flex-col items-start min-w-[300px]"
            >
              <h2 className="text-lg font-bold mb-2">{product.productName}</h2>
              <img
                src={product.imageUrl[0]}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <p className="text-sm text-gray-600">
                <strong>Size:</strong> {product.sizes.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Stock:</strong> {product.stock}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No Products listed</p>
      )}
    </div>
  );
};

export default ItemList;
