import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { checkLogin } from "../api/call/auth";
import { setAuthToken } from "../api/config";
import Navbar from "../components/Navbar";
import { UseStore } from "../context/store";

const Root = () => {
   const { state, dispatch } = UseStore();
   const navigate = useNavigate();
   const checkAuth = async () => {
      try {
         const token = JSON.parse(localStorage.getItem("token"));
         if (!token) {
            return navigate("/login", { replace: true });
         }
         await setAuthToken(token);
         const check = await checkLogin();

         dispatch({ type: "LOGIN", payload: token });
      } catch (error) {
         // console.log(error);
         dispatch({ type: "LOGOUT" });
      }
   };
   useEffect(() => {
      checkAuth();
   }, []);

   return (
      <>
         <Navbar />
         <div className="p-5">
            <Outlet />
         </div>
      </>
   );
};

export default Root;
