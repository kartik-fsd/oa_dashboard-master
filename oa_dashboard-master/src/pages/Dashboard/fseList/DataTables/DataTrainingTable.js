import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Rating from "react-rating";
import { Button, Col, Tooltip, UncontrolledTooltip } from "reactstrap";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";
// import CheckIcon from "@mui/icons-material/Check";
// import ClearIcon from "@mui/icons-material/Clear";

// import "./Table.css";

createTheme("VendorTable", {
  text: {
    primary: "black",
    secondary: "#b2b2b2",
  },
  background: {
    default: "#fff",
  },
  boxshadow: {
    default: "5px 5px 30px #DEDEDEBF",
  },
  headCells: {
    default: "#64abdd",
  },
  divider: {
    default: "#f4f4f4",
  },
  cell: {
    style: {
      height: "60px !important",
    },
  },

  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

//

const DataTrainingTable = ({ trainingTable }) => {
  // const test = trainingTable
  //   let status = "onboarded";
  const [attdremark, setAttdRemark] = React.useState("");
  const [remark, setRemark] = React.useState("");

  const hoverData = (data) => {
    setAttdRemark(data);
  };

  const hoverData2 = (data) => {
    setRemark(data);
  };
  const columns = [
    {
      name: "Title",
      selector: (d) => d?.project_title,
      sortable: true,
      center: true,
      //   omit: true,
      width: "300px",
      cell: (d) => <div>{`(${d.title}) ${d?.project_title}`}</div>,
    },
    {
      name: "Date",
      selector: (d) => d.date,
      sortable: true,
      center: true,
      //   omit: true,
      cell: (d) => <div>{d.date}</div>,
    },
    // {
    //   name: "Attendance Remark",
    //   selector: (d) => d.attendance_remark,
    //   sortable: true,
    //   center: true,
    //   //   omit: true,
    //   cell: (d) => <div>{d.attendance_remark}</div>,
    // },
    // {
    //   name: "Training Remark",
    //   selector: (d) => d.remark,
    //   sortable: true,
    //   center: true,
    //   //   omit: true,
    //   cell: (d) => <div>{d.remark}</div>,
    // },

    {
      name: "Completion Status",
      selector: (d) => d.completion_status,
      sortable: true,
      center: true,

      cell: (d) => (
        <>
          <div
            id={`tooltipTop-${d.completion_id}`}
            onMouseEnter={() => hoverData(d.completion_id)}
            onMouseLeave={() => hoverData("")}
          >
            {d.completion_status == "none" ? (
              <span className="badge text-bg-primary" style={{ width: "70px" }}>
                {d.completion_status}
              </span>
            ) : d.completion_status == "completed" ? (
              <span className="badge text-bg-info" style={{ width: "70px" }}>
                {d.completion_status}
              </span>
            ) : d.completion_status == "absent" ? (
              <span className="badge text-bg-warning" style={{ width: "70px" }}>
                {d.completion_status}
              </span>
            ) : d.completion_status == "rejected" ? (
              <span className="badge text-bg-danger" style={{ width: "70px" }}>
                {d.completion_status}
              </span>
            ) : (
              <></>
            )}
          </div>

          <UncontrolledTooltip
            placement="top"
            target={`tooltipTop-${d.completion_id}`}
            style={{
              display: attdremark == "" ? "none" : "block",
              visibility: attdremark == "" ? "hidden" : "visible",
            }}
          >
            {" "}
            {d.completion_id == attdremark && d.attendance_remark == ""
              ? "no data"
              : d.attendance_remark}
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "ratings",
      cell: (d) => (
        <div>
          <Col className="col">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
              }}
            >
              <div id="rater-step" dir="ltr">
                <Rating
                  style={{ fontSize: "30px" }}
                  initialRating={+d.rating}
                  fractions={2}
                  emptySymbol="mdi mdi-star-outline text-muted "
                  fullSymbol="mdi mdi-star text-warning "
                  readonly
                />
              </div>
              <div>
                <Button
                  id={`tooltipTop-${+d.completion_id + 1}`}
                  style={{
                    padding: "0",
                    background: "white",
                    color: "black",
                    border: "none",
                    fontSize: "25px",
                  }}
                  onMouseEnter={() => {
                    hoverData2(d.completion_id);
                  }}
                  omMouseLeave={() => {
                    hoverData2(d.remark);
                  }}
                >
                  <i className=" ri-information-line"></i>
                </Button>
                <UncontrolledTooltip
                  style={{
                    display: remark == "" ? "none" : "block",
                    visibility: remark == "" ? "hidden" : "visible",
                  }}
                  placement="top"
                  target={`tooltipTop-${d.completion_id + 1}`}
                >
                  {" "}
                  {d.completion_id == remark && d.remark == ""
                    ? "no data"
                    : d.remark}
                </UncontrolledTooltip>
              </div>
            </div>
          </Col>
        </div>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: trainingTable,
  };

  return (
    <div className="table_data">
      <div className="card_table">
        <DataTableExtensions
          {...tableData}
          export={false}
          filterPlaceholder={`Search`}
          style={{ paddingRight: "25px important" }}
        >
          <DataTable
            columns={columns}
            data={tableData}
            defaultSortFieldId={3}
            pagination
            theme="VendorTable"
            highlightOnHover={true}
            paginationPerPage={5}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default DataTrainingTable;
