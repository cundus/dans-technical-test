import { API } from "../config";

export const getData = async (qs) => {
   const { data } = await API.get("/jobs/?" + qs);

   return data;
};
