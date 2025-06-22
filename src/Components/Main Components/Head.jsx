import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector} from "react-redux";
import { sideBarContext, userDataContext } from "../../Utils/Context";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";


import { FaSearch, FaUser, FaShoppingCart, FaAngleDown, } from "react-icons/fa";

const NavBar = () => {


  const cart = useSelector((state)=>state.cart.cartItems)
  
  const { handleClick, addres } = useContext(sideBarContext)
  const { userData, handelLoginSideBar } = useContext(userDataContext);
  

  return (
    <div className="w-full relative ">

      <CitiesSideBar></CitiesSideBar>

      <LoginSideBar></LoginSideBar>

      <div className="w-full top-0 z-10 shadow-lg h-24 flex justify-center items-center">
        <div className="w-[75%] mx-auto flex items-center justify-between ">
          <div className="flex items-center gap-10" >
            <Link to="/">
              <div className="w-8 overflow-hidden">
                <img
                  className="object-center"
                  src="https://imgs.search.brave.com/W9gRWLnV_3bcUYJMXPa_IxwGgY1fTWUJV96eAiq6cKw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9T/V0lHR1kuTlMtZmJk/NjI3MzQucG5nP3Q9/MTczMTk4NzA2MA"
                  alt="Swiggy Logo"
                />
              </div>
            </Link>
            <div onClick={(e) => handleClick(e)} className="flex items-center cursor-pointer">
              <p className="border-b font-bold hover:text-[#FE5004]">Other</p>
              <p className="mx-2">{(addres).split(",").slice(0, 1).join(", ")}</p>
              <FaAngleDown className="cursor-pointer text-amber-600" />
            </div>
          </div>

          <div className="flex gap-8 font-bold">
            <Link to="/search">
              <div className="flex items-center gap-2 cursor-pointer">
                <FaSearch />
                <p>Search</p>
              </div>
            </Link>

            <div onClick={handelLoginSideBar} className="flex items-center gap-2 cursor-pointer">
              {
                (userData) ? (
                  <div className="flex items-center gap-2">
                    <img src={userData?.profilePhoto} alt="Profile" className="w-6 h-6 rounded-full" />
                    <p>Log Out</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <p>Sign IN</p>
                  </div>
                )
              }
            </div>
            <Link to="/cart" >
              <div className="flex items-center gap-2 cursor-pointer">
                <FaShoppingCart />
                {
                  cart.length === 0 ? (
                    <p>cart</p>
                  ) : (<p>Cart {cart.length}</p>)
                }
              </div>
            </Link>
          </div>
        </div>
      </div >
    </div >
  );
};



const CitiesSideBar = () => {

  const { citiSideBarvisible, handleClick, getCities, cities, getCoordinates, } = useContext(sideBarContext)

  return (

    <div>
      <div className={`w-full h-[100vh] absolute z-30 bg-black/50 ${citiSideBarvisible ? "visible" : "hidden"}`} onClick={(e) => handleClick(e)}></div>
      <div className={"w-[40%] h-[100vh] flex justify-end absolute z-30 bg-white duration-500 " + (citiSideBarvisible ? "left-0" : "left-[-100%]")}>
        <div className="w-100 m-10">
          <MdOutlineCancel className="my-5 text-4xl cursor-pointer text-red-500" onClick={(e) => handleClick(e)} />
          <input className="w-full border border-gray-300 rounded-lg focus:outline-none focus:shadow-lg p-2" type="text" placeholder="Search Places" onChange={(e) => getCities(e.target.value)} />
          <div className=" mt-5 overflow-hidden">
            {
              (cities || []).map((city) => (
                <div className="w-full flex items-center m-2" key={city?.place_id}>
                  <CiLocationOn className="text-4xl" />
                  <Link to={"/"}>
                    <p className="border-b border-[#E6E6E7] border-dotted p-5 cursor-pointer hover:text-red-500" onClick={(e) => { getCoordinates(city.place_id); handleClick(e) }}>{city?.description}</p>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}


const LoginSideBar = () => {

  const { loginSideBarVisible, handelLoginSideBar, handelAuth, handelLogOut, userData } = useContext(userDataContext);

  return (
    <div>
      <div className={`w-full h-[100vh] absolute z-30 bg-black/50 ${loginSideBarVisible ? "visible" : "hidden"}`} onClick={(e) => handleClick(e)}></div>
      <div className={"w-[40%] h-[100vh] flex absolute z-30 bg-white duration-500 " + (loginSideBarVisible ? "right-0" : "right-[-100%]")}>
        <div className="w-100 m-5">
          <MdOutlineCancel className="my-5 text-4xl cursor-pointer text-red-500" onClick={(e) => handelLoginSideBar(e)} />

          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-2xl ">Login</p>
              <p>or <button className="cursor-pointer text-[#FF5A00] mt-2">create a account</button></p>
            </div>
            <div className="w-30">
              <img className="object-center" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-100 my-10">


            {
              userData ? (
                <button onClick={() => { handelLogOut(), handelLoginSideBar() }} className="w-full p-5 bg-[#FF5A00] cursor-pointer hover:shadow-2xl ">Logout</button>
              ) : (
                <button onClick={() => { handelAuth(), handelLoginSideBar() }} className="w-full p-5 bg-[#FF5A00] cursor-pointer hover:shadow-2xl ">Login with Google</button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}



export default NavBar;










