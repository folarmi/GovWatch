"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Loader from "@/app/component/Loader";
import CreateState from "@/app/component/modals/CreateState";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { StateType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const State = () => {
  const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const { data: stateData, isLoading } = useGetData({
    url: `States/GetAllStates?country=${userCountry}&page=1&pageSize=10'`,
    queryKey: ["GetAllRegions"],
  });

  const [createStateModal, setCreateStateModal] = useState(false);
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

  const toggleModal = () => {
    setCreateStateModal(!createStateModal);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <div className="flex justify-end w-full mb-4">
            <AdminButton buttonText="Add State" onClick={toggleModal} />
          </div>
          <Table columns={columns} data={stateData?.stateViewModel} />

          <Modal show={createStateModal} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateState toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default State;
