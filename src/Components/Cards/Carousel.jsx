import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import  { useState } from "react";

const Carousel = ({carousalData}) => {
  const [value, setValue] = useState(0);

  function handleNext() {
    value === 180 ? "" : setValue((prevValue) => prevValue + 30);
  }

  function handlePrev() {
    value == 0 ? "" : setValue((prevValue) => prevValue - 30);
  }


  return (
    <div className="w-full overflow-hidden">
        <div className="flex justify-between mt-5">
          <div>
            <h1 className="text-xl font-extrabold">What's on your mind ?</h1>
          </div>
          <div className="flex gap-2 ">
            <button
              onClick={handlePrev}
              className={`cursor-pointer p-2 rounded-full ${
                value <= 0 ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <GoArrowLeft
                className={`text-sm ${
                  value <= 0 ? "text-gray-300" : "text-gray-800"
                }`}
              />
            </button>
            <button
              onClick={handleNext}
              className={`cursor-pointer p-2 rounded-full ${
                value >= 180 ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <GoArrowRight
                className={`text-sm ${
                  value >= 180 ? "text-gray-300" : "text-gray-800"
                }`}
              />
            </button>
          </div>
        </div>
        <div
          style={{
            transform: `translateX(${-value}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
          className="flex"
        >
          {(carousalData || []).map((item) => (
            <img
              key={item.imageId}
              className="w-40 h-50 cursor-pointer"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
            />
          ))}
        </div>
      <hr className="w-full mx-auto border-t border-gray-200 my-10" />
    </div>
  );
};

export default Carousel;
