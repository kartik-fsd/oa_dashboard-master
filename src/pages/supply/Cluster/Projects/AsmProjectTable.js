import React from "react";
import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import { useHistory } from "react-router-dom";

const AsmProjectTable = () => {
  const history = useHistory();
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
        background: "#f4f6f9",
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
  const columns = [
    {
      name: "Project ID",
      width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,

      // width:'180px',
      center: true,
    },
    {
      name: "Project Details",
      selector: (row) => row.brand_logo,
      sortable: true,
      center: true,

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
            <img
              src={"/user-dummy-img.jpg"}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
            />
          </div>

          <div>{d.project_title}</div>
        </div>
      ),
      // center: true,
    },

    // {
    //   name: "Team",
    //   selector: (row) => row.profile_image,
    //   sortable: true,
    //   cell: (d, index) => (
    //     <div>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           gap: "10px",
    //           alignItems: "center",
    //           width: "200px",
    //           height: "100px",
    //         }}
    //       >
    //         <div>
    //           <img
    //             src={d.oa_profile}
    //             alt="brand logo"
    //             className="rounded-avatar-xs"
    //             width="40px"
    //             height={"40px"}
    //             style={{ borderRadius: "50%" }}
    //           />
    //         </div>

    //         <div className="fs-12 w-100">
    //           <div className="fs-14 fw-semi-bold">
    //             {d.oa_name}{" "}
    //             <span className="badge badge-soft-primary">
    //               {d.oa_count > 0 ? `+${d.oa_count}` : "0"}
    //             </span>
    //           </div>{" "}
    //           <span className="fs-10 text-muted">
    //             Manager: {d.manager_name}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    //   // center: true,
    //   // width:'180px',
    // },

    {
      name: "Hold",
      omit: true,
      width: "60px",
      selector: (row) => row.add_lead_status,
      sortable: true,
      cell: (d) => (
        <div>
          {d.add_lead_status == "enable" ? (
            <span
              className="bx bxs-hand fs-20 "
              style={{ color: "grey" }}
            ></span>
          ) : d.add_lead_status == "none" ? (
            <span className="">--</span>
          ) : (
            <span className="bx bxs-hand fs-20 text-warning"></span>
          )}
        </div>
      ),

      center: true,
    },
    {
      name: "Total",
      selector: (row) => row.total_leads,
      sortable: true,
      //   omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "grey",
            }}
          >
            {d.total_leads}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div>
        </div>
      ),
    },
    {
      name: "Last Month",
      selector: (row) => row.leads_last_month,
      sortable: true,
      //   omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.leads_last_month}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "white",
            }}
          >
            {` -`}
          </div>
        </div>
      ),
    },
    {
      name: "Monthly",
      selector: (row) => row.total_leads_month,
      sortable: true,
      //   omit: omitData || omit3,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill "
            style={{
              width: "60px",
              fontWeight: 600,
              fontSize: "12px",
              background: "black",
            }}
          >
            {d.total_leads_month}
          </span>

          <div
            style={{
              fontSize: "12px",
              marginTop: "2px",
              marginLeft: "20px",
              color: "#7b96ae",
            }}
          >
            +{d.total_leads_today}
            {/* 
                {todaysData.map((item) =>
                  item.sow_id == d.sow_id ? (
                    <div
                      style={{
                        fontSize: "12px",
                        marginTop: "2px",
                        marginLeft: "0px",
                        color: "#7b96ae",
                      }}
                    >
                      +{item.total_leads}
                    </div>
                  ) : (
                    ""
                  )
                )} */}
          </div>
        </div>
      ),
    },
    {
      name: "Approved Leads",
      selector: (row) => row.approved_leads,
      sortable: true,
      //   omit: omitData || omit4,
      center: true,
      // width:'180px',
      cell: (d) => (
        <div>
          <span
            className="badge rounded-pill text-bg-success"
            style={{ width: "60px", fontWeight: 600, fontSize: "12px" }}
          >
            {d.approved_leads}
          </span>

          {/* <span className="badge rounded-pill text-bg-primary" style={{width:'60px',fontWeight:600,fontSize:'12px'}}>{d.approved_leads}</span> */}
          <div
            style={{
              fontSize: "12px",
              marginTop: "-2px",
              marginLeft: "-2px",
              color: "#7b96ae",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* +{d.approved_leads_today} */}
          </div>
        </div>
      ),
    },
    {
      name: "",
      right: true,
      width: "50px",
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
                onClick={() => {
                  history.push("/asm/viewprojects:1456");
                }}
                className="edit-item-btn d-flex align-items-center"
              >
                <i className="ri-contacts-book-line align-bottom me-2 text-muted"></i>
                View Project
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
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>
    </div>
  );
};

export default AsmProjectTable;
