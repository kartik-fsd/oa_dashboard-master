import { Interweave } from "interweave";
import CountUp from "react-countup";
import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  Progress,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { indianNumbers } from "../../../components/common/indianNumbers";
import TestingCard from "../card/TestingCard";
import MonthlyTable1 from "./TableInvoice";
import MonthlyTable2 from "./MonthlyTable2";
import MonthlyTable3 from "./OtherExpensesTable";
import MonthlyTable4 from "./PayoutTable";
import { api, farming } from "../../../globalConfig";
import { investors_details } from "../../../assets/utils/managementapi";
import axios from "axios";
import { useEffect } from "react";
import InvoiceModal from "./InvoiceModal";
import { project_details } from "../../../assets/utils/Business";
import { Context } from "../../../App";
import FlipModal from "../../BusinessDashVel/FlipModal";
import InvoiceDetails from "../../Finance/Commericals/InvoiceDetails";
import BreadCrumb from "../../../components/common/BreadCrumb";
import AddPayout from "./AddPayout";
import OtherExpensesTable from "./OtherExpensesTable";
import TableInvoice from "./TableInvoice";
import PayoutTable from "./PayoutTable";
import { projDetailsofmonth } from "../../../assets/utils/farmingBase";
import moment from "moment/moment";
import PipelineModal from "../PipelineModal";
import CreateUbr from "./CreateUbr";
import { extract_token } from "../../../assets/utils/common";

