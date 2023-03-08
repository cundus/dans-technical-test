import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import Root from "./layout/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { StoreProvider } from "./context/store";

const queryClient = new QueryClient();

const router = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      children: [
         {
            index: true,
            element: <Home />,
         },
      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <StoreProvider>
            <RouterProvider router={router} />
         </StoreProvider>
      </QueryClientProvider>
   </React.StrictMode>
);
