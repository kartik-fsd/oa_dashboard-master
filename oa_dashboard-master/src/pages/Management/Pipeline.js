import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  UncontrolledTooltip,
} from "reactstrap";
import CountUp from "react-countup";
import Flatpickr from "react-flatpickr";
import PipelineTable from "./PipelineTable";
import FeatherIcon from "feather-icons-react";
import {
  daily_approve_tracking,
  daily_tracking,
  daily_tracking1,
  investors_daily_approve_target,
  investors_daily_approve_target1,
  investors_daily_target,
} from "../../assets/utils/managementapi";
import { api } from "../../globalConfig";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { indianNumbers } from "../../components/common/indianNumbers";
import { useLocation } from "react-router-dom";

const tileBoxs3 = [
  {
    id: 1,
    label: "Monthly Target",
    labelClass: "muted",
    badgeClass: "bg-light text-success",
    badge: "ri-arrow-up-line",
    percentage: "16.24 %",
    iconClass: "info",
    feaIcon: "users",

    subCounter: [
      {
        id: 1,
        counter: "28.05",
        decimals: 2,
        suffix: "",
        prefix: "",
      },
    ],
  },
];

const Pipeline = () => {
  const location = useLocation();
  console.log(location.pathname, "testinglocation");
  const [dailytrackData, setDailyTrackData] = useState({});
  const [date, setDate] = useState("");
  const [revenue, setRevenue] = useState({});
  const [percent, setPercent] = useState(0);

  const [showApproved, setShowApproved] = useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [setColor, setChangeColor] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  let colorArrayData = [
    {
      id: "tooltip0",
      color: "#ff6969",
      colorback: "#FFF3EB",
      data: "%",
      backColor: false,
    },
    {
      id: "tooltip1",
      color: "#088395",
      colorback: "#EAF4FF",
      backColor: false,
      data: "₹",
    },
    {
      id: "tooltip2",
      color: "#e8a0bf",
      colorback: "#EEF8F0",
      backColor: false,
      data: "L",
    },
  ];
  const [colorArray, setColorArray] = React.useState(colorArrayData);

  console.log(percent, "date123124");

  console.log(revenue, "res");

  const filterBasedOnDate = (date = new Date()) => {
    let link;
    if (location.pathname == "/management/dailytracking") {
      link = api.VENDOR_URL + daily_tracking;
    } else if (location.pathname == "/founders/dailytracking") {
      link = api.VENDOR_URL + daily_tracking1;
    } else {
      link = api.VENDOR_URL + daily_approve_tracking;
    }
    setIsLoading(true);
    axios
      .get(link, {
        params: {
          date: moment(startDate).format("YYYY-MM-DD"),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDailyTrackData(res.data.daily_tracking);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    filterBasedOnDate();
  }, [startDate]);

  useEffect(() => {
    let link;
    if (location.pathname == "/management/dailytracking") {
      link = api.VENDOR_URL + investors_daily_target;
    } else if (location.pathname == "/founders/dailytracking") {
      link = api.VENDOR_URL + investors_daily_approve_target1;
    } else {
      link = api.VENDOR_URL + investors_daily_approve_target;
    }
    console.log(moment(startDate).format("MM"), "checkingdates");
    axios
      .get(link, {
        params: { month: moment(startDate).format("MM"), year: "2023" },
      })
      .then((res) => {
        setRevenue(res.data.revenue_target);
      })
      .catch((err) => console.log(err));
  }, [startDate]);

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    // <button className="example-custom-input" onClick={onClick} ref={ref}>
    //   {value}
    // </button>
    <input value={value} onClick={onClick} className="example-custom-input" />
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";
  return (
    <div className="page-content">
      <Container fluid>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5
                  className="text-primary fw-600 fs-16"
                  style={{ letterSpacing: "2px", marginLeft: "15px" }}
                >
                  {location.pathname == "/management/dailytracking"
                    ? "Daily Performance"
                    : "Daily Approval"}
                </h5>

                <div>
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

                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM-yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                        showFourColumnMonthYearPicker
                        customInput={<ExampleCustomInput />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {/* <div>
                    <span
                      className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                      style={{ height: "40px", minWidth: "206px" }}
                    >
                      Monthly Target :{" "}
                      {indianNumbers(revenue?.actual_target, 2)}
                    </span>
                  </div>

                  <div>
                    <span
                      className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                      style={{ height: "40px", minWidth: "206px" }}
                    >
                      Daily Target : {indianNumbers(revenue?.dailyData, 2)}
                    </span>
                  </div> */}

                  <div style={{ display: "flex" }}>
                    {" "}
                    {(tileBoxs3 || []).map((item, key) => (
                      <Col key={key}>
                        <Card
                          className={"card-animate " + item.bgColor}
                          style={{ width: "250px" }}
                        >
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <div>
                                <p
                                  className={
                                    "fw-medium mb-0 text-" + item.labelClass
                                  }
                                >
                                  {"Monthly Target"}
                                </p>
                                <h2
                                  className={
                                    "mt-4 ff-secondary fw-semibold " +
                                    item.counterClass
                                  }
                                >
                                  {item.subCounter.map((item, key) => (
                                    <span className="counter-value" key={key}>
                                      <CountUp
                                        start={0}
                                        suffix={item.suffix}
                                        separator=","
                                        prefix="₹"
                                        // decimals={2}
                                        // decimal="."
                                        end={revenue?.actual_target}
                                        duration={1}
                                      />
                                    </span>
                                  ))}
                                </h2>
                                <p className={"mb-0 text-" + item.labelClass}>
                                  Daily Target :&nbsp;
                                  <span
                                    className={"mb-0 badge " + item.badgeClass}
                                  >
                                    {revenue?.dailyData}
                                  </span>{" "}
                                </p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </div>
                  {/* <div>
                    <Card
                      className={"card-animate "}
                      style={{
                        width: "200px",
                        height: "100px",
                        background: "#E8E9E9",
                      }}
                    >
                      <CardBody>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>
                            <span
                              className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                              style={{
                                height: "40px",
                                // minWidth: "206px",
                                background: "none",
                              }}
                            >
                              Monthly Target :{" "}
                              {indianNumbers(revenue?.actual_target, 2)}
                            </span>
                          </div>

                          <div>
                            <span
                              className="badge badge-soft-dark d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                              style={{
                                height: "40px",
                                // minWidth: "206px",
                                background: "none",
                              }}
                            >
                              Daily Target :{" "}
                              {indianNumbers(revenue?.dailyData, 2)}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div> */}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {/* <div>
                      <span
                        className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                        style={{
                          height: "40px",
                          minWidth: "206px",
                          backgroundColor: "#FFA500",
                          color: "#000",
                        }}
                      >
                        <span>
                          {" "}
                          {location.pathname == "/management/dailytracking"
                            ? " Perf Revenue"
                            : "Achieved Revenue"}
                        </span>{" "}
                        : {indianNumbers(revenue?.total_amount, 2)}
                      </span>
                    </div>

                    <div>
                      <span
                        className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                        style={{
                          height: "40px",
                          minWidth: "206px",
                          backgroundColor: "#FFA500",
                          color: "#000",
                        }}
                      >
                        {location.pathname == "/management/dailytracking"
                          ? " Perf Rate"
                          : "Achieved Rate"}{" "}
                        : {revenue?.percentage} %
                      </span>
                    </div> */}

                    <div>
                      {(tileBoxs3 || []).map((item, key) => (
                        <Col key={key}>
                          <Card
                            className={"card-animate " + item.bgColor}
                            style={{ width: "250px" }}
                          >
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <p
                                    className={
                                      "fw-medium mb-0 text-" + item.labelClass
                                    }
                                  >
                                    {"Perf Revenue"}
                                  </p>
                                  <h2
                                    className={
                                      "mt-4 ff-secondary fw-semibold " +
                                      item.counterClass
                                    }
                                  >
                                    {item.subCounter.map((item, key) => (
                                      <span className="counter-value" key={key}>
                                        <CountUp
                                          start={0}
                                          suffix={item.suffix}
                                          separator=","
                                          prefix="₹"
                                          // decimals={2}
                                          // decimal="."
                                          end={revenue?.total_amount}
                                          duration={1}
                                        />
                                      </span>
                                    ))}
                                  </h2>
                                  <p className={"mb-0 text-" + item.labelClass}>
                                    Perf Rate :&nbsp;
                                    <span
                                      className={
                                        "mb-0 badge " + item.badgeClass
                                      }
                                    >
                                      {revenue?.percentage} %
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </div>

                    {/* <div>
                      <Card
                        className={"card-animate "}
                        style={{
                          width: "200px",
                          height: "100px",
                          background: "#FFA500",
                        }}
                      >
                        <CardBody>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div>
                              <span
                                className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                                style={{
                                  height: "40px",
                                  // minWidth: "206px",
                                  backgroundColor: "#FFA500",
                                  color: "#000",
                                }}
                              >
                                <span>
                                  {" "}
                                  {location.pathname ==
                                  "/management/dailytracking"
                                    ? " Perf Revenue"
                                    : "Achieved Revenue"}
                                </span>{" "}
                                : {indianNumbers(revenue?.total_amount, 2)}
                              </span>
                            </div>

                            <div>
                              <span
                                className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                                style={{
                                  height: "40px",
                                  // minWidth: "206px",
                                  backgroundColor: "#FFA500",
                                  color: "#000",
                                }}
                              >
                                {location.pathname ==
                                "/management/dailytracking"
                                  ? " Perf Rate"
                                  : "Achieved Rate"}{" "}
                                : {revenue?.percentage} %
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div> */}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div>
                      {(tileBoxs3 || []).map((item, key) => (
                        <Col key={key}>
                          <Card
                            className={"card-animate " + item.bgColor}
                            style={{ width: "250px" }}
                          >
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "15px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p
                                      className={
                                        "fw-medium mb-0 text-" + item.labelClass
                                      }
                                    >
                                      {"Approved Revenue"}
                                    </p>
                                    <div>
                                      <div
                                        className="form-check form-switch form-switch-sm"
                                        dir="ltr"
                                      >
                                        <Input
                                          onClick={() =>
                                            setShowApproved(!showApproved)
                                          }
                                          type="checkbox"
                                          className="form-check-input"
                                          id="customSwitchsizemd"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <h2
                                    className={
                                      "mt-4 ff-secondary fw-semibold " +
                                      item.counterClass
                                    }
                                  >
                                    {item.subCounter.map((item, key) => (
                                      <span className="counter-value" key={key}>
                                        <CountUp
                                          start={0}
                                          suffix={item.suffix}
                                          separator=","
                                          prefix="₹"
                                          // decimals={2}
                                          // decimal="."
                                          end={revenue?.total_approve_amount}
                                          duration={1}
                                        />
                                      </span>
                                    ))}
                                  </h2>
                                  <p className={"mb-0 text-" + item.labelClass}>
                                    Approved Rate :&nbsp;
                                    <span
                                      className={
                                        "mb-0 badge " + item.badgeClass
                                      }
                                    >
                                      {revenue?.approve_percentage} %
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </div>

                    {/* <div>
                      <Card
                        className={"card-animate "}
                        style={{
                          width: "200px",
                          height: "100px",
                          background: "#EAF7F5",
                        }}
                      >
                        <CardBody>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div>
                              <span
                                className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                                style={{
                                  height: "40px",
                                  background: "none",
                                  //  minWidth: "206px"
                                }}
                              >
                                <span>Achieved Revenue</span> :{" "}
                                {indianNumbers(
                                  revenue?.total_approve_amount,
                                  2
                                )}
                              </span>
                            </div>

                            <div>
                              <span
                                className="badge badge-soft-success d-flex align-items-center justify-content-center px-3  fs-12 text-center"
                                style={{
                                  height: "40px",
                                  background: "none",
                                  // minWidth: "206px"
                                }}
                              >
                                Achieved Rate : {revenue?.approve_percentage} %
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div> */}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    // marginLeft: "auto",
                  }}
                >
                  {/* <div>Percentage</div> */}
                  {/* <Label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    %
                  </Label> */}
                  <div>
                    {/* <div
                      className="form-check form-switch form-switch-md"
                      dir="ltr"
                    >
                      <Input
                        onClick={() => setShowApproved(!showApproved)}
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizemd"
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="customSwitchsizemd"
                        style={{ fontSize: "8px" }}
                      >
                        Approved
                      </Label>
                    </div> */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    // marginLeft: "auto",
                    marginRight: "10px",
                  }}
                >
                  {colorArray.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        id={item.id}
                        onClick={() => {
                          setPercent(
                            item.color == "#ff6969"
                              ? 0
                              : item.color == "#088395"
                              ? 1
                              : 2
                          );
                          let check = colorArray.map((it) =>
                            it.id == item.id
                              ? { ...it, backColor: true }
                              : { ...it, backColor: false }
                          );
                          setColorArray(check);
                        }}
                        style={{
                          width: "25px",
                          height: "25px",
                          border: "1px solid red",
                          borderColor:
                            item.backColor == true ? item.colorback : "white",
                          borderRadius: "4px",
                          backgroundColor:
                            item.backColor == true ? item.colorback : "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid red",
                            borderColor: item.color,
                            width: "12px",
                            height: "12px",
                            borderRadius: "6px",
                            background: item.color,
                            cursor: "pointer",
                          }}
                        ></div>
                      </div>
                      <div style={{ color: "black" }}>{item.data}</div>

                      <UncontrolledTooltip
                        placement="top"
                        target={item.id}
                        style={{ zIndex: "9999" }}
                      >
                        {item.id == "tooltip0"
                          ? "percentage"
                          : item.id == "tooltip1"
                          ? "Rupees"
                          : "Lead"}
                      </UncontrolledTooltip>
                    </div>
                  ))}
                </div>
              </div>

              <PipelineTable
                dailytrackData={dailytrackData}
                dailyTarget={Number(revenue?.dailyData)}
                percent={percent}
                selectedDate={startDate}
                isLoading={isLoading}
                reven={revenue}
                showApproved={showApproved}
              />
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default Pipeline;
