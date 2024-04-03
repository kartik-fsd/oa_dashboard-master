import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const TieBreakerTable = () => {
  const columns = [
    {
      name: <div className="d-flex justify-content-center w-100">SOW-1</div>,
      selector: (row) => row["invoice_number"],
      sortable: true,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d.brand_logo}
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              ) : (
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                    {d?.brand_name?.charAt(0) ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="fs-12">brandname</div>
              <div className="fs-10 text-muted">comapny name testing</div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div className="fs-10 text-muted">
                  03-May-2023
                  <span className="badge badge-soft-primary">1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: <div>Bonus</div>,
      selector: "amount",
      cell: (d) => <div>12345</div>,
      sortable: true,
      //   width: "120px",
      center: true,
    },
    {
      name: <div>Status</div>,
      selector: "amount",
      cell: (d) => <div>12345</div>,
      sortable: true,
      //   width: "120px",
      center: true,
    },

    {
      name: "",
      right: true,
      width: "70px",
      center: true,
      // omit:
      //   type == "fin" && (role == "manager" || role == "head") ? false : true,
      omit: true,
      cell: (d) => (
        <div>
          <UncontrolledDropdown
            className="dropdown d-inline-block"
            // onClick={() => setUserData(d)}
          >
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
          data={tableData}
          theme="VendorTable"
          pagination
          expandableRows={false}
          expandableRowsHideExpander //hide the arrow icon on the left
          //   progressPending={isLoading}
          expandOnRowClicked={true}
          //   customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
    </div>
  );
};

export default TieBreakerTable;
