import React from "react";
import Sidebar from "./Components/Sidebar";
import image1 from "../Assests/images/image1.png";
import CategoryBreaker from "./Components/CategoryBreaker";
import CategorySection from "./Components/CategorySection";
import BestSellerSection from "./Components/BestSellerSection";
import HomePageButtom from "./Components/homePageButtom";
import banner2 from "../Assests/images/banner2.jpg";
import NewlyAddedProducts from "./Components/NewlyAddedProducts";
import Chatbot from "./Chatbot";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  return (
    <>
      <div className="flex mt-5 ">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-3 sm:mt-2 md:mt-2">
          <LazyLoadImage
            src={image1}
            alt="Banner"
            effect="blur"
            className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[800px] h-auto object-cover"
            width="100%"
            height="auto"
          />
        </div>
      </div>
      <hr className="border-t border-gray-300 mx-24 my-12" />
      <CategoryBreaker name={"CATEGORIES"} />
      <div className="flex justify-between items-center px-10 mr-20">
        <h2 className="font-medium font-roboto px-10 top-32 text-2xl">
          Browse By Category
        </h2>
      </div>
      <CategorySection />
      <hr className="border-t border-gray-300 mx-24 my-4" />
      <CategoryBreaker name={"THIS MONTH"} />
      <div className="flex justify-between items-center px-10 mr-20">
        <h2 className="font-medium font-roboto text-2xl ml-12">
          Best Selling Products
        </h2>
        <Chatbot />
        <HomePageButtom
          name="View all"
          navigateTo="/collection?isBestseller=true"
        />
      </div>
      <BestSellerSection />

      <LazyLoadImage
        src={banner2}
        alt="Banner2"
        effect="blur"
        className="px-36 w-full"
        width="100%"
        height="auto"
      />

      <hr className="border-t border-gray-300 mx-24 my-4" />
      <CategoryBreaker name={"OUR PRODUCTS"} />
      <div className="flex justify-between items-center px-10 mr-20">
        <h2 className="font-medium font-roboto text-2xl ml-12">
          Newly Launch Products
        </h2>
        <HomePageButtom name="View all" navigateTo="/collection" />
      </div>
      <NewlyAddedProducts />
    </>
  );
};

export default Home;
