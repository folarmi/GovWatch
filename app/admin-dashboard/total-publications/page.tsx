"use client";
import React from "react";
import { cardData } from "../../data/index";
import Card from "@/app/component/Card";
import SeeAllPublications from "@/app/component/SeeAllPublications";

const TotalPublications = () => {
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

export default TotalPublications;
