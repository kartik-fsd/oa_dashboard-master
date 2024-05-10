import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import { useHistory, useLocation } from "react-router-dom";
import { Context } from "../../../../App";

const CmTable2 = ({ data }) => {
  const [context, setContext] = useContext(Context);
  console.log(context?.oaDetials?.hr);

  const history = useHistory();
  const location = useLocation();
  const columns = [
    {
      name: "Id",
      selector: (row) => row.date,
      sortable: true,
      omit: true,
      center: true,
      width: "100px",
      cell: (d) => <div>{d.asm_id}</div>,
    },
    {
      name: "Profile",
      selector: (row) => row.rm,
      sortable: true,
      width: "200px",
      //   center: true,

      // cell: (d) => (
      //   <div>
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "row",
      //         gap: "10px",
      //         alignItems: "center",
      //         //   width: "210px",
      //         height: "80px",
      //       }}
      //     >
      //       <div>
      //         <img
      //           src={
      //             //   d.profile_image.length > 5 ?
      //             d.profile_image?.substr(0, 4) === "http"
      //               ? d.profile_image
      //               : "/user-dummy-img.jpg"
      //           }
      //           alt="brand logo"
      //           className="rounded-avatar-xs"
      //           width="55px"
      //           height={"55px"}
      //           style={{ borderRadius: "50%" }}
      //           // onError={(e) => {
      //           //   e.target.src = `${window.location.origin}/user-dummy-img.jpg3`;
      //           // }}
      //         />
      //       </div>

      //       <div className="fs-12 w-100 ms-2">
      //         <div className="fs-14 fw-semi-bold text-capitalize">
      //           {d.full_name}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // ),
      cell: (d) => (
        <div style={{ display: "flex", alignItems: "center", height: "80px" }}>
          <div style={{ width: "200px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div className="d-flex align-items-center">
                {d?.profile_image != "" &&
                // d?.profile_image != "null" ? (
                d?.profile_image?.includes("https") ? (
                  <img
                    loading="lazy"
                    className=" rounded-circle img-fluid userprofile"
                    alt="s"
                    src={d.profile_image}
                    style={{
                      width: "40px",
                      height: "40px",
                      border:
                        d.type == "4"
                          ? "4px solid #FFA45E"
                          : "4px solid #63bbbe",
                    }}
                  />
                ) : (
                  <div className="rounded-circle img-fluid userprofile my-2 d-flex align-items-center">
                    <div
                      className="rounded-circle img-fluid userprofile bg-soft-secondary text-secondary d-flex align-items-center justify-content-center fs-20 fw-bold"
                      // style={{ width: "40px", height: "35px" }}
                      style={{
                        width: "40px",
                        height: "40px",
                        border:
                          d?.type == "4"
                            ? "4px solid #FFA45E"
                            : "4px solid #63bbbe",
                      }}
                    >
                      {d?.full_name[0]}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "12px" }}>
                  {d.full_name}
                </div>
                <div className="fs-10" style={{ fontWeight: "600" }}>
                  SPID : {d?.asm_id}
                </div>
                <div style={{ fontSize: "8px" }}>Cluster : {d.cm}</div>
                <div style={{ fontSize: "8px" }}>City : {d.city}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Networks",
      selector: (row) => row.date,
      sortable: true,
      omit: true,
      center: true,
      width: "150px",
      cell: (d) => (
        <div>
          <span
            className="badge badge-soft-dark rounded-pill fs-12"
            style={{ width: "50px" }}
          >
            {d.fse_count}
          </span>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.date,
      sortable: true,
      omit: true,
      center: true,
      cell: (d) => (
        <div className="d-flex flex-column align-items-center">
          {d.user_type}
          {d.user_type == "Managed" && (
            <span className="fs-10 text-muted text-capitalize">
              {d.emp_type?.split("_").join(" ")}
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Cluster",
      selector: (row) => row.date,
      sortable: true,
      omit: true,
      center: true,
      cell: (d) => <div>{d.cm}</div>,
    },

    // {
    //   name: "Status",
    //   selector: (row) => row.date,
    //   sortable: true,
    //   //   omit: location.pathname == "/hr/onboarding" ? true : false,
    //   center: true,
    //   cell: (d) => (
    //     <div onClick={() => console.log(d.onboard_status, "asf")}>
    //       <span
    //         className={`badge rounded-pill badge-outline-${
    //           d.onboard_status == "onboarded"
    //             ? "success"
    //             : d.onboard_status == "inactive"
    //             ? "danger"
    //             : d.onboard_status == "none"
    //             ? "warning"
    //             : "primary"
    //         }`}
    //         style={{ width: "80px" }}
    //       >
    //         {/* {d.onboard_status} */}
    //         {d.onboard_status == "onboarded"
    //           ? "Active"
    //           : d.onboard_status == "inactive"
    //           ? "Inactive"
    //           : d.onboard_status == "none"
    //           ? "New"
    //           : "Hold"}
    //       </span>
    //     </div>
    //   ),
    // },

    {
      name: "Status",
      selector: (row) => row.date,
      sortable: true,
      // omit: location.pathname != "/hr/onboarding" ? true : false,
      center: true,
      cell: (d) => (
        <div className="text-center">
          <span
            className={`badge text-capitalize rounded-pill badge-outline-${
              d.documentation_status == "verified" && d.is_release == "yes"
                ? "primary"
                : d.documentation_status == "verified"
                ? "success"
                : d.documentation_status == "rejected"
                ? "danger"
                : d.documentation_status == "none"
                ? "warning"
                : d.documentation_status == "duplicate"
                ? "secondary"
                : d.documentation_status == "needs_review"
                ? "info"
                : "primary"
            }`}
            style={{ width: "70px", fontSize: "8px" }}
          >
            {d.documentation_status == "verified" && d.is_release == "yes"
              ? "Active"
              : d.documentation_status?.split("_").join(" ")}
          </span>
          <p className="m-0 fs-10 text-muted text-capitalize">
            {d.emp_type?.split("_").join(" ")}
          </p>
        </div>
      ),
    },
    // {
    //   name: "Offer-Letter",
    //   selector: (row) => row.is_release,
    //   sortable: true,
    //   // omit: location.pathname != "/hr/onboarding" ? true : false,
    //   center: true,
    //   cell: (d) => (
    //     <div>
    //       <span
    //         className={`badge text-capitalize rounded-pill badge-outline-${
    //           d.is_release == "yes" ? "success" : "danger"
    //         }`}
    //         style={{ width: "70px" }}
    //       >
    //         {d.is_release}
    //       </span>
    //     </div>
    //   ),
    // },

    {
      name: "Options",
      right: true,
      omit: true,
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
              {/* <DropdownItem
                    className="edit-item-btn d-flex align-items-center"
                    onClick={() => {
                      history.push("/manpower/details/" + d.asm_id);
                    }}
                  >
                    <i className="  ri-list-unordered align-bottom me-2 text-muted"></i>
                    View Details
                  </DropdownItem> */}

              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  "";
                }}
              >
                <i className="  ri-list-unordered align-bottom me-2 text-muted"></i>
                View Profile
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
      <Card>
        <CardHeader className="mt-2">
          <h5 className="card-title ms-4 fs-20">Completed Profile</h5>
        </CardHeader>
        <CardBody>
          <DataTableExtensions
            {...tableData}
            export={false}
            filterPlaceholder={`Search`}
            style={{ paddingRight: "25px important" }}
          >
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationPerPage={5}
              onRowClicked={(d) => {
                if (
                  d.documentation_status !== "rejected" &&
                  context?.oaDetials?.hr == "1"
                ) {
                  if (
                    location.pathname == "/hr/onboarding" &&
                    context?.oaDetials?.hr == "1"
                  ) {
                    history.push(`/hr/onboarding/details/${d.asm_id}`);
                  }
                }
              }}
            />
          </DataTableExtensions>
        </CardBody>
      </Card>
    </div>
  );
};

export default CmTable2;
