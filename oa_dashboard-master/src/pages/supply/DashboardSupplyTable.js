import axios from "axios";
import React from "react";
import { supply_data } from "../../assets/utils/SupplyApi";
import { api, farming } from "../../globalConfig";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { extract_token } from "../../assets/utils/common";
import { useHistory } from "react-router-dom";
// import "./CmSupplyTable.css";
import "./dashboardsupply.css";
import { UncontrolledTooltip } from "reactstrap";

const DashboardSupplyTable = ({
  startDate,
  endDate,
  filter,
  setFilter,
  clusterdata,
  totalData,
  projectsData,
  loader,
  overall,
}) => {
  // console.log(clusterdata, "checkone");
  const history = useHistory();

  console.log(totalData, "totalData");

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

  let constCol = [
    // {
    //   name: "Sl",
    //   selector: (row) => row.id,
    //   width: "50px",
    // },
  ];
  // let abc = true;

  constCol.push({
    name: (
      <div
        className="d-flex   align-items-center flex-column  "
        style={{ justifyContent: "center" }}
      >
        <div>
          {/* <div
            className={`flex-shrink-0 chat-user-img- enable`}
            style={{ visibility: "hidden" }}
          >
            <img
              src={"/user-dummy-img.jpg"}
              alt="brandlogo"
              className="rounded-circle avatar-xs"
            />
            <span className="user-status"></span>
          </div> */}
        </div>
        {/* <div
          className="d-flex gap-1 align-items-center"
          style={{ visibility: "hidden" }}
        >
          <span
            className="fs-10 text-muted fw-normal "
          >
            ndbnejh
          </span>
        </div> */}
        <div
          className="text-muted fs-10 fw-normal"
          style={{ visibility: "hidden" }}
        >
          {overall}
        </div>

        <span
          className="badge badge-soft-primary "
          style={{
            fontSize: "18px",
            justifySelf: "start",
            alignSelf: "star",
          }}
        >
          ₹ {overall}
        </span>
      </div>
    ),
    width: "220px",
    center: true,
    cell: (d) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "200px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="d-flex align-items-center">
              {d?.tsm_profile != "" && d?.tsm_profile?.includes("https") ? (
                <img
                  loading="lazy"
                  className=" rounded-circle img-fluid userprofile"
                  alt="s"
                  src={d.tsm_profile}
                  style={{
                    width: "40px",
                    height: "40px",
                    border:
                      d.type == "4" ? "4px solid #FFA45E" : "4px solid #63bbbe",
                  }}
                />
              ) : (
                <div className="rounded-circle img-fluid userprofile my-2 d-flex align-items-center">
                  <div
                    className="rounded-circle img-fluid userprofile bg-soft-secondary text-secondary d-flex align-items-center justify-content-center fs-20 fw-bold"
                    style={{
                      width: "40px",
                      height: "40px",
                      border:
                        d?.type == "4"
                          ? "4px solid #FFA45E"
                          : "4px solid #63bbbe",
                    }}
                  >
                    {d?.tsm[0]}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "12px" }}>{d.tsm}</div>
              <div className="fs-10" style={{ fontWeight: "600" }}>
                SPID : {d?.tsm_id}
              </div>
              <div style={{ fontSize: "8px" }}>Cluster : {d.cluster_name}</div>
              <div style={{ fontSize: "8px" }}>City : {d.city}</div>
            </div>
          </div>
        </div>
      </div>
    ),
  });

  projectsData
    .map((item) => ({
      name: item.ref_table_name,
      logo: item.brand_logo,
      brand_name: item.brand_name,
      sow_id: item.sow_id,
      add_lead_status: item.add_lead_status,
      total_amount: item.total_amount,
      total_leads: item.total_leads,
      project_title: item.project_title,
    }))
    .map((it, i) =>
      constCol.push({
        name: (
          <div
            className="d-flex   align-items-center flex-column g "
            style={{ justifyContent: "center" }}
          >
            {/* <div>
              <img
                src={it.logo}
                alt="brand-logo"
                className="rounded-circle avatar-xs"
              ></img>
            </div> */}
            <div>
              <div
                className={`flex-shrink-0 chat-user-img 
                ${
                  it.add_lead_status == "enable"
                    ? "Active"
                    : it.add_lead_status == "disable"
                    ? "Hold"
                    : it.add_lead_status == "none"
                    ? "New"
                    : it.add_lead_status == "closed"
                    ? "Closed"
                    : "Disable"
                } 
                "user-own-img gap-2`}
              >
                <img
                  src={it.logo}
                  alt="brandlogo"
                  className="rounded-circle avatar-xs"
                  id={`tooltipTop${it.sow_id}`}
                />
                <span className="user-status"></span>
              </div>
            </div>
            <div className="d-flex gap-1 align-items-center">
              <span
                className="fs-10 text-muted fw-normal "
                // style={{ fontSize: "12px", fontWeight: "400", textAlign: "center" }}
              >
                {it.brand_name}
              </span>
              {/* {item.sow_status == "Hold" ? (
                <span
                  style={{
                    display: "inline-block",
                    height: "8px",
                    width: "8px",
                    background: "#FFBB33",
                    borderRadius: "50%",
                  }}
                ></span>
              ) : ( */}
              {/* <span
                style={
                  item.sow_status == "Active"
                    ? { fontSize: "8px", color: "#00C851" }
                    : item.sow_status == "Hold"
                    ? { fontSize: "8px", color: "#FFBB33" }
                    : item.sow_status == "New"
                    ? { fontSize: "8px", color: "#1A1A1A" }
                    : item.sow_status == "Closed"
                    ? { fontSize: "8px", color: "#FF4444" }
                    : { fontSize: "8px", color: "#1A1A1A" }
                }
              ></span> */}
              {/* <i
                className=" ri-checkbox-blank-circle-fill ms-1 "
                style={
                  it.add_lead_status == "enable"
                    ? { fontSize: "8px", color: "#00C851" }
                    : it.add_lead_status == "disable"
                    ? { fontSize: "8px", color: "#FFBB33" }
                    : it.add_lead_status == "none"
                    ? { fontSize: "8px", color: "#1A1A1A" }
                    : it.add_lead_status == "closed"
                    ? { fontSize: "8px", color: "#FF4444" }
                    : { fontSize: "8px", color: "#1A1A1A" }
                }
              ></i> */}
              {/* )} */}
            </div>
            <div className="text-muted fs-10 fw-normal">{it.sow_id}</div>

            <span
              className="badge badge-soft-primary "
              style={{
                fontSize: "8px",
                justifySelf: "start",
                alignSelf: "star",
              }}
            >
              {console.log(it, "itdata")}
              {it?.total_leads}
            </span>

            {/* <span style={{ fontSize: "11px", fontWeight: "400" }}>
              &#x20B9;{indianNumbers(12345, 2)}
            </span> */}

            <UncontrolledTooltip
              placement="top"
              target={`tooltipTop${it?.sow_id}`}
              style={{ zIndex: "9999" }}
            >
              {it?.project_title}
            </UncontrolledTooltip>
          </div>
        ),
        // <div className="text-capitalize">{it.name.split("_")[0]}</div>
        width: "100px",
        center: true,
        sortable: true,

        selector: (d) => d[it.name].split(",")[0],
        cell: (d) => {
          //   let itemtest = d.filter((item) => item.name == it.name);
          //   console.log(d, "dfasak", "item", it.name);
          return (
            <div>
              <div>
                <span
                  // className="badge badge-soft-primary"
                  style={{
                    width: "60px",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  {d[it.name]?.split(",")[0] == "0"
                    ? "-"
                    : d[it.name]?.split(",")[0]}
                  {/* {d[it.name]?.split(",")[0] + "/" + d[it.name]?.split(",")[2]} */}
                </span>

                {/* <div
                  style={{
                    fontSize: "10px",
                    marginTop: "2px",
                    marginLeft: "20px",
                  }}
                  className="text-success"
                >
                  {d[it.name]?.split(",")[1] + "/" + d[it.name]?.split(",")[3]}
                </div> */}
              </div>
            </div>
          );
        },
      })
    );

  const columns = constCol;

  const tableData = {
    columns,
    data: totalData,
  };

  return (
    <div>
      {/* <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      > */}
      <DataTable
        className="my-dashboard"
        columns={columns}
        data={totalData}
        customStyles={customStyles}
        pagination
        progressPending={loader}
        // onRowClicked={(d) => {
        //   localStorage.setItem("tsmName", d.tsm);
        //   localStorage.setItem("check", false);
        //   history.push(`/supply/dashboard/${d.tsm_id}`);
        // }}
      />
      {/* </DataTableExtensions> */}
    </div>
  );
};

export default DashboardSupplyTable;
