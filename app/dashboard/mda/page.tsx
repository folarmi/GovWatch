"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateMDA from "@/app/component/modals/CreateMDA";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const MDA = () => {
  const { data: mdaData, isLoading } = useGetData({
    url: `Mdas/GetAllMdas?pageNumber=1&pageSize=10`,
    queryKey: ["GetAllMdasTable"],
  });
  const [createMDA, setCreateMDA] = useState(false);

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
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => <span className="text-sm font-normal">hgfhfhf</span>,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("leaderName", {
      header: "Leader Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("financialAllocation", {
      header: "Financial Allocation",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreateMDA(!createMDA);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add MDA" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={mdaData?.mdaViewModel}
        isLoading={isLoading}
      />

      <Modal show={createMDA} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateMDA toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default MDA;
