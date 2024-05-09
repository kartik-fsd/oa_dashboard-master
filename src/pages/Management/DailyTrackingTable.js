import axios from "axios";
import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { UncontrolledTooltip } from "reactstrap";
import { pipeline_tracking } from "../../assets/utils/managementapi";
import { indianNumbers } from "../../components/common/indianNumbers";
import { api } from "../../globalConfig";
import PipelineModal from "./PipelineModal";
import "./pipelineTable.css";

const DailyTrackingTable = ({ year }) => {
  const [open, setOpen] = React.useState(false);
  const [projectData, setProjectData] = React.useState([]);
  const [totalData, setTotalData] = React.useState([]);
  const [pipeline, setPipeline] = React.useState({});

  console.log(pipeline, "total");
  const [eachProjectItem, setEachProjectItem] = React.useState({});

  React.useEffect(() => {
    const link = api.VENDOR_URL + pipeline_tracking;

    axios
      .get(link, { params: { fy: year } })
      .then((res) => {
        console.log(res.data.project_lists);
        setProjectData(res.data?.project_lists?.projects);
        setTotalData(res.data?.project_lists?.months);
        setPipeline(res.data?.project_lists?.overall);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [year]);

  console.log(totalData, "projectData");
  let columns = [];

  const constColumns = [
    {
      name: (
        <div className="d-flex">
          <div
            className="d-flex flex-column gap-2 justify-content-center align-items-center"
            style={{ justifyContent: "center" }}
          >
            <span style={{ visibility: "hidden" }}>dswd</span>
            <span className="fs-10 text-center ">
              Overall Targeted Pipeline
            </span>
            <div className="d-flex flex-column gap-1">
              <span
                className="badge"
                style={{
                  marginTop: "5px",
                  color: "#fffff",
                  backgroundColor: "#ec5c24",
                }}
              >
                &#x20B9;{indianNumbers(pipeline.overall_target, 2)}
              </span>
              {/* <span className="badge text-bg-success">
              &#x20B9;{indianNumbers(250000000, 2)}
            </span> */}
            </div>
          </div>
          <div
            className="d-flex flex-column gap-2 justify-content-center align-items-center"
            style={{ justifyContent: "center" }}
          >
            <span style={{ visibility: "hidden" }}>dswd</span>
            <span className="fs-10 text-center">Overall Achieved Pipeline</span>
            <div className="d-flex flex-column ">
              {/* <span className="badge text-bg-primary">
              &#x20B9;{indianNumbers(250000000, 2)}
            </span> */}
              <span
                className="badge text-bg-success"
                style={{ marginTop: "5px" }}
              >
                &#x20B9;{indianNumbers(pipeline.overall_achieved_target, 2)}
              </span>
            </div>
          </div>
        </div>
      ),

      selector: (row) => row.full_name,
      style: {
        background: "#000",
      },
      //   sortable: true,
      width: "280px",
      center: true,

      cell: (d) => (
        // <div className="py-2 sticky-cell">
        //   <div className="d-flex gap-3">
        //     <img
        //       src="/user-dummy-img.jpg"
        //       alt="brandlogo"
        //       className="rounded avatar-sm"
        //     />
        //     <div className="d-flex flex-column gap-1 ">
        //       <div>
        //         <span
        //           className=""
        //           style={{
        //             wordBreak: "break-all",
        //             fontSize: "13px",
        //             fontWeight: "400",
        //             color: "#000",
        //           }}
        //         >
        //           Projects Title Testing
        //         </span>
        //       </div>
        //       <div>
        //         <span className="fs-12 " style={{color: "#b83016",}}>ID: 12345</span>
        //         {/* <span className="badge text-bg-info">ID: {d.sow_id}</span> */}
        //         <span
        //           className={`badge  ${
        //             d.sow_status == "Active"
        //               ? "badge-soft-success"
        //               : d.sow_status == "Hold"
        //               ? "badge-soft-warning"
        //               : "badge-soft-danger"
        //           } `}
        //           style={{ marginLeft: "10px" }}
        //         >
        //           <i className="mdi mdi-circle-medium"></i> status
        //         </span>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className="d-flex" style={{ gap: "62px" }}>
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <span className="fs-12 text-dark" style={{ fontWeight: "500" }}>
              {d?.month_name}
            </span>
            <div className="d-flex flex-column gap-1">
              <span className="badge rounded-pill badge-soft-info mt-2">
                &#x20B9;{indianNumbers(d?.actual_target, 2)}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <span className="fs-12 text-dark" style={{ visibility: "hidden" }}>
              {d?.month_name}
            </span>
            <div className="d-flex flex-column gap-1">
              {/* <a onClick={() => setOpen(!open)} className=""> */}
              <span className="badge rounded-pill badge-soft-success mt-2">
                &#x20B9;{indianNumbers(d?.overall_revenue, 2)}
              </span>
              {/* </a> */}
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   name: "Age",
    //   selector: "age",
    //   style: {
    //     background: "#000",
    //   },
    // },
    // {
    //   name: (
    //     <div
    //       className="d-flex flex-column gap-2 justify-content-center align-items-center"
    //       style={{ justifyContent: "center" }}
    //     >
    //       <span style={{ visibility: "hidden" }}>dswd</span>
    //       <span className="fs-10 text-center">Overall Achieved Pipeline</span>
    //       <div className="d-flex flex-column ">
    //         {/* <span className="badge text-bg-primary">
    //           &#x20B9;{indianNumbers(250000000, 2)}
    //         </span> */}
    //         <span
    //           className="badge text-bg-success"
    //           style={{ marginTop: "5px" }}
    //         >
    //           &#x20B9;{indianNumbers(250000000, 2)}
    //         </span>
    //       </div>
    //     </div>
    //   ),
    //   selector: (row) => row.full_name,
    //   //   sortable: true,
    //   width: "120px",
    //   center: true,
    //   cell: (d) => (
    //     <div>
    //       {/* <a onClick={() => setOpen(!open)} className="">

    //         <span className="badge rounded-pill badge-soft-success mt-2">
    //           &#x20B9;{indianNumbers(2500000, 2)}
    //         </span>
    //       </a> */}
    //       <div className="d-flex justify-content-center align-items-center flex-column ">
    //         <span className="fs-12 text-dark" style={{ visibility: "hidden" }}>
    //           {d?.month_name}
    //         </span>
    //         <div className="d-flex flex-column gap-1">
    //           <a onClick={() => setOpen(!open)} className="">
    //             <span className="badge rounded-pill badge-soft-success mt-2">
    //               &#x20B9;{indianNumbers(d?.overall_revenue, 2)}
    //             </span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },

    // projectData?.map((proj) => {
    //   return {
    //     name: (
    //       <div className="d-flex  justify-content-center align-items-center flex-column gap-1 ">
    //         <img
    //           src="/user-dummy-img.jpg"
    //           alt="brand-logo"
    //           className="rounded-circle avatar-sm"
    //         ></img>
    //         <span style={{ fontSize: "12px", fontWeight: "400" }}>
    //           Name testing
    //         </span>
    //         <span style={{ fontSize: "11px", fontWeight: "400" }}>
    //           &#x20B9;{indianNumbers(12345, 2)}
    //         </span>
    //       </div>
    //     ),
    //     selector: (row) => row.full_name,
    //     //   sortable: true,
    //     width: "140px",
    //     center: true,
    //     cell: (d) => (
    //       <div
    //         className="d-flex gap-1 fs-12 align-items-center"
    //         style={{
    //           textDecoration: "underline",
    //           color: "#769ff5",
    //           cursor: "pointer",
    //         }}
    //       >
    //         <a onClick={() => setOpen(!open)} className="text-secondary">
    //           {indianNumbers(10000, 2)}
    //         </a>
    //         {/* <span style={{ fontSize: "8px" }}>(100%)</span> */}
    //       </div>
    //     ),
    //   };
    // }),
  ];

  const pileLineFunction = (data, item) => {
    // console.log(data, item, "sample123");
    // let [ot] = data.projects.filter(
    //   (it) => it.project_title == item.project_title
    // );
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
            {/* <img
              src={item.brand_logo}
              alt="brand-logo"
              className="rounded-circle avatar-xs"
            ></img> */}

            <div
              className={`flex-shrink-0 chat-user-img 
                ${item.sow_status} 
                "user-own-img gap-2`}
            >
              <img
                src={item.brand_logo}
                alt="brandlogo"
                className="rounded-circle avatar-xs"
                id={`tooltipTop${item.sow_id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`tooltipTop${item.sow_id}`}
                style={{ zIndex: "9999" }}
              >
                {item.project_title}
              </UncontrolledTooltip>
              <span className="user-status"></span>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <span
              className="fs-10 text-muted fw-normal "
              // style={{ fontSize: "12px", fontWeight: "400", textAlign: "center" }}
            >
              {item.brand_name}
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

            {/* )} */}
          </div>
          <div className="text-muted fs-10 fw-normal">{item.sow_id}</div>
          <div
            className="badge badge-soft-dark"
            style={{
              // textDecoration: "underline",
              color: "#000",
              cursor: "pointer",
            }}
          >
            ₹{indianNumbers(item.total_cost)}
          </div>
          {/* <span style={{ fontSize: "11px", fontWeight: "400" }}>
            &#x20B9;{indianNumbers(12345, 2)}
          </span> */}
        </div>
      ),
      selector: (row) => row.full_name,
      //   sortable: true,
      width: "150px",
      center: true,
      cell: (d) => (
        <div
          onClick={() => pileLineFunction(d, item)}
          className="d-flex gap-1 fs-12 align-items-center"
          style={{
            textDecoration: "underline",
            color: "#769ff5",
            cursor: "pointer",
          }}
        >
          {d?.projects?.find((e) => e.sow_id == item.sow_id)
            ? `₹${indianNumbers(
                d?.projects?.find((e) => e.sow_id == item.sow_id)
                  .billable_amount,
                2
              )}`
            : "₹0"}
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

  return (
    <div>
      {/* <DataTableExtensions
        {...tableDataExtension}
        export={false}
        filterPlaceholder={`Search`}
        style={{ paddingRight: "25px important" }}
      > */}
      <DataTable
        className="my-pipeline-table"
        columns={columns}
        data={totalData}
        // onRowClicked={() => setOpen(true)}
        //   pagination
      />
      {/* </DataTableExtensions> */}
      {eachProjectItem && (
        <PipelineModal open={open} setOpen={setOpen} data={eachProjectItem} />
      )}
    </div>
  );
};

export default DailyTrackingTable;
