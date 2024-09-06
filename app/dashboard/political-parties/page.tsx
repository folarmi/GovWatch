"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreatePoliticalParty from "@/app/component/modals/CreatePoliticalParty";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const PoliticalParties = () => {
  const { data: politicalPartiesData, isLoading } = useGetData({
    url: `PoliticalParties/GetAllPoliticalParties?pageNumber=1&pageSize=10`,
    queryKey: ["GetAllPoliticalPartiesTable"],
  });
  const [createPoliticalActor, setCreatePoliticalActor] = useState(false);

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
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("country", {
      header: "Country",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("dateFounded", {
      header: "Date Founded",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("leaderName", {
      header: "Leader Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreatePoliticalActor(!createPoliticalActor);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Political Party" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={politicalPartiesData?.politicalPartyViewModel}
        isLoading={isLoading}
      />

      <Modal show={createPoliticalActor} toggleModal={toggleModal}>
        <div className="p-4">
          <CreatePoliticalParty toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default PoliticalParties;
