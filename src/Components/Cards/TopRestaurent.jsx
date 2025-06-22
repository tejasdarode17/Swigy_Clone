import RestaurentCard from "./RestaurentCard";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useState } from "react";

const TopRestaurent = ({ restaurentInfo , title}) => {
  
  const [value, setValue] = useState(0);

  function handleNext() {
    value === 405 ? "" : setValue((prevValue) => prevValue + 45);
  }

  function handlePrev() {
    value == 0 ? "" : setValue((prevValue) => prevValue - 45);
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-extrabold">
            {title}
          </h1>
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
              value >= 405 ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <GoArrowRight
              className={`text-sm ${
                value >= 405 ? "text-gray-300" : "text-gray-800"
              }`}
            />
          </button>
        </div>
      </div>
      <div
        style={{
          transform: `translateX(${-value}%)`,
          transition: "transform 0.3s",
        }}
        className="flex gap-3 mt-5"
      >
        {(restaurentInfo || []).map(({ info, cta: { link } }) => (
          <div
            className="cursor-pointer hover:scale-90 duration-100"
            key={info.id}
          >
            <RestaurentCard {...info} link={link}></RestaurentCard>
          </div>
        ))}
      </div>
      <hr className="w-full mx-auto border-t border-gray-200 my-10" />
    </div>
  );
};

export default TopRestaurent;
