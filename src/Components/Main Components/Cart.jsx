import { useContext , useEffect} from 'react'
import { userDataContext } from '../../Utils/Context'

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, emptyCart, placeOrder ,getTotal } from '../../Utility/CartSlice';

const Cart = () => {

    // const { cart, total, removeFromCart, addToCart, emptyCart, placeOrder } = useContext(cartContext);

    const cart = useSelector((state) => state.cart.cartItems);
    const total = useSelector((state) => state.cart.total)
    const { userData, handelAuth } = useContext(userDataContext);

    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getTotal())
    }, [cart])



    const restaurantInfo  = cart[0]?.restaurant;
    

    return cart.length === 0 ? <EmptyCart /> : (


        <div className='w-full'>
            <div className='w-[40%] mx-auto my-10'>

                {
                    restaurantInfo?.info ? (
                        <div>
                            <div className='flex gap-5 cursor-pointer'>
                                <div className='w-20 overflow-hidden'>
                                    <img className='object-center shadow-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurantInfo?.info?.cloudinaryImageId}`} alt="" />
                                </div>
                                <div className='mt-5'>
                                    <p className='font-bold'>{restaurantInfo?.info?.name}</p>
                                    <p>{(restaurantInfo?.info?.areaName)}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='flex gap-5 cursor-pointer'>
                                <div className='w-20 overflow-hidden'>
                                    <img className='object-center shadow-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurantInfo?.cloudinaryImageId}`} alt="" />
                                </div>
                                <div className='mt-5'>
                                    <p className='font-bold'>{restaurantInfo?.name}</p>
                                    <p>{(restaurantInfo?.areaName)}</p>
                                </div>
                            </div>
                        </div>
                    )

                }


                {
                    (cart || []).map((item, i) => {

                        if (item?.type === "TopCarousel") {
                            return (

                                <>
                                    <div className="flex justify-between items-center m-5" key={item?.id}>
                                        <div>
                                            <div className='flex justify-center gap-2 border w-15 mt-2 cursor-pointer'>
                                                <button className='text-gray-400 cursor-pointer' onClick={() => dispatch(addToCart(item))}>+</button>
                                                <p>{item?.quantity}</p>
                                                <button className='text-gray-400 cursor-pointer' onClick={() => { dispatch(removeFromCart(item, i)) }}>-</button>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-5'>
                                            <p className="font-semibold text-xl text-[#414449]">{item?.dish?.info?.name}</p>
                                            <p className="font-semibold">₹ {item?.dish?.info?.finalPrice / 100 || item?.dish?.info?.price / 100 || item?.dish?.info?.defaultPrice / 100}</p>
                                        </div>
                                    </div>
                                    <hr className='text-gray-400 border-dashed' />
                                </>
                            )
                        } else if (item?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Dish") {

                            return (
                                <>
                                    <div className='flex justify-between items-center m-2' key={item?.info.id}>
                                        <div>
                                            <div className='flex justify-center gap-2 border w-15  mt-2 cursor-pointer'>
                                                <button className='text-gray-400 cursor-pointer' onClick={() => dispatch(addToCart(item))}>+</button>
                                                <p>{item?.quantity}</p>
                                                <button className='text-gray-400 cursor-pointer' onClick={() => dispatch(removeFromCart(item))} >-</button>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-5'>
                                            <p className="font-semibold text-xl text-[#414449]">{item?.info?.name}</p>
                                            <p className="font-semibold">₹ {item?.info?.defaultPrice / 100 || item?.info?.price / 100}</p>
                                        </div>
                                    </div>
                                    <hr className='text-gray-400 border-dashed' />
                                </>
                            )
                        } else {

                            return (
                                <>
                                    <div className='flex justify-between items-center m-2' key={item?.bannerId}>
                                        <div>
                                            <div className='flex justify-center gap-2 border w-15  mt-2 cursor-pointer'>
                                                <button className='text-gray-400 cursor-pointer' onClick={() => dispatch(addToCart(item))}>+</button>
                                                <p>{item?.quantity}</p>
                                                <button className='text-gray-400 cursor-pointer' onClick={() => dispatch(removeFromCart(item))} >-</button>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-5'>
                                            <p className="font-semibold text-xl text-[#414449]">{item?.name}</p>
                                            <p className="font-semibold">₹ {item?.defaultPrice / 100 || item?.price / 100}</p>
                                        </div>
                                    </div>
                                    <hr className='text-gray-400 border-dashed' />
                                </>
                            )
                        }

                    })
                }
                <div className='flex justify-end items-center gap-20 mx-5 text-2xl'>
                    <p>Total</p>
                    <p>₹ {total}</p>
                </div>
                <div className='flex justify-between m-5 '>
                    {
                        userData ? (
                            <button onClick={() => { dispatch(placeOrder()), dispatch(emptyCart()) }} className='cursor-pointer p-2 bg-[#FF5A00] text-white rounded-4xl'>Place Order</button>
                        ) : (
                            <button onClick={handelAuth} className='cursor-pointer  p-2 bg-[#FF5A00] text-white rounded-4xl'>You Need To Login First to Buy</button>
                        )
                    }
                    <button onClick={() => dispatch(emptyCart())} className='cursor-pointer p-2 bg-red-600 text-white rounded-4xl'>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}



const EmptyCart = () => {
    return (
        <div className='min-h-[100vh] flex justify-center items-center'>
            <div>
                <div className='w-full h-full shadow-2xl overflow-hidden'>
                    <img className='object-contain' src={"https://imgs.search.brave.com/WkyE2Hv2jdqm3-hWgfeqCOUHr_5tHfhBvLmQFXDAge8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTUw/Njc0NDE4Ny9waG90/by9zdXBlcm1hcmtl/dC1zaG9wcGluZy1j/YXJ0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1mcDZaeGsx/RmJkVUdiVUJISXZY/dEtFTGZJaXhIQWUx/NVdGeTVGcl9LaFg0/PQ"} alt="" />
                </div>
                <div className='flex justify-center p-10'>
                    <h1 className='text-4xl font-bold text-gray-500' >Cart is Empty</h1>
                </div>
            </div>
        </div>
    )
}

export default Cart



