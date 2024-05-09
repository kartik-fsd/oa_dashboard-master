import {
  Container,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  UncontrolledTooltip,
} from "reactstrap";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import DataTableExtensions from "react-data-table-component-extensions";
import axios from "axios";

import { api, farming } from "../../../globalConfig";
import {
  create_payment_request,
  generate_lead_count,
  get_payment_request,
} from "../../../assets/utils/sow";
import Flatpickr from "react-flatpickr";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";
import { download_payouts } from "../../../assets/utils/dashboard";
import illustarator from "../../../assets/images/user-illustarator-2.png";
import "react-toastify/dist/ReactToastify.min.css";
import "./PayoutDetails.css";
import {
  generate_lead_count_new,
  payout_range,
} from "../../../assets/utils/farmingBase";
import { getcurrentDate } from "../../../assets/utils/abhiApi";

var getDaysArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

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

const PayoutDetails = ({ type }) => {
  let { id } = useParams();
  id = id.split("-")[0];
  const refComp = useRef(null);
  const refComp1 = useRef(null);

  const [resData, setResData] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [callApiupdated, setCallApiUpdated] = React.useState(false);
  const [show, setShow] = useState(false);
  const [modal_signUpModals, set_modal_signUpModals] = React.useState(false);
  const [modal_edit, set_modal_edit] = useState(false);
  const [startDateDisp, setStartDateDisp] = React.useState("");
  const [date1, setDate1] = React.useState("");
  const [date2, setDate2] = React.useState(undefined);
  const [generateData, setGenerateData] = React.useState({});
  const [count, setCount] = React.useState(-1);
  const [remark, setRemark] = React.useState("");
  const [showRemark, setShowRemark] = React.useState(false);
  const [reload1, setReload1] = React.useState(false);
  const [type1, setType] = React.useState("tasker");
  const [ops_status, set_ops_status] = React.useState({});
  const [download_data, set_download_data] = React.useState({});
  const [genLoading, setGenLoading] = React.useState(false);
  const [open2, set_open2] = React.useState(false);
  const [download_statement, set_download_statement] = React.useState("");
  const [dateRange, setDateRange] = React.useState(null);
  const [dateRange1, setDateRange1] = React.useState(null);
  const [dateLoader, setDateLoader] = useState(true);
  const [todayDate, setTodayDate] = useState("");

  const pathname = api.FINANCE_URL + get_payment_request;
  const downloadUrl = api.FINANCE_URL + download_payouts;

  const getDateRange = async () => {
    setIsLoading(true);
    let api = farming.farming_URL + payout_range;
    try {
      let { data } = await axios.post(api, { sow_id: id });
      if (!data.error) {
        console.log(data.date_range, "datapayout");
        setDateRange1(data.date_range);
        let ot = data.date_range.map((item) => ({
          from: item.from,
          to: item.to,
        }));
        console.log(ot, "ott");
        setDateRange(ot);

        // setDateRange(dateRange);
      }
    } catch (error) {
      console.log(error, "error");
      setIsErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  function getDate() {
    setDateLoader(true);
    axios
      .get(getcurrentDate)
      .then((res) => {
        setDateLoader(false);
        let myDate = new Date(res.data.date);
        let result = myDate.getTime();
        setTodayDate(result);
      })
      .catch((e) => {
        console.log(e, "err");
      })
      .finally(() => {
        setDateLoader(false);
      });
  }

  useEffect(() => {
    const dataEnter = {
      sow_id: id,
    };
    setIsLoading(true);
    axios
      .post(pathname, dataEnter)
      .then((res) => {
        setResData(res?.data?.details);
        setIsLoading(false);

        // setContext({ ...context });
      })
      .catch((err) => {
        console.error(err);
        setIsErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getDateRange();
  }, [callApiupdated]);

  React.useEffect(() => {
    getDate();
  }, [modal_edit]);

  const clearDate = () => {
    refComp.current.flatpickr.clear();
  };

  const clearDate1 = () => {
    refComp1.current.flatpickr.clear();
  };

  const generateFunction = () => {
    const postData = {
      sow_id: id,
      start_date: date1,
      end_date: date2,
      user_type: type1,
    };
    // const apilink = farming.farming_URL + generate_lead_count_new;
    const apilink = api.FINANCE_URL + generate_lead_count;
    setGenLoading(true);
    axios
      .post(apilink, postData)
      .then((res) => {
        console.log(res.data, "resdata");
        setGenerateData(res.data);
        setShowRemark(true);
        setGenLoading(false);
      })
      .catch((err) => console.log(err, "err"));
  };

  const handleDownload = (e) => {
    console.log(e.id);
    axios
      .get(downloadUrl, { params: { req_id: e.id } })
      .then((res) => {
        set_download_data(res.data);
        set_open2(true);
        const dataEnter = `Report from ${e.start_date} to ${e.end_date}`;
        set_download_statement(dataEnter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fields = {
    lead_id: "lead_id",
    created_on: "created_on",
  };
  const columns = [
    // {
    //   name: " Pay id",
    //   selector: (d) => d.id,
    //   cell: (d) => (
    //     <div className="date d-flex align-items-center gap-2">
    //       <p className="fs-12 m-0">{d.id}</p>
    //     </div>
    //   ),
    //   sortable: true,
    //   //   center: true,
    //   width: "50px",
    // },
    {
      name: " Pay Period",
      selector: (d) => d.start_date,
      cell: (d) => (
        <div className="date d-flex align-items-center gap-2">
          <p className="fs-12 m-0">{d.start_ops_date}</p>
          <p className="m-0 fs-16">{` - `}</p>
          <p className="fs-12 m-0">{d.end_ops_date}</p>
        </div>
      ),
      sortable: true,
      //   center: true,
      width: "250px",
    },
    {
      name: "Type",
      selector: (d) => d.type,
      cell: (d) => (
        <div
          className={
            d.user_type == "tasker"
              ? "badge badge-outline-info w-50"
              : d.user_type == "direct_sp"
              ? "badge badge-outline-success w-50"
              : "badge badge-outline-warning w-50"
          }
        >
          {d.user_type == "tasker"
            ? "Direct"
            : d.user_type == "direct_sp"
            ? "Managed"
            : "Group"}
        </div>
      ),
      sortable: true,
      center: true,
      // width: "85px",
      width: "200px",
    },
    {
      name: "Taskers",
      selector: (d) => d.users,
      cell: (d) => (
        <div className="amt_table fs-14 fw-light " style={{ color: "#b83016" }}>
          {d.users}
        </div>
      ),
      sortable: true,
      center: true,
      // center: true,
    },
    // {
    //   name: "End Date",
    //   selector: "end_date",
    //   cell: (d) => <div className="date">{d.end_date}</div>,
    //   sortable: true,
    //   //   center: true,
    //   width: "120px",
    // },
    // {
    //   name: "Lead Request",
    //   selector: "request_date",
    //   cell: (d) => <div className="amt_table">{d.request_date}</div>,
    //   sortable: true,
    //   center: true,
    //   width: "120px",
    // },
    {
      name: "Leads",
      selector: (d) => d.leads,
      cell: (d) => (
        <>
          <div
            className="amt_table d-flex justify-content-between w-75 px-4"
            style={{
              background: "#2EC851",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "2px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "600",
              padding: "4px 6px",
              minWidth: "45px",
            }}
          >
            {d.leads}

            <i
              className="ri ri-download-2-line cursor-pointer fs-12"
              onClick={() => handleDownload(d)}
            ></i>
          </div>
        </>
      ),
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "CPL",
      selector: (d) => d.cpl,
      cell: (d) => (
        <div className="amt_table fs-14 " style={{ color: "#b83016" }}>
          {d.cpl}
        </div>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Total",
      selector: (d) => d.cpl,
      cell: (d) => (
        <div className="amt_table fs-14 fw-bold " style={{ color: "#b83016" }}>
          ₹ {d.cpl * d.leads}
        </div>
      ),
      sortable: true,
      left: true,
      width: "150px",
    },

    {
      name: "Status",
      selector: (d) => d.users,
      cell: (d) => (
        <div className="amt_table d-flex gap-1 w-100">
          <p
            className={
              d.stats_ops == "underprocess"
                ? "badge badge-soft-warning m-0 w-100 py-2"
                : d.stats_ops == "rejected"
                ? "badge badge-soft-danger m-0 w-100 py-2"
                : "badge badge-soft-success m-0 w-100 py-2"
            }
            style={{ textTransform: "capitalize" }}
          >
            {d.stats_ops}
          </p>
          <span className=" d-flex align-items-center">
            <Button
              id="PopoverDismissible"
              style={{
                padding: "0",
                background: "transparent",
                color: "black",
                border: "none",
                fontSize: "16px",
              }}
              onMouseEnter={() => {
                set_ops_status(d);
              }}
            >
              <i className="ri ri-information-line"></i>
            </Button>
            {/* <Button color="light" id="PopoverLeft">
              Popover on right
            </Button> */}
            <UncontrolledPopover placement="left" target="PopoverDismissible">
              <PopoverBody>
                <div>
                  <p className="fs-12 m-0">{`${ops_status.full_name} requested on ${ops_status.request_date} at ${ops_status.request_time}.
                 `}</p>
                  <hr />
                  <p className="fs-12 m-0">
                    {" "}
                    OP's Remark:{ops_status.req_remark}
                  </p>
                  <hr />
                  <p className="fs-12 m-0">
                    {" "}
                    Finance Remark:{ops_status.remark}
                  </p>
                </div>
              </PopoverBody>
            </UncontrolledPopover>
            {/* <Button
              id="tooltipTop"
              style={{
                padding: "0",
                background: "transparent",
                color: "black",
                border: "none",
                fontSize: "16px",
              }}
              onMouseEnter={() => {
                set_ops_status(
                  `${d.full_name} requested on ${d.request_date} ${d.request_time}.
                  ${d.req_remark}`
                );
              }}
            >
              <i className="ri ri-information-line"></i>
            </Button>
            <UncontrolledTooltip placement="top" target="tooltipTop">
              {ops_status.length && ops_status}
            </UncontrolledTooltip> */}
          </span>
        </div>
      ),
      sortable: true,
      left: true,
      center: true,
      width: "140px",
    },

    // {
    //   name: "Download",
    //   selector: "req_remark",
    //   cell: (d) => (
    //     <div className="amt_table">
    //       {d.stats_ops == "rejected" ? (
    //         <button className="btn" style={{
    //   backgroundColor: "#ec5c24",
    //   color: "whitesmoke",
    //   transition: "background-color 0.3s ease",
    // }}
    // onMouseEnter={(e) =>
    //   (e.target.style.backgroundColor = "#dd4319")
    // }
    // onMouseLeave={(e) =>
    //   (e.target.style.backgroundColor = "#ec5c24")
    // } disabled>
    //           Download
    //         </button>
    //       ) : (
    //         <button
    //           className="btn" style={{
    //   backgroundColor: "#ec5c24",
    //   color: "whitesmoke",
    //   transition: "background-color 0.3s ease",
    // }}
    // onMouseEnter={(e) =>
    //   (e.target.style.backgroundColor = "#dd4319")
    // }
    // onMouseLeave={(e) =>
    //   (e.target.style.backgroundColor = "#ec5c24")
    // }
    //           onClick={() => handleDownload(d)}
    //         >
    //           Download
    //         </button>
    //       )}
    //     </div>
    //   ),
    //   sortable: true,
    //   center: true,
    //   width: "150px",
    // },
    // {
    //   name: "Download",
    //   selector: "req_remark",
    //   cell: (d) => (
    //     <div className="amt_table">
    //       <a
    //         href={`data:text/csv;charset=utf-8,${escape(download_data)}`}
    //         download="filename.csv"
    //       >
    //         download
    //       </a>
    //     </div>
    //   ),
    //   sortable: true,
    //   center: true,
    //   width: "150px",
    // },
  ];

  const tableData = {
    columns,
    data: resData,
  };

  const handleAdd = () => {
    delete generateData.error;
    generateData.start_date = date1;
    generateData.end_date = date2;
    generateData.sow_id = id;
    // generateData.invoice_id = 0;
    generateData.type = "auto_payment";
    generateData.req_remark = remark;
    // generateData.user_type = type1;

    // generateData.leads = generateData.total_leads;
    let ops_arr = [];
    ops_arr.push({
      users: generateData.users_tasker,
      leads: generateData.total_leads_tasker,
      cpl: generateData.cpl_tasker,
      user_type: "tasker",
    });
    ops_arr.push({
      users: generateData.users_direct_sp,
      leads: generateData.total_leads_direct_sp,
      cpl: generateData.cpl_direct_sp,
      user_type: "direct_sp",
    });
    ops_arr.push({
      users: generateData.users_indirect_sp,
      leads: generateData.total_leads_indirect_sp,
      cpl: generateData.cpl_indirect_sp,
      user_type: "indirect_sp",
    });
    delete generateData.total_leads;

    let obj = {
      start_date: date1,
      end_date: date2,
      sow_id: id,
      type: "auto_payment",
      ops_arr: ops_arr,
      req_remark: remark,
    };

    console.log(obj, "gendataDel");
    const apilink = api.FINANCE_URL + create_payment_request;
    axios
      .post(apilink, obj)
      .then((res) => {
        if (res.data.error) {
          toast(res.data.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          if (res.data.err_msg.length > 0) {
            // for (let i = 0; i < res.data.err_msg.length; i++) {
            toast(res.data.err_msg[0], {
              position: "top-center",
              hideProgressBar: true,
              closeOnClick: false,
              className: "bg-danger text-white",
            });
            // }
          } else {
            toast("Successfully added", {
              position: "top-center",
              hideProgressBar: true,
              closeOnClick: false,
              className: "bg-success text-white",
            });
          }

          setReload1(!reload1);
          setCallApiUpdated(!callApiupdated);

          set_modal_edit(false);
        }
        console.log(res, "resremark");
        setRemark("");
      })
      .catch((err) => console.log(err));
  };

  return loading || dateLoader ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <React.Fragment>
      <Card>
        <CardHeader style={{ marginBottom: "-5px", background: "#F3F3F8" }}>
          {/* <h5>Payout List</h5> */}

          {type == "spoc" ? (
            <div
              style={{
                marginTop: "35px",
              }}
            ></div>
          ) : (
            <button
              style={{
                float: "right",
                marginTop: "-5px",
                marginRight: "220px",
                backgroundColor: "#ec5c24",
                color: "#ffffff",
              }}
              className="btn"
              onClick={() => {
                set_modal_edit(true);
                setGenerateData({});
                setCount(-1);
              }}
            >
              <i className="ri-add-line align-middle me-1"></i> Payout
            </button>
          )}
          {/* <button
                style={{
                  float: "right",
                  marginTop: "-5px",
                  marginRight: "10px",
                }}
                className="btn btn-primary "
                onClick={() => {}}
              >
                <i className=" ri-upload-2-line align-middle me-2"></i>
                Upload
              </button> */}
        </CardHeader>
        <CardBody>
          <DataTableExtensions
            {...tableData}
            export={false}
            filterPlaceholder={`Search`}
          >
            <DataTable
              columns={columns}
              data={resData}
              defaultSortFieldId={3}
              pagination
              theme="VendorTable"
              highlightOnHover={true}
              paginationPerPage={5}
            />
          </DataTableExtensions>
        </CardBody>
      </Card>

      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modal_edit}
        toggle={() => {
          set_modal_edit(false);
          setGenerateData({});
        }}
        centered={true}
        size="lg"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_modal_edit(false);
            setGenerateData({});
            generateFunction();
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              width: "700px",
              justifyContent: "space-between",
            }}
          >
            <div className="mb-3" style={{ marginTop: "10px" }}>
              Add Payout Request
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          <>
            <div className="mb-3">
              <Row className="align-items-center g-3">
                <Col lg={4}>
                  <Label> Date</Label>
                  <Flatpickr
                    ref={refComp1}
                    className="form-control"
                    id="exampleInputdate"
                    // defaultValue={props.data.data?.start_date}
                    options={{
                      mode: "range",
                      minDate: new Date("2023-01-16"),
                      maxDate: new Date(todayDate - 864e5),
                      // maxDate: new Date(getDate().now() - 864e5),

                      disable: dateRange,

                      onDayCreate: function (dObj, dStr, fp, dayElem) {
                        // Utilize dayElem.dateObj, which is the corresponding Date

                        // dummy logic

                        for (let i = 0; i < dateRange1.length; i++) {
                          let daysRange = getDaysArray(
                            dateRange1[i].from,
                            dateRange1[i].to
                          );
                          daysRange = daysRange.map((item) =>
                            moment(item).format("YYYY-MM-DD")
                          );
                          let maind = moment(
                            new Date(dayElem.ariaLabel)
                          ).format("YYYY-MM-DD");
                          console.log(daysRange, maind, "testing");
                          // return "";
                          if (daysRange.includes(maind)) {
                            if (dateRange1[i].status != "none") {
                              dayElem.innerHTML +=
                                "<span class='event'></span>";
                            } else if (dateRange1[i].status == "none") {
                              dayElem.innerHTML +=
                                "<span class='event busy'></span>";
                            }
                          }
                        }
                      },
                    }}
                    placeholder="Enter  Date"
                    name="date"
                    onChange={(e) => {
                      console.log(e, "echeck");

                      setDate1(moment(e[0]).format("YYYY-MM-DD"));
                      setDate2(moment(e[1]).format("YYYY-MM-DD"));
                      setCount(count + 1);
                    }}
                    // onChange={(e) => {
                    //   setStartDateDisp(e[0]);
                    //   setDate1(moment(e[0]).format("YYYY-MM-DD"));

                    // }}
                  />
                </Col>

                {/* <Col lg={4}>
                  <Label>End Date</Label>
                  <Flatpickr
                    className="form-control"
                    id="exampleInputdate"
                    placeholder="Enter End Date"
                    ref={refComp}
                    options={{
                      minDate: startDateDisp,
                      disable: dateRange,

                      onDayCreate: function (dObj, dStr, fp, dayElem) {
                        // Utilize dayElem.dateObj, which is the corresponding Date

                        // dummy logic

                        for (let i = 0; i < dateRange1.length; i++) {
                          let daysRange = getDaysArray(
                            dateRange1[i].from,
                            dateRange1[i].to
                          );
                          daysRange = daysRange.map((item) =>
                            moment(item).format("YYYY-MM-DD")
                          );
                          let maind = moment(
                            new Date(dayElem.ariaLabel)
                          ).format("YYYY-MM-DD");
                          console.log(daysRange, maind, "testing");
                          // return "";
                          if (daysRange.includes(maind)) {
                            if (dateRange1[i].status != "none") {
                              dayElem.innerHTML +=
                                "<span class='event'></span>";
                            } else if (dateRange1[i].status == "none") {
                              dayElem.innerHTML +=
                                "<span class='event busy'></span>";
                            }
                          }
                        }
                      },
                      maxDate: new Date(Date.now() - 864e5),
                    }}
                    // defaultValue={props.data.data?.end_date}
                    name="date"
                    // onChange={handleChange}
                    onChange={(e) => {
                      setCount(count + 1);
                      setDate2(moment(e[0]).format("YYYY-MM-DD"));
                    }}
                  />
                </Col> */}

                <Col lg={4}>
                  {/* <button
                        style={{
                          float: "right",
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                        className="btn btn-primary "
                        onClick={generateFunction}
                        disabled={count == -1}
                      >
                        Generate{" "}
                      </button> */}
                  <button
                    onClick={generateFunction}
                    disabled={count == -1}
                    className="btn"
                    style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                      float: "right",
                      marginTop: "25px",
                      marginLeft: "10px",
                      height: "38px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                  >
                    <span className="d-flex align-items-center">
                      {genLoading ? (
                        <>
                          {" "}
                          <span
                            className="spinner-border flex-shrink-0"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </span>{" "}
                        </>
                      ) : (
                        <>
                          <span className="flex-grow-1 ms-2">Generate</span>
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    style={{
                      float: "right",
                      marginTop: "25px",
                      height: "38px",
                      backgroundColor: "#ec5c24",
                    }}
                    className="btn text-light"
                    onClick={() => {
                      setDate1(null);
                      setDate2(null);
                      // clearDate();
                      clearDate1();
                      setGenerateData({});
                      setCount(-1);
                      setRemark("");
                      setShowRemark(false);
                    }}
                  >
                    clear all{" "}
                  </button>
                </Col>
              </Row>
            </div>
            <Row className="align-items-center g-3 mt-2">
              <Col lg={3}>
                <Label>No of Leads - Direct</Label>
                <Input
                  type="text"
                  name="projecttitle"
                  readOnly
                  value={count == -1 ? "" : generateData?.total_leads_tasker}
                />
              </Col>

              <Col lg={3}>
                <Label>CPL</Label>
                <Input
                  type="text"
                  readOnly
                  name="projecttitle"
                  value={count == -1 ? "" : generateData?.cpl_tasker}
                />
              </Col>

              <Col lg={3}>
                <Label>Total Cost </Label>
                <Input
                  type="text"
                  name="projecttitle"
                  value={
                    count == -1
                      ? 0
                      : Number(generateData?.total_leads_tasker) *
                          Number(generateData?.cpl_tasker) || 0
                  }
                  readOnly
                />
              </Col>
              <Col lg={3}>
                <Label>No of Users </Label>
                <Input
                  type="text"
                  name="projecttitle"
                  readOnly
                  value={count == -1 ? "" : generateData?.users_tasker}
                />
              </Col>
            </Row>

            <Row className="align-items-center g-3 mt-1">
              <Col lg={3}>
                <Label>No of Leads - Managed</Label>
                <Input
                  type="text"
                  name="projecttitle"
                  readOnly
                  value={count == -1 ? "" : generateData?.total_leads_direct_sp}
                />
              </Col>

              <Col lg={3}>
                <Label>CPL</Label>
                <Input
                  type="text"
                  readOnly
                  name="projecttitle"
                  value={count == -1 ? "" : generateData?.cpl_direct_sp}
                />
              </Col>

              <Col lg={3}>
                <Label>Total Cost </Label>
                <Input
                  type="text"
                  name="projecttitle"
                  value={
                    count == -1
                      ? 0
                      : Number(generateData?.total_leads_direct_sp) *
                          Number(generateData?.cpl_direct_sp) || 0
                  }
                  readOnly
                />
              </Col>
              <Col lg={3}>
                <Label>No of Users </Label>
                <Input
                  type="text"
                  name="projecttitle"
                  readOnly
                  value={count == -1 ? "" : generateData?.users_direct_sp}
                />
              </Col>
            </Row>

            <Row className="align-items-center g-3 mt-1">
              <Col lg={3}>
                <Label>No of Leads - Group</Label>
                <Input
                  type="text"
                  name="projecttitle"
                  readOnly
                  value={
                    count == -1 ? "" : generateData?.total_leads_indirect_sp
                  }
                />
              </Col>

              <Col lg={3}>
                <Label>CPL</Label>
                <Input
                  type="text"
                  readOnly
                  name="projecttitle"
                  value={count == -1 ? "" : generateData?.cpl_indirect_sp}
                />
              </Col>

              <Col lg={3}>
                <Label>Total Cost </Label>
                <Input
                  type="text"
                  name="projecttitle"
                  value={
                    count == -1
                      ? 0
                      : Number(generateData?.total_leads_indirect_sp) *
                          Number(generateData?.cpl_indirect_sp) || 0
                  }
                  readOnly
                />
              </Col>
              <Col lg={3}>
                <Label>No of Users </Label>
                <Input
                  type="text"
                  name="projecttitle"
                  readOnly
                  value={count == -1 ? "" : generateData?.users_indirect_sp}
                />
              </Col>
            </Row>
            <Row className="align-items-center g-3 pt-3">
              <Col lg={12}>
                <Label>Remark</Label>
                <Input
                  type="text"
                  disabled={count == -1 || !showRemark}
                  // defaultValue={props.data.data?.project_title}
                  value={remark}
                  onChange={(e) => {
                    // singleSowData.project_title = e.target.value;
                    // setSingleSowData({ ...singleSowData });
                    setRemark(e.target.value);
                  }}
                />
              </Col>
            </Row>

            <button
              style={{
                float: "right",
                marginTop: "10px",
                width: "100px",
                backgroundColor: "#ec5c24",
              }}
              className="btn text-light d-flex gap-2 justify-content-center"
              onClick={() => handleAdd()}
              disabled={remark == ""}
            >
              <i className="ri-add-line align-bottom"></i>
              ADD
            </button>
          </>
        </ModalBody>
      </Modal>

      <Modal
        id="topmodal"
        isOpen={open2}
        toggle={() => {
          set_open2(false);
        }}
      >
        <ModalHeader
          className="modal-title"
          id="myModalLabel"
          toggle={() => {
            set_open2(false);
          }}
        >
          Download Payout
        </ModalHeader>
        <ModalBody className="text-center p-5">
          <img
            src={illustarator}
            className="img-fluid"
            alt=""
            width={140}
            height={140}
          />
          <div className="mt-4">
            <h4 className="mb-3">Click to Download</h4>
            <p className="text-muted mb-4">{download_statement}</p>

            <div className="hstack gap-2 justify-content-center">
              <Link
                to="#"
                className="btn btn-link link-success fw-medium"
                onClick={() => {
                  set_open2(false);
                }}
              >
                <i className="ri-close-line me-1 align-middle"></i> Close
              </Link>
              <a
                href={`data:text/csv;charset=utf-8,${escape(download_data)}`}
                className="btn btn-success"
                download="filename.csv"
              >
                Download
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* <ToastContainer/> */}
    </React.Fragment>
  );
};

export default PayoutDetails;
