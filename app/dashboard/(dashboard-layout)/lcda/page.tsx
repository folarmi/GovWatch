"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateLCDA from "@/app/component/modals/CreateLCDA";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const LCDA = () => {
  const { data: lcdaData, isLoading: lcdaDataIsLoading } = useGetData({
    url: `Lcdas/GetAllLcdas?pageNumber=1&pageSize=10`,
    queryKey: ["GetAllLcdas"],
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
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => <span className="text-sm font-normal">ggg</span>,
    }),
    columnHelper.accessor("name", {
      header: "State",
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
    columnHelper.accessor("governor", {
      header: "Governor",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const [createLCDAModal, setCreateLCDAModal] = useState(false);

  const toggleModal = () => {
    setCreateLCDAModal(!createLCDAModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add LCDA" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={lcdaData?.lcdaViewModel}
        isLoading={lcdaDataIsLoading}
      />

      <Modal show={createLCDAModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateLCDA toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default LCDA;
