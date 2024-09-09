"use client";
import Card from "@/app/component/Card";
import SeeAllPublications from "@/app/component/SeeAllPublications";
import { cardData } from "@/app/data";
import withAdminAuth from "@/app/hoc/withAdminAuth";
import React from "react";
// import SearchBar from "../component/SearchBar";
// import { cardData } from "../data";
// import Card from "../component/Card";
// import SeeAllPublications from "../component/SeeAllPublications";
// import withAdminAuth from "../hoc/withAdminAuth";

const AdminDashboard = () => {
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

export default withAdminAuth(AdminDashboard);

// {
//   "article": "Deleniti quae eos q",
//   "submittedBy": "Admin User",
//   "submittedOn": "09 September 2024",
//   "image": "fffff",
//   "imageCaption": "Reiciendis rerum acc",
//   "id": "6b6c2952-5401-4a78-9e2f-34e139604ac6",
//   "title": "Corporis ipsam exped",
//   "isPromise": true
// },
