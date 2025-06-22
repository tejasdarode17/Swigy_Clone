import SearchShimmer from '../Shimmer Components/SearchShimmer';
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaSearch, FaStar } from 'react-icons/fa'
import { sideBarContext } from '../../Utils/Context';
import { AlreadyAddedPopUP } from '../Restaurent Menu Component/Cuisines';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Utility/CartSlice';

const Search = () => {

    const [activeBtn, setActiveBtn] = useState("dishes");
    const [dishes, setDishesData] = useState(JSON.parse(localStorage.getItem("dishes")) || []);
    const [searchedRestaurents, setSearchedRestaurents] = useState(JSON.parse(localStorage.getItem("SearchedRestaurents")) || []);
    const [searchText, setSearchText] = useState(null);
    const [userInput, setuserInput] = useState(null);
    const [loading, setLoading] = useState(false);

    // const { alreadyAddedPop, addToCart } = useContext(cartContext)

    const alreadyAddedPop = useSelector((state) => state.cart.alreadyAddedPop)
    const { coordinates } = useContext(sideBarContext);

    const { lat, long } = coordinates

    const dispatch = useDispatch();


    function activeBtnTogle(value) {
        setActiveBtn(value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchText(userInput);
        }, 100);

        return () => clearTimeout(timer);
    }, [userInput]);

    function handleSearch(e) {
        if (e.key === "Enter" || e.type === "click") {
            setSearchText(userInput)
        }
    }

    async function getDishes() {
        try {
            setLoading(true)
            const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchText}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=7fd3bf6e-2528-c101-2209-3dbc695c330e&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FBurger.png%22%2C%22dishFamilyId%22%3A%22846649%22%2C%22dishFamilyIds%22%3A%5B%22846649%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();



            let dishes = ((data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards) || []).filter((item) => item?.card?.card?.info)
            setDishesData(dishes || []);
            localStorage.setItem("dishes", JSON.stringify(dishes));

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }

    async function getSearchedRestaurents() {
        try {

            const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${long}&str=${searchText}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=5af346e4-51e0-fa4b-9a5a-a67bab970c3f&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FPizza.png%22%2C%22dishFamilyId%22%3A%22846647%22%2C%22dishFamilyIds%22%3A%5B%22846647%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D&selectedPLTab=RESTAURANT`)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            let restaurents = data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
            setSearchedRestaurents(restaurents || []);
            localStorage.setItem("SearchedRestaurents", JSON.stringify(restaurents || []));


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (searchText) {
            getSearchedRestaurents();
            getDishes();
            localStorage.removeItem("dishes")
            localStorage.removeItem("SearchedRestaurents")

        }
    }, [searchText])




    return (
        <div className='w-[60%] mx-auto' >
            <div className='relative'>
                <div className='w-full my-10 sticky  hover:scale-110 duration-75'>
                    <input onChange={(e) => setuserInput(e.target.value)} onKeyDown={(e) => handleSearch(e)} className='border w-full p-3 focus:outline-none' type="text" placeholder='Search For Restaurent and food' />
                    <button onClick={(e) => handleSearch(e)} className=' absolute top-4 right-3 cursor-pointer'>
                        <FaSearch className='text-2xl' />
                    </button>
                </div>

                <div className='flex gap-5 '>
                    <button className={"p-2 border rounded-2xl cursor-pointer " + (activeBtn === "restaurent" ? "active" : null)} onClick={() => activeBtnTogle("restaurent")}>Restaurent</button>
                    <button className={"p-2 border rounded-2xl cursor-pointer " + (activeBtn === "dishes" ? "active" : null)} onClick={() => activeBtnTogle("dishes")}>Dishes</button>
                </div>
            </div>

            {
                loading && <SearchShimmer></SearchShimmer>
            }


            <div className='w-full grid grid-cols-2 gap-3 bg-[#F4F5F7] p-5 my-5'>
                {
                    activeBtn === "dishes" ? (

                        (dishes || []).map((item) => (

                            <div className='w-105 min-h-60 shadow-2xl rounded-3xl p-5 bg-[#fff] hover:scale-90 duration-75' key={item?.card?.card?.info?.id}>
                                <Link to={`/restaurent/${item?.card?.card?.restaurant?.info?.id}`}>
                                    <div className='min-h-10 border-b border-dotted border-gray-500 mb-5 py-2'>
                                        <p className='font-bold text-[#4D5054]'>By {item?.card?.card?.restaurant?.info?.name}</p>
                                        <div className='flex gap-2 text-xs font-bold text-[#4D5054] my-1'>
                                            <div className='flex items-center gap-1'>
                                                <FaStar className="rounded-4xl text-green-600" />
                                                <p>{item?.card?.card?.restaurant?.info?.avgRating}</p>
                                            </div>
                                            <p>:</p>
                                            <p>{item?.card?.card?.restaurant?.info?.sla?.slaString}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className='w-full flex justify-between gap-2'>
                                    <div className='flex-1'>
                                        <p className='font-bold text-[#181a1d]'>{item?.card?.card?.info?.name}</p>
                                        <p className='font-bold text-[#181a1d]'> ₹ {item?.card?.card?.info?.price / 100}</p>
                                    </div>
                                    <div className='relative'>
                                        <div className='w-[150px] h-[150px] flex-shrink-0 overflow-hidden rounded-3xl'>
                                            {
                                                item?.card?.card?.info.imageId && <img className='w-full h-full object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.card?.card?.info.imageId}`} alt="" />
                                            }
                                        </div>
                                        <button
                                            onClick={() => dispatch(addToCart(item?.card?.card))}
                                            className={`absolute ${!item?.card?.card?.info.imageId ? "top-15" : "top-30"} left-6 w-[70%] h-10 bg-[#FFFF] shadow-lg rounded-md text-[#0F8A65] text-xl font-bold cursor-pointer hover:bg-[#d9dde1]`}
                                        >
                                            ADD
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))
                    )
                        : (

                            (searchedRestaurents || []).map((item) => {

                                return (
                                    <Link to={`/restaurent/${item?.card?.card?.info?.id}`} key={item?.card?.card?.info?.id}>
                                        <div className='flex gap-5 shadow-2xl rounded-3xl p-5 bg-[#fff] hover:scale-90 duration-75'>

                                            <div className='w-[100px] h-[120px] relative flex-shrink-0'>
                                                {
                                                    item?.card?.card?.info?.promoted === true && <p className='h-7 bg-[#4C4E5A] absolute top-2 text-xs text-[#fff] p-2 rounded-md' >Ad</p>
                                                }
                                                <img className='w-full h-full object-cover rounded-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.card?.card?.info?.cloudinaryImageId}`} alt="" />
                                            </div>
                                            <div className='flex-1 py-5'>
                                                <div className='text-gray-800 font-bold'>
                                                    <p>{item?.card?.card?.info?.name}</p>
                                                </div>
                                                <div className='flex gap-3 font-bold text-xs text-[#808285]'>
                                                    <p>{item?.card?.card?.info?.costForTwoMessage}</p>
                                                    <p>{item?.card?.card?.info?.sla?.slaString}</p>
                                                </div>
                                                <div className='font-bold text-xs text-[#808285]'>
                                                    <p>
                                                        {item?.card?.card?.info?.cuisines?.slice(0, 5).join(', ')}
                                                        {item?.card?.card?.info?.cuisines?.length > 3 && '...'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )
                }
            </div>

            {
                alreadyAddedPop && <AlreadyAddedPopUP></AlreadyAddedPopUP>
            }
        </div>
    )
}

export default Search




// normal js function ke anadar apan hooks use nahi kar sakte isiliye hm cusom hoooks banate hai 