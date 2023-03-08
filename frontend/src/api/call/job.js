import { API } from "../config";

export const getData = async (qs) => {
   const { data } = await API.get("/jobs/?" + qs);

   return data;
};

export const getDetail = async (id) => {
   const { data } = await API.get("/jobs/detail/" + id);

   return data.data;
};
