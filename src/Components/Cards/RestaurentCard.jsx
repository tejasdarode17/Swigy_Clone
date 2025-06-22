import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurentCard = (info) => {
  
    
    
  return (
    <>
      <Link to={`/restaurent/${info?.link?.split("/").at(-1)}`}>
        <div className="w-[277px] h-[182px] overflow-hidden relative rounded-3xl">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}
          />
          <div className="bg-linear-to-t from-black from-1% to-transparent to-40% absolute top-0 w-full h-full"></div>
          <div className="absolute bottom-2 left-2 uppercase text-white font-extrabold text-xl">
            {info?.aggregatedDiscountInfoV3?.header}
            {info?.aggregatedDiscountInfoV3?.subHeader}
          </div>
        </div>
        <div className="mt-2">
          <h1 className="font-extrabold text-l">{info?.name}</h1>
          <p className="line-clamp-1 font-semibold text-[#756A6D]">{info?.cuisines?.join(", ")}</p>
          <p className=" font-semibold text-[#756A6D]">{info?.areaName}</p>
          <p className="flex items-center gap-2">
            <FaStar className="rounded-4xl text-green-600" />
            {info?.avgRating} - {info?.sla?.slaString}
          </p>
        </div>
      </Link>
    </>
  );
};

export default RestaurentCard;