const Monthly = () => {
  const cardMap = [
    {
      label: "Billed",
      labelClass: "muted",
      counter: 123456,
      decimals: 0,
      separator: ",",
      suffix: "",
      icon: " ri-exchange-dollar-line",
      iconClass: "success",
      percentage: `+ ${1234}`,
      percentageClass: "primary",
      prefix: "",
    },
    {
      label: "Unbilled",
      labelClass: "muted",
      counter: 123456,
      decimals: 0,
      separator: ",",
      suffix: "",
      icon: " ri-arrow-go-back-line",
      iconClass: "warning",
      percentage: `+ ${1234}`,
      percentageClass: "primary",
      prefix: "",
    },
    {
      label: "Colected",
      labelClass: "muted",
      counter: 123456,
      decimals: 0,
      separator: ",",
      suffix: "",
      icon: " ri-hand-coin-line",
      iconClass: "secondary",
      percentage: `+ ${1234}`,
      percentageClass: "primary",
      prefix: "",
    },
  ];

  const [projectDetails, setProjectDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [overViewData, setOverViewData] = React.useState([]);
  const [modalType, setModalType] = useState("");
  const [modal_animationFlip, setmodal_animationFlip] = useState(false);
  const [context, setContext] = useContext(Context);
  const [modal_edit, set_modal_edit] = useState(false);
  const [modelData, setModelData] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [payoutTotal, setPayoutTotal] = React.useState("");
  const [otherTotal, setOtherTotal] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [eachProjectItem, setEachProjectItem] = React.useState({});
  const [leads, setLeads] = React.useState("");
  // const [detMonth, setDetMonth] = React.useState(tableData);

  const { state } = useLocation();
  const location = useLocation();
  const { tableData, invId, startDate } = state;

  console.log(startDate, "dgetg");

  // ubr mpa_date

  const currentDate = startDate;
  const lastDateOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // console.log(moment(lastDateOfMonth).format("YYYY-MM-DD"), "lastdate");

  //loader
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  console.log(userData, "testingon");

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

  const detMonth = tableData;
  const data = overViewData;

  let fileHead = location.pathname.split("/")[1];

  console.log(tableData.invoice_id, "table123");

  const date = new Date();

  console.log(moment(date).format("MM"), "fzf");

  const getTheModalData = () => {
    let apiData = api.VENDOR_URL + investors_details;
    axios
      .get(apiData, {
        params: {
          sow_id: tableData?.sow_id,

          month: "April",
          year: "2022",
        },
      })
      .then((res) => {
        setProjectDetails(res?.data?.project_details);
        console.log(res.data?.project_details, "projects");
      })
      .catch((err) => console.log(err, "err"));
  };

  const getProjectsApi = () => {
    let projectDetailsURL = api.TASKMO_URL + project_details;
    // setIsLoading(true);
    axios
      .get(projectDetailsURL, {
        params: {
          // project_id: fileHead == "editsow" ? project_id : data.sow_id,
          project_id: tableData.prj_id,
        },
      })
      .then((res) => {
        if (res?.data?.error) {
          // setIsError(true);
        } else {
          // setIsLoading(false);
          setOverViewData(res?.data?.project_details);
          console.log(res.data, "resdata");
        }
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getTheModalData();
    getProjectsApi();
  }, []);

  function tog_animationFlip(d) {
    setModalType(d);
    setmodal_animationFlip(!modal_animationFlip);
  }

  // useEffect(() => {
  //   const link = farming.farming_URL + projDetailsofmonth;
  //   const body = {
  //     month: moment(date).format("MM"),
  //     year: moment(date).format("YYYY"),
  //     sow_id: tableData?.sow_id,
  //     invoice_id: tableData.invoice_id,
  //   };
  //   axios
  //     .post(link, body)
  //     .then((res) => setDetMonth(res.data.data))
  //     .catch((err) => console.log(err));
  // }, []);

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM"); // April (Note that months are zero-indexed in JavaScript, so April is represented as 3)
  const daysInMonth = getDaysInMonth(year, month);
  const todayDate = Number(moment(date).format("DD"));

  console.log(daysInMonth, todayDate, "lion");

  const actMilPerDay = (detMonth?.act_milestone / daysInMonth) * todayDate;
  const expMilePerDay = (detMonth?.exp_milestone / daysInMonth) * todayDate;
  const milePer = (actMilPerDay / expMilePerDay) * 100;

  const actRevPerDay = (detMonth?.act_revenue / daysInMonth) * todayDate;
  const expRevPerDay = (detMonth?.exp_revenue / daysInMonth) * todayDate;
  const revPer = (actRevPerDay / expRevPerDay) * 100;

  const actExpen = (detMonth.act_expenses / daysInMonth) * todayDate;
  const expExpen = (detMonth.exp_expenses / daysInMonth) * todayDate;
  const expenPer = (actExpen / expExpen) * 100;

  const mile = milePer?.toFixed(2);
  const rev = revPer?.toFixed(2);
  const exp = expenPer?.toFixed(2);

  console.log(mile, rev, exp, "percen");

  // const milPer = (detMonth.act_milestone / detMonth.exp_milestone) * 100;
  // const revPer = (detMonth.act_revenue / detMonth.exp_revenue) * 100;
  // const expPer = (detMonth.act_expenses / detMonth.exp_expenses) * 100;

  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div className="page-content">
      <span>
        <BreadCrumb title={""} pageTitle="Sow" />
      </span>
      <Row className="gap-3 mt-2">
        {/* <Col lg={12}>
          <Card className="mt-n3">
            <div>
              <CardBody className="pb-0 px-4">
                <Row className="mb-3">
                  <div className="col-md">
                    <Row className="align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            {
                              <img
                                src="/user-dummy-img.jpg"
                                alt=""
                                className="avatar-md"
                                style={{ borderRadius: "50%" }}
                              />
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div>
                          <h4 className="fw-bold">
                            Project Title
                            <span>&nbsp;-&nbsp;raes23456</span>
                          </h4>
                          <div className="hstack gap-3 flex-wrap mt-2">
                            <div>
                              Company ID :
                              <span
                                className="fw-medium text-info"
                                style={{ cursor: "pointer" }}
                                onClick={() => ""}
                              >
                                12345678
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              <div>
                                Agreement ID :&nbsp;
                                <span
                                  className="fw-medium  text-info"
                                  onClick={() => ""}
                                >
                                  12345678
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className="col-md-auto d-flex align-items-start fs-13 text-dark ">
                    Jan-2022
                  </div>
                </Row>
              </CardBody>
            </div>
          </Card>
        </Col> */}

        <Col lg={12}>
          <Card className="mt-n3 bg-soft-primary ">
            <div>
              <CardBody className="pb-0 px-4">
                <Row className="mb-3">
                  <div className="col-md">
                    <Row className="align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            {
                              <img
                                src={tableData?.brand_logo ?? "/logo512.png"}
                                alt=""
                                className="avatar-md"
                                style={{ borderRadius: "50%" }}
                              />
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div>
                          <div className="d-flex justify-content-between align-items-start">
                            <h4
                              className="fw-bold"
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => setOpen3(!open3)}
                            >
                              {tableData?.project_title}

                              <span>&nbsp;-&nbsp;{data?.sow_id}</span>
                            </h4>
                            <div>
                              {/* <div>
                                <div>
                                  <span
                                    className="fw-medium  fs-11"
                                    style={{
                                      cursor: "pointer",
                                      textDecoration: "underline",
                                         color: "#b83016",
                                    }}
                                    onClick={() => setOpen4(!open4)}
                                  >
                                    {"View Invoice"}
                                  </span>
                                  <span
                                    className="badge badge-soft-primary"
                                    onClick={() => setOpen4(!open4)}
                                  >
                                    View Invoice
                                  </span>
                                </div>
                              </div> */}
                              <div>
                                <UncontrolledDropdown className="dropdown d-inline-block">
                                  <DropdownToggle
                                    style={{
                                      background: "#f4f6f9",
                                      border: "none",
                                      padding: "1px 6px",
                                    }}
                                  >
                                    <i
                                      className="ri-more-fill align-middle"
                                      style={{ color: "black" }}
                                    ></i>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem
                                      className="edit-item-btn d-flex align-items-center"
                                      onClick={() => {
                                        setOpen4(!open4);
                                      }}
                                    >
                                      <i className=" ri-eye-line align-bottom m-0 me-2 text-muted"></i>
                                      View Invoices
                                    </DropdownItem>
                                    {userData?.type == "all" ||
                                    userData?.type == "fin" ? (
                                      <DropdownItem
                                        className="edit-item-btn d-flex align-items-center"
                                        onClick={() => {
                                          setOpen(!open);
                                        }}
                                      >
                                        <i className=" ri-add-circle-line align-bottom m-0 me-2 text-muted"></i>
                                        Create Invoice
                                      </DropdownItem>
                                    ) : (
                                      ""
                                    )}
                                    {userData?.type == "all" ||
                                    userData?.type == "fin" ? (
                                      <DropdownItem
                                        className="edit-item-btn d-flex align-items-center"
                                        onClick={() => {
                                          setOpen5(!open5);
                                        }}
                                      >
                                        <i className=" ri-add-circle-line align-bottom m-0 me-2 text-muted"></i>
                                        Create UBR
                                      </DropdownItem>
                                    ) : (
                                      ""
                                    )}
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                              {/* <div>
                                <span
                                  className="fw-medium  fs-11"
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                       color: "#b83016",
                                  }}
                                  onClick={() => setOpen(!open)}
                                >
                                  {"Create Invoice"}
                                </span>
                              </div> */}
                            </div>
                          </div>
                          <div className="hstack gap-3 flex-wrap mt-2">
                            <div>
                              Company ID :{" "}
                              <span
                                className="fw-medium "
                                style={{ cursor: "pointer", color: "#b83016" }}
                                onClick={() => tog_animationFlip("compId")}
                              >
                                {data?.company_unique_id}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              <div>
                                Agreement ID :&nbsp;
                                <span
                                  className="fw-medium  "
                                  style={
                                    context?.oaDetials?.role == "super_admin" ||
                                    context?.oaDetials?.role == "manager" ||
                                    context?.oaDetials?.role == "head"
                                      ? { cursor: "pointer", color: "#b83016" }
                                      : {
                                          pointerEvents: "none",
                                          color: "#b83016",
                                        }
                                  }
                                  // onClick={() => tog_animationFlip("agreeId")}
                                  onClick={() => set_modal_edit(!modal_edit)}
                                >
                                  {data?.agreement_unique_id}
                                </span>
                              </div>
                              {data?.commercial_status == "pending" ? (
                                <div
                                  style={{
                                    position: "absolute",
                                    marginTop: "1px",
                                  }}
                                >
                                  <p className="text-danger mt-1 fs-10">
                                    Commercial approval pending
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="vr"></div>
                            {/* <div>
                              Lead ID :{" "}
                              <span className="fw-medium">
                              {data?.lead_unique_id}
                              </span>
                              </div>
                            <div className="vr"></div> */}
                            {/* <div>
                              Commercial ID :{" "}
                              <span
                                className="fw-medium text-info"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  tog_animationFlip("commercialId")
                                }
                              >
                                {data?.commercial_unique_id}
                              </span>
                            </div> */}
                            {/* <div className="vr"></div> */}

                            <div>
                              Project ID :{" "}
                              <span className="fw-medium">
                                {tableData?.prj_id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                  {/* <div className="col-md-auto">
                    <div className="hstack gap-1 flex-wrap">
                      <div>
                        <div>Client Name: {data.client_name}</div>
                        <div>Client Number: {data.client_phone}</div>
                        <div>Client Email: {data.client_email}</div>
                        <div>Client Designation: {data.client_designation}</div>
                      </div>
                    </div>
                    {!data.sow_id > 0 && (
                      <button
                        className="btn btn-primary d-flex align-items-center gap-2"
                        onClick={() => setModelData(!modelData)}
                      >
                        <i className="ri ri-add-line"></i>
                        Move
                      </button>
                    )}
                  </div> */}
                </Row>
                <Row className="row-cols-md-3 row-cols-1">
                  <Col className={"col-lg border-end border-top"}>
                    <div className="mt-3 mt-md-0 py-3 px-3">
                      <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                        <span style={{ color: "#b83016" }}>Milestone</span>
                        <div className="d-flex gap-1 justify-content-center align-items-center">
                          <i
                            className={`fs-16 float-end align-middle ${
                              mile > 80
                                ? "text-success ri-arrow-up-circle-line "
                                : mile < 80 && mile > 50
                                ? "text-warning ri-arrow-up-circle-line "
                                : "text-danger ri-arrow-down-circle-line "
                            } `}
                          ></i>
                          <span className="fs-10 " style={{ color: "#b83016" }}>
                            {mile}%
                          </span>
                        </div>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          {/* <i
                            className={
                              "display-6 text-muted ri-space-ship-line"
                            }
                          ></i> */}
                        </div>
                        <div className="flex-grow-1 ">
                          <h2 className="mb-0">
                            <div className="counter-value text-start">
                              {/* <CountUp
                                start={0}
                                prefix={""}
                                suffix={""}
                                separator={","}
                                end={detMonth.act_milestone}
                                decimals={1}
                                duration={2}
                              /> */}
                              <span>
                                {indianNumbers(detMonth?.act_milestone, 2)}
                              </span>
                            </div>
                          </h2>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="mb-0 text-muted d-flex justify-content-between">
                          <div className="d-flex align-items-center gap-1">
                            <i className=" ri-stop-fill text-warning fs-14 "></i>
                            <span className="me-3 fs-10">Performed Target</span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {detMonth.per_milestone}
                            </span>
                          </div>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="mb-0 text-muted d-flex justify-content-between">
                          <div className="d-flex align-items-center gap-1">
                            <i
                              className=" ri-stop-fill  fs-14 "
                              style={{ color: "#b83016" }}
                            ></i>
                            <span className="me-3 fs-10">Set Target</span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {detMonth.exp_milestone}
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col className={"col-lg border-end border-top"}>
                    <div className="mt-3 mt-md-0 py-3 px-3">
                      <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                        <span style={{ color: "#b83016" }}>Revenue</span>
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <i
                            className={`fs-16 float-end align-middle  ${
                              rev > 80
                                ? "text-success ri-arrow-up-circle-line"
                                : rev < 80 && rev > 50
                                ? "text-warning ri-arrow-up-circle-line"
                                : "text-danger ri-arrow-down-circle-line"
                            } `}
                          ></i>
                          <span
                            className="fs-10 "
                            style={{
                              color: "#b83016",
                            }}
                          >
                            {rev}%
                          </span>
                        </div>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          {/* <i
                            className={
                              "display-6 text-muted ri-exchange-dollar-line"
                            }
                          ></i> */}
                        </div>
                        <div className="flex-grow-1 ">
                          <h2 className="mb-0">
                            <div className="counter-value text-start">
                              {/* <CountUp
                                start={0}
                                prefix={"₹"}
                                suffix={""}
                                separator={","}
                                end={detMonth.act_revenue}
                                decimals={1}
                                duration={2}
                              /> */}
                              <span>
                                ₹ {indianNumbers(detMonth.act_revenue, 2)}
                              </span>
                            </div>
                          </h2>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="mb-0 text-muted d-flex justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <i className=" ri-stop-fill text-warning fs-14 "></i>
                            <span className="me-3 fs-10">
                              Performed Revenue
                            </span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {indianNumbers(detMonth.per_revenue, 2)}
                            </span>
                          </div>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="mb-0 text-muted d-flex justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <i
                              className=" ri-stop-fill  fs-14 "
                              style={{
                                color: "#b83016",
                              }}
                            ></i>

                            <span className="me-3 fs-10">Expected Revenue</span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {indianNumbers(detMonth.exp_revenue, 2)}
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col className={"col-lg border-end border-top"}>
                    <div className="mt-3 mt-md-0 py-3 px-3">
                      <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                        <span style={{ color: "#b83016" }}>Expenses</span>
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <i
                            className={`fs-18 float-end align-middle  ${
                              exp > 80
                                ? "text-success ri-arrow-up-circle-line"
                                : exp < 80 && exp > 50
                                ? "text-warning ri-arrow-up-circle-line"
                                : "text-danger ri-arrow-down-circle-line"
                            } `}
                          ></i>
                          <span className="fs-10 " style={{ color: "#b83016" }}>
                            {exp}%
                          </span>
                        </div>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          {/* <i
                            className={
                              "display-6 text-muted ri-logout-box-r-line"
                            }
                          ></i> */}
                        </div>
                        <div className="flex-grow-1 ">
                          <h2 className="mb-0">
                            <div className="counter-value text-start">
                              {/* <CountUp
                                start={0}
                                prefix={"₹"}
                                suffix={""}
                                separator={","}
                                end={123}
                                // decimals={1}
                                duration={2}
                              /> */}
                              <span>
                                ₹ {indianNumbers(detMonth.act_expenses, 2)}
                              </span>
                            </div>
                          </h2>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="mb-0 text-muted d-flex justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <i className=" ri-stop-fill text-warning fs-14 "></i>
                            <span className="me-3 fs-10">Accured Expenses</span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {indianNumbers(detMonth.per_expenses)}
                            </span>
                          </div>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="mb-0 text-muted d-flex justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <i
                              className=" ri-stop-fill  fs-14 "
                              style={{
                                color: "#b83016",
                              }}
                            ></i>
                            <span className="me-3 fs-10">
                              Expected Expenses
                            </span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {indianNumbers(detMonth.exp_expenses)}
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col className={"col-lg  border-top"}>
                    <div className="mt-3 mt-md-0 py-3 px-3">
                      <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                        <span style={{ color: "#b83016" }}>Gross Margin</span>
                        {/* <i
                          className={
                            "fs-18 float-end align-middle ri-arrow-up-circle-line text-success"
                          }
                        ></i> */}
                      </h5>
                      <div className="d-flex align-items-end">
                        <div className="flex-shrink-0">
                          {/* <i
                            className={"display-6 text-muted ri-pulse-line"}
                          ></i> */}
                        </div>
                        <div className="flex-grow-1 ">
                          <h2 className="mb-0">
                            <div className="counter-value text-start">
                              {/* <CountUp
                                start={0}
                                prefix={""}
                                suffix={"%"}
                                separator={","}
                                end={123}
                                // decimals={1}
                                duration={2}
                              /> */}
                              <span>{detMonth.act_g_margin?.toFixed(2)}%</span>
                            </div>
                          </h2>
                        </div>
                      </div>
                      <div className="mt-3 " style={{ width: "100%" }}>
                        <p className="mb-0 text-muted d-flex justify-content-between">
                          <div className="d-flex align-items-center gap-1">
                            <i className=" ri-stop-fill text-warning fs-14 "></i>

                            <span className="me-3 fs-10">Current GM %</span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {detMonth.per_g_margin?.toFixed(2) + "%"}
                            </span>
                          </div>
                        </p>
                      </div>
                      <div className="mt-2" style={{ width: "100%" }}>
                        <p className="mb-0 text-muted d-flex justify-content-between">
                          <div className="d-flex align-items-center gap-1">
                            <i
                              className=" ri-stop-fill  fs-14 "
                              style={{
                                color: "#b83016",
                              }}
                            ></i>

                            <span className="me-3 fs-10">Expected GM %</span>
                          </div>
                          <div>
                            <span
                              className="badge bg-light text-dark mb-0 fs-10"
                              style={{ minWidth: "80px" }}
                            >
                              {detMonth.exp_g_margin?.toFixed(2) + "%"}
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("1");
                      }}
                      href="#"
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "2" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("2");
                      }}
                      href="#"
                    >
                      Client
                    </NavLink>
                  </NavItem>
                </Nav> */}
              </CardBody>
            </div>
          </Card>
        </Col>

        {/* <Col xs="12">
          <Card>
            <CardBody className="pb-0 px-4">
              <Row className="mb-3">
                <div
                  style={{
                    display: "flex",
                    gap: "80px",
                    alignItems: "start",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ paddingTop: "15px" }}>
                    <div className="col-md">
                      <Row className="align-items-center g-3">
                        <div className="col-md-auto">
                          <div className="avatar-md">
                            <div className="avatar-title bg-white rounded-circle">
                              <img
                                loading="lazy"
                                src={
                                  projectDetails.brand_logo
                                    ? projectDetails.brand_logo
                                    : "/logo512.png"
                                }
                                alt=""
                                className="avatar-md"
                                style={{ borderRadius: "50%" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md">
                          <div>
                            <h4 className="fw-bold">
                              {projectDetails.project_title} -
                              {projectDetails.sow_id}
                            </h4>

                            <div className="hstack gap-1 mt-1 fs-11">
                              <div className="me-3 d-flex align-items-center">
                                <i className="ri-ancient-gate-line me-1 text-black-75 fs-14 align-middle "></i>
                                &nbsp;{projectDetails?.company_name}
                                &nbsp;&nbsp;
                              </div>
                              <div className="d-flex align-items-center me-3">
                                <i className="ri-bank-line me-1 text-black-75 fs-14 align-middle"></i>
                                {projectDetails?.industry_type} &nbsp;&nbsp;
                              </div>

                              <div className="d-flex align-items-center me-3">
                                <i className="ri-building-line me-1 text-black-75 fs-14 align-middle"></i>
                                {projectDetails?.brand_name}
                              </div>
                            </div>
                            <div className="hstack gap-3 flex-wrap mt-2">
                              <div>
                                <div
                                  style={{
                                    position: "absolute",
                                    marginTop: "1px",
                                  }}
                                >
                                  <p className="text-danger mt-1 fs-10"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                      marginTop: "5px",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <div>
                      <p className="text-muted text-uppercase fs-14 text-end mb-2">
                        {"MileStone"}
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <i className={"ri-service-line fs-20 text-muted"}></i>
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <h2 className="mb-0">
                            <span className="counter-value" data-target="197">
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={""}
                                separator={","}
                                end={1234}
                                decimals={"0"}
                                duration={4}
                              />
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className=" text-muted">
                  
                    <p>
                      {" "}
                      <Interweave
                        content={projectDetails?.company_discription}
                      />
                    </p>
                  </div>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col> */}
        {/* <Col xs="12">
          <Row className="g-4">
            <Col lg={4}>
              <Row style={{ height: "100%" }}>
                <Col lg={12}>
                  <Card
                    className=""
                    style={{
                      borderRadius: "10px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                    }}
                  >
                    <CardBody>
                      <Row>
                        <Col xl={8} style={{ width: "100%" }}>
                          <div className="mt-xl-0 mt-5">
                            <Row>
                              <Col md={12} className="flex-grow-1">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "25px",
                                  }}
                                >
                                 
                                </div>

                                <div
                                  className="mt-3"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Source
                                    </div>
                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.source_of_lead}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Started on
                                    </div>
                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.start_date}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Category
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp; {projectDetails?.category}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Network
                                    </div>
                                    <div>
                                    
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Payment Per Lead{" "}
                                    </div>

                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.payment_per_lead}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Revenue Per Lead{" "}
                                    </div>

                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.revenue_per_lead}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Sales Leads{" "}
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.sales_leads}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      KAM{" "}
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp; {projectDetails?.kam_name}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Gross Margin{" "}
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.gross_margin}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={8}>
              <Card
                style={{
                  height: "302px",
                  padding: "10px",
                  paddingTop: "0px",
                  borderRadius: "10px",
                  overflow: "scroll",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                }}
              >
                <CardBody>
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">
                      project Details :{" "}
                      <span>
                      
                      </span>
                    </h5>
                    <p>
                      {" "}
                      <Interweave content={projectDetails?.introduction_text} />
                    </p>
                  </div>

                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Target Audience :</h5>
                    <p>
                      <Interweave content={projectDetails?.target_audience} />
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col> */}
        {/* <Col xs="12">
          <MonthlyTable2 cardMap={cardMap} />
        </Col> */}
        {/* <Col xs="12">
          <Card>
            <CardHeader
              className="d-flex justify-content-between align-items-center"
              style={{ height: "66px" }}
            >
              <h5>Invoice</h5>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                style={{ marginRight: "228px" }}
                onClick={() => setOpen(!open)}
              >
                <i className=" ri-add-line align-bottom me-1"></i>
                Invoice
              </button>
            </CardHeader>
            <CardBody>
              <TableInvoice table={tableData} open={open4} setOpen={setOpen4} />
            </CardBody>
          </Card>
        </Col> */}

        <Col xs="12">
          <Card style={{ zIndex: "0" }}>
            <CardHeader
              className="d-flex justify-content-between align-items-center"
              style={{ height: "66px" }}
            >
              <h5
                className=" fw-600 fs-16"
                style={{
                  letterSpacing: "2px",
                  marginLeft: "15px",
                  color: "#b83016",
                }}
              >
                Direct Payout
              </h5>

              <div className="d-flex gap-2">
                <span
                  className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                  style={{
                    height: "40px",
                    minWidth: "150px",
                    marginRight: "2px",
                  }}
                >
                  Total Payout : {indianNumbers(payoutTotal, 2)}
                </span>
                <span
                  className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                  style={{
                    height: "40px",
                    minWidth: "150px",
                    marginRight: "220px",
                  }}
                >
                  Total Leads : {indianNumbers(leads, 2)}
                </span>
              </div>
              {/* <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
                style={{ marginRight: "228px" }}
              >
                <i className=" ri-add-line align-bottom me-1"></i>
                Add exp
              </button> */}
            </CardHeader>
            <CardBody>
              <PayoutTable
                table={tableData}
                setPayoutTotal={setPayoutTotal}
                setLeads={setLeads}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xs="12">
          <Card>
            <CardHeader
              className="d-flex justify-content-between align-items-center"
              style={{ height: "66px" }}
            >
              <h5
                className=" fw-600 fs-16"
                style={{
                  letterSpacing: "2px",
                  marginLeft: "15px",
                  color: "#b83016",
                }}
              >
                Indirect Payout
              </h5>
              <div className="d-flex">
                <div>
                  <span
                    className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                    style={{
                      height: "40px",
                      minWidth: "150px",
                      marginRight: "22px",
                    }}
                  >
                    Total Payout : {indianNumbers(otherTotal, 2)}
                  </span>
                </div>
                {userData?.type == "all" || userData?.type == "fin" ? (
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                    style={{ marginRight: "228px" }}
                    onClick={() => setOpen2(!open2)}
                  >
                    <i className=" ri-add-line align-bottom me-1"></i>
                    Payout
                  </button>
                ) : (
                  ""
                )}
              </div>
            </CardHeader>

            <CardBody>
              <OtherExpensesTable
                table={tableData}
                inv={tableData.invoice_id}
                setOtherTotal={setOtherTotal}
                update={update}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <TestingCard /> */}
      <InvoiceModal open={open} setOpen={setOpen} data={tableData} />
      <FlipModal
        modal_animationFlip={modal_animationFlip}
        setmodal_animationFlip={setmodal_animationFlip}
        tog_animationFlip={tog_animationFlip}
        modalType={modalType}
        data={data}
      />
      <Modal
        id="flipModal"
        tabIndex="-1"
        isOpen={modal_edit}
        toggle={() => {
          set_modal_edit(false);
        }}
        centered={true}
        size="lg"
        modalClassName="flip"
      >
        <ModalBody>
          <InvoiceDetails
            data={tableData.prj_id}
            logo={data?.brand_logo}
            set_modal_edit={set_modal_edit}
            commData={data?.commercial_status}

            // update={update}
            // setUpdate={setUpdate}
          />
        </ModalBody>
      </Modal>
      <AddPayout
        open={open2}
        setOpen={setOpen2}
        tableData={tableData}
        setUpdate={setUpdate}
        update={update}
      />
      <PipelineModal open={open3} setOpen={setOpen3} data={tableData} />
      <TableInvoice
        table={tableData}
        open={open4}
        setOpen={setOpen4}
        userData={userData}
      />
      <CreateUbr
        setOpen={setOpen5}
        open={open5}
        table={tableData}
        lastDate={moment(lastDateOfMonth).format("YYYY-MM-DD")}
      />
    </div>
  );
};

export default Monthly;
