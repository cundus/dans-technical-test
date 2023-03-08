import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { getDetail } from "../api/call/job";
import ReactHtmlParser from "react-html-parser";
import { Link, NavLink } from "react-router-dom";
import HtmlParser from "react-html-parser";

const Detail = () => {
   const params = useParams();
   const [loading, setLoading] = useState(true);
   const { isFetching, data, refetch, isLoading } = useQuery({
      queryKey: ["detail"],
      queryFn: async () => await getDetail(params.id),
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
         console.log(data);
         setLoading(false);
      },
   });

   if (isFetching || isLoading || loading) return <CircularProgress />;

   return (
      <div className="border-2 rounded-lg p-5">
         <Stack className="p-3 w-full">
            <Typography variant="caption" color={"gray"}>
               {data?.type} / {data?.location}
            </Typography>
            <Typography variant="h5" fontWeight={"bold"}>
               {data?.title}
            </Typography>
         </Stack>
         <Stack direction={"row"} spacing={2} className="border-t-2 pt-3">
            <Box className="flex-2">{ReactHtmlParser(data.description)}</Box>
            <Box className="flex-1">
               <Box className=" p-3 border-2 rounded-lg">
                  <Typography variant="body1" fontWeight={"bold"}>
                     {data?.company}
                  </Typography>
                  <img
                     src={data?.company_logo}
                     alt="logo"
                     className="w-52 h-52 my-3"
                  />

                  <Link to={data?.url}>{data?.url}</Link>
               </Box>
               <Box className=" p-3 border-2 rounded-lg mt-3">
                  <Typography variant="body1" fontWeight={"bold"}>
                     How to apply
                  </Typography>
                  <Typography variant="caption">
                     {HtmlParser(data?.how_to_apply)}
                  </Typography>
               </Box>
            </Box>
         </Stack>
      </div>
   );
};

export default Detail;
