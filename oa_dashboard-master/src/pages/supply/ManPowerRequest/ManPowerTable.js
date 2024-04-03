import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { CityModal } from "../Cluster/ClusterModal";
import avatar from "../../../../src/assets/images/users/avatar-1.jpg";
import { ManPowerModals } from "./ManPowerModals";
import "./ManPowerTable.css";

const ManPowerTable = ({ data, role }) => {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  console.log(userData, "stat");

  const columns = [
    {
      name: "Id",
      width: "80px",
      selector: (row) => row.cluster_id,
      sortable: true,
      center: true,
      cell: (d) => <div>{d.sow_id}</div>,
    },
    {
      name: "Project",
      selector: (row) => row.rm,
      sortable: true,
      width: "200px",
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              width: "150px",
              height: "70px",
            }}
          >
            <div>
              <img
                src={
                  d.brand_logo.substr(0, 4) === "http"
                    ? d.brand_logo
                    : "/user-dummy-img.jpg"
                }
                alt="brand logo"
                className="rounded-avatar-xs"
                width="40px"
                height={"40px"}
                style={{ borderRadius: "50%" }}
              />
            </div>

            <div className="fs-12 w-100">
              <div className="fs-14 fw-semi-bold">{d.city}</div>
              <span className="fs-10 text-muted">{d.brand_name}</span>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   name: "City",
    //   width: "100px",
    //   selector: (row) => row.cluster_id,
    //   sortable: true,
    //   center: true,
    //   cell: (d) => <div>{d.city}</div>,
    // },
    {
      name: "Requested By",
      selector: (row) => row.cluster_name,
      sortable: true,
      center: true,

      //   width: "200px",
      cell: (d) => <div className="text-capitalize">{d.requested_by}</div>,
      // center: true,
    },
    {
      name: "Count",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "100px",
      cell: (d) => (
        <div>
          {d.count} - {d.given_count}
        </div>
      ),
    },
    {
      name: "Requested Date",
      selector: (row) => row.cluster_name,
      sortable: true,
      center: true,

      //   width: "200px",
      cell: (d) => <div>{d.req_date}</div>,
      // center: true,
    },

    {
      name: "Status",
      selector: (row) => row.manager,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      //   width: "80px",
      cell: (d) => (
        <div>
          <span
            className={`badge rounded-pill badge-outline-${
              d.status == "pending"
                ? "warning"
                : d.status == "filled"
                ? "success"
                : "info"
            }`}
            style={{ minWidth: "80px" }}
          >
            {d.status.split("_").join(" ")}
          </span>
        </div>
      ),
    },

    {
      name: "",
      right: true,
      width: "50px",
      omit: role == "cm" ? false : true,
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setOpen(!open);
                  setUserData(d);
                }}
              >
                <i className=" ri-add-circle-fill align-bottom me-2 text-muted"></i>
                Add
              </DropdownItem>
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {}}
              >
                <i className="  ri-send-plane-fill align-bottom me-2 text-muted"></i>
                Sent List
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: data,
  };
  return (
    <div>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      >
        <DataTable columns={columns} data={data} pagination />
      </DataTableExtensions>
      <ManPowerModals setOpen={setOpen} open={open} userData={userData} />
    </div>
  );
};

export default ManPowerTable;
