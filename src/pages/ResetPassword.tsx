/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-constant-condition */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../component/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleSubmit, control, getValues } = useForm<any>();

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/Authentication/ChangePassword`, data);
      return response;
    },
    onSuccess: (data) => {
      console.log(data?.data?.remark);
      if (data?.status === 200) {
        toast(data?.data?.remark);
        navigate("/sign-in");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.remark);
      // console.log(error?.response?.data?.remark);
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = {
      email: searchParams.get("email"),
      token: searchParams.get("token"),
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    resetPasswordMutation.mutate(formData);
  };

  return (
    <AuthLayout
      header="Be informed, Engaged And Empowered"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
cupiditate voluptates blanditiis libero neque commodi quas quod
itaque nam, at delectus amet voluptatibus iure in quibusdam est
expedita corporis!"
      img="logo.svg"
      banner="Signin-Banner.svg"
    >
      <div className="mb-36 md:mx-10 mx-12">
        <h1 className="font-bold text-4xl mb-2">Reset Password</h1>
        <p className="mb-9">
          Enter your email and we will share a link to create a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="New password"
            name="newPassword"
            type="password"
            control={control}
            rules={{ required: "Password is required" }}
            placeholder="Enter your new password"
          />

          <CustomInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            }}
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

// const ResetPassword = () => {
//   return (
//     // <Suspense fallback={<Loader />}>
//     <ResetPasswordPage />
//     // </Suspense>
//   );
// };

// export { ResetPassword };

// const ResetPassword = () => {
//   return (
//     <div>
//       <p>jdsnfkjnn</p>
//     </div>
//   );
// };

export { ResetPassword };
