import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleError } from "../../../../Utils";
import { toast } from "react-toastify";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dpwugcpvq/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "trendMingle";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
          formData.append("cloud_name", "dpwugcpvq");
          const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          if (data.url) {
            return data.url;
          } else {
            throw new Error("Image upload failed");
          }
        })
      );

      setImageUrl((prev) => [...prev, ...urls].slice(0, 4));
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      toast.error("Error uploading images");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl || imageUrl.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const productData = {
      productName,
      productDescription,
      price,
      imageUrl,
      category,
      subCategory,
      sizes,
      stock,
      isBestseller,
    };

    try {
      const url = "http://localhost:8080/products/add";
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(productData),
      });

      const response = await result.json();
      if (response.success) {
        // dispatch(setCurrentProduct(response.savedProduct));
        toast.success(response.message || "Product added successfully");
      } else {
        handleError(response.message || "Error adding product");
      }
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("Error adding product");
    }

    // Reset form fields
    setProductDescription("");
    setProductName("");
    setCategory("");
    setImageUrl([]);
    setSubCategory("");
    setPrice("");
    setStock("");
    setSizes([]);
    setIsBestseller(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 font-roboto space-y-4 text-gray-600 max-w-lg"
    >
      <label className="block font-semibold">Upload Images</label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-24 border rounded-md bg-gray-200 flex items-center justify-center overflow-hidden"
            >
              {imageUrl[index] ? (
                <img
                  src={imageUrl[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Upload</span>
              )}
            </div>
          ))}
      </div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full p-1 text-sm border rounded-md"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="p-2 text-sm border rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 text-sm border rounded-md"
        >
          <option value="">Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <textarea
          placeholder="Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="col-span-2 p-2 text-sm border rounded-md resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="p-2 text-sm border rounded-md"
        >
          <option value="">Sub-Category</option>
          <option value="topwear">Topwear</option>
          <option value="bottomwear">Bottomwear</option>
          <option value="footwear">Footwear</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-2 text-sm border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="p-2 text-sm border rounded-md"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isBestseller}
            onChange={(e) => setIsBestseller(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-semibold">Bestseller</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Sizes</label>
        <div className="flex space-x-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 text-xs border rounded-md ${
                sizes.includes(size) ? "bg-gray-700 text-white" : "bg-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#EFB6C8] text-gray-700 font-semibold rounded-md hover:text-white"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
