/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import Text from "./Text";
// import { calculateTimeDifference, scrollToTop, truncateText } from "../utils";
// import { Link, Path } from "react-router-dom";

// interface CardProps {
//   section: string;
//   articleTitle: string;
//   summary: string;
//   date: string;
//   promise: boolean;
//   imageUrl: string;
//   deadline?: string;
//   id: string;
//   isArticleBookMarked?: any;
//   isArticleLiked?: any;
//   setIsArticleBookMarked?: any;
//   onBookMarkClick?: any;
//   onLikeClicked?: any;
//   onCommentClicked?: any;
//   isBookMarked?: boolean;
//   link?: string | Partial<Path>;
//   isPublished?: boolean;
//   category?: string;
//   selectedCard?: string;
//   isCredible?: string;
//   isPromisedFulfilled?: boolean;
//   dateIncidentStarted?: string;
//   dateIncidentResolved?: string;
// }

// const Card = ({
//   section,
//   articleTitle,
//   summary,
//   date,
//   promise,
//   id,
//   link,
//   deadline,
//   isBookMarked,
//   onBookMarkClick,
//   isArticleBookMarked,
//   onCommentClicked,
//   isArticleLiked,
//   onLikeClicked,
//   setIsArticleBookMarked,
//   isPublished,
//   imageUrl,
//   category,
//   selectedCard,
//   isCredible,
//   isPromisedFulfilled,
//   dateIncidentResolved,
//   dateIncidentStarted,
// }: CardProps) => {
//   const [timeDifference, setTimeDifference] = useState<string>("");

//   useEffect(() => {
//     if (deadline) {
//       calculateTimeDifference(deadline, setTimeDifference);
//       const interval = setInterval(() => {
//         calculateTimeDifference(deadline, setTimeDifference);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [deadline]);

//   useEffect(() => {
//     if (isBookMarked !== undefined) {
//       setIsArticleBookMarked(isBookMarked);
//     }
//   }, [isBookMarked]);

//   return (
//     <div className="min-h-[550px] h-auto flex flex-col max-w-sm w-[300px]  bg-white dark:bg-black_100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer my-3 overflow-hidden">
//       <img
//         src={imageUrl}
//         // src="/coatOfArms.svg"
//         alt="article thumbnail"
//         className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
//       />
//       <div className="flex-grow">
//         <div className="p-5">
//           <Text
//             variant="bodyTwo"
//             className="pb-1 uppercase text-xs tracking-wide text-primary dark:text-primary_light"
//           >
//             {section}
//           </Text>

//           {isCredible && (
//             <span className="bg-green-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
//               Credible
//             </span>
//           )}

//           {!isCredible && (
//             <span className="bg-red-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
//               Not Credible
//             </span>
//           )}

//           <h3 className="font-semibold text-lg text-black_100 dark:text-white my-2">
//             {/* {truncateText(articleTitle, 6)} */}
//             {articleTitle}
//           </h3>

//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//             {truncateText(summary, 10)}
//           </p>

//           {!isPromisedFulfilled && (
//             <div className="flex items-center justify-between mb-4">
//               {promise && deadline && (
//                 <span
//                   className={`text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded ${
//                     timeDifference.includes("past")
//                       ? "bg-red-500"
//                       : "bg-green-500"
//                   }`}
//                 >
//                   {timeDifference}
//                 </span>
//               )}
//             </div>
//           )}

//           {isPromisedFulfilled && (
//             <span className="bg-green-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
//               Promise Fulfilled
//             </span>
//           )}

//           {dateIncidentStarted && dateIncidentResolved !== null && (
//             <div className="flex items-center justify-between mb-4">
//               {promise && deadline && (
//                 <span
//                   className={`text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded ${
//                     timeDifference.includes("past")
//                       ? "bg-red-500"
//                       : "bg-green-500"
//                   }`}
//                 >
//                   {timeDifference}
//                 </span>
//               )}
//             </div>
//           )}

//           <p className="font-medium text-xs text-gray-500">{date}</p>

