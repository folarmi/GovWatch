/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateTag from "../component/modals/CreateTag";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";

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
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
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
        )}
      </>
    </DashboardLayout>
  );
};

export { Tags };