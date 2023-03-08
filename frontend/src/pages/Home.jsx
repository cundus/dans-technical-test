import {
   Box,
   Button,
   CircularProgress,
   InputAdornment,
   MenuItem,
   Pagination,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getData } from "../api/call/job";
import Swal from "sweetalert2";
import moment from "moment";

const Home = () => {
   const [query, setQuery] = useState({
      description: "",
      location: "",
      full_time: false,
      page: 1,
   });

   const queryClient = useQueryClient();

   let [searchParams, setSearchParams] = useSearchParams(query);

   const handleChange = (e) => {
      const { name, value } = e.target;

      setQuery({ ...query, [name]: value });
   };

   const { isFetching, data, refetch } = useQuery({
      queryKey: ["jobs"],
      queryFn: async () => await getData(searchParams.toString()),
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => console.log(data),
   });

   function handleSubmit() {
      const notEmpty = {};
      Object.keys(query).map((item) => {
         if (item == "page") {
            return;
         }

         if (item !== "full_time" && query[item] !== "") {
            return (notEmpty[item] = query[item]);
         }

         if (!query[item]) {
            return;
         }

         return (notEmpty[item] = query[item]);
      });

      console.log(notEmpty);

      if (Object.keys(notEmpty).length < 1) {
         return setSearchParams({ page: 1 });
      }

      setSearchParams(notEmpty);
   }

   useEffect(() => {
      refetch();
   }, [searchParams]);

   return (
      <div className="flex flex-col">
         <Stack direction={"row"} spacing={3} flex={1}>
            <TextField
               // InputProps={{
               //    startAdornment: (
               //       <InputAdornment position="start">
               //       </InputAdornment>
               //    ),
               // }}
               name={"description"}
               onChange={handleChange}
               value={query.description}
               label="Deskripsi"
               fullWidth
            />
            <TextField
               // InputProps={{
               //    startAdornment: (
               //       <InputAdornment position="start">
               //       </InputAdornment>
               //    ),
               // }}
               name={"location"}
               onChange={handleChange}
               value={query.location}
               label="Lokasi"
               fullWidth
            />

            <TextField
               name={"full_time"}
               onChange={handleChange}
               value={query.full_time}
               label="Tipe Pekerjaan"
               fullWidth
               select
               sx={{ w: 20 }}
            >
               <MenuItem value={true}>Full Time</MenuItem>
               <MenuItem value={false}>All type</MenuItem>
            </TextField>

            <Button variant="contained" sx={{ px: 5 }} onClick={handleSubmit}>
               Search
            </Button>
         </Stack>
         <Box className="border-2 rounded-lg flex-1 mt-3 p-5">
            <Typography variant="h5">Pekerjaan</Typography>

            {isFetching ? (
               <CircularProgress />
            ) : (
               data?.data?.map((item) => (
                  <Stack
                     onClick={() => {}}
                     key={item?.id}
                     className="w-full cursor-pointer m-2 border-t-2 p-3 rounded-lg hover:bg-slate-200"
                     direction={"row"}
                     justifyContent="space-between"
                     alignItems={"flex-start"}
                  >
                     <Box>
                        <Typography
                           variant="h6"
                           fontWeight={"bold"}
                           color="teal"
                        >
                           {item?.title}
                        </Typography>
                        <Stack
                           direction={"row"}
                           alignItems="flex-end"
                           spacing={1}
                        >
                           <Typography variant="caption" color={"GrayText"}>
                              {item?.company}
                           </Typography>
                           <Typography variant="caption" color={"GrayText"}>
                              -
                           </Typography>

                           <Typography
                              variant="body2"
                              color="green"
                              fontWeight={"bold"}
                           >
                              {item?.type}
                           </Typography>
                        </Stack>
                     </Box>

                     <Stack alignItems={"flex-end"}>
                        <Typography
                           variant="subtitle2"
                           className="text-gray-600 "
                           fontWeight={"bold"}
                        >
                           {item?.location}
                        </Typography>
                        <Typography variant="caption" color={"GrayText"}>
                           {moment(item?.created_at).fromNow()}
                        </Typography>
                     </Stack>
                  </Stack>
               ))
            )}
            <Pagination
               count={Math.ceil(data?.data?.length / 6)}
               onChange={(e, value) => {
                  console.log(value);
                  // setQuery({ ...query, page: value });
                  setSearchParams({ ...query, page: value });
               }}
            />
         </Box>
      </div>
   );
};

export default Home;
