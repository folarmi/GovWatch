/* eslint-disable @typescript-eslint/no-explicit-any */

// import Image from "next/image";
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  type?: string;
  readOnly?: boolean;
  classname?: string;
  onlyNumbers?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  type = "text",
  className,
  readOnly,
  onlyNumbers = false,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [showPassword, setShowPassword] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // If the input type is number, convert the value to a number before passing it to onChange
    const parsedValue = onlyNumbers
      ? value === ""
        ? ""
        : Number(value)
      : value;
    field.onChange(parsedValue);
  };

  return (
    <div className={`flex flex-col gap-2 mb-3 w-full ${className}`}>
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <div className="w-full relative">
        <input
          className="h-12 rounded-lg px-4 border-2 border-black bg-gray-50 text-sm w-full"
          {...field}
          {...rest}
          value={field.value || ""}
          onChange={handleChange}
          type={onlyNumbers ? "number" : showPassword ? type : "password"}
          inputMode={onlyNumbers ? "numeric" : "text"}
          pattern={onlyNumbers ? "[0-9]*" : undefined}
          style={{
            backgroundColor: readOnly ? "hsl(0, 0%, 90%)" : "",
          }}
        />
        {type === "password" && !onlyNumbers && (
          <div
            className="absolute left-[90%] top-5 cursor-pointer"
            onClick={togglePassword}
          >
            <img
              src={showPassword ? "/eyeOpened.svg" : "/eyesClosed.svg"}
              alt="eyeOpened"
            />
          </div>
        )}
      </div>

      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

export default CustomInput;

// {
//   "snippet": "string",
//   "article": "string",
//   "image": "string",
//   "imageCaption": "string",
//   "contributorPublicId": "string",
//   "mda": "string",
//   "category": "string",
//   "state": "string",
//   "ward": "string",
//   "lcda": "string",
//   "isFederal": true,
//   "lga": "string",
//   "province": "string",
//   "title": "string",
//   "tags": "string",
//   "reference": "string",
//   "authorName": "string",
//   "link": "string",
//   "isPromise": true,
//   "isPromisedFulfilled": true,
//   "datePromiseMade": "2024-09-02T13:16:53.137Z",
//   "promiseDeadline": "2024-09-02T13:16:53.137Z",
//   "datePromiseFulfilled": "2024-09-02T13:16:53.137Z",
//   "politicalActorName": "string",
//   "country": "string",
//   "cancellationToken": {
//     "waitHandle": {
//       "handle": {},
//       "safeWaitHandle": {}
//     }
//   }
// }