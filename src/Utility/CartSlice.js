import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0,
        alreadyAddedPop: false,
        topSectionData: JSON.parse(localStorage.getItem("topSectionData")) || {}
    },


    reducers: {

        handleAlreadyAddedPop(state) {
            state.alreadyAddedPop = !state.alreadyAddedPop
        },

        addToCart(state, action) {

            let currentRestaurantId

            let searchedResID = action.payload?.restaurant?.info?.id

            if (searchedResID) {
                currentRestaurantId = searchedResID
            } else {
                currentRestaurantId = state.topSectionData?.id
            }


            const savedRestaurantId = localStorage.getItem("restaurantId");

            if (savedRestaurantId && savedRestaurantId !== currentRestaurantId) {
                state.alreadyAddedPop = !state.alreadyAddedPop
                console.log("if block is runnig");

                return;
            }

            if (!savedRestaurantId) {
                localStorage.setItem("restaurantId", currentRestaurantId);
            }

            let ProductID = action.payload?.id || action.payload?.dish?.info?.id || action.payload?.info?.id;

            // Make a safe copy
            let newProduct = { ...action.payload };

            // Attach restaurant info if not present
            if (!newProduct.restaurant) {
                newProduct.restaurant = {
                    id: state.topSectionData?.id,
                    name: state.topSectionData?.name,
                    areaName: state.topSectionData?.areaName,
                    cloudinaryImageId: state.topSectionData.cloudinaryImageId,
                };
            }

            const existingItem = state.cartItems.find(item => {
                let itemID = item?.id || item?.dish?.info?.id || item?.info?.id;
                return itemID === ProductID;
            });

            if (existingItem) {
                existingItem.quantity += 1
                toast.success('1 Item added again!');
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
                toast.success('1 Item added!');
            }

        },


        removeFromCart(state, action,) {
            const ProductID = action.payload?.id || action.payload?.dish?.info?.id || action.payload?.info?.id

            const existingItem = state.cartItems.find(item => {
                const itemID = item?.id || item?.dish?.info?.id || item?.info?.id
                return itemID === ProductID;
            });

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1
                    toast.error("Item Removed.")
                } else {
                    state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
                    toast.error("Item Removed.")

                    if (state.cartItems.length === 0) {
                        localStorage.removeItem("restaurantId");
                    }
                }
            }
        },


        getTotal(state) {
            const total = state.cartItems.reduce((acc, currItem) => {
                let price = 0;

                if (currItem?.type === "TopCarousel") {
                    const dishInfo = currItem?.dish?.info || {};
                    price = (dishInfo.finalPrice ?? dishInfo.price ?? dishInfo.defaultPrice ?? 0) * (currItem?.quantity ?? 1);
                } else if (currItem?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Dish") {
                    const info = currItem?.info || {};
                    price = (info.finalPrice ?? info.price ?? info.defaultPrice ?? 0) * (currItem?.quantity ?? 1);
                } else {
                    price = (currItem?.defaultPrice ?? currItem?.price ?? 0) * (currItem?.quantity ?? 1);
                }
                return acc + price / 100;
            }, 0);

            state.total = total
        },

        emptyCart(state) {
            state.cartItems = []
        },

        placeOrder() {
            toast.success("orderPlaced", { position: "top-center" })
        }










    }
})




export const { addToCart, removeFromCart, emptyCart, placeOrder, handleAlreadyAddedPop ,getTotal } = CartSlice.actions
export default CartSlice.reducer




// Update quantity
// const updatedCart = cart.map(item => {
//     let itemID = item?.id || item?.dish?.info?.id || item?.info?.id;
//     if (itemID === ProductID) {
//         return { ...item, quantity: item.quantity + 1 };
//     }
//     return item;
// });





// const updatedCart = cart.map(item => {
//     const itemID = item?.id || item?.dish?.info?.id || item?.info?.id
//     return itemID === ProductID ? { ...item, quantity: item.quantity - 1 } : item;
// });
// setCart(updatedCart);