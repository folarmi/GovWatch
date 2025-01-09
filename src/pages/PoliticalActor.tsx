/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreatePoliticalActor from "../component/modals/CreatePoliticalActor";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";
import moment from "moment";

const PoliticalActors = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [createPoliticalActor, setCreatePoliticalActor] = useState(false);
  const [selectedPoliticalActor, setSelectedPoliticalActor] = useState("");

  const { data: politicalActorsData, isLoading } = useGetData({
    url: `PoliticalActors/GetAllPoliticalActors?pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllPoliticalActorsTable", JSON.stringify(pagination)],
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
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => <p className="text-sm font-normal">{info.getValue()}</p>,
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
    columnHelper.accessor("dateOfBirth", {
      header: "Date of Birth",
      cell: (info) => (
        <span className="text-sm font-normal">
          {moment(info.getValue()).format("YYYY-MM-DD")}
        </span>
      ),
    }),
    columnHelper.accessor("publicId", {
      header: "Action",
      cell: (info) => {
        const rowData = info.row.original;

        return (
          <div className="flex space-x-4">
            <button
              onClick={() => {
                toggleModal();
                setSelectedPoliticalActor(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
          </div>
        );
      },
    }),
  ];

  const toggleModal = () => {
    setCreatePoliticalActor(!createPoliticalActor);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton
                buttonText="Add Political Actor"
                onClick={toggleModal}
              />
            </div>
            <Table
              columns={columns}
              data={politicalActorsData?.politicalActorViewModel}
              isLoading={isLoading}
              rowCount={politicalActorsData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createPoliticalActor} toggleModal={toggleModal}>
              <div className="p-4">
                <CreatePoliticalActor
                  toggleModal={toggleModal}
                  selectedPoliticalActor={selectedPoliticalActor}
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { PoliticalActors };
