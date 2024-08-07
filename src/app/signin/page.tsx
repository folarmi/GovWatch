/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import CustomButton from "../component/CustomButton";

//const SignIn: React.FC = () => {
//const [email, setEmail] = useState('');
//const [password, setPassword] = useState('');

//const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//setEmail(e.target.value);
//};

//const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//setPassword(e.target.value);
//};

//const isFormFilled = email !== '' && password !== '';

const SignIn = () => {
  const { handleSubmit, control } = useForm();

  const signInMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Login", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast("Logged in sucessfully");
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onSubmit: any = (data: any) => {
    const formData: any = {
      email: "duvotes@mailinator.com",
      password: "Password1@",
    };
    signInMutation.mutate(formData);

    // cancellationToken: {
    //   waitHandle: {
    //     handle: {},
    //     safeWaitHandle: {},
    //   },
    // },
  };

  return (
    <div className="flex justify-center gap-16 py-10">
      <div
        className="w-1/3 min-h-full bg-cover bg-center relative rounded-3xl hidden lg:block"
        style={{ backgroundImage: "url('/Signin-Banner.svg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary bg-opacity-75 rounded-3xl">
          <div className="mt-6 ml-7">
            <Image src="logo.svg" alt="logo" width={70} height={70} />
          </div>
          <h1 className="font-bold text-3xl px-7 mt-56 ">
            Be informed, Engaged And Empowered
          </h1>
          <p className="text-sm px-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
            cupiditate voluptates blanditiis libero neque commodi quas quod
            itaque nam, at delectus amet voluptatibus iure in quibusdam est
            expedita corporis!
          </p>
        </div>
      </div>

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
            // rules={{ required: "Email is required" }}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            control={control}
            // rules={{ required: "Password is required" }}
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
    </div>
  );
};

export default SignIn;
