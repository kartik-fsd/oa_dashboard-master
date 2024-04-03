import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { indianNumbers } from "../../../components/common/indianNumbers";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      minWidth: "120px",
      center: true,
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};
const UbrTable = ({ data }) => {
  const columns = [
    {
      name: <div className="w-100">Project info</div>,
      selector: (row) => row.brand_name,
      sortable: true,
      width: "350px",
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d.brand_logo}
                  alt="img"
                  className="rounded-circle avatar-xs"
                />
              ) : (
                <div className="avatar-xs">
                  <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                    {d?.brand_name?.charAt(0) ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="fs-12"> {d?.brand_name}</div>
              <div className="fs-10 text-muted">{d?.company_name}</div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div className="fs-10 text-muted">
                  Billing date {d?.billable_date}
                  <span className="badge badge-soft-primary">{d?.ubr_id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: <div>MPA Id</div>,
      selector: (d) => d.mpa_id,
      cell: (d) => (
        <div className="text-primary fs-16" style={{ cursor: "pointer" }}>
          <div>
            <span
              className="badge badge-soft-primary"
              style={{ textDecoration: "underline" }}
            >
              {d?.mpa_id}
            </span>
          </div>
        </div>
      ),
      sortable: true,
      // width: "120px",
      // center: true,
    },
    // {
    //   name: (
    //     <div className="d-flex justify-content-center align-items-center flex-column">
    //       <span>M-0</span>
    //       <span className="badge badge-soft-info mt-2">
    //         {indianNumbers(data["m-0"])}
    //       </span>
    //     </div>
    //   ),
    //   selector: (d) => d.bad_debt,
    //   sortable: true,
    //   cell: (d) => (
    //     <div className={`text-primary`}>
    //       {d["m-0"] === "-" ? "-" : indianNumbers(d["m-0"])}
    //     </div>
    //   ),
    //   // width: "120px",
    //   center: true,
    // },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>0-30</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data["0-30"])}
          </span>
        </div>
      ),
      selector: (row) => row["0-30"],
      cell: (d) => (
        <div className={`text-primary`}>
          {d["0-30"] === "-" ? "-" : indianNumbers(d["0-30"])}
        </div>
      ),
      // width: "120px",
      sortable: true,
      center: true,
    },

    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>31-60</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data["31-60"])}
          </span>
        </div>
      ),
      selector: (row) => row["31-60"],
      sortable: true,
      cell: (d) => (
        <div className={`text-primary`}>
          {d["31-60"] === "-" ? "-" : indianNumbers(d["31-60"])}
        </div>
      ),
      // width: "120px",
      center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>61-90</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data["61-90"])}
          </span>
        </div>
      ),
      selector: (row) => row["61-90"],
      sortable: true,
      cell: (d) => (
        <div className={`text-primary`}>
          {d["61-90"] === "-" ? "-" : indianNumbers(d["61-90"])}
        </div>
      ),
      // width: "120px",
      center: true,
    },
    {
      name: (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <span>90 +</span>
          <span className="badge badge-soft-info mt-2">
            {indianNumbers(data["90+"])}
          </span>
        </div>
      ),
      selector: (row) => row["90+"],
      sortable: true,
      cell: (d) => (
        <div className={`text-primary`}>
          {d["90+"] === "-" ? "-" : indianNumbers(d["90+"])}
        </div>
      ),
      // width: "120px",
      center: true,
    },

    {
      name: "",
      right: true,
      width: "70px",
      center: true,
      omit: true,
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle style={{ background: "#fff", border: "none" }}>
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem className="edit-item-btn d-flex align-items-center">
                <i className="ri-contacts-book-line align-bottom me-2 text-muted"></i>
                Update Payment
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data: data.ubrdata,
  };
  return (
    <div>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={tableData}
          theme="VendorTable"
          pagination
          expandableRows={false}
          expandableRowsHideExpander //hide the arrow icon on the left
          // progressPending={isLoading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
    </div>
  );
};

export default UbrTable;
