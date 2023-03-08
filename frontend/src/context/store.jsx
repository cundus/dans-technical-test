import React, { createContext, useContext, useReducer } from "react";

import { reducer } from "./reducer";

const initialState = {
   isLogin: false,
};

export const Store = createContext(initialState);

export const UseStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
   );
};
