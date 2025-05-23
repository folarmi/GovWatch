/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import CustomSelect from "../CustomSelect";
import ImageDetails from "../ImageDetails";
import CustomCheckBox from "../forms/CustomCheckBox";
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
import { toast } from "react-toastify";

const CreateMDA = ({ toggleModal, selectedMDA }: any) => {
  const { data: imageDetails } = useGetImageDetails(selectedMDA);

  const modifiedDefaultValues = {
    ...selectedMDA,
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();

  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isFederal, setIsFederal] = useState(false);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

  const createMDAMutation = useCustomMutation({
    endpoint: selectedMDA ? "Mdas/UpdateMda" : `Mdas/CreateMda`,
    successMessage: (data: any) => data?.remark,
    method: selectedMDA ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllMdasTable"],
        exact: false,
      });
    },
  });

  const { data: categoryData, isLoading: categoryDataIsLoading } = useGetData({
    url: `Categories/GetAllCategories`,
    queryKey: ["GetAllCategories"],
  });

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: `States/GetListOfStates?country=${userCountry}&pageNumber=1&pageSize=10`,
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

  const categoryDataFormatted =
    categoryData?.categoryViewModel &&
    categoryData?.categoryViewModel?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.name,
      };
    });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedMDA) {
        toast.error("Please upload a file first");
        return;
      }

      let uploadedFilePath;

      // If there's a new file selected, upload it first
      if (!selectedMDA && uploadedFile) {
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

      const formData: any = {
        ...data,
      };

      // Handle image logic for edit mode
      if (selectedMDA) {
        if (uploadedFile) {
          // If a new file is uploaded during edit, update the file and use the new path
          const newFilePath = await updateFileHandler(
            uploadedFile,
            userId,
            imageDetails?.publicId,
            updateUploadMutation
          );
          formData.image = newFilePath;
        } else {
          // If no new file is uploaded, use the existing image from selectedLGA
          formData.image = selectedMDA?.image;
        }

        // Add lastModifiedBy for edit actions
        formData.lastModifiedBy = userId;
      } else {
        // For create actions, use the uploaded file path
        formData.createdBy = userId;
        formData.image = uploadedFilePath;
        formData.country = userCountry;
        formData.isFederal = true;
      }
      // if (selectedMDA) {
      //   formData.lastModifiedBy = userId;
      //   formData.image = selectedMDA.image;
      // } else {
      //   // formData.population = Number(data.population.replace(/,/g, ""));
      //   formData.createdBy = userId;
      //   formData.image = uploadedFilePath;
      // formData.country = userCountry;
      // formData.isFederal = true;

      await createMDAMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }

    // mdasRequests.slice(501, 506).forEach((formData: any) => {
    //   // console.log(formData);
    //   createMDAMutation.mutate(formData);
    // });

    // 1316
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        {selectedMDA ? "Edit MDA" : "Create New MDA"}
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="MDA Name"
          name="name"
          control={control}
          // rules={{ required: "MDA Name is required" }}
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
          label="Leader Name"
          name="leaderName"
          control={control}
          // rules={{ required: "Leader Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Financial Allocation"
          name="financialAllocation"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Financial Allocation is required" }}
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

        <CustomSelect
          name="category"
          options={categoryDataFormatted}
          isLoading={categoryDataIsLoading}
          label="Category"
          control={control}
          placeholder="Select Category"
          className="mt-4 col-span-2"
        />

        <div className="flex flex-col justify-center mt-3">
          <CustomCheckBox
            checked={isFederal}
            onChange={() => setIsFederal(!isFederal)}
            iflabel
            labelText="isFederal"
            name="isFederal"
          />
        </div>

        <div className="col-span-2">
          <CustomTextArea name="bio" control={control} label="Bio" />
        </div>

        <div className="col-span-2 ">
          <p className="text-sm font-medium pb-2">Flag</p>

          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            onFileUpload={setUploadedFile}
            defaultFile={selectedMDA?.image}
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
              createMDAMutation.isPending ||
              updateUploadMutation.isPending
            }
            variant="tertiary"
          >
            {selectedMDA ? "Update MDA" : "Create MDA"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateMDA;
