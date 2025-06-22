// import { cartContext } from "../../Utils/Context";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, emptyCart, handleAlreadyAddedPop } from "../../Utility/CartSlice";
import { vegLogo, nonVegLogo } from "../../Utils/LInks";
import { FaAngleDown, FaStar, FaSearch } from "react-icons/fa";
import CuisinesCarousal from "./CuisinesCarousal";

const Cuisines = ({ cuisinesData, topPicks }) => {

  // const { alreadyAddedPop } = useContext(cartContext)
  const alreadyAddedPop = useSelector((state) => state.cart.alreadyAddedPop)
  const cart = useSelector((state) => state.cart.cartItems);

  if (cart.length === 0) {
    localStorage.removeItem("restaurantId")
  }


  return (
    <div className="w-[48%] mx-auto mt-10 relative">
      <h1 className="text-center text-[#868c93] font-semibold my-5">
        --MENU--
      </h1>
      <div className="w-full mt-5 relative cursor-pointer mb-10">
        <div className="w-full bg-slate-200 text-[#F2F2F3] font-semibold text-center p-2 rounded-xl">
          <p className="text-[#868c93] "> Search for dishes</p>
        </div>
        <FaSearch className="absolute top-3 left-175" />
      </div>

      <CuisinesCarousal topPicks={topPicks} ></CuisinesCarousal>

      <div>
        {(cuisinesData || []).map(({ card: { card } }, i) => (
          <div key={card?.id || `menu-card-${i}`}>
            <MenuCard card={card} />
          </div>
        ))}
      </div>

      {
        alreadyAddedPop && <AlreadyAddedPopUP></AlreadyAddedPopUP>
      }
    </div>
  );
};


const MenuCard = ({ card }) => {
  const [open, setOpen] = useState(!!card["@type"]);
  // const { addToCart } = useContext(cartContext);
  const dispatch = useDispatch()


  const topSectionData = JSON.parse(localStorage.getItem("topSectionData")) || {}


  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  if (card.itemCards) {
    const { title, itemCards } = card;

    return (
      <div>
        <div className="flex justify-between cursor-pointer">
          <div>
            <h1
              className={`font-bold ${card["@type"] ? "text-xl" : "text-base"}`}
            >
              {title} ({itemCards.length})
            </h1>
          </div>
          <div className="text-xl flex items-center">
            <FaAngleDown
              className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                }`}
              onClick={toggleOpen}
            />
          </div>
        </div>
        <div>
          {open &&
            (itemCards || []).map(({ card: { info } }) => {
              return (
                <div key={info?.id}>
                  <div className="flex my-10 min-h-[182px]" >
                    <div className="w-[80%] ">
                      <div className="w-5 overflow-hidden">
                        {info?.itemAttribute?.vegClassifier === "VEG" ? (
                          <img src={vegLogo} alt="img" />
                        ) : (
                          <img src={nonVegLogo} alt="img" />
                        )}
                      </div>
                      <p className="font-semibold text-xl text-[#414449]">
                        {info?.name}
                      </p>
                      <p className="font-semibold mb-3">
                        ₹ {info?.defaultPrice / 100 || info?.price / 100}
                      </p>
                      {info?.ratings?.aggregatedRating?.rating ? (
                        <div className="flex items-center font-semibold text-sm">
                          <FaStar className="text-[#0F8A65]" />
                          <p className="text-[#0F8A65]">
                            {info?.ratings?.aggregatedRating?.rating}
                          </p>
                          <p>
                            ({info?.ratings?.aggregatedRating?.ratingCountV2})
                          </p>
                        </div>
                      ) : null}

                      <p>{info?.description}</p>
                    </div>
                    <div className="w-[20%] h-full relative">
                      {info?.imageId && (
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-2xl cursor-pointer">
                          <img
                            className="w-full h-full object-cover"
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.imageId}`}
                            alt="dish"
                          />
                        </div>
                      )}
                      <button
                        onClick={() => dispatch(addToCart({
                          ...info, restaurant : {
                            id: topSectionData?.id,
                            name: topSectionData?.name,
                            areaName: topSectionData?.areaName,
                            cloudinaryImageId: topSectionData.cloudinaryImageId,
                          }
                        }))}
                        className={`absolute ${!info?.imageId ? "top-15" : "top-42"
                          }  left-10 w-[70%] h-10 bg-[#FFFF] shadow-lg rounded-md text-[#0F8A65] text-xl font-bold cursor-pointer hover:bg-[#d9dde1]`}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                  <hr className="border-[#c8c8d5]" />
                </div>
              );
            })}
        </div>
        <hr
          className={`my-5 border-[#F2F2F3] ${card["@type"] ? "border-[10px]" : "border"
            }`}
        />
      </div>
    );
  } else {
    const { categories, title } = card;

    return (
      <>
        <div className="">
          <div className="flex gap-1 font-bold text-xl mb-3">
            <h1>{title}</h1>
          </div>
          {(categories || []).map((data, i) => (
            <div className="mt-2" key={data.id || `sub-card-${i}`}>
              <MenuCard card={data}></MenuCard>
            </div>
          ))}
        </div>
      </>
    );
  }
};




export const AlreadyAddedPopUP = () => {


  // const { emptyCart, handleAlreadyAddedPop } = useContext(cartContext)

  const dispatch = useDispatch()
  const alreadyAddedPop = useSelector((state) => state.cart.alreadyAddedPop)


  return (
    <div className={`w-auto fixed left-1/2 transform -translate-x-1/2 shadow-2xl p-2 bg-[#FFFFFF] transition-all duration-700 ${alreadyAddedPop ? "bottom-10" : "bottom-[-100%]"}`}>
      <div className="w-[500px] mx-auto h-auto">
        <h1 className="font-bold text-xl p-2">Items already in cart</h1>
        <p className="p-2">Your cart contains items from another restaurant. Would you like to reset your cart to add items from this one?</p>
        <div className="flex justify-between p-2">
          <button onClick={() => dispatch(handleAlreadyAddedPop())} className="border cursor-pointer py-2 px-10 text-[#1BA672]">NO</button>
          <button
            onClick={() => {
              dispatch(emptyCart());
              dispatch(handleAlreadyAddedPop());
            }}
            className="py-2 px-10 cursor-pointer bg-[#1BA672] text-[#fff] hover:shadow-2xl">
            YES, START AFRESH
          </button>
        </div>
      </div>
    </div>
  )
}


export default Cuisines;

