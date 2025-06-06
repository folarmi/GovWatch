/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../component/CustomInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import CustomButton from "../component/CustomButton";
import { useAppDispatch } from "../lib/hook";
import {
  updateUserCountry,
  updateUserId,
  updateUserObject,
  updateUserType,
} from "../lib/features/auth/authSlice";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
// import { directUserToPageOnLogin } from "../utils";
// import { RootState } from "../lib/store";

const SignIn = () => {
  const navigate = useNavigate();
  // const { userType } = useAppSelector((state: RootState) => state.auth);
  const { handleSubmit, control, reset } = useForm();
  const { loginFromContext } = useAuth();
  const dispatch = useAppDispatch();

  const signInMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Authentication/Login", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Logged in sucessfully");
        const userType = data?.data?.userRole;

        dispatch(updateUserType(userType));
        dispatch(updateUserId(data?.data?.publicId));
        dispatch(updateUserCountry(data?.data?.countryOfOrigin));
        dispatch(updateUserObject(data?.data));
        loginFromContext(data?.data?.token);

        navigate("/dashboard/analytics");
        // navigate(directUserToPageOnLogin(userType));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.remark, {
        autoClose: 6000,
      });
      reset();
    },
  });

  const onSubmit: any = (data: any) => {
    signInMutation.mutate(data);
  };

  return (
    <AuthLayout
      header="Be informed, Engaged And Empowered"
      img="logo.svg"
      // banner="Signin-Banner.svg"
      banner="https://res.cloudinary.com/dk9i5q1bg/image/upload/v1738829966/633158a5-d253-43b7-9148-98d368dc31e0.png"
    >
      <div className="mb-24 md:mx-10 mx-12">
        <h1 className="font-bold text-4xl mb-2">Welcome Back</h1>
        <p className="mb-9">
          Enter your email and password to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email address"
            name="email"
            type="email"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
          />

          <Link to="/forgot-password">
            <p className="font-bold text-sm md:ml-72 pb-3">Forgot Password?</p>
          </Link>

          <CustomButton
            type="submit"
            className={`mt-8 md:px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            disabled={signInMutation.isPending}
            loading={signInMutation.isPending}
          >
            Sign In
          </CustomButton>
          <Link to="/sign-up">
            <p className="flex justify-center mt-5 text-sm">
              Don't have an account?{" "}
              <span className="font-bold text-primary ml-2">Sign Up</span>
            </p>
          </Link>
        </form>
      </div>
    </AuthLayout>
  );
};

export { SignIn };
