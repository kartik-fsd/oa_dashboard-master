import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

const ReusableTableMain = ({ searchMain, columns, data }) => {
  const tableDataExtension = {
    columns: columns,
    data: data,
  };

  return (
    <>
      {searchMain ? (
        <>
          <DataTableExtensions
            {...tableDataExtension}
            export={false}
            filterPlaceholder={`Search`}
            style={{ paddingRight: "25px important" }}
          >
            <DataTable columns={columns} data={data} />
          </DataTableExtensions>
        </>
      ) : (
        <>
          <DataTable columns={columns} data={data} />
        </>
      )}
    </>
  );
};

export default ReusableTableMain;
