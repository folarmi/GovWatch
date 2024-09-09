"use client";

import Card from "@/app/component/Card";
import Loader from "@/app/component/Loader";
import { useGetData } from "@/app/hooks/apiCalls";
import React from "react";

const Pending = () => {
  const {
    data: reviewedPublicationsData,
    isLoading: reviewedPublicationsLoading,
  } = useGetData({
    url: "Publications/GetAllPublications?fetchAllReviewedPublication=true&page=1&pageSize=10",
    queryKey: ["GetAllPendingPublications"],
  });
  return (
    <div>
      {reviewedPublicationsLoading ? (
        <Loader />
      ) : (
        <div>
          {reviewedPublicationsData?.map(
            ({ title, date, image, section, summary, isPromise, id }: any) => {
              return (
                <div key={id} className="w-full sm:w-1/2 md:w-1/3">
                  <Card
                    section={section}
                    articleTitle={title}
                    summary={summary}
                    date={date}
                    promise={isPromise}
                    imageUrl={image}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Pending;
