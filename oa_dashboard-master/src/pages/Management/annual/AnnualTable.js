import { stubString } from "lodash";
import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import img from "../../../assets/images/users/avatar-1.jpg";
// import { 123 } from "../../../components/common/123";
import "./annual.css";

const AnnualTable = ({ data }) => {
  console.log(data, "res");

  const ot = data.months?.map((item) => {
    return { ...item, month_name: item.month_name?.split(" ").join("_") };
  });

  const modifyData = { ...data, months: ot };

  console.log(modifyData, "modData");

  let columns = [];

  const constColumns = [
    {
      name: (
        <div style={{ fontSize: "12px", fontWeight: "500" }}>
          <div></div>
        </div>
      ),

      selector: (row) => row.sow_id,
      sortable: true,
      width: "250px",
      // center: true,
      cell: (d) => (
        <div className="py-2 sticky-cell">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="d-flex align-items-center gap-2"
              style={{ width: "250px" }}
            >
              <div
                className={`flex-shrink-0 chat-user-img 
                ${d.sow_status} 
"user-own-img gap-2`}
              >
                <img
                  src={d.brand_logo}
                  alt="brandlogo"
                  className="rounded-circle avatar-xs"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
                <span className="user-status"></span>
              </div>

              <div className="d-flex  gap-1 ">
                <div className="d-flex flex-column ">
                  <div>
                    <span
                      style={{
                        wordBreak: "break-all",
                        fontSize: "11px",
                        fontWeight: "400",
                        color: "#3478f1",
                        cursor: "pointer",
                        // textDecoration: "underline",
                      }}
                      onClick={() => {
                        // pileLineFunction(d);
                      }}
                    >
                      {d.name} - {d.sow_id}
                    </span>
                  </div>

                  <span
                    className="text-muted"
                    style={{
                      wordBreak: "break-all",
                      fontSize: "10px",
                      fontWeight: "400",
                    }}
                  >
                    {d.project_title}
                  </span>

                  {/* <span className="fs-11 "style={{color: "#b83016"}}>0.77%</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   name: (
    //     <div
    //       style={{
    //         fontSize: "12px",
    //         fontWeight: "500",
    //         display: "flex",
    //         flexDirection: "column",
    //       }}
    //     >
    //       {/* <span>{item?.name?.split("_").join("-")}</span> */}
    //       <span>May-1</span>
    //       <span className="badge badge-soft-primary">10%</span>
    //     </div>
    //   ),
    //   width: "100px",
    //   selector: (item) => item.project_title,
    //   //   sortable: true,
    //   center: true,
    //   cell: (d) => <></>,
    // },
  ];

  const dynamicColumns = [];

  const arr = modifyData?.months?.map((item) => {
    // console.log(item, "checkingitem");
    let sample = {
      name: (
        <div
          style={{
            fontSize: "12px",
            fontWeight: "500",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            {item?.month_name?.split("_")[0]?.substring(0, 3)}-
            {item?.month_name?.split("_")[1]}
          </span>
          {/* <span className="badge badge-soft-primary">10%</span> */}
        </div>
      ),
      width: "100px",
      selector: (item) => item.project_title,
      //   sortable: true,
      center: true,
      cell: (d) => <>{d[item.month_name]}</>,
    };
    dynamicColumns.push(sample);
  });

  columns = [...constColumns, ...dynamicColumns];

  const tableDataExtension = {
    columns: columns,
    data: modifyData?.brand_list,
  };

  const arr4 = [1, 2, 3];

  return (
    <div>
      <div className="my-annual">
        {/* <DataTableExtensions
          {...tableDataExtension}
          export={false}
          filterPlaceholder={`Search`}
          style={{
            paddingRight: "25px important",
          }}
        >
          <DataTable
            className="my-annual-table"
            columns={columns}
            data={modifyData?.brand_list}
            // progressPending={isLoading}
            pagination
            paginationPerPage={7}
            sortField="1"
          />
        </DataTableExtensions> */}

        <div
          className="table-responsive annual_table"
          style={{ height: "600px" }}
        >
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    width: "13%",
                    textAlign: "center",
                    backgroundColor: "#f4f6f9",
                    position: "sticky",
                    left: "0px",
                    // top: "0px",
                    zIndex: "2",
                    fontWeight: "bold",
                  }}
                >
                  <div>
                    <p className="m-0 text-center">Company Info</p>
                    <p className="m-0 text-center invisible">123</p>
                  </div>
                </th>
                {modifyData.months?.map((item) => {
                  return (
                    <>
                      <th
                        scope="col"
                        style={{
                          width: "2%",
                          textAlign: "center",
                          backgroundColor: "#f4f6f9",
                          zIndex: "1",
                        }}
                      >
                        <div>
                          <p className="m-0 text-center">
                            {" "}
                            {item?.month_name?.split("_")[0]?.substring(0, 3)}-
                            {item?.month_name?.split("_")[1]}
                          </p>
                          <p className="m-0 text-center invisible">123</p>
                        </div>
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {(modifyData?.brand_list || []).map((item, key) => (
                // {let asd = Object.keys(item)}

                <tr key={key}>
                  <td
                    style={{
                      textAlign: "center",
                      position: "sticky",
                      left: "0",
                      zIndex: "1px",
                      background: "#f4f6f9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ width: "250px" }}
                      >
                        <div
                          className={`flex-shrink-0 chat-user-img 
                ${"d.sow_status"} 
"user-own-img gap-2`}
                        >
                          <img
                            src={item.brand_logo}
                            alt="brandlogo"
                            className="rounded-circle avatar-xs"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                          <span className="user-status"></span>
                        </div>

                        <div className="d-flex  gap-1 ">
                          <div className="d-flex flex-column align-items-start justify-content-start">
                            <div>
                              <span
                                style={{
                                  wordBreak: "break-all",
                                  fontSize: "11px",
                                  fontWeight: "400",
                                  color: "#3478f1",
                                  cursor: "pointer",
                                  // textDecoration: "underline",
                                }}
                                onClick={() => {
                                  // pileLineFunction(d);
                                }}
                              >
                                {item.brand_name} - {item.sow_id}
                              </span>
                            </div>

                            <span
                              className="text-muted"
                              style={{
                                wordBreak: "break-all",
                                fontSize: "10px",
                                fontWeight: "400",
                              }}
                            >
                              {item.project_title}
                            </span>

                            {/* <span className="fs-11 ">0.77%</span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{}}>
                    <div className="text-center">{item.April_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.May_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.June_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.July_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.August_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.September_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.October_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.November_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.December_2023}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.January_2024}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.February_2024}</div>
                  </td>
                  <td>
                    <div className="text-center">{item.March_2024}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnnualTable;
