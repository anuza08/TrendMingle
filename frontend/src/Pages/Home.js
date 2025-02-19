import React from "react";
import Sidebar from "./Components/Sidebar";
import image1 from "../Assests/images/image1.png";
import CategoryBreaker from "./Components/CategoryBreaker";
import CategorySection from "./Components/CategorySection";

const Home = () => {
  return (
    <>
      <div className="flex mt-5 ">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-3 sm:mt-2 md:mt-2">
          <img
            src={image1}
            alt="Banner"
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[800px] h-auto object-cover "
          />
        </div>
      </div>
      <hr className="border-t border-gray-300 mx-24 my-12" />
      <CategoryBreaker name={"CATEGORIES"} />
      <h2 className="font-medium font-roboto px-10 top-32 ml-12 text-2xl">
        Browse By Category
      </h2>
      <CategorySection />
      <hr className="border-t border-gray-300 mx-24 my-4" />
      <CategoryBreaker name={"THIS MONTH"} />
      <h2 className="font-medium font-roboto px-10 top-32 ml-12 text-2xl">
        Best Selling Products
      </h2>
    </>
  );
};

export default Home;
