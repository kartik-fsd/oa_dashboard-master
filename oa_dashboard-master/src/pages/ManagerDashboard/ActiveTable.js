import React from "react";
import DataTable from "react-data-table-component";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import CreateInvModal from "./CreateInvModal";
import DataTableExtensions from "react-data-table-component-extensions";
import { useHistory, useLocation } from "react-router-dom";
import { indianNumbers } from "../../components/common/indianNumbers";
import "./activetable.css";
import { api } from "../../globalConfig";
import { extract_token } from "../../assets/utils/common";
import axios from "axios";

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

const ActiveTable = ({
  finData,
  finCheck,
  setFinCheck,
  year,
  month,
  loading,
  startDate,
}) => {
  const [openInv, setOpenInv] = React.useState(false);
  const [projectData, setProjectData] = React.useState({});
  const [invId, setInvid] = React.useState("");
  const history = useHistory();
  const location = useLocation();

  //loader
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  console.log(userData, "findata");

  // milestone
  const milPerf = (250 / 500) * 100;
  const milApp = (200 / 500) * 100;

  // revenue

  const revPerf = (20000 / 100000) * 100;
  const revApp = (40000 / 100000) * 100;

  // expenses

  const exp = (20000 / 35000) * 100;

  // billing

  console.log(milPerf, "perf");

  const getTokenDetails = () => {
    let tokenapi = api.VENDOR_URL + extract_token;
    setIsLoading(true);
    axios
      .get(tokenapi)
      .then((res) => {
        setIsLoading(false);
        setUserData({ role: res.data.role, type: res.data.type });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getTokenDetails();
  }, []);

  const columns = [
    {
      name: "Project Details",
      // width: "100px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: location.pathname !== "/finance/project/active" ? true : false,
      width: "180px",
      // center: true,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {/* {d?.brand_logo ? (
                <img
                  src={d?.brand_logo}
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              ) : (
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary  " style:{{  color: "#b83016"}}>
                    {d?.brand_name[0]}
                  </div>
                </div>
              )} */}
              <div
                className={`flex-shrink-0 chat-user-img ${d?.add_lead_status} "user-own-img gap-2`}
              >
                <img
                  src={d?.brand_logo}
                  alt="brandlogo"
                  className="rounded-circle avatar-xs"
                />
                <span className="user-status"></span>
              </div>
            </div>

            <div>
              <div
                className="fs-11"
                style={{
                  cursor: d?.invoice_id !== null ? "pointer" : "default",
                }}
                onClick={() => {
                  if (d?.invoice_id !== null) {
                    history.push(`/management/monthly/${d?.sow_id}`, {
                      tableData: d,
                      invId: invId,
                      startDate: startDate,
                    });
                    setInvid(d?.invoice_id);
                  }
                }}
              >
                <span
                  className={`${
                    d?.invoice_id !== null ? "text-decoration-underline " : ""
                  }   fs-11`}
                  style={{ color: "#b83016" }}
                >
                  {d?.brand_name}
                </span>
                -{d?.sow_id}
                {/* {d?.invoice_id !== null ? (
                  <span>
                    <i className=" bx bxs-badge-check align-middle text-success"></i>
                  </span>
                ) : (
                  <></>
                )} */}
              </div>
              <div
                className="fs-10 text-muted"
                style={{ wordBreak: "break-word" }}
              >
                {d?.project_title}
              </div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div className="fs-10 text-muted ">
                  <span
                    className={`badge  ${
                      d?.invoice_id == null
                        ? "cursor-pointer badge-soft-danger"
                        : "badge-soft-primary"
                    }`}
                    onClick={() => {
                      if (
                        d?.invoice_id == null &&
                        (userData?.type == "all" || userData?.type == "fin")
                      ) {
                        setOpenInv(!openInv);
                        setProjectData(d);
                      }
                    }}
                  >
                    {d?.invoice_id == null
                      ? userData?.type == "all" || userData?.type == "fin"
                        ? "Create MPA"
                        : ""
                      : `MPA${d?.invoice_id}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      name: "GM",
      selector: (row) => row.act_g_margin,
      cell: (d) => (
        <span
          className={`${
            d?.act_g_margin?.toFixed(0) < 18
              ? "badge-soft-danger"
              : d?.act_g_margin?.toFixed(0) < 25 &&
                d?.act_g_margin?.toFixed(0) >= 18
              ? "badge-soft-warning"
              : d?.act_g_margin?.toFixed(0) >= 25 &&
                d?.act_g_margin?.toFixed(0) <= 100
              ? "badge-soft-success"
              : ""
          }`}
          style={{
            fontWeight: 900,
            borderRadius: "50%",
            padding: "6px",
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
        >
          {d?.act_g_margin?.toFixed(0)}
        </span>
      ),
      center: true,
      width: "60px",
    },

    {
      name: "Milestone",
      width: "200px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: location.pathname == "/finance/project/active" ? false : true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={11} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1 invisible"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0 invisible">Milestone</p>
              <p className="m-0">{d?.exp_milestone}</p>
            </div>
            <UncontrolledTooltip
              placement="top"
              target={(window.onload = `mil-${d?.sow_id}`)}
              style={{
                background: "#DCE0EA",
                // zIndex: "1000000",
                color: "black",
              }}
            >
              <div className="table-container">
                <table>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i
                          className="ri-stop-fill  fs-14"
                          style={{ color: "#b83016" }}
                        ></i>
                        <span className="me-3 fs-10">Set Target</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.exp_milestone)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="ri-stop-fill text-warning fs-14"></i>
                        <span className="me-3 fs-10">Perfomed</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.per_milestone)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="ri-stop-fill text-success fs-14"></i>
                        <span className="me-3 fs-10">Approved</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.act_milestone)}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </UncontrolledTooltip>
            <div
              className="progress"
              id={`mil-${d?.sow_id}`}
              style={{ background: "#f2f2f2" }}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success "
                role="progressbar"
                style={{
                  width: `${(
                    ((d?.per_milestone / d?.exp_milestone) *
                      100 *
                      d?.act_milestone) /
                    d?.per_milestone
                  ).toFixed(2)}%`,
                }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {/* {(
                  ((d?.per_milestone / d?.exp_milestone) *
                    100 *
                    d?.act_milestone) /
                  d?.per_milestone
                ).toFixed(2)} */}
              </div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning "
                role="progressbar"
                style={{
                  width: `${(
                    (d?.per_milestone / d?.exp_milestone) * 100 -
                    ((d?.per_milestone / d?.exp_milestone) *
                      100 *
                      d?.act_milestone) /
                      d?.per_milestone
                  )?.toFixed(2)}%`,
                }}
                // style={{ width: "50%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {/* {(
                  (d?.per_milestone / d?.exp_milestone) * 100 -
                  ((d?.per_milestone / d?.exp_milestone) *
                    100 *
                    d?.act_milestone) /
                    d?.per_milestone
                )?.toFixed(2)} */}
              </div>
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "Revenue",
      width: "200px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: location.pathname == "/finance/project/active" ? false : true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={11} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1 invisible"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0 invisible">Revenue</p>
              <p className="m-0">{d?.exp_revenue}</p>
            </div>
            <UncontrolledTooltip
              placement="top"
              target={(window.onload = `rev-${d?.sow_id}`)}
              style={{
                background: "#DCE0EA",
                zIndex: "1000000",
                color: "black",
              }}
            >
              <div className="table-container">
                <table>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i
                          className="ri-stop-fill  fs-14"
                          style={{ color: "#b83016" }}
                        ></i>
                        <span className="me-3 fs-10">Expected</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.exp_revenue)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="ri-stop-fill text-warning fs-14"></i>
                        <span className="me-3 fs-10">Perfomed</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.per_revenue)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="ri-stop-fill text-success fs-14"></i>
                        <span className="me-3 fs-10">Approved</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.act_revenue)}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </UncontrolledTooltip>

            <div
              className="progress"
              id={`rev-${d?.sow_id}`}
              style={{ background: "#f2f2f2" }}
            >
              <div
                id={`tooltipTop-${d?.sow_id}`}
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                role="progressbar"
                style={{
                  width: `${(
                    ((d?.per_revenue / d?.exp_revenue) * 100 * d?.act_revenue) /
                    d?.per_revenue
                  ).toFixed(2)}%`,
                }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {/* {(
                  ((d?.per_revenue / d?.exp_revenue) * 100 * d?.act_revenue) /
                  d?.per_revenue
                ).toFixed(2)} */}
              </div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning "
                role="progressbar"
                style={{
                  width: `${(
                    (d?.per_revenue / d?.exp_revenue) * 100 -
                    ((d?.per_revenue / d?.exp_revenue) * 100 * d?.act_revenue) /
                      d?.per_revenue
                  )?.toFixed(2)}%`,
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {/* {(
                  (d?.per_revenue / d?.exp_revenue) * 100 -
                  ((d?.per_revenue / d?.exp_revenue) * 100 * d?.act_revenue) /
                    d?.per_revenue
                )?.toFixed(2)} */}
              </div>
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "Expenses",
      width: "200px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: location.pathname == "/finance/project/active" ? false : true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={11} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1 invisible"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0 invisible">expenses</p>
              <p className="m-0">{d?.exp_expenses}</p>
            </div>
            <UncontrolledTooltip
              placement="top"
              target={(window.onload = `exp-${d?.sow_id}`)}
              style={{
                background: "#DCE0EA",
                zIndex: "1000000",
                color: "black",
              }}
            >
              <div className="table-container">
                <table>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i
                          className="ri-stop-fill  fs-14"
                          style={{ color: "#b83016" }}
                        ></i>
                        <span className="me-3 fs-10">Expected</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.exp_expenses)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="ri-stop-fill text-warning fs-14"></i>
                        <span className="me-3 fs-10">Accured</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.per_expenses)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="ri-stop-fill text-success fs-14"></i>
                        <span className="me-3 fs-10">Paid</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="me-3 fs-10"
                        style={{ justifyContent: "flex-end" }}
                      >
                        {indianNumbers(d?.act_expenses)}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </UncontrolledTooltip>

            <div
              className="progress"
              style={{ background: "#f2f2f2" }}
              id={`exp-${d?.sow_id}`}
            >
              <div
                id={`tooltipTop-${d?.sow_id}`}
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                role="progressbar"
                style={{
                  width: `${(
                    ((d?.per_expenses / d?.exp_expenses) *
                      100 *
                      d?.act_expenses) /
                    d?.per_expenses
                  ).toFixed(2)}%`,
                }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {/* {(
                  ((d?.per_revenue / d?.exp_revenue) * 100 * d?.act_revenue) /
                  d?.per_revenue
                ).toFixed(2)} */}
              </div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                role="progressbar"
                style={{
                  width: `${(
                    (d?.per_expenses / d?.exp_expenses) * 100 -
                    ((d?.per_expenses / d?.exp_expenses) *
                      100 *
                      d?.act_expenses) /
                      d?.per_expenses
                  )?.toFixed(2)}%`,
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {/* {(
                  (d?.per_revenue / d?.exp_revenue) * 100 -
                  ((d?.per_revenue / d?.exp_revenue) * 100 * d?.act_revenue) /
                    d?.per_revenue
                )?.toFixed(2)} */}
              </div>
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: (
        <div style={{ fontSize: "12px", fontWeight: "500" }}>
          <div>Billing (YTD) </div>
        </div>
      ),
      width: "200px",
      selector: (row) => row.sow_id,
      sortable: true,
      // omit: true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={11} className="mb-3">
            <div
              className=" d-flex justify-content-between mb-1 invisible"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0 invisible">Expenses</p>
              <p className="m-0">35000</p>
              <UncontrolledTooltip
                placement="top"
                target={(window.onload = `bill-${d?.sow_id}`)}
                style={{
                  background: "#DCE0EA",
                  zIndex: "1000000",
                  color: "black",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                  }}
                >
                  <div className="table-container">
                    <table>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <i
                              className="ri-stop-fill  fs-14"
                              style={{ color: "grey" }}
                            ></i>
                            <span className="me-3 fs-10">ATD</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className="me-3 fs-10"
                            style={{ justifyContent: "flex-end" }}
                          >
                            {indianNumbers(d?.atd)}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <i
                              className="ri-stop-fill  fs-14"
                              style={{ color: "#b83016" }}
                            ></i>
                            <span className="me-3 fs-10">BTD</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className="me-3 fs-10"
                            style={{ justifyContent: "flex-end" }}
                          >
                            {indianNumbers(d?.billed_amt)}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </UncontrolledTooltip>
            </div>
            <div className="progress" id={`bill-${d?.sow_id}`}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{
                  width: `${(d?.billed_amt / d?.atd) * 100}%`,
                  backgroundColor: "#ec5c24",
                  color: "#ffffff",
                }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              {/* <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-primary "
                role="progressbar"
                style={{ width: `${(d?.atd / d?.atd) * 100}%` }}
                aria-valuenow="40"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div> */}
            </div>
            <div className="d-flex justify-content-between invisible">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "Billing",
      width: "200px",
      selector: (row) => row.sow_id,
      sortable: true,
      omit: true,

      // center: true,
      cell: (d) => (
        <>
          <Col lg={11} className="mb-3 ">
            <div
              className=" d-flex justify-content-between mb-1"
              style={{ fontSize: "10px" }}
            >
              <p className="m-0 invisible">Billing</p>
              {/* <p className="m-0">100000</p> */}
            </div>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated "
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>

              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-danger"
                role="progressbar"
                style={{ width: "30%" }}
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                role="progressbar"
                style={{ width: "45%" }}
                aria-valuenow="45"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="m-0" style={{ fontSize: "9px", width: "25%" }}>
                Billed
              </p>
              <p className="m-0" style={{ fontSize: "9px", width: "30%" }}>
                Unbilled
              </p>
              <p className="m-0" style={{ fontSize: "9px", width: "45%" }}>
                Collected
              </p>
            </div>
          </Col>
        </>
      ),
    },
    {
      name: "",
      right: true,
      omit: true,
      width: "50px",
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              style={{
                background: "#fff",
                border: "none",
              }}
            >
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {d?.invoice_id == null ? (
                <DropdownItem
                  className={
                    " edit-item-btn d-flex align-items-center " +
                    `${d?.invoice_id == null ? "" : "d-none"}`
                  }
                  onClick={() => {
                    setOpenInv(!openInv);
                    setProjectData(d);
                  }}
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                  Create Invoice Account
                </DropdownItem>
              ) : (
                <DropdownItem className=" edit-item-btn d-flex align-items-center ">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                  Invoice Account Created
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];
  const tableData = {
    columns: columns,
    data: finData,
  };

  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div>
      <div className="myactivetable">
        <DataTableExtensions
          {...tableData}
          export={false}
          filterPlaceholder={`Search`}
          // className="filter_text"
          // style={{ paddingRight: "25px important" }}
        >
          <DataTable
            columns={columns}
            data={finData}
            theme="VendorTable"
            // pagination
            expandableRows={false}
            // expandableRows={userType == "om" ? true : false}
            //   expandableRowsComponent={ExpandableRowComponent}
            expandableRowsHideExpander //hide the arrow icon on the left
            progressPending={loading}
            expandOnRowClicked={true}
            customStyles={customStyles}
            // onRowClicked={(d) => {
            //   if (d?.invoice_id !== null) {
            //     history.push(`/management/monthly/${d?.sow_id}`, {
            //       tableData: d,
            //     });
            //   }
            // }}
          />
        </DataTableExtensions>
      </div>
      <CreateInvModal
        open={openInv}
        setOpen={setOpenInv}
        data={projectData}
        setFinCheck={setFinCheck}
        finCheck={finCheck}
        year={year}
        month={month}
      />
    </div>
  );
};

export default ActiveTable;
