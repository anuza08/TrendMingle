import React, { useState } from "react";

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

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrl((prev) => [...prev, ...urls].slice(0, 4));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log("Product Data:", productData);
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
        Submit
      </button>
    </form>
  );
};

export default AddProduct;
