/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Image from "next/image";
import CustomInput from "../component/CustomInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import CustomButton from "../component/CustomButton";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../lib/hook";
import { updateUserId, updateUserType } from "../lib/features/auth/authSlice";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../component/AuthLayout";

const SignIn = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm();
  const { loginFromContext } = useAuth();
  const dispatch = useAppDispatch();

  const signInMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Login", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Logged in sucessfully");
        sessionStorage.setItem("token", data?.data?.token);
        const userType = data?.data?.userRole;

        dispatch(updateUserType(userType));
        dispatch(updateUserId(data?.data?.publicId));
        loginFromContext();

        if (userType === "Admin") {
          router.push("/admin-dashboard");
        } else if (userType === "Editor") {
          router.push("/editor-dashboard");
        } else if (userType === "Contributor") {
          router.push("/contributor-dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.remark);
      // console.log(error?.response?.data?.remark);
    },
  });

  const onSubmit: any = (data: any) => {
    // const formData: any = {
    //   email: "duvotes@mailinator.com",
    //   password: "Password1@",
    // };
    signInMutation.mutate(data);
  };

  return (
    <AuthLayout
      header="Be informed, Engaged And Empowered" 
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
      cupiditate voluptates blanditiis libero neque commodi quas quod
      itaque nam, at delectus amet voluptatibus iure in quibusdam est
      expedita corporis!" 
      img="logo.svg" 
      banner="Signin-Banner.svg">

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

          <Link href="/forgotPassword">
            <p className="font-bold text-sm ml-72 pb-3">Forgot Password?</p>
          </Link>

          <CustomButton
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            disabled={signInMutation.isPending}
            loading={signInMutation.isPending}
          >
            Sign In
          </CustomButton>
          <Link href="signup">
            <p className="flex justify-center mt-5 text-sm">
              Don't have an account?{" "}
              <span className="font-bold text-primary">Sign Up</span>
            </p>
          </Link>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
