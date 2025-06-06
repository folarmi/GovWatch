/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { toast } from "react-toastify";

import CustomSelect from "../CustomSelect";
import ImageDetails from "../ImageDetails";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import {
  updateFileHandler,
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useGetImageDetails,
  useUploadMutation,
} from "../../hooks/apiCalls";
import FileUploader from "../FileUploader";
import { useQueryClient } from "@tanstack/react-query";

const CreateLGA = ({ toggleModal, selectedLGA }: any) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { data: imageDetails } = useGetImageDetails(selectedLGA);

  const { control, handleSubmit } = useForm<any>({
    defaultValues: selectedLGA || {},
  });

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
    toast.error("File upload failed. Please try again.");
  };

  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

  const createLGAMutation = useCustomMutation({
    endpoint: selectedLGA ? `Lgas/UpdateLga` : `Lgas/CreateLga`,
    successMessage: (data: any) => data?.remark,
    method: selectedLGA ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllLgas"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedLGA) {
        toast.error("Please upload a file first.");
        return;
      }

      let uploadedFilePath;

      // Upload file only if it's not an edit action (i.e., no selectedLGA)
      if (!selectedLGA && uploadedFile) {
        uploadedFilePath = await uploadFile(
          uploadedFile,
          userId,
          uploadMutation
        );
        if (!uploadedFilePath) {
          toast.error("File upload failed.");
          return;
        }
      }

      // Prepare Form Data
      const formPayload: any = {
        ...data,
        country: userCountry,
      };

      // Handle image logic for edit mode
      if (selectedLGA) {
        if (uploadedFile) {
          // If a new file is uploaded during edit, update the file and use the new path
          const newFilePath = await updateFileHandler(
            uploadedFile,
            userId,
            imageDetails?.publicId,
            updateUploadMutation
          );
          formPayload.image = newFilePath;
        } else {
          // If no new file is uploaded, use the existing image from selectedLGA
          formPayload.image = selectedLGA?.image;
        }

        // Add lastModifiedBy for edit actions
        formPayload.lastModifiedBy = userId;
      } else {
        // For create actions, use the uploaded file path
        formPayload.image = uploadedFilePath;
        formPayload.createdBy = userId;
      }

      // Submit form after successful image upload
      await createLGAMutation.mutateAsync(formPayload);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: `States/GetListOfStates?country=${userCountry}&pageNumber=1&pageSize=100`,
    queryKey: ["GetAllStates"],
  });

  const stateDataFormatted =
    stateData &&
    stateData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        {selectedLGA ? "Edit LGA" : "Create New LGA"}
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="LGA Name"
          name="name"
          control={control}
          rules={{ required: "LGA Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Date Founded"
          name="dateFounded"
          type="date"
          control={control}
          // rules={{ required: "Date Founded is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Chairman"
          name="chairman"
          control={control}
          // rules={{ required: "Chairman Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Political Party Of Chairman"
          name="politicalPartyOfChairman"
          control={control}
          // rules={{ required: "Political Party Of Chairman is required" }}
          className="mt-4"
        />

        <CustomSelect
          name="state"
          options={stateDataFormatted}
          isLoading={stateDataIsLoading}
          label="State"
          control={control}
          placeholder="Select State"
          className="mt-4"
        />

        <CustomInput
          label="Population"
          name="population"
          type="number"
          onlyNumbers
          control={control}
          rules={{ required: "Population is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Land Mass(km squared)"
          name="landMass"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Land Mass(km squared) is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Ward Count"
          name="wardCount"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Ward Count is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Financial Allocation"
          name="financialAllocation"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Financial Allocation is required" }}
          className="mt-4 col-span-2"
        />

        <CustomInput
          label="LCDA Count"
          name="lcdaCount"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "LCDA Count is required" }}
          className="mt-4 col-span-2"
        />

        <div className="col-span-2">
          <CustomTextArea name="bio" control={control} label="Bio" />
        </div>
        <div className="col-span-2 ">
          <p className="text-sm font-medium pb-2">Flag</p>

          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            // onUpload={(file: File) => handleFileChange(file)}
            onFileUpload={setUploadedFile}
            defaultFile={selectedLGA?.image}
          />
          {uploadedFile && (
            <ImageDetails
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
            />
          )}
        </div>

        <div className="flex w-full justify-end mr-auto">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={
              uploadMutation.isPending ||
              createLGAMutation.isPending ||
              updateUploadMutation.isPending
            }
            variant="tertiary"
          >
            {selectedLGA ? "Edit LGA" : "Create LGA"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateLGA;
