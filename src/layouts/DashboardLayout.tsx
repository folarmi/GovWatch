/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import withAuth from "../hoc/withAuth";
// import Loader from "../component/Loader";
// import InformationTab from "../component/InformationTab";
import CreatePublication from "../component/CreatePublication";
import { Header } from "../component/Header";
import { dashboardSideBarItems } from "../data";
// import { useGetData } from "../hooks/apiCalls";
import { userTypeObject } from "../utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const { userType } = useAppSelector((state: RootState) => state.auth);

  // const { data: userCountData, isLoading: userCountIsLoading } = useGetData({
  //   url: "Users/GetCountOfUsers",
  //   queryKey: ["GetCountOfUsers"],
  //   enabled: userType === userTypeObject.admin,
  // });

  // const { data: countOfPublications, isLoading: countOfPublicationsIsLoading } =
  //   useGetData({
  //     url: "Publications/GetCountOfPublications",
  //     queryKey: ["GetCountOfPublications"],
  //   });

  // const {
  //   data: countOfPublicationsForAdmin,
  //   isLoading: countOfPublicationsForAdminIsLoading,
  // } = useGetData({
  //   url: "/GetCountOfPublicationsForAdmin",
  //   queryKey: ["GetCountOfPublicationsForAdmin"],
  // });

  // const adminDashboard = [
  //   {
  //     id: 1,
  //     name: "Top Engaged Post",
  //     number: 700,
  //     path: "/admin-dashboard/top-engaged-posts",
  //   },
  //   {
  //     id: 2,
  //     name: "Total Publications",
  //     number: countOfPublications?.totalCount ?? 0,
  //     path: "/admin-dashboard/total-publications",
  //   },
  //   {
  //     id: 3,
  //     name: "Submitted Publication",
  //     number: countOfPublicationsForAdmin?.totalCount ?? 0,
  //     path: "/admin-dashboard/submitted-publications",
  //   },
  //   {
  //     id: 4,
  //     name: "Pending Publication",
  //     number: 5,
  //     path: "/admin-dashboard/pending-publications",
  //   },
  //   {
  //     id: 5,
  //     name: "Bookmarks",
  //     number: 56,
  //     path: "/admin-dashboard/bookmarks",
  //   },
  //   {
  //     id: 6,
  //     name: `${userType === userTypeObject.admin ? "Total Users" : ""}`,
  //     number: `${
  //       userType === userTypeObject.admin ? `${userCountData?.totalCount}` : ""
  //     }`,
  //     path: "/admin-dashboard/manage-users",
  //   },
  // ];

  const filteredItems = dashboardSideBarItems.filter(({ userRole }) =>
    userRole.includes(userType)
  );

  // if (
  //   userCountIsLoading ||
  //   countOfPublicationsIsLoading ||
  //   countOfPublicationsForAdminIsLoading
  // ) {
  //   return <Loader />;
  // }

  return (
    <>
      {" "}
      <Header />
      {/* <section className="px-6 md:px-20"> */}
      {/* {userType !== userTypeObject.user &&
        userType !== userTypeObject.organization && (
          <InformationTab data={adminDashboard} />
        )} */}
      <div className="flex space-x-6">
        <aside className="bg-green-700 text-white w-64 p-4 h-screen sticky top-0 overflow-y-auto">
          {filteredItems.map(({ category, items }) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold uppercase">{category}</h3>
              {items.map(({ id, name, image: Icon, link }) => (
                <Link
                  key={id}
                  className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-all duration-200 ${
                    pathName.startsWith(link)
                      ? "bg-green-500"
                      : "hover:bg-green-600"
                  }`}
                  to={link}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </aside>

        <main className="flex-1">{children}</main>
      </div>
      {/* <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">

        <aside className="bg-green-700 text-white w-full md:w-64 p-4 h-auto md:h-screen md:sticky top-0 overflow-y-auto">
          {filteredItems.map(({ category, items }) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold uppercase">{category}</h3>
              {items.map(({ id, name, image: Icon, link }) => (
                <Link
                  key={id}
                  className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-all duration-200 ${
                    pathName.startsWith(link)
                      ? "bg-green-500"
                      : "hover:bg-green-600"
                  }`}
                  to={link}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </aside>


        <main className="flex-1">{children}</main>
      </div> */}
      {/* </section> */}
      {userType !== userTypeObject.organization && <CreatePublication />}
    </>
  );
};

export default withAuth(DashboardLayout);
