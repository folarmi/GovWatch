/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
<<<<<<< HEAD
import AuthLayout from "../component/AuthLayout";
=======
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import CustomButton from "../component/CustomButton";
>>>>>>> b4eda4abc03267b9bda3abf23da7f8363440a915

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
<<<<<<< HEAD
          </button>
          <p className="flex justify-center mt-5 text-sm">
            Don't have an account?{" "}
            <Link href="/signup"><span className="font-bold text-primary cursor-pointer">Sign Up</span></Link>
          </p>
=======
          </CustomButton>
          <Link href="signup">
            <p className="flex justify-center mt-5 text-sm">
              Don't have an account?{" "}
              <span className="font-bold text-primary">Sign Up</span>
            </p>
          </Link>
>>>>>>> b4eda4abc03267b9bda3abf23da7f8363440a915
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
