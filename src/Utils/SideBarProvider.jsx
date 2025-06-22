import { useState, useEffect } from "react";
import { sideBarContext } from "./Context";

const SideBarProvider = ({ children }) => {


  const defaultCoordinates = {lat: 18.52110, long: 73.85020} 
  const defaultAddres = "Pune"


  const [citiSideBarvisible, setCitiSideBarVisible] = useState(false);
  const [cities, setCities] = useState([]);
  const [coordinates, setCoordinates] = useState(JSON.parse(localStorage.getItem("co-ordinates")) || defaultCoordinates);
  const [addres, setAddres] = useState(JSON.parse(localStorage.getItem("address")) || defaultAddres)

  function handleClick(e) {
    setCitiSideBarVisible((prev) => !prev);
  }

  useEffect(() => {
    if (citiSideBarvisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [citiSideBarvisible]);

  

  async function getCities(value) {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCities(data.data || []);

    } catch (error) {
      console.log(error);
    }

  }

  async function getCoordinates(id) {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const newCooredinates = {
        lat: data?.data?.[0]?.geometry?.location?.lat,
        long: data?.data?.[0]?.geometry?.location?.lng
      }

      const newAddres = data?.data[0]?.formatted_address || ""

      setCoordinates(newCooredinates);
      setAddres(newAddres);
      localStorage.setItem("address" , JSON.stringify(newAddres))
      localStorage.setItem("co-ordinates", JSON.stringify(newCooredinates))
      //below two are from searched section 
      localStorage.removeItem("dishes")
      localStorage.removeItem("SearchedRestaurents")

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <sideBarContext.Provider value={{ citiSideBarvisible, handleClick, cities, getCities, getCoordinates, coordinates, addres }}>
      {children}
    </sideBarContext.Provider>
  );
};

export default SideBarProvider;
