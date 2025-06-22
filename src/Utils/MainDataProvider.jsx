import React from 'react'
import { sideBarContext } from './Context';
import { useState , useContext } from 'react';
import { mainDataContext } from './Context'

const MainDataProvider = ({children}) => {
    
    const [carousalData, setCarousalData] = useState([]);
    const [restaurentInfo, setRestaurentInfo] = useState([]);
    const [restaurentTitle, setRestaurentTitle] = useState("");
    const [onlineDeliveryTitle, setonlineDeliveryTitle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swigyNotPresentData, setswigyNotPresentData] = useState({});

      const { coordinates = {} } = useContext(sideBarContext);
      const { lat, long } = coordinates;

   
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  
    async function getApiData() {
      try {
        setLoading(true);
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        setCarousalData(
          data?.data?.cards[0]?.card?.card?.imageGridCards?.info || []
        );
  
        setRestaurentInfo(
          data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || []
        );
  
        setRestaurentTitle(
          data?.data?.cards[1]?.card?.card?.header?.title || ""
        );
                
        setonlineDeliveryTitle(data?.data?.cards[2]?.card?.card?.title || "");
  
        setswigyNotPresentData(data || {});
      } catch (error) {
        console.error("Error fetching data:", error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    return (
    <mainDataContext.Provider value={{carousalData , restaurentTitle , restaurentInfo ,onlineDeliveryTitle ,loading, swigyNotPresentData, getApiData}}>
        {children}
    </mainDataContext.Provider>
  )
}

export default MainDataProvider