import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Utility/Store.js";
import appRouter from "./App.jsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
