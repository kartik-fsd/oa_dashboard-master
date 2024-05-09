import React from "react";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";

const FseTable = () => {
  const columns = [
    {
      name: "Profile",
      selector: (row) => row.rm,
      sortable: true,
      //   width: "600px",
      center: true,

      cell: (d) => (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              //   width: "210px",
              //   height: "80px",
            }}
          >
            <div>
              <img
                src={
                  d.profile_image?.substr(0, 4) === "http"
                    ? d.profile_image
                    : "/user-dummy-img.jpg"
                }
                alt="brand logo"
                className="rounded-avatar-xs"
                width="55px"
                height={"55px"}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      width: "100px",
      cell: (d) => <div>{d.asm_id}</div>,
    },

    {
      name: "Number",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      cell: (d) => <div>{d.user_type}</div>,
    },
    {
      name: "Email ID",
      selector: (row) => row.date,
      sortable: true,
      //   omit: role == "cm" ? true : false,
      center: true,
      width: "200px",
      cell: (d) => <div>{d.cm}</div>,
    },
    {
      name: "City",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      cell: (d) => <div>{d.user_type}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.date,
      sortable: true,
      // omit: omitData || omit3,
      center: true,
      cell: (d) => (
        <div>
          <span
            className={`badge rounded-pill badge-soft-${
              d.onboard_status == "onboarded"
                ? "success"
                : d.onboard_status == "inactive"
                ? "danger"
                : d.onboard_status == "none"
                ? "primary"
                : "warning"
            }`}
          >
            {d.onboard_status}
          </span>
        </div>
      ),
    },

    {
      name: "Options",
      right: true,
      //   omit: role != "cm" ? true : false,
      width: "100px",
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
              <DropdownItem className="edit-item-btn d-flex align-items-center">
                <i className=" ri-add-circle-fill align-bottom me-2 text-muted"></i>
                View Details
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: [{}],
  };
  return (
    <div>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={[{}]}
          pagination
          //   onRowClicked={() => {
          //     history.push("/manpower/asmprojects");
          //   }}
        />
      </DataTableExtensions>
    </div>
  );
};

export default FseTable;
