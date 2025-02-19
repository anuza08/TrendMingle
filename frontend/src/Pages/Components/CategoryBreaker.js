import React from "react";

const CategoryBreaker = ({ name }) => {
  return (
    <>
      <div className="text-red-600 p-10 ml-12 font-medium font-roboto flex gap-2">
        <div className="bg-red-600 w-5 h-8 rounded-sm">.</div> {name}
      </div>
    </>
  );
};

export default CategoryBreaker;
