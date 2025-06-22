import Carousel from "../Cards/Carousel";
import TopRestaurent from "../Cards/TopRestaurent";
import MainCards from "../Cards/MainCards";
import { useEffect, useContext } from "react";
import MainShimmer from "../Shimmer Components/MainShimmer";
import { filtredContext, mainDataContext, sideBarContext } from "../../Utils/Context";

const Body = () => {

  const {filterValue, filtredRestaurent} = useContext(filtredContext)
  const {carousalData, restaurentTitle, restaurentInfo, onlineDeliveryTitle, loading, swigyNotPresentData, getApiData} = useContext(mainDataContext)
  

  const { coordinates } = useContext(sideBarContext);  
  const { lat, long } = coordinates;
  
  useEffect(() => {
    getApiData();
  }, [lat, long]);
  
  
  if (swigyNotPresentData?.data?.communication) {
    return <CityUnavailable data={swigyNotPresentData}></CityUnavailable>;
  }

  return loading ? (
    <MainShimmer />
  ) : (
    <div className="w-[75%] mx-auto">
      <Carousel carousalData={carousalData}></Carousel>
      <TopRestaurent restaurentInfo = {restaurentInfo} title={restaurentTitle}></TopRestaurent>
      <MainCards cardsData={filterValue ? filtredRestaurent : restaurentInfo } title={onlineDeliveryTitle}></MainCards>
    </div>
  );
};



const CityUnavailable = ({ data }) => {
  const imgId = data?.data?.cards[0]?.card?.card?.imageLink;

  return (
    <div className="w-[20%] mx-auto mt-50">
      <div className="w-70">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          }
          alt="img"
          className="w-full object-cover"
          />
        <div className="w-full mx-8 mt-10 font-extrabold text-xl">
          <h1 className="">{data?.data?.cards[0]?.card?.card?.title}</h1>
        </div>
          <p className="w-60 mx-10 mt-5 text-gray-600">We don’t have any services here till now. Try changing location.</p>
      </div>
    </div>
  );
};

export default Body