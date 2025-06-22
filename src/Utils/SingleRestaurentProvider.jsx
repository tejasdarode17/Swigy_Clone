import React from 'react'
import { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { singleRestaurentContext, sideBarContext } from './Context';

const SingleRestaurentProvider = ({ children }) => {

    const { id } = useParams();

    const [topSectionData, setTopSectionData] = useState({});
    const [offersData, setOffersData] = useState([]);
    const [cuisinesData, setCuisinesData] = useState([]);
    const [topPicks, setTopPicks] = useState([])
    const [loading, setLoading] = useState(false)


    const { coordinates } = useContext(sideBarContext);
    const { lat, long } = coordinates

    
    const getRestaurentMenu = async () => {
        try {
            setLoading(true)
            let url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${id.match(/(\d+)$/)?.[1]
                }&catalog_qa=undefined&submitAction=ENTER`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const json = await response.json();

            setTopSectionData(json?.data?.cards[2]?.card?.card?.info || {});

            
            setOffersData(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || []);
            
            let filterdedCuisines = ((json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards) || []).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories)
            setCuisinesData(filterdedCuisines || []);
            
            let filtredTopPicks = ((json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards) || []).filter((data) => data?.card?.card?.title == "Top Picks");
            setTopPicks(filtredTopPicks || []);
            
            

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    };
    
    localStorage.setItem("topSectionData" , JSON.stringify(topSectionData || {}));

    return (
        <singleRestaurentContext.Provider value={{ topSectionData, offersData, cuisinesData, topPicks, getRestaurentMenu ,loading }}>
            {children}
        </singleRestaurentContext.Provider>
    )
}

export default SingleRestaurentProvider
