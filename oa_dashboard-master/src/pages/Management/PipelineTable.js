import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import "./pipelineTable.css";
import "./dailyTracking.css";
import PipelineModal from "./PipelineModal";
import { indianNumbers } from "../../components/common/indianNumbers";
import { number } from "yup";
const PipelineTable = ({
  dailytrackData,
  dailyTarget,
  percent,
  selectedDate,
  isLoading,
  reven,
  showApproved,
}) => {
  const [open, setOpen] = React.useState(false);
  const [nod, setNod] = React.useState(31);
  const [eachProjectItem, setEachProjectItem] = React.useState({});

  console.log(selectedDate, "testingdates");

  function getNumberofDays(selectedDate) {
    let currmonth = moment(new Date()).format("MM");
    let getYear = moment(selectedDate).format("YYYY");
    let getMonth = moment(selectedDate).format("MM");

    let date = new Date(getYear, getMonth, 1);

    date.setDate(0);

    console.log(date, "testingdates");
    const numberOfDays = date.getDate();

    console.log(
      numberOfDays,
      "testingdates",
      Number(moment(selectedDate).format("DD"))
    );

    return currmonth == getMonth
      ? Number(moment(new Date()).format("DD"))
      : numberOfDays;
  }

  React.useEffect(() => {
    setNod(getNumberofDays(selectedDate));
  }, [nod, selectedDate]);

  let columns = [];
  const pileLineFunction = (data) => {
    setEachProjectItem(data);
    setOpen(true);
  };

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
                />
                <span className="user-status"></span>
              </div>

              <div className="d-flex  gap-1 ">
                <div className="d-flex flex-column gap-1">
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
                        pileLineFunction(d);
                      }}
                    >
                      {d.brand_name} - {d.sow_id}
                    </span>
                  </div>

                  <span
                    className="text-muted"
                    style={{
                      wordBreak: "break-all",
                      fontSize: "8px",
                      fontWeight: "400",
                    }}
                  >
                    {d.project_title}
                  </span>

                  {/* testing */}
                  <div
                    className="fw-semibold"
                    style={{ fontSize: "10px", color: "#b83016" }}
                  >
                    {console.log(d?.sum_percentage, "d?.sum_percentage")}
                    {percent == 0 ? (
                      d?.value != "0" ? (
                        <>
                          {" "}
                          {/* {(
                            +d?.sum_percentage / getNumberofDays(selectedDate)
                          ).toFixed(2) + " %"} */}
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div>
                              {" "}
                              {(
                                (Number(d?.sum_amount) /
                                  Number(reven?.total_amount)) *
                                100
                              ).toFixed(2) + " %"}
                            </div>
                          </div>
                          <div>
                            {showApproved ? (
                              <div style={{ color: "green", fontSize: "8px" }}>
                                {(
                                  (Number(d?.sum_approve_amount) /
                                    Number(reven?.total_amount)) *
                                  100
                                ).toFixed(2) + " %"}
                              </div>
                            ) : (
                              <div
                                style={{ color: "#F3F3F8", fontSize: "8px" }}
                              >
                                33%
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        "-"
                      )
                    ) : percent == 1 ? (
                      <>
                        {d?.value != "0" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div>
                              ₹ {(Number(d?.sum_amount) / 100000).toFixed(1)}
                              {"L "}
                            </div>
                            <div>
                              {showApproved ? (
                                <div
                                  style={{ color: "green", fontSize: "8px" }}
                                >
                                  ₹{" "}
                                  {(
                                    Number(d?.sum_approve_amount) / 100000
                                  ).toFixed(1)}
                                  {"L "}
                                </div>
                              ) : (
                                <div
                                  style={{ color: "#F3F3F8", fontSize: "8px" }}
                                >
                                  33%
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          {d?.value != "0" ? <>{Number(d?.sum_leads)}</> : "-"}
                        </div>
                        <div>
                          {showApproved ? (
                            <div style={{ color: "green", fontSize: "8px" }}>
                              {d?.value != "0" ? (
                                <>{Number(d?.sum_approve_leads)}</>
                              ) : (
                                "-"
                              )}
                            </div>
                          ) : (
                            <div style={{ color: "#F3F3F8", fontSize: "8px" }}>
                              33%
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const dynamicColumns = [];
  const arr = dailytrackData?.monthDays?.map((item) => {
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
          <span>{item?.name?.split("_").join("-")}</span>
          <span
            className="badge badge-soft"
            style={{ backgroundColor: "#f07d47" }}
          >
            {percent == 0 ? (
              item?.value != "0" ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    {((item?.value / dailyTarget) * 100).toFixed(1) + " %"}
                  </div>
                  <div>
                    {showApproved ? (
                      <div style={{ color: "green", fontSize: "6px" }}>
                        {((item?.approve_value / dailyTarget) * 100).toFixed(
                          1
                        ) + " %"}
                      </div>
                    ) : (
                      <div style={{ color: "#E1E2EE", fontSize: "6px" }}>
                        33%
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                "-"
              )
            ) : percent == 1 ? (
              <>
                {item?.value != "0" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {" "}
                      ₹ {(Number(item?.value) / 100000).toFixed(1)}
                      {"L "}
                    </div>
                    <div>
                      {showApproved ? (
                        <div style={{ color: "green", fontSize: "6px" }}>
                          {" "}
                          ₹ {(Number(item?.approve_value) / 100000).toFixed(1)}
                          {"L "}
                        </div>
                      ) : (
                        <div style={{ color: "#E1E2EE", fontSize: "6px" }}>
                          33%
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  "-"
                )}
              </>
            ) : (
              <>
                {item?.value != "0" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column ",
                      alignItems: "center",
                    }}
                  >
                    <div>{Number(item?.leads)}</div>
                    <div>
                      {showApproved ? (
                        <div style={{ color: "green", fontSize: "6px" }}>
                          <div>{Number(item?.approve_leads)}</div>
                        </div>
                      ) : (
                        <div style={{ color: "#E1E2EE", fontSize: "6px" }}>
                          33%
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  "-"
                )}
              </>
            )}
          </span>
        </div>
      ),
      width: "100px",
      selector: (item) => item.project_title,
      //   sortable: true,
      center: true,
      cell: (d) => (
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <span style={{ fontSize: "12px", fontWeight: "500" }}>
            {percent == 0 ? (
              Number(d[item?.name]?.split("-")[2]) != 0 ? (
                <>
                  <div
                    style={{
                      fontSize: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <div>
                      {" "}
                      {(
                        (Number(d[item?.name]?.split("-")[2]) / dailyTarget) *
                        100
                      ).toFixed(1) + "%"}
                    </div>
                    {showApproved ? (
                      <div style={{ color: "green", fontSize: "8px" }}>
                        {" "}
                        {(
                          (Number(d[item?.name]?.split("-")[5]) / dailyTarget) *
                          100
                        ).toFixed(1) + "%"}
                      </div>
                    ) : (
                      <div style={{ color: "white", fontSize: "8px" }}>33%</div>
                    )}
                  </div>
                </>
              ) : (
                "-"
              )
            ) : percent == 1 ? (
              <>
                {d[item?.name]?.split("-")[2] != 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {" "}
                        ₹{" "}
                        {(
                          Number(d[item?.name]?.split("-")[2]) / 100000
                        ).toFixed(1)}
                        {"L "}
                      </div>
                      <div>
                        {showApproved ? (
                          <div style={{ color: "green", fontSize: "8px" }}>
                            ₹{" "}
                            {(
                              Number(d[item?.name]?.split("-")[5]) / 100000
                            ).toFixed(1)}
                            {"L "}
                          </div>
                        ) : (
                          <div style={{ color: "white", fontSize: "8px" }}>
                            33%
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  "-"
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  {d[item?.name]?.split("-")[3] != 0 ? (
                    <>{d[item?.name]?.split("-")[3]}</>
                  ) : (
                    "-"
                  )}
                </div>
                <div>
                  {" "}
                  {showApproved ? (
                    <div style={{ color: "green", fontSize: "8px" }}>
                      {" "}
                      {d[item?.name]?.split("-")[6] != 0 ? (
                        <>{d[item?.name]?.split("-")[6]}</>
                      ) : (
                        "-"
                      )}
                    </div>
                  ) : (
                    <div style={{ color: "white", fontSize: "8px" }}>33%</div>
                  )}
                </div>
              </div>
            )}
            {/* {(
              (Number(d[item?.name]?.split("-")[2]) / dailyTarget) *
              100
            ).toFixed(1) + "%"} */}
          </span>
          {/* <span>{d[item].split("-")[1]}</span> */}
          {/* <span className="fs-10 text-muted">{d[item]?.split("-")[1]}</span> */}
        </div>
      ),
    };
    dynamicColumns.push(sample);
  });

  //   const arr = dailytrackData?.monthDays?.map((item) => ({
  //     name: item,
  //     width: "150px",
  //     selector: (item) => item,
  //     sortable: true,
  //     cell: (d) => <div>{d[item]}</div>,
  //   }));

  console.log(arr, "checkingarr");

  columns = [...constColumns, ...dynamicColumns];

  const tableDataExtension = {
    columns: columns,
    data: dailytrackData.daily_data,
  };

  return (
    <div className="my-search">
      <DataTableExtensions
        {...tableDataExtension}
        export={false}
        filterPlaceholder={`Search`}
        style={{
          paddingRight: "25px important",
        }}
      >
        <DataTable
          className="my-dailytrack-table"
          columns={columns}
          data={tableDataExtension}
          progressPending={isLoading}
          // pagination
          sortField="1"
        />
      </DataTableExtensions>
      <PipelineModal open={open} setOpen={setOpen} data={eachProjectItem} />
    </div>
  );
};

export default PipelineTable;