//           {isPublished && (
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={
//                     isArticleLiked ? "/heartOutline.svg" : "/heartOutline.svg"
//                   }
//                   alt="Like"
//                   className="w-5 h-5 cursor-pointer"
//                   onClick={() => onLikeClicked(id)}
//                 />
//                 <img
//                   src="/comments.svg"
//                   alt="Comments"
//                   className="w-5 h-5 cursor-pointer"
//                   onClick={() => onCommentClicked(id)}
//                 />
//               </div>

//               <div className="">
//                 <img
//                   onClick={() => onBookMarkClick(id)}
//                   src={
//                     selectedCard === id && isArticleBookMarked
//                       ? "/filledBookMark.svg"
//                       : "/bookMark.svg"
//                   }
//                   alt="Bookmark"
//                   className="w-5 h-5 cursor-pointer"
//                 />
//               </div>
//             </div>
//           )}

//           {category && (
//             <div className="tag">
//               <span className="bg-primary text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
//                 {category}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mx-4">
//         <Link
//           to={link || ""}
//           onClick={scrollToTop}
//           className="mb-4  flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary_dark focus:ring-4 focus:outline-none focus:ring-primary_light transition-colors"
//         >
//           Read more
//           <svg
//             className="rtl:rotate-180 w-4 h-4 ml-2"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 10"
//             aria-hidden="true"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 5h12m0 0L9 1m4 4L9 9"
//             />
//           </svg>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;

import { useEffect, useState } from "react";
import Text from "./Text";
import { calculateTimeDifference, scrollToTop, truncateText } from "../utils";
import { Link, Path } from "react-router-dom";
import { HeartIcon } from "./images/HeartOutline";
import { useCustomMutation } from "../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

interface CardProps {
  section: string;
  articleTitle: string;
  summary: string;
  date: string;
  promise: boolean;
  imageUrl: string;
  deadline?: string;
  selectedCard?: string;
  id: string;
  isBookMarked?: boolean;
  isArticleBookMarked?: boolean;
  onBookMarkClick?: (id: string) => void;
  onLikeClicked?: (id: string) => void;
  onCommentClicked?: (id: string) => void;
  setIsArticleBookMarked?: any;
  link?: string | Partial<Path>;
  isPublished?: boolean;
  category?: string;
  isCredible?: boolean;
  isPromisedFulfilled?: boolean;
  dateIncidentStarted?: string;
  dateIncidentResolved?: string;
}

const Card = ({
  section,
  articleTitle,
  summary,
  date,
  promise,
  id,
  link,
  deadline,
  isBookMarked,
  onBookMarkClick,
  onCommentClicked,
  onLikeClicked,
  isPublished,
  imageUrl,
  category,
  isCredible,
  isPromisedFulfilled,
}: CardProps) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { userId, userObject } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [timeDifference, setTimeDifference] = useState<string>("");
  const [isPublicationLiked, setIsPublicationLiked] = useState(false);

  const createBookmarkMutation = useCustomMutation({
    endpoint: "PublicationLikers/LikePublication",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetlatestPublications"],
        exact: false,
      });
    },
  });

  const toggleLikedStatus = async () => {
    if (!isAuthenticated) {
      toast("Please sign in to like an article");
      return;
    }

    const formData = {
      userId: userId,
      publicationPublicId: id,
      isLike: true,
    };

    setIsPublicationLiked((prev) => !prev);

    try {
      await createBookmarkMutation.mutateAsync(formData);
    } catch (error) {
      setIsPublicationLiked((prev) => !prev);
    }
  };

  useEffect(() => {
    if (deadline) {
      calculateTimeDifference(deadline, setTimeDifference);
      const interval = setInterval(() => {
        calculateTimeDifference(deadline, setTimeDifference);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [deadline]);

  return (
    <div className="min-h-[550px] w-[300px] h-auto bg-white dark:bg-black_100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer my-3 flex flex-col">
      {/* Article Image */}
      <img
        src={imageUrl}
        alt="article thumbnail"
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="p-5 flex-grow">
        {/* Section Label */}
        <Text
          variant="bodyTwo"
          className="pb-1 uppercase text-xs text-primary dark:text-primary_light"
        >
          {section}
        </Text>

        {/* Interaction Icons */}
        {isPublished && (
          // <div className="flex items-center justify-between mt-4">
          <div className="flex items-center justify-between pb-4 mt-auto">
            <div className="flex items-center space-x-2">
              <img
                src="/heartOutline.svg"
                alt="Like"
                className="w-5 h-5 cursor-pointer"
                // onClick={() => onLikeClicked?.(id)}
                onClick={() => toggleLikedStatus()}
              />
              {/* <HeartIcon isFilled={false} onC/> */}
              <img
                src="/comments.svg"
                alt="Comments"
                className="w-5 h-5 cursor-pointer"
                onClick={() => onCommentClicked?.(id)}
              />
            </div>

            <img
              src={isBookMarked ? "/filledBookMark.svg" : "/bookMark.svg"}
              alt="Bookmark"
              className="w-5 h-5 cursor-pointer"
              onClick={() => onBookMarkClick?.(id)}
            />
          </div>
        )}

        {/* Credibility Status */}
        <div className="flex items-center justify-between">
          <span
            className={`text-white text-xs font-medium px-2.5 py-0.5 rounded-sm ${
              isCredible ? "bg-green-500 dark:bg-green-900" : "bg-red-500"
            }`}
          >
            {isCredible ? "Credible" : "Not Credible"}
          </span>

          {/* Article Date */}
          <p className="font-medium text-xs text-gray-500">{date}</p>
        </div>

        {/* Article Title */}
        <h3 className="font-semibold text-lg text-black_100 dark:text-white my-2">
          {articleTitle}
        </h3>

        {/* Article Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {truncateText(summary, 10)}
        </p>

        {/* Promise Status */}
        {promise && !isPromisedFulfilled && (
          <div className="flex items-center justify-between mb-4">
            {deadline && (
              <span
                className={`text-white text-xs font-bold px-2.5 py-0.5 rounded ${
                  timeDifference.includes("past")
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {timeDifference}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between">
          {/* Fulfilled Promise */}
          {isPromisedFulfilled && (
            <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-sm">
              Promise Fulfilled
            </span>
          )}

          {/* Category Tag */}
          {category && (
            <span className="bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Read More Button */}
      <div className="mx-4 mb-8">
        <Link
          to={link || ""}
          onClick={scrollToTop}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary_dark"
        >
          Read more
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
