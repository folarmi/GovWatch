"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateLGA from "@/app/component/modals/CreateLGA";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const LGA = () => {
  const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const { data: lgaData, isLoading } = useGetData({
    url: `/Lgas/GetAllLgas?country=${userCountry}&pageNumber=1&pageSize=10'`,
    queryKey: ["GetAllLgas"],
  });

  const [createLGAModal, setCreateLGAModal] = useState(false);

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

  const toggleModal = () => {
    setCreateLGAModal(!createLGAModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add LGA" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={lgaData?.lgaViewModel}
        isLoading={isLoading}
      />

      <Modal show={createLGAModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateLGA toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default LGA;
