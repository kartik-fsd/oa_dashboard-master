import React from "react";

import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Input } from "reactstrap";
import { indianNumbers } from "../../../components/common/indianNumbers";
// import * as monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import Flatpickr from "react-flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.min.css";
// import "flatpickr-monthselect-plugin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./week.css";
import moment from "moment/moment";
import DailyModal from "./DailyModal";
import DailyTable from "./DailyTable";
import {
  projectionofweek,
  projectionofweek1,
} from "../../../assets/utils/managementapi";
import { farming } from "../../../globalConfig";
import axios from "axios";
import DailyDowloadMod from "./DailyDowloadMod";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const WeekTable = ({ totalData, setStartDate, startDate, month }) => {
  const history = useHistory();
  console.log(history.location.pathname, "passed");
  const [open, setOpen] = React.useState(false);
  const [week, setWeek] = React.useState("");
  const [switchData, setSwitchData] = React.useState(false);
  const [dayData, setDayData] = React.useState({});
  // const [date,setDate] = React.useState

  console.log(month, "month");

  console.log(dayData, "day");
  console.log(switchData, "switch");

  const date = week + month;

  console.log(date, "week");

  const data = totalData.arr;

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    // <button className="example-custom-input" onClick={onClick} ref={ref}>
    //   {value}
    // </button>
    <input value={value} onClick={onClick} className="example-custom-input" />
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  React.useEffect(() => {
    let link;
    if (history.location.pathname == "/founders/monthly-summary") {
      link = farming.farming_URL + projectionofweek1 + month;
    } else {
      link = farming.farming_URL + projectionofweek + month;
    }

    axios
      .get(link)
      .then((res) => setDayData(res.data))
      .catch((err) => console.log(err));
  }, [month]);

  return (
    <React.Fragment>
      <Col xxl={12}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <div
              className="card-title mb-0 fw-600 fs-16 flex-grow-1 "
              style={{ marginLeft: "15px" }}
            >
              <h4
                className=" m-0"
                style={{ letterSpacing: "2px", color: "#b83016" }}
              >
                Monthly Summary
              </h4>
              <div>
                <div style={{ display: "flex", gap: "18px" }}>
                  <div
                    className="d-flex flex-column"
                    style={{ width: "160px" }}
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <div
                        className="form-check form-switch form-switch-primary"
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
                          <strong>Day Wise</strong>
                        ) : (
                          <strong>Week Wise</strong>
                        )}
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2"></div>
                  </div>
                </div>
                {/* <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <div className="d-flex align-items-center gap-1 fs-12">
                      <span
                        className="rounded-circle"
                        style={{
                          background: "#00C851",
                          width: "10px",
                          height: "10px",
                        }}
                      ></span>
                      <span>Active</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 fs-12">
                      <span
                        className="rounded-circle"
                        style={{
                          background: "#FF4444",
                          width: "10px",
                          height: "10px",
                        }}
                      ></span>
                      <span>Inactive</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="flex-shrink-0 d-flex gap-4">
              <div>
                <i
                  className=" ri-download-2-line "
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#b83016",
                  }}
                  onClick={() => setOpen(!open)}
                ></i>
              </div>
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
          </CardHeader>
          <CardBody>
            {switchData ? (
              <DailyTable dayData={dayData} />
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-nowrap align-middle mb-0">
                  <thead>
                    <tr style={{ position: "sticky", top: "0px" }}>
                      <th
                        scope="col"
                        style={{
                          width: "13%",
                          textAlign: "center",
                          backgroundColor: "#f4f6f9",
                        }}
                      >
                        <div>
                          <p className="m-0 text-center">Week</p>
                          <p className="m-0 text-center invisible">123</p>
                        </div>
                      </th>
                      {/* <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Target Billing</p>

                          <span
                            className="badge text-bg-primary"
                            style={{ minWidth: "70px" }}
                          >
                            {indianNumbers(
                              totalData?.total_targeted_billing,
                              2
                            )}
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Actual Billing</p>

                          <span
                            className="badge text-bg-success"
                            style={{ minWidth: "70px" }}
                          >
                            {indianNumbers(totalData?.total_actual_billing, 2)}
                          </span>
                        </div>
                      </th> */}

                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Target Revenue</p>

                          <span
                            className="badge text-bg "
                            style={{
                              minWidth: "70px",
                              backgroundColor: "#ec5c24",
                              color: "#ffffff",
                            }}
                          >
                            {indianNumbers(
                              totalData?.total_targeted_revenue,
                              2
                            )}
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center"> Performed Revenue</p>

                          <span
                            className="badge text-bg-warning text-dark"
                            style={{ minWidth: "70px" }}
                          >
                            {indianNumbers(
                              totalData?.total_performed_revenue,
                              2
                            )}
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Approved Revenue</p>

                          <span
                            className="badge text-bg-success "
                            style={{ minWidth: "70px" }}
                          >
                            {indianNumbers(totalData?.total_actual_revenue, 2)}
                          </span>
                        </div>
                      </th>

                      {/* testing approved leads */}

                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Performed Leads</p>

                          <span
                            className="badge text-bg-warning text-dark"
                            style={{ minWidth: "70px" }}
                          >
                            {indianNumbers(totalData?.total_performed_leads, 2)}
                          </span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Approved Leads</p>

                          <span
                            className="badge text-bg-success "
                            style={{ minWidth: "70px" }}
                          >
                            {indianNumbers(totalData?.total_actual_leads, 2)}
                          </span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Target Collectables</p>

                          <span
                            className="badge text-bg "
                            style={{
                              minWidth: "80px",
                              backgroundColor: "#ec5c24",
                              color: "#ffffff",
                            }}
                          >
                            {indianNumbers(
                              totalData?.total_targeted_collectable,
                              2
                            )}
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        style={{ width: "12%", backgroundColor: "#f4f6f9" }}
                      >
                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                          <p className="m-0 text-center">Actual Collectables</p>

                          <span
                            className="badge text-bg-success"
                            style={{ minWidth: "80px" }}
                          >
                            {indianNumbers(
                              totalData?.total_actual_collectable,
                              2
                            )}
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {(data || []).map((item, key) => (
                      <tr key={key}>
                        <td
                          style={{ textAlign: "center" }}
                          className="bg-light"
                        >
                          <div className="d-flex flex-column gap-1 align-items-center">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setOpen(!open);
                                setWeek(item.week?.split(" ")[1]);
                                // console.log(item.week?.split(" ")[1]);
                              }}
                            >
                              {item.week}
                            </span>
                            <span
                              className="badge badge-soft"
                              style={{
                                backgroundColor: "#ec5c24",
                                color: "#ffffff",
                              }}
                            >
                              {item.date}
                            </span>
                          </div>
                        </td>
                        {/* <td
                          style={{
                            backgroundColor: "#fff0ec",
                            textAlign: "center",
                          }}
                        >
                          {indianNumbers(item.targeted_billing, 2)}
                        </td>
                        <td
                          style={{
                            backgroundColor: "#fff0ec",
                            textAlign: "center",
                          }}
                        >
                          {indianNumbers(item.actual_billing, 2)}
                        </td> */}

                        <td
                          style={{
                            backgroundColor: "#ebf7f5",
                            textAlign: "center",
                          }}
                        >
                          {indianNumbers(item.targeted_revenue, 2)}
                        </td>
                        <td
                          style={{ background: "#ebf7f5", textAlign: "center" }}
                        >
                          {indianNumbers(item.performed_revenue, 2)}
                        </td>
                        <td
                          style={{
                            backgroundColor: "#ebf7f5",
                            textAlign: "center",
                          }}
                        >
                          {indianNumbers(item.actual_revenue, 2)}
                        </td>
                        <td
                          style={{ background: "#fef8ee", textAlign: "center" }}
                        >
                          {indianNumbers(item.performed_leads, 2)}
                        </td>

                        {/* testing approved leads */}

                        <td
                          style={{ background: "#fef8ee", textAlign: "center" }}
                        >
                          {indianNumbers(item.actual_leads, 2)}
                        </td>
                        <td
                          style={{ background: "#fef8ee", textAlign: "center" }}
                        >
                          {indianNumbers(item.targeted_collectable, 2)}
                        </td>
                        <td
                          style={{ background: "#fef8ee", textAlign: "center" }}
                        >
                          {indianNumbers(item.actual_collected, 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </Col>
      {/* <DailyModal open={open} setOpen={setOpen} /> */}
      <DailyDowloadMod open={open} setOpen={setOpen} switchData={switchData} />
    </React.Fragment>
  );
};

export default WeekTable;
