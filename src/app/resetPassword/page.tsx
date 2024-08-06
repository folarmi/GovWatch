"use client";
import React, { useState } from "react";
import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../types/generalTypes";
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

const ResetPassword = () => {
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

      <div className="mb-36 md:mx-10 mx-12">
        <h1 className="font-bold text-4xl mb-2">Reset Password</h1>
        <p className="mb-9">
          Enter your email and we will share a link to create a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="New password"
            name="password"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
            placeholder="Enter new password"
          />

          <CustomInput
            label="Confirm password"
            name="Cpassword"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
            placeholder="Confirm new password"
          />

          <button
            type="submit"
            className={`mt-8 px-32 py-4 rounded-2xl w-full text-white ${
              true ? "bg-primary" : "bg-customgreen"
            }`}
            //disabled={!isFormFilled}
          >
            Submit
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
