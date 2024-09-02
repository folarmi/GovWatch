import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#008000",
        primary_DM: "#339933",
        green_100: "#2C692C",
        green_200: "#014501",
        green_300: "#ADD6AD",
        green_700: "#047857",
        black_100: "#0A0909",
        black_200: "#010101",
        black_300: "#212121",
        black_400: "#141414",
        grey_100: "#323232",
        grey_200: "#6B6A6A",
        customgreen: "#8db391",
        offwhite: "#F9F9F9",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;

// <form className="px-8 w-3/5 md:px-24 mx-auto mt-4">
//   <CustomSelect
//     name="mySelect"
//     options={categoriesDataFormatted}
//     isLoading={isCategoriesLoading}
//     label="Select Category of your Publication"
//     control={control}
//     className="mr-12"
//   />

//   <FileUploader
//     maxSizeMB={1}
//     acceptFormats={["png", "jpeg", "jpg", "gif"]}
//     onFileUpload={handleFileUpload}
//   />
//   {uploadedFile && (
//     <ImageDetails
//       fileName={uploadedFile.name}
//       fileSize={uploadedFile.size}
//     />
//   )}

//   <CustomInput
//     label="Image Caption"
//     name="imageCaption"
//     control={control}
//     className="mt-4"
//   />

//   <div className="mb-4">
//     <div
//       onClick={() => setIsAdditionalInformation(!isAdditionalInformation)}
//       className="flex items-center border border-gray-300 w-full p-4 rounded-lg mt-4 justify-between cursor-pointer"
//     >
//       <p>Additional Information</p>

//       {isAdditionalInformation ? <UpArrowButton /> : <DownArrowButton />}
//     </div>

//     {isAdditionalInformation && (
//       <div className="">
//         <CustomSelect
//           name="state"
//           options={stateDataFormatted}
//           isLoading={stateDataIsLoading}
//           label="State"
//           control={control}
//           placeholder="Select State"
//           className="mt-4 col-span-2"
//           customOnChange={(name: any) => setSelectedState(name?.value)}
//         />

//         <CustomSelect
//           name="lga"
//           options={lgaDataFormatted}
//           isLoading={lgaDataIsLoading}
//           label="LGA"
//           control={control}
//           placeholder="Select LGA"
//           className="mt-4"
//           customOnChange={(name: any) => setSelectedLGA(name?.value)}
//         />

//         <CustomSelect
//           name="lcda"
//           options={lcdaDataFormatted}
//           isLoading={lcdaDataIsLoading}
//           label="LCDA"
//           control={control}
//           placeholder="Select LCDA"
//           className="mt-4"
//         />

//         <CustomSelect
//           name="ward"
//           options={wardDataFormatted}
//           isLoading={wardDataIsLoading}
//           label="Ward"
//           control={control}
//           placeholder="Select Ward"
//           className="mt-4"
//         />

//         <CustomSelect
//           name="mda"
//           options={mdaDataFormatted}
//           isLoading={mdaDataIsLoading}
//           label="MDA"
//           control={control}
//           placeholder="Select MDA"
//           className="mt-4"
//         />

//         <CustomInput
//           label="Date Promise was Made"
//           name="datePromiseMade"
//           type="date"
//           control={control}
//           // rules={{ required: "Password is required" }}
//         />

//         <CustomInput
//           label="Promised Deadline"
//           name="promisedDeadline"
//           type="date"
//           control={control}
//           // rules={{ required: "Password is required" }}
//         />

//         <CustomInput
//           label="Date Promise was Fulfilled"
//           name="datePromiseFulfilled"
//           type="date"
//           control={control}
//           // rules={{ required: "Password is required" }}
//         />

//         <CustomSelect
//           name="politicalActorName"
//           options={politicalActorDataFormatted}
//           isLoading={politicalActorIsLoading}
//           label="Political Actor Name"
//           control={control}
//           placeholder="Select Political Actor"
//           className="mt-4"
//         />

//         <div className="flex items-center gap-x-2">
//           <CustomCheckBox
//             checked={isFederal}
//             onChange={() => setIsFederal(!isFederal)}
//             iflabel
//             labelText="Is this a Federal Promise?"
//           />
//           <CustomCheckBox
//             checked={isPromise}
//             onChange={() => setIsPromise(!isPromise)}
//             iflabel
//             labelText="Is this a Promise?"
//           />
//           <CustomCheckBox
//             checked={isPromiseFulfilled}
//             onChange={() => setIsPromiseFulfilled(!isPromiseFulfilled)}
//             iflabel
//             labelText="Has this Promise been Fulfilled?"
//           />
//         </div>

//         <TagsInput onChange={handleTagsChange} />

//         <CustomInput
//           label="Reference"
//           name="reference"
//           control={control}
//           className="mt-4"
//         />

//         <CustomInput
//           label="Link"
//           name="link"
//           control={control}
//           className="mt-4"
//         />
//       </div>
//     )}
//   </div>

//   <CustomInput label="Title" name="title" type="" control={control} />
//   <CustomInput
//     label="Author's Name"
//     name="authorName"
//     type=""
//     control={control}
//     placeholder="Whose work is this?"
//   />
//   <CustomTextArea
//     name="snippet"
//     control={control}
//     label="Article snippet"
//     placeholder="A snippet about your article"
//   />

//   <ReactQuill
//     style={{
//       height: "10rem",
//       marginBottom: "5rem",
//     }}
//     theme="snow"
//     value={value}
//     onChange={setValue}
//   />

//   <div className="flex items-center justify-end my-5">
//     <div className="">
//       <CustomButton className="" variant="secondary">
//         Save to Drafts
//       </CustomButton>
//     </div>

//     <div className="w-1/2 ml-4">
//       <CustomButton variant="primary" className="">
//         Publish
//       </CustomButton>
//     </div>
//   </div>
// </form>
