import { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Offers = ({ offersData }) => {
  const [value, setValue] = useState(0);

  function handleNext() {
    value === 150 ? "" : setValue((prevValue) => prevValue + 30);
  }

  function handlePrev() {
    value == 0 ? "" : setValue((prevValue) => prevValue - 30);
  }
  

  return (
    <div className="w-[50%] mx-auto overflow-hidden mt-5 ">
      <div className="w-[95%]  mx-auto">
        <div className="flex justify-between mt-2">
          <div>
            <h1 className="text-xl font-bold">Deals for you</h1>
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
                value >= 150 ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <GoArrowRight
                className={`text-sm ${
                  value >= 150 ? "text-gray-300" : "text-gray-800"
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
          {(offersData || []).map((item, index) => (
            <div
              key={index}
              className="w-[350px] h-[70px] min-w-[350px] border border-gray-300/50 rounded-2xl flex items-center p-4 shadow-md"
            >
              <img
                className="w-[50px] h-[50px] object-cover mr-4"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.info?.offerLogo}`}
                alt="offer logo"
              />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{item?.info?.header}</p>
                <p className="text-sm text-[#909294] font-bold"> {item?.info?.couponCode} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
