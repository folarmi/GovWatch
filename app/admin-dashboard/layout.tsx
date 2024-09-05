"use client";

import React from "react";
import { adminDashboardSideBarItems } from "../data";
import Image from "next/image";
import InformationTab from "../component/InformationTab";
import CreatePublication from "../component/CreatePublication";
import pending from "../../public/pending.svg";
import iconSeven from "../../public/iconSeven.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import withAdminAuth from "../hoc/withAdminAuth";
import { useGetData } from "../hooks/apiCalls";
import Loader from "../component/Loader";
// import SearchBar from "../component/SearchBar";

const AdminDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();

  const { data: userCountData, isLoading: userCountIsLoading } = useGetData({
    url: "Users/GetCountOfUsers",
    queryKey: ["GetCountOfUsers"],
  });

  const { data: countOfPublications, isLoading: countOfPublicationsIsLoading } =
    useGetData({
      url: "Publications/GetCountOfPublications",
      queryKey: ["GetCountOfPublications"],
    });

  const {
    data: countOfPublicationsForAdmin,
    isLoading: countOfPublicationsForAdminIsLoading,
  } = useGetData({
    url: "/GetCountOfPublicationsForAdmin",
    queryKey: ["GetCountOfPublicationsForAdmin"],
  });

  const adminDashboard = [
    {
      id: 1,
      name: "Top Engaged Post",
      number: 700,
      path: "/admin-dashboard/top-engaged-posts",
    },
    {
      id: 2,
      name: "Total Publications",
      number: countOfPublications?.totalCount ?? 0,
      path: "/admin-dashboard/total-publications",
    },
    {
      id: 3,
      name: "Submitted Publication",
      number: countOfPublicationsForAdmin?.totalCount ?? 0,
      path: "/admin-dashboard/submitted-publications",
    },
    {
      id: 4,
      name: "Pending Publication",
      number: 5,
      path: "/admin-dashboard/pending-publications",
    },
    {
      id: 5,
      name: "Bookmarks",
      number: 56,
      path: "/admin-dashboard/bookmarks",
    },
    {
      id: 6,
      name: "Total Users",
      number: userCountData?.totalCount ?? 0,
      path: "/admin-dashboard/manage-users",
    },
  ];

  return (
    // <>
    //   {userCountIsLoading ||
    //   countOfPublicationsIsLoading ||
    //   countOfPublicationsForAdminIsLoading ? (
    //     <Loader />
    //   ) : (
    //     <section className="px-8 md:px-24">
    //       {/* <SearchBar onSearch={handleSearch} /> */}
    //       <InformationTab data={adminDashboard} />
    //       <div className="flex ">
    //         <section className="bg-green_100 text-white my-10  mr-8 pt-6 rounded-lg">
    //           <div className="flex items-center px-8 mb-6">
    //             <Image src={iconSeven} alt="item icon" />
    //             <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
    //               Unapproved Publications
    //             </p>
    //           </div>

    //           <p className="text-base font-medium px-8 pb-8 cursor-pointer">
    //             Editing
    //           </p>
    //           <div className="flex items-center px-8 mb-6">
    //             <Image src={pending} alt="item icon" />
    //             <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
    //               Pending Publications
    //             </p>
    //           </div>

    //           <p className="text-base font-medium px-8 pb-8 cursor-pointer">
    //             Admin
    //           </p>
    //           {adminDashboardSideBarItems.map(({ id, name, image, link }) => {
    //             return (
    //               <Link
    //                 className={`flex items-center py-4 px-8 mb-6 ${
    //                   pathName.startsWith(link) ? "bg-green_300" : ""
    //                 }`}
    //                 href={link}
    //                 key={id}
    //               >
    //                 <Image src={image} alt="item icon" className="" />
    //                 <p
    //                   className={`text-base font-medium whitespace-nowrap mx-5 cursor-pointer`}
    //                 >
    //                   {name}
    //                 </p>
    //               </Link>
    //             );
    //           })}
    //         </section>
    //         <main className="w-full">{children}</main>
    //       </div>
    //       <CreatePublication />
    //     </section>
    //   )}
    // </>

    <>
      {userCountIsLoading ||
      countOfPublicationsIsLoading ||
      countOfPublicationsForAdminIsLoading ? (
        <Loader />
      ) : (
        <section className="px-8 md:px-24">
          {/* <SearchBar onSearch={handleSearch} /> */}
          <InformationTab data={adminDashboard} />
          <div className="flex">
            {/* Sidebar */}
            <section className="bg-green_100 text-white my-10 mr-8 pt-6 rounded-lg max-h-screen overflow-y-scroll w-[400px]">
              {/* <p className="text-base font-medium px-8 pb-8 cursor-pointer">
                Admin
              </p> */}

              {/* Dynamic Sidebar Items */}
              {/* {adminDashboardSideBarItems.map(({ category, items }) => (
                <div key={category} className="px-8 mb-6">
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  {items.map(({ id, name, image, link }) => (
                    <Link
                      key={id}
                      className={`flex items-center py-2 mb-2 ${
                        pathName.startsWith(link) ? "bg-green_300" : ""
                      }`}
                      href={link}
                    >
                      <Image src={image} alt="item icon" />
                      <p className="text-base font-medium mx-5 cursor-pointer">
                        {name}
                      </p>
                    </Link>
                  ))}
                </div>
              ))} */}

              {adminDashboardSideBarItems.map(({ category, items }, index) => (
                <div
                  key={category}
                  className={`px-8 mb-2 py-4 ${
                    // index % 2 === 0 ? "bg-red-200" : "bg-green-300"
                    index % 2 === 0 ? "" : ""
                  } rounded-lg`}
                >
                  <h3 className="text-lg font-semibold pb-2">{category}</h3>
                  {items.map(({ id, name, image, link }) => (
                    <Link
                      key={id}
                      className={`flex items-center py-2 mb-2 hover:bg-green-400 transition-colors duration-200 whitespace-nowrap ${
                        pathName.startsWith(link)
                          ? "bg-green_300 rounded-md"
                          : ""
                      }`}
                      href={link}
                    >
                      <Image src={image} alt="item icon" />
                      <p className="text-base font-medium mx-5 cursor-pointer">
                        {name}
                      </p>
                    </Link>
                  ))}
                </div>
              ))}
            </section>

            {/* Main Content */}
            <main className="w-full">{children}</main>
          </div>
          <CreatePublication />
        </section>
      )}
    </>
  );
};

export default withAdminAuth(AdminDashboardLayout);
