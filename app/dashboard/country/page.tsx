"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Loader from "@/app/component/Loader";
import CreateCountry from "@/app/component/modals/CreateCountry";
// import CreateCountry from "@/app/component/modals/CreateCountry";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const Country = () => {
  const { data: countryData, isLoading: countryDataIsLoading } = useGetData({
    url: `/Countries/GetCountries`,
    queryKey: ["GetCountries"],
  });

  const [createCountry, setCreateCountry] = useState(false);

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
      cell: (info) => (
        // <span className="text-sm font-normal">{info.getValue()}</span>
        <span className="text-sm font-normal">ljkdfngkjdfjfd</span>
      ),
    }),
    columnHelper.accessor("name", {
      header: "Country Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("capital", {
      header: "Capital",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("leaderName", {
      header: "Leader name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    // columnHelper.accessor("currency", {
    //   header: "Currency",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
    // columnHelper.accessor("bio", {
    //   header: "Bio",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
    // columnHelper.accessor("population", {
    //   header: "Population",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
    // columnHelper.accessor("gdp", {
    //   header: "GDP",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
  ];

  const toggleModal = () => {
    setCreateCountry(!createCountry);
  };

  return (
    <>
      {countryDataIsLoading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <div className="flex justify-end w-full mb-4">
            <AdminButton buttonText="Add Country" onClick={toggleModal} />
          </div>
          <Table
            columns={columns}
            data={countryData?.countryViewModel}
            isLoading={countryDataIsLoading}
          />

          <Modal show={createCountry} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateCountry toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Country;
