/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../types/generalTypes";
import Link from "next/link";
import AuthLayout from "../component/AuthLayout";

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
  const { handleSubmit, control } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');

  //const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //setEmail(e.target.value);
  // };

  //const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // setPassword(e.target.value);
  //};

  //const isFormFilled = email !== '' && password !== '';

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
            ifPassword
          />

          <Link href="/forgotPassword">
            <p className="font-bold text-sm ml-72">Forgot Password?</p>
          </Link>

          <button
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            //disabled={!isFormFilled}
          >
            Sign In
          </button>
          <p className="flex justify-center mt-5 text-sm">
            Don't have an account?{" "}
            <Link href="/signup"><span className="font-bold text-primary cursor-pointer">Sign Up</span></Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
