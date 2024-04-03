import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";
// import CheckIcon from "@mui/icons-material/Check";
// import ClearIcon from "@mui/icons-material/Clear";

// import "./Table.css";

createTheme("VendorTable", {
  text: {
    primary: "black",
    secondary: "#b2b2b2",
  },
  background: {
    default: "#fff",
  },
  boxshadow: {
    default: "5px 5px 30px #DEDEDEBF",
  },
  headCells: {
    default: "#64abdd",
  },
  divider: {
    default: "#f4f4f4",
  },
  cell: {
    style: {
      height: "60px !important",
    },
  },

  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

//

const DataTableModel = ({ testData }) => {
  // const test = testData
  //   let status = "onboarded";
  const columns = [
    {
      name: "Create Date",
      selector: (d) => d.display_date,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => <div className="fs-12">{d.display_date}</div>,
    },
    {
      name: "Approve Date",
      selector: (d) => d.qc_date,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => <div className="fs-12">{d.qc_date}</div>,
    },
    {
      name: "Total Leads",
      selector: (d) => d.total_leads,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => <div>{d.total_leads}</div>,
    },
    {
      name: "Cpl",
      selector: (d) => d.cpl,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => <div>{d.cpl}</div>,
    },
    {
      name: "Total Earning",
      selector: (d) => d.total_leads * d.cpl,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => <div>{d.total_leads * d.cpl}</div>,
    },

    {
      name: "Payment Status",
      selector: (d) => d.payment_status,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => (
        // <div>
        //   {d.payment_status === "yes" ? (
        //     <CheckIcon sx={{ color: "green" }} />
        //   ) : null}

        //   {d.payment_status === "no" ? (
        //     <ClearIcon sx={{ color: "red" }} />
        //   ) : null}
        // </div>
        <div>test</div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: testData,
  };

  return (
    <div className="table_data">
      <div className="card_table">
        <DataTableExtensions
          {...tableData}
          export={false}
          filterPlaceholder={`Search`}
          style={{ paddingRight: "25px important" }}
        >
          <DataTable
            columns={columns}
            data={tableData}
            defaultSortFieldId={3}
            pagination
            theme="VendorTable"
            highlightOnHover={true}
            paginationPerPage={5}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default DataTableModel;
