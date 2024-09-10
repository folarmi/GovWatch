"use client";

import Table from "@/app/component/Table";
import { UserType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import defaultAvatar from "@/public/defaultAvatar.svg";
import Image from "next/image";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import { useForm } from "react-hook-form";
import AdminButton from "@/app/component/forms/AdminButton";
import Link from "next/link";
import { useGetData } from "@/app/hooks/apiCalls";
import Loader from "@/app/component/Loader";

const ManageUsers = () => {
  const { control } = useForm();

  const { data: usersData, isLoading: usersDataIsLoading } = useGetData({
    url: `Users/GetAllUser?page=1&pageSize=10`,
    queryKey: ["GetAllUsers"],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    // Display Column
    columnHelper.display({
      id: "checkbox",
      cell: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: () => <Image src={defaultAvatar} alt="default avatar" />,
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("phoneNumber", {
      header: "Phone Number",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg ${
            info.getValue() === true
              ? "bg-green_300 text-green_100"
              : "bg-red-300 text-red-700"
          }`}
        >
          {info.getValue() === true ? "Active" : "Inactive"}
        </span>
      ),
    }),
  ];

  return (
    <>
      {usersDataIsLoading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <Link
            href="/admin-dashboard/manage-users/create
      "
            className="flex justify-end w-full mb-4"
          >
            <AdminButton buttonText="Add User(s)" />
          </Link>

          <Table columns={columns} data={usersData?.userViewModel} />
        </div>
      )}
    </>
  );
};

export default ManageUsers;
