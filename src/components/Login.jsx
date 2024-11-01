import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as reducerLogin } from "../store/authSlice";
import { Input, Button } from "./index";

const Login = () => {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  // If pailai dekhi global-state mah user cha bhane , then don't show login wala aspect.

  const loginHandler = async (data) => {
    setErrors("");

    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(reducerLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
      <div className="w-full h-full flex justify-center flex-col items-center">
        <div className="w-[400px] p-10 shadow-2xl rounded-md">
        <h2 className="text-4xl font-serif mb-5 w-full text-center">Login</h2>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="w-full max-w-lg rounded-xl border-[1px] border-white flex flex-col gap-9"
          >
          <Input
            label="email :"
            type="email"
            placeHolder="Enter Your Email"
            // react-hook-form
            {...register("email", { required: true })}
          />
          <Input
            label="password :"
            type="password"
            placeHolder="Enter Your Password"
            // react-hook-form
            {...register("password", { required: true })}
          />

          <Button type="submit">Sign In</Button>
          {errors && <p className="text-red-600 text-center">{errors}</p>}
        </form>

        </div>
      </div>
  );
};

export default Login;
