import Image from "next/image";
import React from "react";
import bookMark from "../../public/bookMark.svg";
import heartOutline from "../../public/heartOutline.svg";
import comments from "../../public/comments.svg";
import Text from "./Text";
import { truncateText } from "../utils";

interface CardProps {
  section: string;
  articleTitle: string;
  summary: string;
  date: string;
  promise: boolean;
  imageUrl: any;
}

const Card = ({
  section,
  articleTitle,
  summary,
  date,
  promise,
  imageUrl,
}: CardProps) => {
  return (
    <div className="max-w-72 bg-white dark:bg-black_100 border border-gray-200 rounded-lg shadow dark:border-black-100 mb-6 cursor-pointer">
      <div className="p-5">
        <Image src={imageUrl} alt="dummy image" width={600} height={600} />
        <Text
          variant="bodyTwo"
          className="pb-2 tracking-tight text-black_200 dark:text-white"
        >
          {section}
        </Text>

        <p className="font-medium text-black_100 dark:text-white w-[200]">
          {truncateText(articleTitle, 4)}
        </p>

        <p className="pb-2 font-normal text-black_100 dark:text-white w-[200]">
          {truncateText(summary, 7)}
        </p>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[13px">{date}</p>
          {promise && (
            <span className="bg-primary_DM dark:bg-primary_DM text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded  dark:text-gray-300">
              Promise
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Image src={heartOutline} alt="heartOutline" className="mr-2" />
            <Image src={comments} alt="comments" />
          </div>
          <Image src={bookMark} alt="bookMark" />
        </div>

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary mt-5"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Card;

// using System.ComponentModel.DataAnnotations;

// namespace Core.Models.ViewModels.Publication
// {
//     public class CreatePublicationRequestViewModel
//     {
// 		/// <summary>
// 		/// A brief summary of the publication you want to create
// 		/// </summary>
// 		[StringLength(1000, ErrorMessage = "Input must not exceed 1000 characters")]
// 		public string? Snippet { get; set; }
//         /// <summary>
//         /// The article Content
//         /// </summary>
//         [Required(ErrorMessage = "Please input the article's Content")]
// 		[StringLength(200000, ErrorMessage = "Input must not exceed 200000 characters")]
// 		public string Article { get; set; }
// 		/// <summary>
// 		/// The Image path of the header Image of the publication you want to create
// 		/// </summary>
// 		[StringLength(500, ErrorMessage = "Input must not exceed 200 characters")]
// 		public string? Image { get; set; }
// 		/// <summary>
// 		/// The caption of the header Image of the publication you want to create
// 		/// </summary>
// 		[StringLength(200, ErrorMessage = "Input must not exceed 200 characters")]
// 		public string? ImageCaption { get; set; }
//         /// <summary>
//         /// The ID of the person creating the publication
//         /// </summary>
//         [Required(ErrorMessage = "Please input userId")]
//         public string ContributorPublicId { get; set; }
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string? Mda { get; set; }
// 		/// <summary>
// 		/// The name of the Category that the publication falls under (eg ministry, department, agency, and political actor)
// 		/// </summary>
// 		[Required(ErrorMessage = "Please input Category name")]
//         [StringLength(100, ErrorMessage = "Input must not exceed 100 characters")]
//         public string Category { get; set; }
//         /// <summary>
//         /// The name of the state that the publication relates to the most (eg. Lagos)
//         /// </summary>
//         [StringLength(100, ErrorMessage = "Input must not exceed 100 characters")]
//         public string? State { get; set; }
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string? Ward { get; set; }
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string? Lcda { get; set; }
// 		[Required(ErrorMessage = "IsFederal is required")]
// 		public bool IsFederal { get; set; }
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string? Lga { get; set; }
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string? Province { get; set; }
// 		/// <summary>
// 		/// Title of the publication
// 		/// </summary>
// 		[Required(ErrorMessage = "Please input Title of the article name")]
//         [StringLength(100, ErrorMessage = "Input must not exceed 100 characters")]
//         public string Title { get; set; }
// 		/// <summary>
// 		/// The tags of the publication
// 		/// </summary>
// 		[StringLength(200, ErrorMessage = "Input must not exceed 200 characters")]
// 		public string? Tags { get; set; }
// 		/// <summary>
// 		/// If there's a list of references (related to academic research)
// 		/// </summary>
// 		[StringLength(20000, ErrorMessage = "Input must not exceed 20000 characters")]
// 		public string? Reference { get; set; }
//         /// <summary>
//         /// Author name is used in cases where you're writing about a book, poem or work of another person so as to make it easier to search for Content particular to the person
//         /// </summary>

//         [StringLength(100, ErrorMessage = "Input must not exceed 100 characters")]
//         public string? AuthorName { get; set; }
// 		/// <summary>
// 		/// Any special links that need to be added to the publication
// 		/// </summary>
// 		[StringLength(100, ErrorMessage = "Input must not exceed 100 characters")]
// 		public string? Link { get; set; }
// 		public bool IsPromise { get; set; }
// 		public bool? IsPromisedFulfilled { get; set; }
// 		public DateTime? DatePromiseMade { get; set; }
// 		public DateTime? PromiseDeadline { get; set; }
// 		public DateTime? DatePromiseFulfilled { get; set; }
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string? PoliticalActorName { get; set; }
// 		[Required(ErrorMessage = "Country name is required")]
// 		[StringLength(500, ErrorMessage = "{0} must be at least {2} characters long.", MinimumLength = 2)]
// 		public string Country { get; set; }
// 		public CancellationToken CancellationToken { get; set; }
// 	}
// }
