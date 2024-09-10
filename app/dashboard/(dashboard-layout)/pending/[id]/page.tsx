"use client";

import { useGetDataById } from "@/app/hooks/apiCalls";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { useParams } from "next/navigation";
import React from "react";

const SinglePublication = () => {
  const params = useParams();
  const { userCountry, userId } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { data: publicationData, isLoading: publicationDataIsLoading } =
    useGetDataById({
      url: `/Publications/GetUserPublicationById?publicId=${params?.id}&userId=${userId}`,
      queryKey: ["GetUserPublicationById"],
    });

  return (
    <div>
      <p>SinglePublication</p>
    </div>
  );
};

export default SinglePublication;
