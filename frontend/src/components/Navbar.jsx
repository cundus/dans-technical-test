import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/config";
import { UseStore } from "../context/store";

const Navbar = () => {
   const { state, dispatch } = UseStore();
   return (
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500 mb-3">
         <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
               <NavLink
                  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  to={"/"}
               >
                  teal Color
               </NavLink>
            </div>
            <div
               className="lg:flex flex-grow items-center"
               id="example-navbar-warning"
            >
               <ul className="flex flex-col lg:flex-row list-none ml-auto">
                  <li className="nav-item">
                     <NavLink
                        onClick={() => {
                           dispatch({ type: "LOGOUT" });
                           localStorage.removeItem("token");
                           setAuthToken();
                           useNavigate()("/login", { replace: true });
                        }}
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        to={"#"}
                     >
                        Logout
                     </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
