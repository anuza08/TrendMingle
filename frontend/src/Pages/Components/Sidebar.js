import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const Navigate = useNavigate();
  const categories = [
    "All",
    "Women's Clothing",
    "Men's Clothing",
    "Kids",
    "Bottomwear",
    "Footwear",
    "Topwear",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      Navigate(`/collection?category=${encodeURIComponent(category)}`);
    }, 1000);
  };

  return (
    <>
      <aside>
        <ul className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-24">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleFilterChange(category)}
              style={{ cursor: "pointer" }}
              className="mb-2 flex items-center justify-between cursor-pointer w-60 px-3 py-2 border-b"
            >
              {category}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="16"
                height="16"
                className="ml-2"
              >
                <path
                  fill="#000000"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
