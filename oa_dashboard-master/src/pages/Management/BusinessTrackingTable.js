import axios from "axios";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import {
  business_team_rev,
  pipeline_tracking,
} from "../../assets/utils/managementapi";
import { indianNumbers } from "../../components/common/indianNumbers";
import { api } from "../../globalConfig";
import PipelineModal from "./PipelineModal";
import "./pipelineTable.css";

const BusinessTrackingTable = ({ year }) => {
  const [open, setOpen] = React.useState(false);
  const [projectData, setProjectData] = React.useState([]);
  const [totalData, setTotalData] = React.useState([]);
  const [totalData1, setTotalData1] = React.useState([]);
  //   const [pipeline, setPipeline] = React.useState({});

  const [eachProjectItem, setEachProjectItem] = React.useState({});

  React.useEffect(() => {
    const link = api.TASKMO_URL + business_team_rev;

    axios
      .get(link, { params: { fy: year } })
      .then((res) => {
        setProjectData(res.data?.months);
        setTotalData(res.data?.total);
        setTotalData1(res.data?.total1);
        // setPipeline(res.data?.project_lists?.overall);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [year]);

  let columns = [];

  const constColumns = [
    {
      name: (
        <div className="d-flex">
          {/* <div
            className="d-flex flex-column gap-2 justify-content-center align-items-center"
            style={{ justifyContent: "center" }}
          >
            <span style={{ visibility: "hidden" }}>dswd</span>
            <span className="fs-10 text-center ">
              Overall Targeted Pipeline
            </span>
            <div className="d-flex flex-column gap-1">
              <span
                className="badge text-bg-primary"
                style={{ marginTop: "5px" }}
              >
                &#x20B9;{indianNumbers(pipeline.overall_target, 2)}
              </span>
            </div>
          </div>
          <div
            className="d-flex flex-column gap-2 justify-content-center align-items-center"
            style={{ justifyContent: "center" }}
          >
            <span style={{ visibility: "hidden" }}>dswd</span>
            <span className="fs-10 text-center">Overall Achieved Pipeline</span>
            <div className="d-flex flex-column ">
              <span
                className="badge text-bg-success"
                style={{ marginTop: "5px" }}
              >
                &#x20B9;{indianNumbers(pipeline.overall_achieved_target, 2)}
              </span>
            </div>
          </div> */}
        </div>
      ),

      selector: (row) => row.name,
      style: {
        background: "#000",
      },
      width: "280px",
      left: true,

      cell: (d) => (
        <Row className="d-flex w-100">
          <Col
            md={8}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <span className="fs-12 text-dark" style={{ fontWeight: "500" }}>
              {d?.name}
            </span>
            <div className="d-flex flex-column gap-1">
              <span className="badge rounded-pill badge-soft-info mt-2">
                &#x20B9;{indianNumbers(d?.billable_amount, 2)}
              </span>
            </div>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <span className="fs-12 text-dark" style={{ visibility: "hidden" }}>
              {d?.name}
            </span>
            <div className="d-flex flex-column gap-1">
              <span className="badge rounded-pill badge-soft-success mt-2">
                &#x20B9;{indianNumbers(d?.performed_cost, 2)}
              </span>
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  const pileLineFunction = (data, item) => {
    item.month_data = data.month;
    item.year = data.year;
    setEachProjectItem(item);
    setOpen(true);
  };

  const dynamicColumns = [];
  projectData?.map((item) => {
    let sample = {
      name: (
        <div
          className="d-flex   align-items-center flex-column gap-1 "
          style={{ justifyContent: "center" }}
        >
          <div>
            <div
              className={`flex-shrink-0 chat-user-img 
                ${item.sow_status} 
                "user-own-img gap-2`}
            >
              {item.month_name}
              {/* <img
                src={item.brand_logo}
                alt="brandlogo"
                className="rounded-circle avatar-xs"
                id={`tooltipTop${item.sow_id}`}
              /> */}
              {/* <UncontrolledTooltip
                placement="top"
                target={`tooltipTop${item.sow_id}`}
                style={{ zIndex: "9999" }}
              >
                {item.project_title}
              </UncontrolledTooltip> */}
              {/* <span className="user-status"></span> */}
            </div>
          </div>
          {/* <div className="d-flex gap-2 align-items-center">
            <span className="fs-10 text-muted fw-normal ">
              {item.brand_name}
            </span>
          </div> */}
          {/* <div className="text-muted fs-10 fw-normal">{item.sow_id}</div> */}
          {/* <div
            className="badge badge-soft-dark"
            style={{
              color: "#000",
              cursor: "pointer",
            }}
          >
            ₹{indianNumbers(item.total_cost)}
          </div> */}
        </div>
      ),
      selector: (row) => row.performed_cost,
      width: "150px",
      center: true,
      cell: (d) => (
        <div className="d-flex flex-column">
          <div
            //   onClick={() => pileLineFunction(d, item)}
            className="badge rounded-pill badge-soft-info mt-2"
            // style={{
            //   textDecoration: "underline",
            //   color: "#769ff5",
            //   cursor: "pointer",
            // }}
          >
            {d?.month?.find(
              (e) => Object.keys(e)[0] == item.month_name.split(" ").join("_")
            )
              ? `₹${indianNumbers(
                  d?.month?.find(
                    (e) =>
                      Object.keys(e)[0] == item.month_name.split(" ").join("_")
                  )[item.month_name.split(" ").join("_")].billable_amount,
                  2
                )}`
              : "₹0"}
          </div>
          <div
            //   onClick={() => pileLineFunction(d, item)}
            className="badge rounded-pill badge-soft-success mt-2"
            // style={{
            //   textDecoration: "underline",
            //   color: "#769ff5",
            //   cursor: "pointer",
            // }}
          >
            {d?.month?.find(
              (e) => Object.keys(e)[0] == item.month_name.split(" ").join("_")
            )
              ? `₹${indianNumbers(
                  d?.month?.find(
                    (e) =>
                      Object.keys(e)[0] == item.month_name.split(" ").join("_")
                  )[item.month_name.split(" ").join("_")].performed_cost,
                  2
                )}`
              : "₹0"}
          </div>
        </div>
      ),
    };
    dynamicColumns.push(sample);
  });

  columns = [...constColumns, ...dynamicColumns];

  const tableDataExtension = {
    columns: columns,
    data: totalData,
  };

  const data = [1, 2, 2, 4, 5];

  return (
    <div>
      {/* <DataTable
        className="my-pipeline-table"
        columns={columns}
        data={totalData}
      /> */}
      {eachProjectItem && (
        <PipelineModal open={open} setOpen={setOpen} data={eachProjectItem} />
      )}
      <div>
        <div
          className="table-responsive daily-table"
          style={{ height: "600px" }}
        >
          <table className="table table-bordered table-nowrap align-middle mb-0">
            <thead style={{ position: "sticky", top: "0px" }}>
              <tr>
                <th
                  scope="col"
                  style={{
                    width: "13%",
                    textAlign: "center",
                    backgroundColor: "#f4f6f9",
                  }}
                >
                  {/* <div>
                    <p className="m-0 text-center">Week</p>
                    <p className="m-0 text-center invisible">123</p>
                  </div> */}
                </th>
                {projectData.map((item) => {
                  return (
                    <>
                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">
                            {item?.month_name?.split(" ")[0].substring(0, 3)}
                            &nbsp; {item?.month_name?.split(" ")[1]}
                          </p>

                          <span
                            className="badge badge-soft-info"
                            style={{ minWidth: "70px", color: "#0400ff" }}
                          >
                            {`₹${indianNumbers(item.billable_amount, 2)}`}
                          </span>
                          <span
                            className="badge badge-soft-success"
                            style={{ minWidth: "70px", color: "#1e8c00" }}
                          >
                            {`₹${indianNumbers(item.performed_cost, 2)}`}
                          </span>
                          <span
                            className="badge badge-soft-secondary"
                            style={{ minWidth: "70px", color: "#4e00a3" }}
                          >
                            {`₹${indianNumbers(item.inv_amount_total, 2)}`}
                          </span>
                        </div>
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {(totalData || []).map((item, key) => (
                <tr key={key}>
                  <td style={{ textAlign: "center" }} className="bg-light">
                    <div>
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <span className="fw-semibold">{item.name}</span>
                        <div className="d-flex gap-3 mt-2">
                          <span
                            className="badge badge-soft-info"
                            style={{ minWidth: "70px", color: "#0400ff" }}
                          >
                            {`₹${indianNumbers(item.billable_amount, 2)}`}
                            {/* ₹{item.billable_amount} */}
                          </span>
                          <span
                            className="badge badge-soft-success"
                            style={{ minWidth: "70px", color: "#1e8c00" }}
                          >
                            {`₹${indianNumbers(item.performed_cost, 2)}`}
                            {/* ₹{item.performed_cost} */}
                          </span>
                          <span
                            className="badge badge-soft-secondary"
                            style={{ minWidth: "70px", color: "#4e00a3" }}
                          >
                            {`₹${indianNumbers(item.inv_amount_total, 2)}`}
                            {/* ₹{item.performed_cost} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {projectData.map((proj) => {
                    return (
                      <>
                        <td
                          style={{
                            backgroundColor: item.parent_color,
                            textAlign: "center",
                          }}
                        >
                          <div className="d-flex flex-column justify-content-start align-items-start gap-2">
                            <span
                              // className="fs-10 text-start text-info"
                              style={{
                                minWidth: "70px",
                                color: "#0400ff",
                                fontSize: "10px",
                                textAlign: "left",
                              }}
                            >
                              {item?.month?.find(
                                (e) =>
                                  Object.keys(e)[0] ==
                                  proj.month_name.split(" ").join("_")
                              )
                                ? `₹${indianNumbers(
                                    item?.month?.find(
                                      (e) =>
                                        Object.keys(e)[0] ==
                                        proj.month_name.split(" ").join("_")
                                    )[proj.month_name.split(" ").join("_")]
                                      .billable_amount,
                                    2
                                  )}`
                                : "₹0"}
                            </span>
                            <span
                              // className="fs-10 text-start text-success"
                              style={{
                                minWidth: "70px",
                                color: "#1e8c00",
                                fontSize: "10px",
                                textAlign: "left",
                              }}
                            >
                              {item?.month?.find(
                                (e) =>
                                  Object.keys(e)[0] ==
                                  proj.month_name.split(" ").join("_")
                              )
                                ? `₹${indianNumbers(
                                    item?.month?.find(
                                      (e) =>
                                        Object.keys(e)[0] ==
                                        proj.month_name.split(" ").join("_")
                                    )[proj.month_name.split(" ").join("_")]
                                      .performed_cost,
                                    2
                                  )}`
                                : "₹0"}
                            </span>
                            <span
                              // className="fs-10 text-start text-success"
                              style={{
                                minWidth: "70px",
                                color: "#4e00a3",
                                fontSize: "10px",
                                textAlign: "left",
                              }}
                            >
                              {item?.month?.find(
                                (e) =>
                                  Object.keys(e)[0] ==
                                  proj.month_name.split(" ").join("_")
                              )
                                ? `₹${indianNumbers(
                                    item?.month?.find(
                                      (e) =>
                                        Object.keys(e)[0] ==
                                        proj.month_name.split(" ").join("_")
                                    )[proj.month_name.split(" ").join("_")]
                                      .inv_amount_total,
                                    2
                                  )}`
                                : "₹0"}
                            </span>
                          </div>
                        </td>
                      </>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ background: "#fff" }}>
                <td></td>
              </tr>

              {(totalData1 || []).map((item, key) => (
                <tr key={key}>
                  <td
                    style={{
                      backgroundColor: "#f4f6f9",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <span className="fw-semibold">{item.name}</span>
                        <div className="d-flex gap-3 mt-2">
                          <span
                            className="badge badge-soft-info"
                            style={{ minWidth: "70px", color: "#0400ff" }}
                          >
                            ₹{item.billable_amount}
                          </span>
                          <span
                            className="badge badge-soft-success"
                            style={{ minWidth: "70px", color: "#1e8c00" }}
                          >
                            ₹{item.performed_cost}
                          </span>
                          <span
                            className="badge badge-soft-info"
                            style={{ minWidth: "70px", color: "#4e00a3" }}
                          >
                            ₹{item.inv_amount_total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {projectData.map((proj) => {
                    return (
                      <>
                        <td
                          style={{
                            backgroundColor: item.parent_color,
                            textAlign: "center",
                          }}
                        >
                          <div className="d-flex flex-column justify-content-start align-items-start gap-2">
                            <span
                              // className="fs-10 text-start text-info"
                              // style={{ minWidth: "70px" }}
                              style={{
                                minWidth: "70px",
                                color: "#0400ff",
                                fontSize: "10px",
                                textAlign: "left",
                              }}
                            >
                              {item?.month?.find(
                                (e) =>
                                  Object.keys(e)[0] ==
                                  proj.month_name.split(" ").join("_")
                              )
                                ? `₹${indianNumbers(
                                    item?.month?.find(
                                      (e) =>
                                        Object.keys(e)[0] ==
                                        proj.month_name.split(" ").join("_")
                                    )[proj.month_name.split(" ").join("_")]
                                      .billable_amount,
                                    2
                                  )}`
                                : "₹0"}
                            </span>
                            <span
                              // className="fs-10 text-start text-success"
                              style={{
                                minWidth: "70px",
                                color: "#1e8c00",
                                fontSize: "10px",
                                textAlign: "left",
                              }}
                            >
                              {item?.month?.find(
                                (e) =>
                                  Object.keys(e)[0] ==
                                  proj.month_name.split(" ").join("_")
                              )
                                ? `₹${indianNumbers(
                                    item?.month?.find(
                                      (e) =>
                                        Object.keys(e)[0] ==
                                        proj.month_name.split(" ").join("_")
                                    )[proj.month_name.split(" ").join("_")]
                                      .performed_cost,
                                    2
                                  )}`
                                : "₹0"}
                            </span>
                            <span
                              // className="fs-10 text-start text-success"
                              style={{
                                minWidth: "70px",
                                color: "#4e00a3",
                                fontSize: "10px",
                                textAlign: "left",
                              }}
                            >
                              {item?.month?.find(
                                (e) =>
                                  Object.keys(e)[0] ==
                                  proj.month_name.split(" ").join("_")
                              )
                                ? `₹${indianNumbers(
                                    item?.month?.find(
                                      (e) =>
                                        Object.keys(e)[0] ==
                                        proj.month_name.split(" ").join("_")
                                    )[proj.month_name.split(" ").join("_")]
                                      .inv_amount_total,
                                    2
                                  )}`
                                : "₹0"}
                            </span>
                          </div>
                        </td>
                      </>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusinessTrackingTable;
