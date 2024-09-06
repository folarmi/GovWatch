"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateWard from "@/app/component/modals/CreateWard";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const Ward = () => {
  const { data: wardData, isLoading: wardDataIsLoading } = useGetData({
    url: `Wards/GetAllWards?pageNumber=1&pageSize=10`,
    queryKey: ["GetAllWardsTable"],
  });
  const columnHelper = createColumnHelper<any>();
  const [createWardModal, setCreateWardModal] = useState(false);

  const toggleModal = () => {
    setCreateWardModal(!createWardModal);
  };

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
      cell: (info) => <span className="text-sm font-normal">ggg</span>,
    }),
    columnHelper.accessor("name", {
      header: "LGA",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("capital", {
      header: "Capital",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("chairman", {
      header: "Governor",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Ward" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={wardData?.wardViewModel}
        isLoading={wardDataIsLoading}
      />

      <Modal show={createWardModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateWard toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Ward;
