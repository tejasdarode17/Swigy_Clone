import { addToCart } from '../../Utility/CartSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import { cartContext } from '../../Utils/Context';
// import { useContext } from 'react'



const CuisinesCarousal = ({ topPicks }) => {
  const [value, setValue] = useState(0);

  const dispatch = useDispatch()
  // const { addToCart } = useContext(cartContext)

  const topSectionData = JSON.parse(localStorage.getItem("topSectionData")) || {}



  const cart = useSelector((state) => state.cart.cartItems);

  if (cart.length === 0) {
    localStorage.removeItem("restaurantId")
  }

  const carousel = topPicks?.[0]?.card?.card?.carousel || [];
  const title = topPicks?.[0]?.card?.card?.title || "No Title";


  function handleNext() {
    value === 200 ? "" : setValue((prevValue) => prevValue + 30);
  }

  function handlePrev() {
    value == 0 ? "" : setValue((prevValue) => prevValue - 30);
  }


  return (
    <>
      {topPicks.length ? (
        <div className="w-[full] my-10 overflow-hidden">
          <div className="flex justify-between items-center mb-5">
            <div className="text-xl font-bold">
              <h1>{title}</h1>
            </div>
            <div>
              <div className="flex gap-2 ">
                <button
                  onClick={handlePrev}
                  className={`cursor-pointer p-2 rounded-full ${value <= 0 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                >
                  <GoArrowLeft
                    className={`text-sm ${value <= 0 ? "text-gray-300" : "text-gray-800"
                      }`}
                  />
                </button>
                <button
                  onClick={handleNext}
                  className={`cursor-pointer p-2 rounded-full ${value >= 200 ? "bg-gray-100" : "bg-gray-200"
                    }`}
                >
                  <GoArrowRight
                    className={`text-sm ${value >= 200 ? "text-gray-300" : "text-gray-800"
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className="flex w-full min-h-[200px]"
            style={{
              transform: `translateX(${-value}%)`,
              transition: "transform 0.3s",
            }}
          >
            {(carousel || []).map((item) => {

              const { dish, creativeId } = item

              return (
                <div key={dish?.info?.id} className="w-[40%]rounded-2xl relative">
                  <div className="w-95 h-95  overflow-hidden">
                    <img
                      className="w-full h-full object-contain overflow-hidden"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${creativeId}`}
                      alt="img"
                    />
                  </div>
                  <div className="absolute bottom-8 left-5 text-xl text-[#FEFEFE] font-semibold">
                    {
                      dish?.info?.defaultPrice && <h1 className="line-through"> ₹ {dish?.info?.defaultPrice / 100} </h1>
                    }

                    {
                      (dish?.info?.finalPrice || dish?.info?.price || dish?.info?.defaultPrice) && (
                        <h1>
                          ₹ {(dish?.info?.price || dish?.info?.finalPrice || dish?.info?.defaultPrice) / 100}
                        </h1>
                      )
                    }

                  </div>
                  <button onClick={() => dispatch(addToCart({
                    ...item, restaurant: {
                      id: topSectionData?.id,
                      name: topSectionData?.name,
                      areaName: topSectionData?.areaName,
                      cloudinaryImageId: topSectionData.cloudinaryImageId,
                    }
                  }))} className="absolute bottom-7 left-60 w-30 p-2 bg-[#FFFF] shadow-lg rounded-md text-[#0F8A65] text-xl font-bold cursor-pointer hover:bg-[#d9dde1]">
                    Add
                  </button>
                </div>)

            })}
          </div>
          <hr className={"mt-10 border-[#F2F2F3] border-[10px]"} />
        </div>
      ) : null}

    </>
  )
}

export default CuisinesCarousal
