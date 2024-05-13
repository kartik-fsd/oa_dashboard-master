import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  Input,
} from "reactstrap";
import TableForManager from "./TableForManager";
import Flatpickr from "react-flatpickr";
import { api, farming } from "../../globalConfig";
import { overall_projects } from "../../assets/utils/sow";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import {
  aravindSowAdd,
  create_sow,
  insert_manager_target,
  lsit_of_managers,
  managers_oa,
  work_id_manager,
  active_sow,
  add_campaign,
} from "../../assets/utils/dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerAdd from "./managerChanges/ManagerAdd";
import ManagerEdit from "./managerChanges/ManagerEdit";
import { extract_token } from "../../assets/utils/common";
import { title } from "../../common/pathName";
import { business_projects } from "../../assets/utils/Business";
import {
  invActiveproj,
  projDetailsofmonth,
} from "../../assets/utils/farmingBase";
import ActiveTable from "./ActiveTable";
import { indianNumbers } from "../../components/common/indianNumbers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DailyDowloadMod from "../Management/Week/DailyDowloadMod";

const ManagerDashboard = () => {
  const { modal_signUpModals_1, openModalside, closeModalside } =
    useContext(AppContext);

  const colorStyles = {
    control: (styles) => ({ ...styles, height: "35px" }),
  };

  const location = useLocation();
  console.log(location.pathname, "testingpathname");
  const [formData, setFormData] = React.useState({});
  const [modal_signUpModals, set_modal_signUpModals] = React.useState(false);
  const [loop, set_loop] = React.useState([]);
  const [projectsData, setProjectsData] = React.useState([]);
  const [show, setShow] = useState(false);
  const [modal_edit, set_modal_edit] = useState(false);
  const [dm_open, setDm_open] = useState(false);
  const [nextData, setNextData] = useState(true);
  const [card, setCard] = useState({});
  const [sowId, setSowId] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [userType, setUserType] = React.useState("");
  const [oashow, setOaShow] = React.useState(false);
  const [switchData, setSwitchData] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [switchDataD, setSwitchDataD] = React.useState(false);

  //loader for findarta
  const [loadingFin, setIsLoadingFin] = React.useState(false);

  const path = useLocation();
  const final = path.pathname.slice(1);
  const split = final.split("/");
  const Cap = split[0][0].toUpperCase() + split[0].slice(1);

  // const [managerList, setManagerList] = useState([]);
  // const [managerDetails, setManagerDetails] = useState({});

  //sorting react
  const [sortBy, setsortBy] = useState(null);

  //url
  const searchProjectUrl = api.OA_URL + overall_projects;
  const createSowUrl = api.OA_URL + create_sow;
  const managersListUrl = api.VENDOR_URL + lsit_of_managers;
  const insertManagerTargetUrl = api.VENDOR_URL + insert_manager_target;
  const getActiveSow = api.OA_URL + active_sow;
  const postCampaign = api.OA_URL + add_campaign;
  const [managerData, setManagerData] = React.useState([]);
  const [oaData, setOaData] = React.useState([]);
  const [workteam, setWorkTeam] = React.useState("");
  const [check1, setCheck1] = React.useState(false);
  const [sow, setSow] = React.useState([]);
  const [dmSow, setDmSow] = React.useState("");
  const [dmCamp, setDmCamp] = React.useState("");
  const [campLink, setCampLink] = React.useState("");
  const [financeData, setFinanceData] = React.useState([]);
  const [finCheck, setFinCheck] = React.useState(false);
  const [detMonth, setDetMonth] = React.useState({});

  const params = useParams();

  const tit = location.pathname.split("/");

  if (tit.includes("business")) {
    document.title = "OnX | Business";
  }
  if (tit.includes("finance")) {
    document.title = "Onx | Finance";
  } else {
    document.title = "OnX | Operations";
  }

  useEffect(() => {
    axios
      .get(searchProjectUrl)
      .then((res) => {
        setProjectsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    let pathname = api.VENDOR_URL + work_id_manager;
    setIsLoading(true);
    axios
      .get(pathname)
      .then((res) => {
        setManagerData(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "err");
        setIsErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (oashow) {
      delete formData.oa_work_id;
      let pathname = api.VENDOR_URL + managers_oa;
      // setOaShow(false)
      axios
        .get(pathname, { params: { work_team: workteam } })
        .then((res) => {
          // setOaShow(true)
          setOaData(res?.data?.data);
        })
        .catch((err) => console.log(err, "errint"));
    }
  }, [formData.oa_work_id, oashow, searchProjectUrl, workteam]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(createSowUrl, formData)
      .then((res) => {
        setSowId(res.data.id);
        if (sortBy.ref_project_id > 0) {
          const enterAravind = {
            project_id: sortBy.ref_project_id,
            sow_id: res.data.id,
            sow_date: formData.start_date,
            sow_status: 1,
            ref_table_name: formData.ref_table_name,
          };
          axios
            .patch(aravindSowAdd, enterAravind)
            .then((res) => {
              console.log("success res");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          // setNextData(false);
          closeModalside();
          setCheck1(!check1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const pathname = api.VENDOR_URL + extract_token;
    setIsLoading(true);
    axios
      .get(pathname)
      .then((res) => {
        setIsLoading(false);
        setUserType(res.data.type);
      })
      .catch((err) => setIsErr(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const handleChange = (e) => {
    if (e.target == undefined) {
      const name = "start_date";
      const value = moment(e[0]).format("YYYY-MM-DD");
      setFormData({ ...formData, [name]: value });
    } else if (e.target.name == "manager_work_id") {
      const data = e.target.value.split(",");
      setWorkTeam(data[1]);
      setFormData({ ...formData, [e.target.name]: data[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleChange1 = (e) => {
    const name = "end_date";
    const value = moment(e[0]).format("YYYY-MM-DD");
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (index) => {
    // const dataDelete = loop;
    loop[`${index}`].status = false;
    set_loop([...loop]);
  };
  const handleChange2 = (e, index) => {
    loop[`${index}`].target_date = moment(e[0]).format("YYYY-MM-DD");
  };

  const handleChange3 = (e, index) => {
    loop[`${index}`].manager_target = e.target.value;
  };

  const submitManager = (e) => {
    e.preventDefault();
    const filterFinal = loop.filter((loo) => loo.status == true);

    axios.post(insertManagerTargetUrl, filterFinal).then((res) => {
      if (res.data?.error) {
        toast("Something went wrong", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      } else {
        toast("success", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        set_modal_signUpModals(false);
      }
    });
  };

  const activeSow = () => {
    axios
      .get(getActiveSow)
      .then((res) => {
        setSow(res.data.sows);
      })
      .catch((err) => console.log(err, "err"));
  };

  const dmModal = () => {
    setDm_open(true);
    activeSow();
  };

  const handleAddCampaign = (e) => {
    e.preventDefault();
    const body = {};
    body.campaign_name = dmCamp;
    body.sow_id = dmSow;

    axios
      .post(postCampaign, body)
      .then((res) => {
        setCampLink(res.data.link);
      })
      .catch((err) => console.log(err));
    setDm_open(false);
  };

  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate the next month
  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;

  // Handle cases where the current month is December
  // Calculate the previous month
  let previousMonth = currentMonth - 1;
  let previousYear = currentYear;

  // Handle cases where the current month is January
  if (previousMonth < 0) {
    previousMonth = 11;
    previousYear--;
  }

  // Set the new month and year
  currentDate.setMonth(previousMonth);
  currentDate.setFullYear(previousYear);

  const [startDate, setStartDate] = React.useState(
    new Date().getDate() >= 25 ? new Date() : currentDate
  );
  React.useEffect(() => {
    const link =
      farming.farming_URL +
      invActiveproj +
      "/" +
      (startDate.getMonth() + 1) +
      "/" +
      startDate.getFullYear();
    setIsLoadingFin(true);
    axios
      .get(link)
      .then((res) => {
        setIsLoadingFin(false);
        setFinanceData(res.data.data);
        setDetMonth(res.data.totaldata);
        console.log(res.data, "resdata");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingFin(false));
  }, [finCheck, startDate]);

  const date = new Date();

  // useEffect(() => {
  //   const link = farming.farming_URL + projDetailsofmonth;
  //   const body = {
  //     month: moment(date).format("MM"),
  //     year: moment(date).format("YYYY"),
  //     sow_id: 1477,
  //     invoice_id: 837,
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

  const actMilPerDay = (detMonth?.act_milestone / daysInMonth) * todayDate;
  const expMilePerDay = (detMonth?.exp_milestone / daysInMonth) * todayDate;
  const milePer = (actMilPerDay / expMilePerDay) * 100;

  const actRevPerDay = (detMonth?.act_revenue / daysInMonth) * todayDate;
  const expRevPerDay = (detMonth?.exp_revenue / daysInMonth) * todayDate;
  const revPer = (actRevPerDay / expRevPerDay) * 100;

  const actExpen = (detMonth?.act_expenses / daysInMonth) * todayDate;
  const expExpen = (detMonth?.exp_expenses / daysInMonth) * todayDate;
  const expenPer = (actExpen / expExpen) * 100;

  const mile = milePer?.toFixed(2);
  const rev = revPer?.toFixed(2);
  const exp = expenPer?.toFixed(2);
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    // <button className="example-custom-input" onClick={onClick} ref={ref}>
    //   {value}
    // </button>
    <input value={value} onClick={onClick} className="example-custom-input" />
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between align-items-center"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5
                className="fw-600 fs-16"
                style={{
                  letterSpacing: "2px",
                  marginLeft: "15px",
                  color: "#b83016",
                }}
              >
                {location.pathname == "/my-projects/new"
                  ? "New Projects"
                  : location.pathname == "/my-projects/active"
                  ? "Active Projects"
                  : location.pathname == "/my-projects/onhold"
                  ? "Onhold Projects"
                  : location.pathname == "/my-projects/closed"
                  ? "Closed Projects"
                  : location.pathname == "/business/project/active"
                  ? "Active"
                  : ""}
                <div>
                  {window.location.pathname == "/my-projects/active" ||
                  window.location.pathname == "/business/project/active" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <div
                        className="form-check form-switch"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Input
                          className="form-check-input mt-2"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          style={{ width: "30px" }}
                          onChange={(e) => {
                            setSwitchData(e.target.checked);
                            // handleChangeTaskers(e.target.checked);
                          }}
                        />
                      </div>
                      <span className=" fs-6 fw-500 mt-2">
                        {switchData ? (
                          <strong>All </strong>
                        ) : (
                          <strong>Active </strong>
                        )}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </h5>
              <div style={{ marginLeft: "228px" }}>
                <h5
                  className=" fw-600 fs-16"
                  style={{
                    letterSpacing: "2px",
                    marginLeft:
                      location.pathname == "/finance/project/active" ||
                      location.pathname == "/business/project"
                        ? "-351px"
                        : "15px",
                    color: "#b83016",
                  }}
                >
                  {/* {location.pathname == "/my-projects/new"
                    ? "New Projects"
                    : location.pathname == "/my-projects/active"
                    ? "Active Projects"
                    : location.pathname == "/my-projects/onhold"
                    ? "Onhold Projects"
                    : location.pathname == "/my-projects/closed"
                    ? "Closed Projects"
                    : ""}

                  {location.pathname == "/business/project/new"
                    ? "New Projects"
                    : location.pathname == "/business/project/active"
                    ? "Active Projects"
                    : location.pathname == "/business/project/onhold"
                    ? "Onhold Projects"
                    : location.pathname == "/business/project/closed"
                    ? "Closed Projects"
                    : ""} */}

                  {location.pathname == "/finance/project/active" ||
                  location.pathname == "/business/project"
                    ? "MP Accounts"
                    : ""}
                </h5>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {location.pathname == "/finance/project/active" ||
                location.pathname == "/business/project" ? (
                  <div>
                    <i
                      className=" ri-download-2-line "
                      style={{
                        fontSize: "24px",
                        cursor: "pointer",
                        color: "#b83016",
                      }}
                      onClick={() => setOpenD(!openD)}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
                <div style={{ height: "35px", marginRight: "240px" }}>
                  <div className="d-flex gap-2" style={{ height: "40px" }}>
                    {/* <Flatpickr
                        className="form-control"
                        placeholder="Date"
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "Y-m-d",
                          defaultDate: new Date(),
                        }}
                        onChange={(e) => {
                          setDate(e[0]);
                          filterBasedOnDate(e[0]);
                        }}
                      /> */}
                    {location.pathname == "/finance/project/active" ||
                    location.pathname == "/business/project" ? (
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM-yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        showFourColumnMonthYearPicker
                        customInput={<ExampleCustomInput />}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              {userType == "all" && location.pathname == "/my-projects/new" ? (
                <></>
              ) : // <button
              //   className="btn btn-primary"
              //   onClick={openModalside}
              //   style={{ marginRight: "220px" }}
              // >
              //   <i
              //     className="ri-add-line align-middle me-1 "
              //     style={{ marginBottom: "30px" }}
              //   ></i>
              //   New Project
              // </button>
              userType == "all" && location.pathname == "/my-projects/dm" ? (
                <button
                  className="btn"
                  onClick={dmModal}
                  style={{ marginRight: "220px", backgroundColor: "#ec5c24" }}
                >
                  <i
                    className="ri-add-line align-middle me-1 "
                    style={{ marginBottom: "30px" }}
                  ></i>
                  DM
                </button>
              ) : (
                ""
              )}
              {/* <button
                className="btn btn-primary "
                onClick={() => set_modal_edit(true)}
              >
                <i className="ri-add-line align-middle me-1"></i> EDIT SOW
              </button> */}
            </CardHeader>
            <CardBody>
              {location.pathname == "/finance/project/active" ||
              location.pathname == "/business/project" ? (
                <div>
                  <Row
                    className="row-cols-md-3 row-cols-1 m-2 bg-soft-primary"
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    <Col className={"col-lg border-end "}>
                      <div className="mt-3 mt-md-0 py-3 px-3">
                        <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                          <span style={{ color: "#400f0a" }}>Milestone</span>
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
                            <span className="fs-10 ">{mile}%</span>
                          </div>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0"></div>
                          <div className="flex-grow-1 ">
                            <h2 className="mb-0">
                              <div className="counter-value text-start">
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
                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Performed Target
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {detMonth?.per_milestone}
                              </span>
                            </div>
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="mb-0 text-muted d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill  fs-14 "></i>
                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Set Target
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {detMonth?.exp_milestone}
                              </span>
                            </div>
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col className={"col-lg border-end "}>
                      <div className="mt-3 mt-md-0 py-3 px-3">
                        <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                          <span style={{ color: "#400f0a" }}>Revenue</span>
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
                            <span className="fs-10 ">{rev}%</span>
                          </div>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0"></div>
                          <div className="flex-grow-1 ">
                            <h2 className="mb-0">
                              <div className="counter-value text-start">
                                <span>
                                  ₹ {indianNumbers(detMonth?.act_revenue, 2)}
                                </span>
                              </div>
                            </h2>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="mb-0 text-muted d-flex justify-content-between ">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill text-warning fs-14 "></i>
                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Performed Revenue
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {indianNumbers(detMonth?.per_revenue, 2)}
                              </span>
                            </div>
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="mb-0 text-muted d-flex justify-content-between ">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill  fs-14 "></i>

                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Expected Revenue
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {indianNumbers(detMonth?.exp_revenue, 2)}
                              </span>
                            </div>
                          </p>
                        </div>
                      </div>
                    </Col>

                    <Col className={"col-lg border-end "}>
                      <div className="mt-3 mt-md-0 py-3 px-3">
                        <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                          <span style={{ color: "#400f0a" }}>Expenses</span>
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
                            <span className="fs-10 ">{exp}%</span>
                          </div>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0"></div>
                          <div className="flex-grow-1 ">
                            <h2 className="mb-0">
                              <div className="counter-value text-start">
                                <span>
                                  ₹ {indianNumbers(detMonth?.act_expenses, 2)}
                                </span>
                              </div>
                            </h2>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="mb-0 text-muted d-flex justify-content-between ">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill text-warning fs-14 "></i>
                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Accured Expenses
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {indianNumbers(detMonth?.per_expenses)}
                              </span>
                            </div>
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="mb-0 text-muted d-flex justify-content-between ">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill  fs-14 "></i>
                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Expected Expenses
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {indianNumbers(detMonth?.exp_expenses)}
                              </span>
                            </div>
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col className={"col-lg  "}>
                      <div className="mt-3 mt-md-0 py-3 px-3">
                        <h5 className="text-muted text-uppercase fs-13 d-flex justify-content-between align-items-center">
                          <span style={{ color: "#400f0a" }}>Gross Margin</span>
                          {/* <i
                            className={
                              "fs-18 float-end align-middle ri-arrow-up-circle-line text-success"
                            }
                          ></i> */}
                        </h5>
                        <div className="d-flex align-items-end">
                          <div className="flex-shrink-0"></div>
                          <div className="flex-grow-1 ">
                            <h2 className="mb-0">
                              <div className="counter-value text-start">
                                <span>
                                  {detMonth?.act_g_margin?.toFixed(2)}%
                                </span>
                              </div>
                            </h2>
                          </div>
                        </div>
                        <div className="mt-3 " style={{ width: "100%" }}>
                          <p className="mb-0 text-muted d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill text-warning fs-14 "></i>

                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Current GM %
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {detMonth?.per_g_margin?.toFixed(2) + "%"}
                              </span>
                            </div>
                          </p>
                        </div>
                        <div className="mt-2" style={{ width: "100%" }}>
                          <p className="mb-0 text-muted d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-1">
                              <i className=" ri-stop-fill  fs-14 "></i>

                              <span
                                className="me-3 fs-10 "
                                style={{ color: "#762418" }}
                              >
                                Expected GM %
                              </span>
                            </div>
                            <div>
                              <span
                                className="badge bg-light text-dark mb-0 fs-10"
                                style={{ minWidth: "80px" }}
                              >
                                {detMonth?.exp_g_margin?.toFixed(2) + "%"}
                              </span>
                            </div>
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <></>
              )}
              {location.pathname == "/finance/project/active" ||
              location.pathname == "/business/project" ? (
                <ActiveTable
                  finData={financeData}
                  finCheck={finCheck}
                  setFinCheck={setFinCheck}
                  year={startDate.getFullYear()}
                  month={startDate.getMonth()}
                  loading={loadingFin}
                  startDate={startDate}
                />
              ) : (
                <TableForManager
                  check1={check1}
                  dmCamp={dmCamp}
                  dmSow={dmSow}
                  finData={financeData}
                  switchData={switchData}
                />
              )}
            </CardBody>
          </Card>

          <Modal
            id="signupModals"
            tabIndex="-1"
            isOpen={modal_signUpModals_1}
            toggle={() => {
              closeModalside();
              setNextData(true);
              setShow(false);
              setFormData({});
              setsortBy("");
              setOaData([]);
            }}
            centered={true}
            size="xl"
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                closeModalside();
                setNextData(true);
                setShow(false);
                setsortBy("");
                setOaData([]);

                setFormData({});
              }}
            >
              New Project
            </ModalHeader>

            <ModalBody>
              {nextData ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <Row className="align-items-center g-3">
                      <Col lg={6}>
                        <Label> Choose lead</Label>
                        <Select
                          value={sortBy}
                          onChange={(sortBy) => {
                            setsortBy(sortBy);
                            setFormData({
                              project_id: sortBy?.main_id,
                              project_title: sortBy?.project_title,
                              ref_table_name: sortBy?.ref_table_name,
                              add_lead_status: "none",
                            });

                            setCard({
                              card_logo: sortBy.brand_logo,
                              card_color: sortBy.color_code,
                            });
                            setShow(true);
                          }}
                          options={projectsData}
                          id="choices-single-default"
                          className="js-example-basic-single mb-0 py-2 fs-18 h-100"
                          name="state"
                        />
                      </Col>

                      <Col lg={6}>
                        {show ? (
                          <Col
                            sx={12}
                            md={6}
                            className="d-flex justify-content-center w-100"
                          >
                            <div
                              className="w-50 d-flex justify-content-center"
                              // style={{ background: card.card_color }}
                            >
                              <img
                                src={card.card_logo}
                                alt="logo"
                                style={{
                                  width: "150px",
                                  height: "100%",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </div>

                  {show && (
                    <>
                      <div className="mb-3">
                        <Row className="align-items-center g-3">
                          <Col lg={6}>
                            <Label> Start Date</Label>
                            <Flatpickr
                              placeholder="Select Start Date"
                              className="form-control"
                              id="exampleInputdate"
                              name="startdate"
                              onChange={handleChange}
                            />
                          </Col>

                          <Col lg={6}>
                            <Label>End Date</Label>
                            <Flatpickr
                              placeholder="Select End Date"
                              className="form-control"
                              id="exampleInputdate"
                              options={{
                                minDate: formData.startdate,
                              }}
                              name="enddate"
                              onChange={handleChange1}
                            />
                          </Col>
                        </Row>
                      </div>

                      <div className="mb-3">
                        <Row className="align-items-center g-3">
                          <Col lg={6}>
                            <Label>Project Title</Label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailInput"
                              name="project_title"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col xs={3}>
                            <Label>Tasker CPL</Label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailInput"
                              name="vendor_cpl"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col xs={3}>
                            <Label>SP CPL</Label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailInput"
                              name="xleads"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="align-items-center g-3 mt-2">
                          <Col lg={6}>
                            <Label>Manager</Label>
                            <select
                              className="form-select"
                              aria-label=".form-select-sm example"
                              name="manager_work_id"
                              onChange={(e) => {
                                handleChange(e);
                                setOaShow(true);
                              }}
                            >
                              <option>Select Manager</option>

                              {managerData?.map((item) => (
                                <option
                                  key={item?.employee_id}
                                  value={[item?.workids_id, item?.team_name]}
                                >
                                  {item?.full_name}
                                </option>
                              ))}
                            </select>
                          </Col>
                          {oashow ? (
                            <Col lg={6}>
                              <Label>KAM</Label>
                              <select
                                className="form-select"
                                aria-label=".form-select-sm example"
                                name="oa_work_id"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              >
                                <option>Select Manager</option>

                                {oaData?.map((item) => (
                                  <option
                                    key={item?.employee_id}
                                    value={item?.workids_id}
                                  >
                                    {item?.full_name}
                                  </option>
                                ))}
                              </select>
                            </Col>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row className="align-items-center g-3 mt-2">
                          <Col></Col>
                        </Row>
                        <div className="d-flex justify-content-end mt-2">
                          <button
                            type="submit"
                            className="btn btn-secondary d-flex align-items-center gap-2"
                          >
                            <i className="ri ri-check-line"></i>
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              ) : (
                <>
                  <ManagerAdd
                    set_modal_signUpModals={set_modal_signUpModals}
                    sowId={sowId}
                    setNextData={setNextData}
                    setSowId={setSowId}
                    setShow={setShow}
                  />
                </>
              )}
            </ModalBody>
          </Modal>

          <Modal
            id="signupModals"
            tabIndex="-1"
            isOpen={modal_edit}
            toggle={() => {
              set_modal_edit(false);
            }}
            centered={true}
            size="xl"
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                set_modal_edit(false);
              }}
            >
              Edit Sow
            </ModalHeader>

            <ModalBody>
              <>
                <ManagerEdit set_modal_edit={set_modal_edit} />
              </>
            </ModalBody>
          </Modal>

          {/* DM modal */}

          <Modal
            id="DMModals"
            tabIndex="-1"
            isOpen={dm_open}
            toggle={() => {
              setDm_open(false);
            }}
            centered={true}
            size="xl"
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                setDm_open(false);
              }}
            >
              DM Project
            </ModalHeader>
            <form onSubmit={handleAddCampaign}>
              <ModalBody>
                <Row gap="2">
                  <Col>
                    <div>
                      <label htmlFor="dmInput" className="form-label">
                        Campaign Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="dmInput"
                        onChange={(e) => setDmCamp(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <label id="dmproject">Sow Id</label>
                    <Select
                      styles={colorStyles}
                      id="dmproject"
                      options={sow}
                      isSearchable
                      // isClearable
                      onChange={(e) => setDmSow(e.value)}
                    />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button type="submit">Submit</Button>
              </ModalFooter>
            </form>
          </Modal>
        </Container>
      </div>
      <DailyDowloadMod
        open={openD}
        setOpen={setOpenD}
        switchData={switchDataD}
      />
    </React.Fragment>
  );
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const token = "sdfsdfff";
  const [modal_signUpModals_1, set_modal_signUpModals_1] =
    React.useState(false);
  const openModalside = () => {
    set_modal_signUpModals_1(true);
  };
  const closeModalside = () => {
    set_modal_signUpModals_1(false);
  };

  return (
    <AppContext.Provider
      value={{ modal_signUpModals_1, openModalside, closeModalside }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { ManagerDashboard };
