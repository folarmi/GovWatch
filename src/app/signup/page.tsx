/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
<<<<<<< HEAD
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

=======
import { RegisterFormValues } from "../types/generalTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomButton from "../component/CustomButton";

const Signup = () => {
  const { handleSubmit, control } = useForm<RegisterFormValues>();
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("Register", data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data?.data?.statusText);

      toast(data?.data?.statusText, {});
      router.push("/verify-email");
    },
    onError: (error: any) => {
      console.log(error);
      // Toast.show(error?.response?.data?.error, {
      //   type: "error",
      //   placement: "top",
      // });
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data: any) => {
    signUpMutation.mutate(data);
  };

>>>>>>> b4eda4abc03267b9bda3abf23da7f8363440a915
  return (
    <AuthLayout
      header="Empowering Nigerians with information fostering citizenship participation in governance" 
      text="" 
      img="logo.svg" 
      banner="Signup-Banner.svg"
      headerMarginTop="35rem">

      <div className="mb-24 md:mx-10 mx-6 w-96">
        <h1 className="font-bold text-4xl mb-2">Let's get started</h1>
        <p className="mb-9">
          Kindly fill in the required details below
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
            label="First name"
            name="fName"
            type="name"
            control={control}
            rules={{ required: "First name is required" }}
          />

          <CustomInput
            label="Last name"
            name="lName"
            type="name"
            control={control}
            rules={{ required: "Last name is required" }}
          />

          <CustomInput
            label="Email address"
            name="email"
            type="email"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <CustomInput
<<<<<<< HEAD
            label="State Of Residence"
            name="SOR"
            type="name"
=======
            label="Country"
            name="country"
            type="text"
            control={control}
            rules={{ required: "Country is required" }}
          />

          {/* <CustomInput
            label="State of Residence"
            name="sor"
>>>>>>> b4eda4abc03267b9bda3abf23da7f8363440a915
            control={control}
            rules={{ required: "State of residence is required" }}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
          />

          <CustomInput
            label="Confirm Password"
            name="cPassword"
            type="password"
            control={control}
            rules={{ required: "Please confirm your password" }}
          />

          <CustomButton
            type="submit"
<<<<<<< HEAD
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${true
              ? 'bg-primary' : 'bg-customgreen'}`}
            //disabled={!isFormFilled}
          >
            Sign Up
          </button>
          <p className="flex justify-center mt-5 text-sm">
            Already have an account?{" "}
            <Link href="/signin"> <span className="font-bold text-primary">Sign In</span> </Link>
          </p>
=======
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            disabled={signUpMutation.isPending}
            loading={signUpMutation.isPending}
          >
            Sign In
          </CustomButton>

          <Link href="/signin" className="cursor-pointer">
            <p className="flex justify-center mt-5 text-sm">
              Already have an account?{" "}
              <span className="font-bold text-primary"> Sign In</span>
            </p>
          </Link>
>>>>>>> b4eda4abc03267b9bda3abf23da7f8363440a915
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
