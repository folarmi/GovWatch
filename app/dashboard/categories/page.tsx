"use client";

import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Loader from "@/app/component/Loader";
import Table from "@/app/component/Table";
import AdminButton from "@/app/component/forms/AdminButton";
import CreateCategory from "@/app/component/modals/CreateCategory";
import Modal from "@/app/component/modals/Modal";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";

const Categories = () => {
  const { data: categoriesData, isLoading } = useGetData({
    url: "Categories/GetAllCategories",
    queryKey: ["GetAllCategories"],
  });

  const [data, setData] = React.useState<any[]>([
    {
      categories: "Ministries",
      about: "Lorem ipsum dolor sit amet consectetur.  ",
      post: 50,
    },
    {
      categories: "Agencies",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      categories: "Departments",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      categories: "Political Actors",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
  ]);

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
    columnHelper.accessor("name", {
      header: "Category Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("categoryImage", {
      header: "Image",
      cell: (info) => (
        // <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
        <p className="text-sm font-normal w-[272px] ">Test Image</p>
        // <Image
        //   src={info.getValue()}
        //   alt="category-image"
        //   width={500}
        //   height={500}
        // />
      ),
    }),
  ];

  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const toggleModal = () => {
    setCreateCategoryModal(!createCategoryModal);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <div className="flex justify-end w-full mb-4">
            <AdminButton buttonText="Add Category" onClick={toggleModal} />
          </div>
          <Table columns={columns} data={categoriesData?.categoryViewModel} />

          <Modal show={createCategoryModal} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateCategory toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Categories;
