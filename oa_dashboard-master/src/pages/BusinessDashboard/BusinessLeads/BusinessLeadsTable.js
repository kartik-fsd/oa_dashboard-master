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
import "./businessLeads.css";
import Stepper from "./Stepper";
import { useHistory } from "react-router-dom";

const BusinessLeadsTable = ({ data }) => {
  const [activeTab, setactiveTab] = useState(1);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [err, setErr] = React.useState(false);

  console.log(data, "data545");

  const history = useHistory();

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
    // event.currentTarget.className = "error";
  };

  // React.useEffect(() => {
  //   toggleTab(3, 100);
  // }, []);

  // function Stepper({ rowData }) {
  //   React.useEffect(() => {
  //     rowData.lead_nurturing_status == 1 &&
  //     rowData.lead_maturing_status == 0 &&
  //     rowData.hot_lead_status == 0
  //       ? toggleTab(1, 0)
  //       : rowData.lead_nurturing_status == 1 &&
  //         rowData.lead_maturing_status == 1 &&
  //         rowData.hot_lead_status == 0
  //       ? toggleTab(2, 50)
  //       : rowData.lead_nurturing_status == 1 &&
  //         rowData.lead_maturing_status == 1 &&
  //         rowData.hot_lead_status == 1
  //       ? toggleTab(3, 100)
  //       : toggleTab(1, 0);
  //   }, []);

  //   return (
  //     <>

  //     </>
  //   );
  // }

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
              className="fs-11  text-secondary"
              style={{ wordBreak: "break-all", fontWeight: "450" }}
            >
              {d.company_name}
            </span>
            <div>
              <span
                className="badge  fs-7 cursor-pointer"
                style={{ backgroundColor: "#fa8f5c", color: "#E8E9EB" }}
                onClick={() => {
                  history.push(
                    `/business-dashboard/clientDetails/${d.lead_id}`
                  );
                }}
              >
                {d.lead_unique_id}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Intermediate Details",
      selector: (row) => row.client_name,
      sortable: true,
      width: "250px",
      cell: (d) => (
        <div>
          {/* <div className="d-flex flex-column gap-1">
            <div>
              <span className="fs-10">Name&nbsp;:</span>
              <span className="fs-12">&nbsp;{d.client_name}</span>
            </div>

            <div>
              <span className="fs-10">Phone&nbsp;:</span>
              <span className="fs-12">&nbsp;{d.client_phone}</span>
            </div>
            <div>
              <span className="fs-10">Email&nbsp;:</span>
              <span className="fs-12">&nbsp;{d.client_email}</span>
            </div>
          </div> */}
          <p className="m-0 fs-12 text-capitalize"> {d.client_name} </p>
          <p className="m-0 fs-10 text-muted "> {d.client_email} </p>
          <p className="m-0 fs-10 text-muted  "> {d.client_phone} </p>
        </div>
      ),
    },
    // {
    //   name: "Created By",
    //   selector: (row) => row.user_name,
    //   width: "130px",
    //   sortable: true,
    //   center: true,
    //   cell: (d) => <div className="fs-12">{d.user_name}</div>,
    // },
    // {
    //   name: "Created On",
    //   selector: (row) => row.created_at,
    //   sortable: true,
    //   center: true,
    //   cell: (d) => (
    //     // <div className="fs-12">08-12-2023&nbsp;@&nbsp;00:00&nbsp;pm</div>
    //     <div className="fs-12">{d.created_at}</div>
    //   ),
    // },
    {
      name: "Created By",
      selector: (row) => row.user_name,
      width: "150px",
      sortable: true,
      center: true,
      cell: (d) => <div className="fs-12">{d.user_name}</div>,
    },
    {
      name: "Created On",
      selector: (row) => row.created_at,
      sortable: true,
      center: true,
      cell: (d) => (
        // <div className="fs-12">08-12-2023&nbsp;@&nbsp;00:00&nbsp;pm</div>
        <div className="fs-12">{d.created_at}</div>
      ),
    },
    {
      name: (
        <div>
          <div className="text-center mb-1">Lead Journey</div>
          <div className="fs-10 d-flex" style={{ gap: "56px" }}>
            <span>Nurturing</span>
            <span>Maturing</span>
            <span>Hot Lead</span>
            <span>Initiation</span>
          </div>
        </div>
      ),
      selector: (row) => row.difficulty_level,
      sortable: true,
      center: true,
      width: "400px",
      cell: (d) => (
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "6px",
          }}
        >
          <div className="text-center fs-12 mb-3 invisible">Lead Journey</div>
          <div style={{ alignSelf: "center" }}>{<Stepper rowData={d} />}</div>
          <div style={{ display: "flex", gap: "55px", fontSize: "9px" }}>
            <div className="d-flex flex-column align-items-center gap-1">
              <span>{d.lead_nurturing_date}</span>
              {/* <span style={{ fontSize: "8px" }}>HH-MM</span> */}
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <span>{d.lead_maturing_date?.split(" ")[0]}</span>
              {/* <span style={{ fontSize: "8px" }}>
                {d.lead_maturing_date?.split(" ")[1]}
              </span> */}
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <span>{d.hot_lead_date?.split(" ")[0]}</span>
              {/* <span style={{ fontSize: "8px" }}>
                {d.hot_lead_date?.split(" ")[1]}
              </span> */}
            </div>
            <div className="d-flex flex-column align-items-center gap-1">
              <span>{d.project_initiation_date?.split(" ")[0]}</span>
              {/* <span style={{ fontSize: "8px" }}>
                {d.hot_lead_date?.split(" ")[1]}
              </span> */}
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
    <div className="lead-table">
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          pagination
          paginationPerPage={5}
          columns={columns}
          data={data}
          onRowClicked={(d) =>
            history.push(`/business-dashboard/clientDetails/${d.lead_id}`)
          }
        />
      </DataTableExtensions>
    </div>
  );
};

export default BusinessLeadsTable;
