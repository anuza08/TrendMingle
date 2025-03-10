import React from "react";
import { useNavigate } from "react-router-dom";
const HomePageButtom = ({ name, navigateTo }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    setTimeout(() => {
      navigate(`${navigateTo}`);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleNavigation}
        className="bg-red-600 font-roboto w-36 h-12 rounded-md text-white text-lg text-medium"
      >
        {name}
      </button>
    </>
  );
};

export default HomePageButtom;
