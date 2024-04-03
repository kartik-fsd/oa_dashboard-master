import React from "react";

import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const ProgressTable = () => {
  const columns = [
    {
      name: "Project ID",
      width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,
      omit: true,
      // width:'180px',
      center: true,
    },
    {
      name: "Project Details",
      selector: (row) => row.brand_logo,
      sortable: true,
      //   center: true,

      minWidth: "250px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            gap: "10px",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
          <div>
            <div
              className={`flex-shrink-0 chat-user-img 
                    ${
                      d.add_lead_status == "enable"
                        ? "Active"
                        : d.add_lead_status == "disable"
                        ? "Hold"
                        : d.add_lead_status == "none"
                        ? "New"
                        : d.add_lead_status == "closed"
                        ? "Closed"
                        : "Disable"
                    } 
                    "user-own-img gap-2`}
            >
              <img
                src={"/user-dummy-img.jpg"}
                alt="brand logo"
                className="rounded-avatar-xs"
                width="40px"
                height={"40px"}
                style={{ borderRadius: "50%" }}
              />
              <span className="user-status"></span>
            </div>
          </div>

          <div className="d-flex flex-column ">
            <span>Project Title</span>
            <span className="fs-11 text-muted">1234</span>
          </div>
        </div>
      ),
      // center: true,
    },
    {
      name: "Milestone",
      // width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={12} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0">Milestone</p>
              <p className="m-0">500</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated "
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                role="progressbar"
                style={{ width: "30%" }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "Revenue",
      // width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={12} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0">Revenue</p>
              <p className="m-0">100000</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated "
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                role="progressbar"
                style={{ width: "30%" }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "Expenses",
      // width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={12} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0">Expenses</p>
              <p className="m-0">35000</p>
            </div>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-danger "
                role="progressbar"
                style={{ width: "40%" }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "Billing",
      // width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={12} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0">Billing</p>
              {/* <p className="m-0">100000</p> */}
            </div>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated "
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>

              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-danger"
                role="progressbar"
                style={{ width: "30%" }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                role="progressbar"
                style={{ width: "45%" }}
                aria-valuenow="45"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
              <p className="m-0" style={{ fontSize: "9px", width: "30%" }}>
                Unbilled
              </p>
              <p className="m-0" style={{ fontSize: "9px", width: "45%" }}>
                Collected
              </p>
            </div>
          </Col>
        </>
      ),
    },

    {
      name: "",
      right: true,
      width: "50px",
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
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                //   onClick={() => history.push(`/editsow/${d.sow_id}`)}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit Project
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
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={[{}]}
          theme="VendorTable"
          pagination
          expandableRows={false}
          // expandableRows={userType == "om" ? true : false}
          //   expandableRowsComponent={ExpandableRowComponent}
          expandableRowsHideExpander //hide the arrow icon on the left
          //   progressPending={loading}
          expandOnRowClicked={true}
          //   customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
    </div>
  );
};

export default ProgressTable;
