"use client";

import React from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { useCustomMutation } from "@/app/hooks/apiCalls";

const CreatePoliticalParty = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );

  const createPoliticalPartyMutation = useCustomMutation({
    endpoint: "PoliticalParties/CreatePoliticalParty",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    const formData: any = {
      ...data,
      country: userCountry,
      createdBy: userId,
    };

    createPoliticalPartyMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        Create New Political Party
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid gap-x-4 w-full"
      >
        <CustomInput
          label="Political Party Name"
          name="name"
          control={control}
          rules={{ required: "Political Party Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Date Founded"
          name="dateFounded"
          type="date"
          control={control}
          rules={{ required: "Date Founded is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Leader Name"
          name="leaderName"
          control={control}
          rules={{ required: "Leader Name is required" }}
          className="mt-4"
        />

        <CustomTextArea name="bio" control={control} label="Bio" />

        <div className="flex w-full justify-end mr-auto">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={createPoliticalPartyMutation.isPending}
            variant="tertiary"
          >
            Create Political Party
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePoliticalParty;
