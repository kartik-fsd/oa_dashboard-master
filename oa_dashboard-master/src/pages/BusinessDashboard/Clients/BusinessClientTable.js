import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useHistory } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import img from "../../../assets/images/users/avatar-1.jpg";

const BusinessClientTable = ({ data }) => {
  const history = useHistory();

  const imageOnError = (event) => {
    event.currentTarget.src = "/user-dummy-img.jpg";
    // event.currentTarget.className = "error";
  };

  function capitalizeWords(str) {
    return str
      ?.toLowerCase()
      ?.split(" ")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");
  }
  // const columns = [
  //   {
  //     name: "Lead ID",
  //     selector: (row) => row.project_unique_id,
  //     sortable: true,
  //     omit: true,
  //     cell: (d) => (
  //       <div>

  //       </div>
  //     ),
  //     width: "200px",
  //   },
  //   {
  //     name: "Company",
  //     selector: (row) => row.company_name,
  //     sortable: true,
  //     width: "270px",
  //     cell: (d) => (
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           padding: "12px 12px 12px 0px",
  //           gap: "10px",
  //           alignItems: "center",
  //         }}
  //       >
  //         <div>
  //           <img
  //             src={d.brand_logo}
  //             onError={imageOnError}
  //             alt="brand logo"
  //             className="rounded-avatar-xs"
  //             width="40px"
  //             height={"40px"}
  //             style={{ borderRadius: "50%" }}
  //           />
  //         </div>

  //         <div className="d-flex flex-column gap-1 ">
  //           <span
  //             className="fs-11  "
  //             style={{ wordBreak: "break-all", fontWeight: "450",color :"#b83016" }}
  //           >
  //             {d.company_name}
  //           </span>
  //           <div>
  //             <span className="badge badge-soft-primary fs-7">
  //               {d.client_unique_id}
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     name: "Name",
  //     selector: (row) => row.client_name,

  //     sortable: true,

  //     cell: (d) => <div className="fs-12 text-start">{d.client_name}</div>,
  //   },
  //   {
  //     name: "Phone",
  //     selector: (row) => row.client_phone,

  //     sortable: true,

  //     cell: (d) => <div className="fs-12">{d.client_phone}</div>,
  //   },
  //   {
  //     name: "Mail",
  //     selector: (row) => row.client_email,

  //     sortable: true,

  //     cell: (d) => <div className="fs-12">{d.client_email}</div>,
  //   },

  //   {
  //     name: "Created By",
  //     selector: (row) => row.user_name,

  //     sortable: true,
  //     center: true,
  //     cell: (d) => <div className="fs-12">{d.user_name}</div>,
  //   },
  //   {
  //     name: "Created On",
  //     selector: (row) => row.created_at,
  //     sortable: true,

  //     cell: (d) => (

  //       <div className="fs-12">{d.created_at}</div>
  //     ),
  //   },
  // ];

  const columns = [
    {
      name: (
        <div className="d-flex justify-content-center w-100">
          Company Details
        </div>
      ),
      selector: (row) => row["invoice_number"],
      sortable: true,
      width: "300px",
      cell: (d) => (
        <div className="p-3">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d?.brand_logo}
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              ) : (
                <div className="avatar-sm">
                  <div
                    className="avatar-title rounded-circle    text-capitalize"
                    style={{ color: "#b83016", backgroundColor: "#f07d47" }}
                  >
                    {d?.client_name[0] ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="fs-12 text-secondary cursor-pointer text-decoration-underline"
                onClick={() => {
                  history.push(`/business-dashboard/addclient/${d.client_id}`);
                }}
              >
                {d?.brand_name}
                <span
                  className="badge badge-soft ms-2 cursor-pointer"
                  style={{ fontSize: "8px", backgroundColor: "#f07d47" }}
                  onClick={() => {
                    history.push(
                      `/business-dashboard/addclient/${d.client_id}`
                    );
                  }}
                >
                  {d?.company_unique_id}
                </span>
              </div>
              <div className="fs-10 text-muted text-capitalize">
                {d?.company_name}
              </div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div
                  id={"UncontrolledTooltip" + d.client_unique_id}
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  <span className="fs-10 text-dark">GST:</span>

                  <span className="ms-1 fs-10 text-muted">{d?.gst}</span>
                </div>
                {/* <UncontrolledTooltip
                  placement="top"
                  target={"UncontrolledTooltip" + d?.client_unique_id}
                  className="custom-tooltip"
                >
                  <span className="text-dark">{d?.company_address}</span>
                </UncontrolledTooltip> */}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   name: "Client ID",
    //   selector: (row) => row.clientid,
    //   width: "80px",
    //   center: true,
    // },
    {
      name: (
        <div>
          Spoc Details
          <span>
            {/* <i className=" ri-user-line ms-2 align-middle"></i> */}
          </span>
        </div>
      ),
      selector: (row) => row.client_name,
      // width: "160px",
      left: true,
      // center:true,
      cell: (d) => (
        <div>
          <div className="fs-12 text-capitalize">
            {d.client_name}{" "}
            <span
              className="badge badge-soft-info ms-1"
              style={{ fontSize: "8px" }}
            >
              {d?.client_unique_id}
            </span>
          </div>
          <div className="fs-10 text-muted">{d.client_email}</div>
          <div className="fs-10 text-muted">{d.client_phone}</div>
        </div>
      ),
    },
    // {
    //   name: "Client Email",
    //   selector: (row) => row.client_email,
    //   // width: "160px",
    //   left: true,
    // },
    // {
    //   name: "Brand Details",
    //   selector: (row) => row.fullname,
    //   center: true,

    //   cell: (d) => (
    //     <div
    //       className={
    //         "d-flex flex-column justify-content-center align-items-center"
    //       }
    //     >
    //       {d.brand_logo ? (
    //         <div>
    //           <img src={d.brand_logo} alt="" className="rounded avatar-sm" />
    //         </div>
    //       ) : (
    //         <div className="avatar-sm">
    //           <div className="avatar-title rounded-circle  "style:{{backgroundColor:"#f07d47",color :"#b83016"}}>
    //             {d.brand_name[0]}
    //           </div>
    //         </div>
    //       )}

    //       <div style={{ wordWrap: "break-word" }}>{d.brand_name}</div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "Phone No.",
    //   selector: (row) => row.client_phone,
    //   // width: "100px",
    //   center: true,
    // },
    {
      name: "Location",
      selector: (row) => row.company_city,
      // width: "100px",
      left: true,
      // center: true,
      cell: (d) => (
        <div>
          <div className="fs-12 text-capitalize">
            {capitalizeWords(d.company_city)}
          </div>
          <div className="fs-10 text-muted">{d.company_state}</div>
        </div>
      ),
    },
    // {
    //   name: "Billing Address",
    //   selector: (row) => row.billing_address,
    //   width: "180px",
    //   center: true,
    //   cell: (d) => (
    //     <div>
    //       <div style={{ wordWrap: "break-word" }}>{d.billing_address}</div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "G.S.T No.",
    //   selector: (row) => row.gst,
    //   left: true,
    //   cell: (d) => <div style={{ color: "#b83016"}}>{d.gst}</div>,
    // },
    {
      name: "Created By",
      selector: (row) => row.company_city,
      // width: "210px",
      left: true,
      // center: true,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d?.user_profile}
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              ) : (
                <div className="avatar-sm">
                  <div
                    className="avatar-title rounded-circle    text-capitalize"
                    style={{ color: "#b83016" }}
                  >
                    {d?.client_name[0] ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="fs-12">
                {d?.user_name}
                {/* <span
                  className="badge badge-soft-primary ms-1"
                  style={{ fontSize: "8px" }}
                >
                  {d?.company_unique_id}
                </span> */}
              </div>
              <div className="fs-10 text-muted">{d?.created_at}</div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                {/* <div
                  className="fs-10 text-muted"
                  id={"UncontrolledTooltip" + d.client_unique_id}
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  {d?.company_address}
                </div>
                <UncontrolledTooltip
                  placement="top"
                  target={"UncontrolledTooltip" + d?.client_unique_id}
                  className="custom-tooltip"
                >
                  <span className="text-dark">{d?.company_address}</span>
                </UncontrolledTooltip> */}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   name: "Company Name",
    //   selector: (row) => row.companyname,
    //   center: true,
    // },
    // {
    //   name: "",
    //   center: true,
    //   cell: (d) => (
    //     <div>
    //       {" "}
    //       <UncontrolledDropdown className="dropdown d-inline-block">
    //         <DropdownToggle style={{ background: "#fff", border: "none" }}>
    //           <i
    //             className="ri-more-fill align-middle"
    //             style={{ color: "black" }}
    //           ></i>
    //         </DropdownToggle>
    //         <DropdownMenu className="dropdown-menu-end">
    //           <DropdownItem
    //             className="edit-item-btn d-flex align-items-center"
    //             onClick={() => handleopenEdit(d)}
    //           >
    //             <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
    //             Edit Client
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </UncontrolledDropdown>
    //     </div>
    //   ),
    // },
  ];

  const tableData = {
    columns,
    data,
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
          pagination
          paginationPerPage={6}
          columns={columns}
          data={data}
          onRowClicked={(d) =>
            history.push(`/business-dashboard/addclient/${d.client_id}`)
          }
        />
      </DataTableExtensions>
    </div>
  );
};

export default BusinessClientTable;
