import { useEffect ,useContext} from "react";
import TopSectionRestaurentMenu from "../Restaurent Menu Component/TopSectionRestaurentMenu";
import Offers from "../Restaurent Menu Component/Offers";
import RestaurentMenuShimmer from "../Shimmer Components/RestaurentMenuShimmer";
import {singleRestaurentContext , sideBarContext} from "/src/Utils/Context.js"
import Cuisines from "../Restaurent Menu Component/Cuisines";


const RestaurentMenu = () => {

  const {topSectionData, offersData, cuisinesData, topPicks, getRestaurentMenu ,loading} = useContext(singleRestaurentContext)
  const { coordinates } = useContext(sideBarContext);
  const { lat, long } = coordinates

  useEffect(() => {
    getRestaurentMenu();
  }, [lat, long]);
       
  return loading ? <RestaurentMenuShimmer/> :(
    <>
      <TopSectionRestaurentMenu topSectionData={topSectionData}></TopSectionRestaurentMenu>
      <Offers offersData={offersData}></Offers>
      <Cuisines cuisinesData = {cuisinesData} topPicks = {topPicks} ></Cuisines>
    </>
  );

};

export default RestaurentMenu;

