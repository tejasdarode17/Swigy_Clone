import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import NavBar from "./Components/Main Components/Head";
import Body from "./Components/Main Components/Body";

const Search = lazy(() => import("./Components/Main Components/Search"))
const Cart = lazy(() => import("./Components/Main Components/Cart"))
const RestaurentMenu = lazy(() => import("./Components/Restaurent Menu Component/RestaurentMenu"))

// import CartProvider from "./Utils/CartProvider";
import SideBarProvider from "./Utils/SideBarProvider";
import MainDataProvider from "./Utils/MainDataProvider";
import SingleRestaurentProvider from "./Utils/SingleRestaurentProvider";
import FilterDataProvider from "./Utils/FilterDataProvider";
import UserDataProvider from "./Utils/UserDataProvider";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <SideBarProvider>
        <MainDataProvider>
          <SingleRestaurentProvider>
            {/* <CartProvider> */}
              <FilterDataProvider>
                <UserDataProvider>

                  <Toaster position="bottom-center" reverseOrder={false} />
                  <NavBar></NavBar>
                  <Outlet></Outlet>

                </UserDataProvider>
              </FilterDataProvider>
            {/* </CartProvider> */}
          </SingleRestaurentProvider>
        </MainDataProvider>
      </SideBarProvider>
    </>
  );
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/restaurent/:id",
        element: <Suspense fallback={<h1>loading</h1>}> <RestaurentMenu /> </Suspense>
      }, 
      {
        path: "/cart",
        element:  <Suspense fallback={<h1>loading</h1>} > <Cart /> </Suspense>
      },
      {
        path: "/search",
        element: <Suspense fallback={<h1>loading</h1>}> <Search /> </Suspense>
      }
    ]
  }
]);



export default appRouter;
