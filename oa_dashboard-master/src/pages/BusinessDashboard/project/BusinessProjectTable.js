import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import img from "../../../assets/images/users/avatar-1.jpg";
import classnames from "classnames";
import Stepper from "../BusinessLeads/Stepper";
import { useHistory } from "react-router-dom";
import StepperProject from "../BusinessLeads/StepperProject";

const BusinessProjectTable = ({ data, isLoading }) => {
  const history = useHistory();
  const [activeTab, setactiveTab] = useState(1);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [err, setErr] = React.useState(false);

  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  }

  const imageOnError = (event) => {
    event.currentTarget.src = "/user-dummy-img.jpg";
  };

  const columns = [
    {
      name: "Lead ID",
      selector: (row) => row.project_unique_id,
      sortable: true,
      omit: true,
      cell: (row) => (
        <div>
          <span
            className="badge rounded-pill badge-soft"
            style={{ backgroundColor: "#f07d47" }}
          >
            L00243
          </span>
        </div>
      ),
      width: "200px",
    },
    {
      name: "Company",
      selector: (row) => row.company_name,
      sortable: true,
      width: "250px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            gap: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={d.brand_logo}
              onError={imageOnError}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="d-flex flex-column gap-1 ">
            <span
              className="fs-11  "
              style={{
                wordBreak: "break-all",
                fontWeight: "450",
                color: "#b83016",
              }}
            >
              {d.company_name}
            </span>
            <div>
              <span
                className="badge  bg-soft fs-7 cursor-pointer"
                style={{ color: "#b83016", backgroundColor: "#f07d47" }}
                onClick={() => history.push(`project-details/${d?.project_id}`)}
              >
                {d.company_unique_id}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Project Title",
      selector: (row) => row.user_name,
      width: "180px",
      sortable: true,
      // center: true,
      cell: (d) => (
        <div className="fs-12">
          {d?.project_title}
          <div>
            <span
              className="badge  bg-soft fs-7 cursor-pointer"
              style={{ color: "#b83016" }}
              onClick={() => history.push(`project-details/${d?.project_id}`)}
            >
              {d.project_unique_id}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Spoc Details",
      selector: (row) => row.client_name,
      sortable: true,
      // center: true,
      width: "190px",
      cell: (d) => (
        <div>
          <div className="d-flex flex-column gap-1">
            <div>
              <span className="fs-10">{d.client_name}</span>
            </div>

            <div>
              <span className="fs-10 text-muted">{d.client_email}</span>
            </div>
            <div>
              <span className="fs-10 text-muted">{d.client_phone}</span>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "Created by ",
      selector: (row) => row.created_at,
      width: "200px",
      sortable: true,
      // center: true,
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            gap: "10px",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={d.user_profile}
              onError={imageOnError}
              alt="brand logo"
              className="rounded-avatar-xs"
              width="40px"
              height={"40px"}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="d-flex flex-column gap-1 ">
            <span
              className="fs-12  "
              style={{
                wordBreak: "break-all",
                fontWeight: "450",
                color: "#b83016",
              }}
            >
              {d.user_name} -
            </span>
            <div>
              <span className=" fs-10 text-muted">{d.created_at}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <div className="text-center mb-1">Project Journey</div>
          <div className="fs-10 d-flex" style={{ gap: "50px" }}>
            <span>Creation</span>
            <span>Initiation</span>
            <span>Pilot</span>
            <span>Live</span>
          </div>
        </div>
      ),
      selector: (row) => row.difficulty_level,
      sortable: true,
      center: true,
      width: "360px",
      cell: (d) => (
        <div
          style={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
        >
          <div className="text-center fs-12 mb-4 invisible">Lead Journey</div>
          <div style={{ alignSelf: "center" }}>
            {<StepperProject rowData={d} />}
          </div>
          <div style={{ display: "flex", gap: "45px", fontSize: "9px" }}>
            <div className="d-flex flex-column align-items-center gap-1">
              <span style={{ textAlign: "center" }}>{d.created_at}</span>
              {/* <span style={{ fontSize: "8px" }}>HH-MM</span> */}
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <span style={{ textAlign: "center" }}>
                {d?.project_intro_date}
              </span>
              <span style={{ fontSize: "8px" }}>
                {/* {d.lead_maturing_date?.split(" ")[1]} */}
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <span style={{ textAlign: "center" }}>{d?.pilot_date}</span>
              <span style={{ fontSize: "8px" }}>
                {/* {d.hot_lead_date?.split(" ")[1]} */}
              </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <span style={{ textAlign: "center" }}>{d?.live_date}</span>
              <span style={{ fontSize: "8px" }}>
                {/* {d.hot_lead_date?.split(" ")[1]} */}
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="project-table">
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          // onRowClicked={(d) =>
          //   d.live_status == "1"
          //     ? history.push(`project-details/${d?.project_id}`)
          //     : history.push(`project-init/${d?.project_id}`)
          // }
          onRowClicked={(d) => history.push(`project-details/${d?.project_id}`)}
          pagination
          paginationPerPage={5}
          progressPending={isLoading}
          columns={columns}
          data={data}
        />
      </DataTableExtensions>
    </div>
  );
};

export default BusinessProjectTable;
