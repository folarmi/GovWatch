/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroSection from "../component/HeroSection";
import ScrollableCategories from "../component/ScrollableCategories";
import SearchBar from "../component/SearchBar";
import ExploreButton from "../component/ExploreButton";
// import SeeAllPublications from "../component/SeeAllPublications";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

import { useForm } from "react-hook-form";
import InfiniteScrollArticles from "../component/InfiniteScrolling";
import { queryParamsToAdd } from "../utils";

const Home = () => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [queryParam, setQueryParam] = useState("");
  const [pageNumber, setPageNumber] = useState<any>(1);

  const { control, handleSubmit } = useForm();
  const { userId, userObject } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url: `Publications/GetLatestPublications?categoryName=${
      categoryName === "all" ? "" : categoryName
    }&searcherId=${userId}${
      userObject?.country ? `&countryName=${userObject.country}` : ""
    }&${queryParamsToAdd(
      selectedFilter,
      queryParam
    )}&pageNumber=${pageNumber}&pageSize=12`,
    queryKey: [
      "GetlatestPublications",
      categoryName,
      queryParam,
      userObject?.country,
      JSON.stringify(pageNumber),
    ],
  });

  const { data: categoriesData, isLoading: categoriesDataisLoading } =
    useGetData({
      url: "Categories/GetAllCategories",
      queryKey: ["GetAllCategories", "homePage"],
    });

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: any) => {
      return {
        id: item?.id,
        name: item?.name,
      };
    });

  if (categoriesDataisLoading || categoriesDataisLoading) return <Loader />;

  const getCategory = (data: any) => {
    setCategoryName(data);
  };

  const submitForm = (data: any) => {
    setQueryParam(data?.queryParams);
  };

  return (
    <OuterPage>
      <div className="px-8 md:px-24">
        <form onSubmit={handleSubmit(submitForm)}>
          <SearchBar
            setSelectedFilter={setSelectedFilter}
            setQueryParam={setQueryParam}
            control={control}
            name="queryParam"
          />
        </form>
        <HeroSection />

        <ScrollableCategories
          onClick={getCategory}
          categories={categoriesDataFormatted}
        />

        <InfiniteScrollArticles
          articlesData={articlesData}
          setPageNumber={setPageNumber}
          isLoading={isLoading}
          error={error}
        />
        {/* {articlesData?.length > 1 && <SeeAllPublications />} */}
        <ExploreButton />
      </div>
    </OuterPage>
  );
};

export { Home };
