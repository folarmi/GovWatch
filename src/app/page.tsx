"use client";

import Card from "./component/Card";
import HeroSection from "./component/HeroSection";
import ScrollableCategories from "./component/ScrollableCategories";
import SearchBar from "./component/SearchBar";
import { cardData, categories } from "./data";
import arrow from "../../public/arrow.svg";
import Image from "next/image";
import ThemeToogle from "./component/ThemeToggle";

export default function Home() {
  const handleSearch = () => {};
  // const fetchPublications = async () => {
  //   const { data } = await api.get("/GetLatestPublications/1/10");
  //   return data;
  // };

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["publications"],
  //   queryFn: fetchPublications,
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data</div>;

  return (
    <div className="px-24">
      <SearchBar onSearch={handleSearch} />
      <HeroSection />
      <ThemeToogle />
      <ScrollableCategories categories={categories} />
      <section className="mt-10 flex flex-wrap justify-between">
        {cardData.map(
          ({ articleTitle, date, imageUrl, section, summary, promise }) => {
            return (
              <div
                key={articleTitle}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <Card
                  section={section}
                  articleTitle={articleTitle}
                  summary={summary}
                  date={date}
                  promise={promise}
                  imageUrl={imageUrl}
                />
              </div>
            );
          }
        )}
      </section>

      <div className="mb-6 flex items-center justify-end">
        <p className="text-lg font-bold pr-3">See More Publications</p>
        <Image src={arrow} alt="arrow" />
      </div>
    </div>
  );
}
