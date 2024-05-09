import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {
  TableColumnHeader,
  TableColumnRow,
} from "../QC Projects/QcTableColumn";

const QcManagerTable = (props) => {
    const {data} = props
  const columns = [
    {
      name: "ID",
      width: "100px",
      selector: (row) => row.qc_admin_id,
      sortable: true,

      // width:'180px',
      center: true,
      cell: (d) => (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span
            style={{
              height: "10px",
              width: "10px",
              background: d.status === "active" ? "#00C851" : "#FF4444",
              borderRadius: "50%",
            }}
          ></span>
          qwed
        </div>
      ),
    },

    {
      name: "Details",
      width: "150px",
      selector: (row) => row.full_name,
      sortable: true,

      //   width:'60px',
      // center: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "6px",
            // alignItems: "center",
            // width: "150px",
          }}
        >
          <div>{d.full_name}</div>
          <div>{d.mobile_number}</div>
        </div>
      ),
    },
    {
      name: "Email ID",
      selector: (row) => row.email_id,
      sortable: true,
    //   center: true,
      alignItems: "center",
      // width: "280px",
    },

    {
      name: "Total",
      selector: (row) => row.total_leads_range,
      sortable: true,

      center: true,
      width: "80px",
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "#9258C4",
              // background: "#1F99CC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.total_leads_range}
          </div>
        </div>
      ),
    },

    {
      name: <TableColumnHeader data="Approved" />,
      selector: (row) => row.approved_l1_leads_range,
      sortable: true,

      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.approved_l1_leads_range}
          l2={d.approved_l2_leads_range}
          l3={d.approved_l3_leads_range}
        />
      ),
    },

    {
      name: <TableColumnHeader data="Rejected" />,
      selector: (row) => row.rejected_l1_leads_range,
      sortable: true,

      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.rejected_l1_leads_range}
          l2={d.rejected_l2_leads_range}
          l3={d.rejected_l3_leads_range}
        />
      ),
    },
    {
      name: <TableColumnHeader data="Pending" />,
      selector: (row) => row.pending_l1_leads_range,
      sortable: true,

      center: true,
      width: "180px",
      cell: (d) => (
        <TableColumnRow
          l1={d.pending_l1_leads_range}
          l2={d.pending__l2_leads_range}
          l3={d.pending__l3_leads_range}
        />
      ),
    },
    {
      name: "Desperancy",
      selector: (row) => row.disperency_leads_range,
      sortable: true,

      center: true,
      width: "80px",
      cell: (d) => (
        <div className="d-flex">
          <div
            style={{
              background: "grey",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.disperency_leads_range}
          </div>
        </div>
      ),
    },
    // {
    //   name: "Manager",
    //   selector: (row) => row.manager,
    //   sortable: true,

    //   alignItems: "center",
    //   center: true,
    //   // width: "280px",
    // },
    // {
    //   name: "Agency ID",
    //   selector: (row) => row.agency_id,
    //   sortable: true,

    //   alignItems: "center",
    //   center: true,
    //   // width: "280px",
    // },
    // {
    //   name: "Type",
    //   selector: (row) => row.type,
    //   sortable: true,

    //   alignItems: "center",
    //   center: true,
    //   // width: "280px",
    // },

    // {
    //   name: "",
    //   right: true,
    //   width: "50px",
    //   cell: (d) => (
    //     <div
    //       onClick={() => {
    //         "";
    //       }}
    //     >
    //       <UncontrolledDropdown className="dropdown d-inline-block">
    //         <DropdownToggle
    //           className="btn btn-soft-secondary btn-sm"
    //           tag="button"
    //         >
    //           <i className="ri-more-fill align-middle"></i>
    //         </DropdownToggle>
    //         <DropdownMenu className="dropdown-menu-end">
    //           <DropdownItem
    //             className="edit-item-btn"
    //             onClick={() => {
    //               "";
    //             }}
    //           >
    //             <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
    //             Edit
    //           </DropdownItem>
    //           <DropdownItem className="edit-item-btn" onClick={() => ""}>
    //             <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
    //             Language
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </UncontrolledDropdown>
    //     </div>
    //   ),
    // },
  ];
  const tableDataExtension = {
    columns: columns,
    data: data,
  };
  return (
    <div>
      <DataTableExtensions
        {...tableDataExtension}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      >
        <DataTable columns={columns} data={tableDataExtension} pagination />
      </DataTableExtensions>
    </div>
  );
};

export default QcManagerTable;
