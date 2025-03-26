import React from "react";
import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCamera,
  FiHeadphones,
  FiPackage,
} from "react-icons/fi";

const CategorySection = () => {
  const categories = [
    { name: "Phones", icon: <FiSmartphone className="text-2xl" /> },
    { name: "Computers", icon: <FiMonitor className="text-2xl" /> },
    { name: "SmartWatch", icon: <FiWatch className="text-2xl" /> },
    { name: "Camera", icon: <FiCamera className="text-2xl" /> },
    { name: "HeadPhones", icon: <FiHeadphones className="text-2xl" /> },
    { name: "Gaming", icon: <FiPackage className="text-2xl" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      {/* <div className="text-center mb-10">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Categories
        </h2>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Browse By Category
        </h1>
      </div> */}

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="p-4 bg-gray-100 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
              {category.icon}
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-900">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
