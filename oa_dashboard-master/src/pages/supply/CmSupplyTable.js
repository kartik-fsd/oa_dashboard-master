import axios from "axios";
import React from "react";
import { supply_data } from "../../assets/utils/SupplyApi";
import { api, farming } from "../../globalConfig";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { extract_token } from "../../assets/utils/common";
import { useHistory } from "react-router-dom";
import "./CmSupplyTable.css";

const CmSupplyTable = ({ projectsData, totalData }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  let supplyId = sessionStorage.getItem("supplyid");
  const role = sessionStorage.getItem("role");

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
    {
      name: "Sl",
      selector: (row) => row.id,
      width: "50px",
      fixed: "left",
      cell: (row) => <div className="sticky-cell">{row.id}</div>,
    },
  ];
  let abc = true;
  if (role != "rm" && role != "cm") {
    constCol.push({
      name: (
        <div style={{ fontSize: "14px" }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div>
              <i className="ri-group-line "></i>
            </div>
            <div> User Info</div>
          </div>
        </div>
      ),
      width: "300px",
      center: true,
      fixed: "left",
      cell: (d) => {
        return (
          <div className="sticky-cell">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "250px",
                  justifyContent: "space-between",
                }}
              >
                {/* <div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <div>
                      <span
                        style={{ width: "35px" }}
                        className="badge badge-soft-secondary"
                      >
                        {"TSM"}
                      </span>
                    </div>
                    <div>{d.tsm}</div>
                  </div>
                </div> */}

                <div>
                  <span
                    style={{ width: "50px" }}
                    className="badge badge-soft-success"
                  >
                    {d.tsm_id}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "250px",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <div>
                      <span
                        style={{ width: "35px" }}
                        className="badge badge-soft-secondary"
                      >
                        {"CM"}
                      </span>
                    </div>
                    <div>{d.cm}</div>
                  </div>
                </div>
                <div>
                  {" "}
                  <span
                    style={{ width: "50px" }}
                    className="badge badge-soft-info"
                  >
                    {d.cm_id}
                  </span>
                </div>
              </div>
              {role != "rm" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "250px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div>
                        <span
                          style={{ width: "35px" }}
                          className="badge badge-soft-secondary"
                        >
                          {"RM"}
                        </span>
                      </div>
                      <div> {d.rm}</div>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <span
                      style={{ width: "50px" }}
                      className="badge badge-soft-primary "
                    >
                      {d.rm_id}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      },
    });
  }

  if (role == "rm") {
    constCol.push({
      name: (
        <div style={{ fontSize: "14px" }} className="sticky-cell">
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <div>
              <i className="ri-group-line "></i>
            </div>
            <div> User Info</div>
          </div>
        </div>
      ),
      fixed: "left",
      width: "300px",
      center: true,
      cell: (d) => {
        console.log(d, "testing");

        return (
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "250px",
                  justifyContent: "space-between",
                }}
              >
                <div>{d.tsm}</div>

                <div>
                  <span
                    style={{ width: "50px" }}
                    className="badge badge-soft-success"
                  >
                    {d.tsm_id}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "250px",
                  justifyContent: "space-between",
                }}
              >
                <div>{d.cm}</div>
                <div>
                  {" "}
                  <span
                    style={{ width: "50px" }}
                    className="badge badge-soft-info"
                  >
                    {d.cm_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      },
    });
  }

  if (role == "cm") {
    constCol.push({
      name: "Tsm Info",
      width: "300px",
      fixed: "left",
      cell: (d) => {
        console.log(d, "testing");

        return (
          <div className="sticky-cell">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "250px",
                  justifyContent: "space-between",
                }}
              >
                <div>{d.tsm}</div>

                <div>
                  <span
                    style={{ width: "50px" }}
                    className="badge badge-soft-success"
                  >
                    {d.tsm_id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      },
    });
  }

  projectsData
    .map((item) => ({
      name: item.ref_table_name,
      logo: item.brand_logo,
    }))
    .map((it, i) =>
      constCol.push({
        name: (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={it.logo} alt="log" width="30px" height="30px" />
              </div>
              <div>
                <div className="text-capitalize">{it.name.split("_")[0]}</div>
              </div>
            </div>
          </div>
        ),
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
                  className="badge badge-soft-primary"
                  style={{
                    width: "60px",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  {d[it.name].split(",")[0] + "/" + d[it.name].split(",")[2]}
                </span>

                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "2px",
                    marginLeft: "20px",
                  }}
                  className="text-success"
                >
                  {d[it.name].split(",")[1] + "/" + d[it.name].split(",")[3]}
                </div>
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
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          className="my-data-table"
          columns={columns}
          data={totalData}
          customStyles={customStyles}
          pagination
          progressPending={isLoading}
          //   highlightOnHover
          onRowClicked={(d) => {
            console.log(d, "dtesting");
            localStorage.setItem("cmName", d.cm);
            localStorage.setItem("check", true);

            history.push(`/cm/dashboard/${d.cm_id}`);
          }}
        />
      </DataTableExtensions>
    </div>
  );
};

export default CmSupplyTable;
