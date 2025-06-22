// import { useContext, useEffect, useState } from "react";
// import { cartContext, singleRestaurentContext } from "./Context";
// import toast from "react-hot-toast";



// const CartProvider = ({ children }) => {

//     const [cart, setCart] = useState([])
//     const [total, setTotal] = useState()
//     const [alreadyAddedPop, setAleadyAddedPop] = useState(false)


//     const { topSectionData } = useContext(singleRestaurentContext);

//     function handleAlreadyAddedPop() {
//         setAleadyAddedPop(prev => !prev)
//     }

//     function addToCart(product) {
        
//         let currentRestaurantId
//         let searchedResID = product?.restaurant?.info?.id

//         if (searchedResID) {
//             currentRestaurantId = searchedResID
//         }else{
//             currentRestaurantId = topSectionData?.id
//         }

//         const savedRestaurantId = localStorage.getItem("restaurantId");
      
//         if (savedRestaurantId && savedRestaurantId !== currentRestaurantId) {
//           handleAlreadyAddedPop();
//           return;
//         }
      
//         if (!savedRestaurantId) {
//           localStorage.setItem("restaurantId", currentRestaurantId);
//         }
      
//         let ProductID = product?.id || product?.dish?.info?.id || product?.info?.id;
      
//         // Make a safe copy
//         let newProduct = { ...product };
      
//         // Attach restaurant info if not present
//         if (!newProduct.restaurant) {
//           newProduct.restaurant = {
//             id: topSectionData?.id,
//             name: topSectionData?.name,
//             areaName: topSectionData?.areaName,
//             cloudinaryImageId: topSectionData.cloudinaryImageId,
//           };
//         }
      
//         const existingItem = cart.find(item => {
//           let itemID = item?.id || item?.dish?.info?.id || item?.info?.id;
//           return itemID === ProductID;
//         });
      
//         if (existingItem) {
//           // Update quantity
//           const updatedCart = cart.map(item => {
//             let itemID = item?.id || item?.dish?.info?.id || item?.info?.id;
//             if (itemID === ProductID) {
//               return { ...item, quantity: item.quantity + 1 };
//             }
//             return item;
//           });
//           setCart(updatedCart);
//           toast.success('1 Item added!');
//         } else {
//           // Add new product with quantity
//           setCart([{ ...newProduct, quantity: 1 }, ...cart]);
//           toast.success('1 Item added!');
//         }
//       }
      

//     function removeFromCart(product, i) {
//         const ProductID = product?.id || product?.dish?.info?.id || product?.info?.id

//         const existingItem = cart.find(item => {
//             const itemID = item?.id || item?.dish?.info?.id || item?.info?.id
//             return itemID === ProductID;
//         });

//         if (existingItem) {
//             if (existingItem.quantity > 1) {
//                 const updatedCart = cart.map(item => {
//                     const itemID = item?.id || item?.dish?.info?.id || item?.info?.id
//                     return itemID === ProductID ? { ...item, quantity: item.quantity - 1 } : item;
//                 });
//                 toast.error("Item Removed.")
//                 setCart(updatedCart);
//             } else {
//                 const filteredCart = cart.filter((item, index) => index !== i);
//                 toast.error("Item Removed.")
//                 setCart(filteredCart);

//                 if (filteredCart.length === 0) {
//                     localStorage.removeItem("restaurantId");
//                 }
//             }
//         }
//     }



//     function getTotal() {
//         const total = cart.reduce((acc, currItem) => {
//             let price = 0;

//             if (currItem?.type === "TopCarousel") {
//                 const dishInfo = currItem?.dish?.info || {};
//                 price = (dishInfo.finalPrice ?? dishInfo.price ?? dishInfo.defaultPrice ?? 0) * (currItem?.quantity ?? 1);
//             } else if (currItem?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Dish") {
//                 const info = currItem?.info || {};
//                 price = (info.finalPrice ?? info.price ?? info.defaultPrice ?? 0) * (currItem?.quantity ?? 1);
//             } else {
//                 price = (currItem?.defaultPrice ?? currItem?.price ?? 0) * (currItem?.quantity ?? 1);
//             }
//             return acc + price / 100;
//         }, 0);

//         setTotal(total);
//     }

//     useEffect(() => {
//         getTotal()
//     }, [cart])

//     if (cart.length === 0) {
//         localStorage.removeItem("restaurantId");
//     }

//     function emptyCart() {
//         setCart([])
//         localStorage.removeItem("restaurantId");
//     }

//     function placeOrder() {
//         toast.success("orderPlaced", { position: "top-center" })
//     }

//     return (
//         <cartContext.Provider value={{ addToCart, cart, total, removeFromCart, emptyCart, alreadyAddedPop, setAleadyAddedPop, handleAlreadyAddedPop, placeOrder, }}>
//             {children}
//         </cartContext.Provider>
//     )

// }


// export default CartProvider;







// // function addToCart(product) {
// //     setCart(preCart => {
// //         [...preCart , {...product}]
// //     })
// // }

// // function removeFromCart(product) {
// //     const update = cart.filter((item)=> item.id !== product.id )
// //     setCart(update)
// //     console.log(" Clicked");
// // }




// // function addToCart(product) {

// //     const currentRestaurantId = topSectionData?.id

// //     const savedRestaurantId = localStorage.getItem("restaurantId");

// //     if (savedRestaurantId && savedRestaurantId !== currentRestaurantId) {
// //         handleAlreadyAddedPop()
// //         return;
// //     }
    
// //     if (!savedRestaurantId) {
// //         localStorage.setItem("restaurantId", currentRestaurantId);
// //     }

// //     let ProductID = product?.id || product?.dish?.info?.id || product?.card?.info?.id

// //     const existingItem = cart.find(item => {
// //         let itemID = item?.id || item?.dish?.info?.id || item?.card?.info?.id
// //         return itemID === ProductID
// //     });


// //     if (existingItem) {
// //         const updatedCart = cart.map(item => {
// //             let itemID = item?.id || item?.dish?.info?.id || item?.card?.info?.id
// //             if (itemID === ProductID) {
// //                 return { ...item, quantity: item.quantity + 1 };
// //             }
// //             return item;
// //         });
// //         setCart(updatedCart);
// //         toast.success('1 Item added!')
// //     } else {
// //         setCart([{ ...product, quantity: 1 }, ...cart]);
// //         toast.success('1 Item added!')
// //     }
// // }
