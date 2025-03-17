import React, { useEffect, useState } from "react";
import { handleError } from "../../../../Utils";
import { toast } from "react-toastify";

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
  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8080/products/${id}`;
      const result = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      if (data.success) {
        setProductData((prev) => prev.filter((product) => product._id !== id));
        toast.success(data.message || "Product deleted successfully");
      } else {
        handleError(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
     toast.error("Error deleting product");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Item List</h1>
      {productData.length > 0 ? (
        <table className="w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Image</th>
              <th className=" p-2">Price</th>
              <th className=" p-2">Stock</th>
              <th className=" p-2">Sizes</th>
              <th className=" p-2"></th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr key={index} className="text-center shadow-md">
                <td className="p-2">
                  <img
                    src={product.imageUrl[0]}
                    alt={product.productName}
                    className="w-20 h-20 object-cover mx-auto rounded-md"
                  />
                </td>
                <td className=" p-2">${product.price}</td>
                <td className=" p-2">{product.stock}</td>
                <td className=" p-2">{product.sizes.join(", ")}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(product._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-red-600 hover:text-red-800 transition duration-200"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                      <path d="M9 6V3h6v3"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No Products listed</p>
      )}
    </div>
  );
};

export default ItemList;
