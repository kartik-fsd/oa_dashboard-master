import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

const ManagementSummaryTable = () => {
  const columns = [
    { name: "Project Details", selector: (row) => row.name, width: "180px" },
    {
      name: "April-2023",
      selector: (row) => row.title,
    },
    {
      name: "May-2023",
      selector: (row) => row.year,
    },
    {
      name: "June-2023",
      selector: (row) => row.year,
    },
    {
      name: "July-2023",
      selector: (row) => row.year,
    },
    {
      name: "August-2023",
      selector: (row) => row.year,
    },
    {
      name: "September-2023",
      selector: (row) => row.year,
    },
    {
      name: "October-2023",
      selector: (row) => row.year,
    },
    {
      name: "November-2023",
      selector: (row) => row.year,
    },
    {
      name: "December-2023",
      selector: (row) => row.year,
    },
    {
      name: "January-2024",
      selector: (row) => row.year,
    },
    {
      name: "February-2024",
      selector: (row) => row.year,
    },
    {
      name: "March-2024",
      selector: (row) => row.year,
    },
    {
      name: "April-2024",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Revenue Target",
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      name: "Revenue Pipeline",
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 3,
      name: "Revenue Achieved",
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 4,
      name: "Payout",
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 5,
      name: "Gross Margin",
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 6,
      name: "Billed",
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 7,
      name: "Unbilled",
      title: "Ghostbusters",
      year: "1984",
    },
    {
      id: 8,
      name: "Collected",
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  const tableDataExtension = {
    columns: columns,
    data: data,
  };
  return (
    <div>
      {" "}
      <DataTableExtensions
        {...tableDataExtension}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          className="my-pipeline-table"
          columns={columns}
          data={data}
          pagination
        />
      </DataTableExtensions>
    </div>
  );
};

export default ManagementSummaryTable;
