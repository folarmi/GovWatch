"use client";
import React from "react";
import Card from "@/app/component/Card";
import SeeAllPublications from "@/app/component/SeeAllPublications";
import { cardData } from "@/app/data";

const Bookmarks = () => {
  const handleSearch = () => {};

  return (
    <div>
      <section className="mt-10 flex flex-wrap justify-between">
        {cardData.map(
          ({ articleTitle, date, imageUrl, section, summary, promise }) => {
            return (
              <div key={articleTitle} className="w-full sm:w-1/2 md:w-1/3">
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
      <SeeAllPublications />
    </div>
  );
};

export default Bookmarks;
