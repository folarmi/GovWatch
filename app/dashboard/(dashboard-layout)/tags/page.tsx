"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateTag from "@/app/component/modals/CreateTag";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const Tags = () => {
  const { data: tagData, isLoading } = useGetData({
    url: `Tags/GetAllTags?page=1&pageSize=10`,
    queryKey: ["GetAllTags"],
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
    columnHelper.accessor("name", {
      header: "name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const [createTagModal, setCreateTagModal] = useState(false);

  const toggleModal = () => {
    setCreateTagModal(!createTagModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Tag" onClick={toggleModal} />
      </div>
      <Table
        columns={columns}
        data={tagData?.tagViewModel}
        isLoading={isLoading}
      />

      <Modal show={createTagModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateTag toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Tags;
