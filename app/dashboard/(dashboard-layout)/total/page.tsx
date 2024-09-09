"use client";
import { useGetData } from "@/app/hooks/apiCalls";
import React from "react";

const page = () => {
  const { data: totalPublicationsData, isLoading: totalPublicationsLoading } =
    useGetData({
      url: "Publications/GetAllPublications?fetchAllPublication=true&page=1&pageSize=10",
      queryKey: ["GetAllTotalPublications"],
    });

  return (
    <div>
      <p>page</p>
    </div>
  );
};

export default page;
