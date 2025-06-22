import React, { useState } from 'react'
import { filtredContext, mainDataContext } from './Context'
import { useContext } from 'react'
import { useEffect } from 'react';

const FilterDataProvider = ({ children }) => {

    const { restaurentInfo } = useContext(mainDataContext);

    const [filterValue, setFilterValue] = useState(null)
    const [filtredRestaurent, setFiltredRestaurent] = useState([])


    const filtredData = restaurentInfo.filter((item) => {

        const costLessThan300 = parseInt(item?.info?.costForTwo?.replace(/[^\d]/g, ''));
        const cost300To600 = parseInt(item?.info?.costForTwo?.replace(/[^\d]/g, ''));


        if (!filterValue) {
            return
        }
        
        switch (filterValue) {
            case "Ratings 4.0+": return item?.info?.avgRating >= 4.3
            case "Delivery": return item?.info?.sla?.deliveryTime < 50
            case "Pure Veg": return item?.info?.avgRating >= 4
            case "Less than Rs. 300": return costLessThan300 > 300
            case "Rs. 300 to Rs. 600": return cost300To600 > 300 && cost300To600 < 600
            default: return true
        }
    })


    useEffect(() => {
        setFiltredRestaurent(filtredData || [])
    }, [filterValue, restaurentInfo])


    return (
        <filtredContext.Provider value={{ filterValue, setFilterValue, filtredRestaurent }}>
            {children}
        </filtredContext.Provider>
    )
}

export default FilterDataProvider




