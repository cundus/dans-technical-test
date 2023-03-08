import axios from "axios";
import { API } from "../config";

export const login = async (body) => {
   const { data } = await API.post("/user/login", body);
   return data;
};

export const checkLogin = async () => {
   const { data } = await API.get("/user/check-auth");
   return data;
};
