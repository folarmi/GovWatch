"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomSelect from "../../component/CustomSelect";
import { useForm } from "react-hook-form";
import CustomButton from "../../component/CustomButton";
import FileUploader from "../../component/FileUploader";
import {
  UploadError,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../../hooks/apiCalls";
import ImageDetails from "@/app/component/ImageDetails";
import UpArrowButton from "@/app/component/UpArrowButton";
import DownArrowButton from "@/app/component/DownArrowButton";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import CustomInput from "@/app/component/CustomInput";
import CustomCheckBox from "@/app/component/forms/CustomCheckBox";
import TagsInput from "@/app/component/forms/TagsInput";
import CustomTextArea from "@/app/component/CustomTextArea";
import { useRouter } from "next/navigation";

const CreatePublication = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const { userCountry, userId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [article, setArticle] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedLCDA, setSelectedLCDA] = useState("");
  const [isFederal, setIsFederal] = useState(false);
  const [isPromise, setIsPromise] = useState(false);
  const [isPromiseFulfilled, setIsPromiseFulfilled] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const [isAdditionalInformation, setIsAdditionalInformation] = useState(true);
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetData({
    url: "Categories/GetAllCategories",
    queryKey: ["GetAllCategories"],
  });

  const handleTagsChange = (newTags: string[]) => {
    console.log("Updated Tags:", newTags);
  };

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: `States/GetListOfStates?countryName=${userCountry}&pageNumber=1&pageSize=10`,
    queryKey: ["GetAllStates"],
  });

  const { data: lgaData, isLoading: lgaDataIsLoading } = useGetData({
    url: `/Lgas/GetListOfLgas?stateName=${selectedState}&countryName=${userCountry}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfLgas", selectedState],
    enabled: !!selectedState,
  });

  const { data: lcdaData, isLoading: lcdaDataIsLoading } = useGetData({
    url: `/Lcdas/GetListOfLcdas?lgaName=${selectedLGA}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfLcdas", selectedLGA],
    enabled: !!selectedLGA,
  });

  const { data: wardData, isLoading: wardDataIsLoading } = useGetData({
    url: `/Wards/GetListOfWards?lgaName=${selectedLGA}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfWards", selectedLGA],
    enabled: !!selectedLGA,
  });

  const { data: mdaData, isLoading: mdaDataIsLoading } = useGetData({
    url: `/Mdas/GetListOfMdas?stateName=${selectedState}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfMdas", selectedState],
    enabled: !!selectedState,
  });

  const { data: politicalActorData, isLoading: politicalActorIsLoading } =
    useGetData({
      url: `/PoliticalActors/GetListOfPoliticalActors?country=${userCountry}&pageNumber=1&pageSize=100`,
      queryKey: ["GetListOfPoliticalActors"],
    });

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
        image: item?.categoryImage,
      };
    });

  const lgaDataFormatted =
    lgaData &&
    lgaData.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const stateDataFormatted =
    stateData &&
    stateData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const lcdaDataFormatted =
    lcdaData &&
    lcdaData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const wardDataFormatted =
    wardData &&
    wardData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const mdaDataFormatted =
    mdaData &&
    mdaData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const politicalActorDataFormatted =
    politicalActorData &&
    politicalActorData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const createPublicationMutation = useCustomMutation({
    endpoint: "Publications/CreatePublication",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      router.refresh();
    },
  });

  const [backendPath, setBackendPath] = useState("");
  const handleSuccess = (data: any) => {
    setBackendPath(data?.filePath);
  };

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(handleSuccess, handleError);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);
    uploadMutation.mutate(formData);
  };

  const submitForm = (data: any) => {
    // if (backendPath === "") {
    //   toast("Please upload a file first");
    //   return;
    // }

    const formData: any = {
      ...data,
      country: userCountry,
      isFederal,
      isPromise,
      contributorPublicId: userId,
      // image: backendPath,
      image: "fffff",
      isPromiseFulfilled,
      tags: tags.join(" , "),
      article,
      // hardcoded values
      state: "Ethan Spears",
      lga: "Alexander Calderon",
      mda: "Talon Bell",
      lcda: "Lane Vincent",
      ward: "Aidan Lara",
      category: "Category One",
      politicalActorName: "Aphrodite Douglas",
    };

    createPublicationMutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="px-8 w-3/5 md:px-24 mx-auto mt-4 space-y-6"
    >
      {/* Publication Details */}
      <div className="space-y-4">
        <CustomInput label="Title" name="title" control={control} />
        <CustomInput
          label="Author's Name"
          name="authorName"
          control={control}
          placeholder="Whose work is this?"
        />
        <CustomTextArea
          name="snippet"
          control={control}
          label="Article Snippet"
          placeholder="A snippet about your article"
        />
      </div>

      {/* Category and Image Upload */}
      <div className="space-y-4">
        <CustomSelect
          name="category"
          options={categoriesDataFormatted}
          isLoading={isCategoriesLoading}
          label="Select Category of your Publication"
          control={control}
          className="mr-12"
        />
        <FileUploader
          maxSizeMB={1}
          acceptFormats={["png", "jpeg", "jpg", "gif"]}
          onFileUpload={handleFileUpload}
        />
        {uploadedFile && (
          <ImageDetails
            fileName={uploadedFile.name}
            fileSize={uploadedFile.size}
          />
        )}
        <CustomInput
          label="Image Caption"
          name="imageCaption"
          control={control}
          className="mt-4"
        />
      </div>

      {/* Additional Information */}
      <div className="mb-4 space-y-4">
        <div
          onClick={() => setIsAdditionalInformation(!isAdditionalInformation)}
          className="flex items-center border border-gray-300 w-full p-4 rounded-lg justify-between cursor-pointer"
        >
          <p>Additional Information</p>
          {isAdditionalInformation ? <UpArrowButton /> : <DownArrowButton />}
        </div>

        {isAdditionalInformation && (
          <div className="space-y-4">
            {/* Location Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                name="state"
                options={stateDataFormatted}
                isLoading={stateDataIsLoading}
                label="State"
                control={control}
                placeholder="Select State"
                customOnChange={(name: any) => setSelectedState(name?.value)}
              />
              <CustomSelect
                name="lga"
                options={lgaDataFormatted}
                isLoading={lgaDataIsLoading}
                label="LGA"
                control={control}
                placeholder="Select LGA"
                customOnChange={(name: any) => setSelectedLGA(name?.value)}
              />
              <CustomSelect
                name="lcda"
                options={lcdaDataFormatted}
                isLoading={lcdaDataIsLoading}
                label="LCDA"
                control={control}
                placeholder="Select LCDA"
                customOnChange={(name: any) => setSelectedLCDA(name?.value)}
              />
              <CustomSelect
                name="ward"
                options={wardDataFormatted}
                isLoading={wardDataIsLoading}
                label="Ward"
                control={control}
                placeholder="Select Ward"
              />
            </div>

            {/* Promise Information */}
            <div className="space-y-4">
              <CustomInput
                label="Date Promise was Made"
                name="datePromiseMade"
                type="date"
                control={control}
              />
              <CustomInput
                label="Promised Deadline"
                name="promisedDeadline"
                type="date"
                control={control}
              />
              <CustomInput
                label="Date Promise was Fulfilled"
                name="datePromiseFulfilled"
                type="date"
                control={control}
              />
            </div>

            {/* Political and MDA Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                name="politicalActorName"
                options={politicalActorDataFormatted}
                isLoading={politicalActorIsLoading}
                label="Political Actor Name"
                control={control}
                placeholder="Select Political Actor"
              />
              <CustomSelect
                name="mda"
                options={mdaDataFormatted}
                isLoading={mdaDataIsLoading}
                label="MDA"
                control={control}
                placeholder="Select MDA"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-x-4">
              <CustomCheckBox
                checked={isFederal}
                onChange={() => setIsFederal(!isFederal)}
                iflabel
                name="isFederal"
                labelText="Is this a Federal Promise?"
              />
              <CustomCheckBox
                checked={isPromise}
                onChange={() => setIsPromise(!isPromise)}
                iflabel
                labelText="Is this a Promise?"
                name="isPromise"
              />
              <CustomCheckBox
                checked={isPromiseFulfilled}
                onChange={() => setIsPromiseFulfilled(!isPromiseFulfilled)}
                iflabel
                labelText="Has this Promise been Fulfilled?"
                name="isPromiseFulfilled"
              />
            </div>

            {/* Tags and References */}
            <TagsInput
              onChange={handleTagsChange}
              tags={tags}
              setTags={setTags}
            />
            <CustomInput
              label="Reference"
              name="reference"
              control={control}
              className="mt-4"
            />
            <CustomInput
              label="Link"
              name="link"
              control={control}
              className="mt-4"
            />
          </div>
        )}
      </div>

      {/* Article Content */}
      <ReactQuill
        style={{
          height: "10rem",
          marginBottom: "5rem",
        }}
        theme="snow"
        value={article}
        onChange={setArticle}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 mt-5">
        <CustomButton className="" variant="secondary">
          Save to Drafts
        </CustomButton>
        <CustomButton
          variant="primary"
          className="w-40"
          loading={
            createPublicationMutation.isPending || uploadMutation.isPending
          }
        >
          Publish
        </CustomButton>
      </div>
    </form>
  );
};

export default CreatePublication;

// {
//   "snippet": "Iure velit voluptat",
//   "image": "http://govwatch.runasp.net/Uploads/76adca8e-4891-48ac-a5ec-7f2824b65e05_Screenshot 2024-08-22 at 03.38.34.png",
//   "imageCaption": "Vel reprehenderit es",
//   "contributorPublicId": "a7e36778-2fec-4b6e-8569-dbe47778dff0",
//   "isFederal": true,
//   "isPromise": true,
//   "isPromiseFulfilled": true

//   "title": "Ut quisquam magna ea",
//   "authorName": "Hedda Merritt",
//   "category": 2,
//   "state": "Ethan Spears",
//   "lga": "Alexander Calderon",
//   "datePromiseMade": "1987-11-25",
//   "promisedDeadline": "2024-04-04",
//   "datePromiseFulfilled": "2019-09-12",
//   "reference": "Et dignissimos numqu",
//   "link": "Dolore illum iusto ",
//   "country": "Nigeria",

// }
