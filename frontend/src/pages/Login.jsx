import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import axios from "axios";
import { login } from "../api/call/auth";
import Swal from "sweetalert2";
import { UseStore } from "../context/store";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/config";

const schema = yup.object({
   username: yup.string().required().min(4, "minimum 4 characters"),
   password: yup.string().required().min(6, "minimum 6 characters"),
});

const Login = () => {
   const navigate = useNavigate();

   const { control, handleSubmit } = useForm({
      defaultValues: { username: "", password: "" },
      resolver: yupResolver(schema),
      mode: "all",
      reValidateMode: "onBlur",
   });

   const { state, dispatch } = UseStore();

   const { isLoading, mutateAsync } = useMutation({
      mutationFn: login,
      onSuccess: (data) => {
         localStorage.setItem("token", JSON.stringify(data.data.token));
         dispatch({
            type: "LOGIN",
            payload: data.data.token,
         });
         setAuthToken(data.data.token);
      },
      onError: (err) => {
         Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
         });
      },
   });

   useEffect(() => {
      if (state.isLogin) {
         navigate("/", { replace: true });
      }
   }, [state.isLogin]);

   const onSubmit = useCallback(async (data) => {
      await mutateAsync(data);
   }, []);

   return (
      <div className="flex flex-col justify-center items-center h-screen">
         <div className="mx-auto flex flex-col justify-center items-center p-5 border-2 w-1/2 rounded-md shadow-xl">
            <h1 className="text-center text-2xl font-semibold">
               Masuk ke JobList
            </h1>
            <form className=" w-full">
               <div className="flex flex-col mt-10 w-full gap-3">
                  <Controller
                     control={control}
                     name="username"
                     render={({ field, fieldState }) => (
                        <TextField
                           {...field}
                           label="Username"
                           size="small"
                           sx={{}}
                           error={!!fieldState?.error?.message}
                           helperText={fieldState?.error?.message}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="password"
                     render={({ field, fieldState }) => (
                        <TextField
                           {...field}
                           label="Password"
                           size="small"
                           type={"password"}
                           sx={{}}
                           error={!!fieldState?.error?.message}
                           helperText={fieldState?.error?.message}
                        />
                     )}
                  />
                  <LoadingButton
                     loading={isLoading}
                     onClick={handleSubmit(onSubmit)}
                     variant="contained"
                  >
                     Submit
                  </LoadingButton>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
