"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreatePoliticalActor from "@/app/component/modals/CreatePoliticalActor";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const PoliticalActors = () => {
  const { data: politicalActorsData, isLoading } = useGetData({
    url: `PoliticalActors/GetAllPoliticalActors?pageNumber=1&pageSize=10`,
    queryKey: ["GetAllPoliticalActorsTable"],
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
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("socialMediaLink", {
      header: "Social Media",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("otherInformation", {
      header: "Other Info",
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
        <AdminButton buttonText="Add Political Actor" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={politicalActorsData?.politicalActorViewModel}
        isLoading={isLoading}
      />

      <Modal show={createPoliticalActor} toggleModal={toggleModal}>
        <div className="p-4">
          <CreatePoliticalActor toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default PoliticalActors;
