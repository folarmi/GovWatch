/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import {
  useCustomMutation,
  useGetData,
  useGetDataById,
} from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import Loader from "../component/Loader";
import backButton from "../assets/backButton.svg";
import eyeIcon from "../assets/eyeIcon.svg";
import sampleWriter from "../assets/sampleWriter.webp";

import { RenderArticle } from "../component/forms/RenderArticle";
import { useEffect, useState } from "react";
import { Comments } from "../component/Comments";
import { copyToClipboard, scrollToTop } from "../utils";
import { InfoItem } from "../component/InfoItem";
// import { InfiniteScrolling } from "../component/InfiniteScrolling";
import {
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
} from "react-share";
import { ShareButtonIcon } from "../component/SocialShrareButton";
import { Link2Icon } from "lucide-react";
import { toast } from "react-toastify";
import RelatedArticles from "../component/RelatedArticles";

const PublicationDetails = () => {
  const params = useParams();
  const [, setViewCount] = useState();
  const [pageNumber, setPageNumber] = useState<any>(1);
  const pageSize = 12;

  const {
    data: publicationDetailsData,
    isLoading: publicationDetailsIsLoading,
  } = useGetDataById({
    url: `Publications/GetPublicationById?publicId=${params?.id}`,
    queryKey: ["GetAllUserBookmarksByUserId", params?.id!],
    enabled: !!params?.id,
  });

  const {
    data: publicationCommentsData,
    isLoading: publicationCommentsIsLoading,
    // error: publicationCommentError,
    // error,
  } = useGetData({
    url: `PublicationComments/GetAllPublicationCommentsResponses?publicationId=${params?.id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetAllPublicationComments"],
  });

  const UpdatePublicationViewCount = useCustomMutation({
    endpoint: `Publications/UpdatePublicationViewCount?publicationId=${publicationDetailsData?.publicId}`,
    method: "put",
    // successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: (data: any) => {
      setViewCount(data?.viewCount);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      UpdatePublicationViewCount.mutate({});
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    const success = await copyToClipboard(
      `https://www.govwatch.ng/publication/${publicationDetailsData?.publicId}`
    );

    toast[success ? "success" : "error"](
      success
        ? "Link copied to clipboard!"
        : "Failed to copy. Please try again."
    );
  };

  return (
    <OuterPage>
      {publicationDetailsIsLoading || publicationCommentsIsLoading ? (
        <Loader />
      ) : (
        <section className="w-full max-w-[680px] mt-4 mx-auto px-4 lg:px-0 ">
          <div className="flex items-center justify-between ">
            <Link to="/" className="cursor-pointer">
              <img src={backButton} className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-x-3">
              <ShareButtonIcon
                Button={LinkedinShareButton}
                Icon={LinkedinIcon}
                publicId={publicationDetailsData?.publicId}
              />
              <ShareButtonIcon
                Button={TwitterShareButton}
                Icon={TwitterIcon}
                publicId={publicationDetailsData?.publicId}
              />
              <ShareButtonIcon
                Button={FacebookShareButton}
                Icon={FacebookIcon}
                publicId={publicationDetailsData?.publicId}
              />
              <div className="transition-transform duration-200 hover:opacity-80 hover:scale-105 cursor-pointer">
                <Link2Icon onClick={handleCopy} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-2 mb-8 gap-x-2 gap-y-2 lg:flex-nowrap lg:gap-x-4">
            <p className="text-sm lg:text-base text-primary font-bold">
              {publicationDetailsData?.category}
            </p>

            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>

            <div className="flex items-center">
              <img
                src={eyeIcon}
                className="mr-1.5 w-4 h-4 lg:w-auto lg:h-auto"
              />
              <p className="text-sm lg:text-base">
                {publicationDetailsData?.viewCount || 0} views
              </p>
            </div>

            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>

            <p className="text-sm lg:text-base text-black/90 font-medium">
              {publicationDetailsData?.date}
            </p>
          </div>

          <main className="">
            <p
              style={{
                fontSize:
                  "font-size: clamp(2rem, 1.4783rem + 2.6087vw, 3.5rem)",
              }}
              className="text-2xl lg:text-6xl text-black font-black mb-2"
            >
              {publicationDetailsData?.title}
            </p>

            <div className="my-4">
              <img
                src={publicationDetailsData?.image}
                alt="Article placeholder image"
                className="w-full h-64 md:h-80 lg:h-[680px] object-contain rounded-lg blur-xs "
              />

              <p className="mt-2 text-sm text-gray-600 italic text-center underline">
                {publicationDetailsData?.imageCaption}
              </p>
            </div>

            <RenderArticle articleContent={publicationDetailsData?.article} />

            {/* Start of additional information */}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8 shadow-md">
              <h3 className="font-bold text-lg mb-2">Additional Information</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <InfoItem label="State" value={publicationDetailsData?.state} />
                <InfoItem label="LGA" value={publicationDetailsData?.lga} />
                <InfoItem
                  label="Political Actor"
                  value={publicationDetailsData?.politicalActorName}
                />
                <InfoItem label="MDAs" value={publicationDetailsData?.mda} />
                <InfoItem
                  label="Region"
                  value={publicationDetailsData?.region}
                />

                {publicationDetailsData?.isPromise && (
                  <>
                    <InfoItem
                      label="Date Promise Made"
                      value={publicationDetailsData?.datePromiseMade}
                      isDate
                    />
                    <InfoItem
                      label="Promise Deadline"
                      value={publicationDetailsData?.promiseDeadline}
                      isDate
                    />
                    <InfoItem
                      label="Date Promise Fulfilled"
                      value={
                        publicationDetailsData?.datePromiseFulfilled
                          ? publicationDetailsData?.datePromiseFulfilled
                          : "Not fulfilled"
                      }
                      isDate={!!publicationDetailsData?.datePromiseFulfilled}
                    />
                  </>
                )}
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Last Modified:
              </span>{" "}
              {publicationDetailsData?.lastModifiedDate}
            </p>

            <Comments
              comments={publicationCommentsData?.publicationCommentViewModel}
              publicationDetailsData={publicationDetailsData}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              pageSize={pageSize}
            />

            {/* <InfiniteScrolling
              data={publicationCommentsData?.publicationCommentViewModel}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              isLoading={publicationCommentsIsLoading}
              error={publicationCommentError}
              pageSize={12}
              keyExtractor={(comment: any) => comment?.publicId}
              ifGrid={false}
              renderItem={() => (
                <Comments
                  comments={
                    publicationCommentsData?.publicationCommentViewModel
                  }
                  publicationDetailsData={publicationDetailsData}
                />
              )}
            /> */}

            <p className="font-black mt-8 mb-4">References</p>
            <RenderArticle articleContent={publicationDetailsData?.reference} />

            {/* <a
              target="_blank"
              href={publicationDetailsData?.reference}
              className="mb-12 underline text-blue-800"
            >
              {publicationDetailsData?.reference}
            </a> */}
            {/* <p> {publicationDetailsData?.reference}</p> */}

            <p className="font-black mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {publicationDetailsData &&
                publicationDetailsData?.tags
                  .split(", ")
                  ?.map((item: string, index: string) => {
                    return (
                      <span
                        key={index}
                        className="bg-primary capitalize text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap"
                      >
                        {item}
                      </span>
                    );
                  })}
            </div>

            <RelatedArticles
              article={publicationDetailsData}
              key={publicationDetailsData.publicId}
            />
            {/* {publicationDetailsData?.bio !== null && (
              <p className="my-6 text-base font-normal">
                <span className="font-semibold">
                  {publicationDetailsData?.authorName}
                </span>{" "}
                is a {publicationDetailsData?.bio}
              </p>
            )}

            <div className="flex items-center my-8">
              <div className="w-36 h-36 overflow-hidden rounded-full">
                <img
                  // src={publicationDetailsData?.image}
                  src={publicationDetailsData?.contributorImage || sampleWriter}
                  className="w-full h-full object-cover rounded-full"
                  alt="Writer"
                />
              </div>

              <div className="ml-6">
                <p className="font-bold text-3xl">
                  Written by {publicationDetailsData?.authorName}
                </p>
              </div>
            </div> */}

            {/* {publicationDetailsData?.bio && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md my-6">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {publicationDetailsData?.authorName}
                  </span>{" "}
                  is {publicationDetailsData?.bio}.
                </p>
              </div>
            )} */}

            <div className="flex items-center space-x-8 my-8">
              {/* Profile Image */}
              <Link
                to={`/author/${publicationDetailsData?.contributorPublicId}`}
                className="relative overflow-hidden rounded-full shadow-lg aspect-square w-16 sm:w-20 md:w-28 lg:w-36"
                onClick={() => scrollToTop()}
              >
                <img
                  src={publicationDetailsData?.contributorImage || sampleWriter}
                  className="w-full h-full object-cover"
                  alt="Writer"
                />
              </Link>

              {/* Author Information */}
              <div>
                <p className="font-bold text-xl lg:text-3xl text-gray-800">
                  Written by {publicationDetailsData?.authorName}
                </p>
                <p className="text-gray-600 mt-2 text-sm lg:text-base">
                  {publicationDetailsData?.bio}
                </p>
              </div>
            </div>
          </main>
        </section>
      )}
    </OuterPage>
  );
};

export { PublicationDetails };
