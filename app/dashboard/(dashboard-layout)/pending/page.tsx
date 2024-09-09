"use client";

import Card from "@/app/component/Card";
import Loader from "@/app/component/Loader";
import { useGetData } from "@/app/hooks/apiCalls";
import React from "react";
import coatOfArms from "@/public/coatOfArms.svg";

const Pending = () => {
  const {
    data: pendingPublicationsData,
    isLoading: pendingPublicationsLoading,
  } = useGetData({
    url: "Publications/GetAllPublications?fetchAllSubmittedPublication=true&page=1&pageSize=100",
    queryKey: ["GetAllPendingPublications"],
  });
  return (
    <div className="">
      {pendingPublicationsLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-between">
          {pendingPublicationsData?.map(
            ({ title, date, image, section, summary, isPromise, id }: any) => {
              return (
                <div key={id} className="w-full sm:w-1/2 md:w-1/3 mt-10">
                  <Card
                    section={section}
                    articleTitle={title}
                    summary={summary}
                    date={date}
                    promise={isPromise}
                    // imageUrl={image}
                    imageUrl={coatOfArms}
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
