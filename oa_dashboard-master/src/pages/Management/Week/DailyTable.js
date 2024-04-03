import moment from "moment/moment";
import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { indianNumbers } from "../../../components/common/indianNumbers";
import "./dailytable.css";

const DailyTable = ({ dayData }) => {
  console.log(dayData, "daydata");
  const data = dayData.arr;
  return (
    <div>
      <div className="table-responsive daily-table" style={{ height: "600px" }}>
        <table className="table table-bordered table-nowrap align-middle mb-0">
          <thead style={{ position: "sticky", top: "0px" }}>
            <tr>
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
                   
                    1234
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
                   
                    123
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
                    className="badge text-bg-primary "
                    style={{ minWidth: "70px" }}
                  >
                    {indianNumbers(dayData?.targeted_revenue, 2)}
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
                    {indianNumbers(dayData?.performed_revenue, 2)}
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
                    {indianNumbers(dayData?.actual_revenue, 2)}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                style={{ width: "12%", backgroundColor: "#f4f6f9" }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <p className="m-0 text-center"> Performed Leads</p>

                  <span
                    className="badge text-bg-warning text-dark"
                    style={{ minWidth: "70px" }}
                  >
                    {indianNumbers(dayData?.per_leads, 2)}
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
                    {indianNumbers(dayData?.actual_leads, 2)}
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
                    className="badge text-bg-primary "
                    style={{ minWidth: "80px" }}
                  >
                    {indianNumbers(dayData?.targeted_collectable, 2)}
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
                    {indianNumbers(dayData?.actual_collectable, 2)}
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {(data || []).map((item, key) => (
              <tr key={key}>
                <td style={{ textAlign: "center" }} className="bg-light">
                  <div className="d-flex flex-column gap-1 align-items-center">
                    <span style={{ cursor: "pointer" }}>{item.week}</span>
                    <span className="badge badge-soft-primary">
                      {moment(item.date)?.format("DD-MMM-YYYY")}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    // backgroundColor: "#fff0ec",
                    textAlign: "center",
                  }}
                >
                  {item.targeted_revenue ? (
                    indianNumbers(item.targeted_revenue, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>
                <td
                  style={{
                    // backgroundColor: "#fff0ec",
                    textAlign: "center",
                  }}
                >
                  {item.performed_revenue ? (
                    indianNumbers(item.performed_revenue, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>

                <td
                  style={{
                    // backgroundColor: "#ebf7f5",
                    textAlign: "center",
                  }}
                >
                  {item.actual_revenue ? (
                    indianNumbers(item.actual_revenue, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>
                <td
                  style={{
                    //  background: "#ebf7f5",
                    textAlign: "center",
                  }}
                >
                  {item.per_leads ? (
                    indianNumbers(item.per_leads, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>
                <td
                  style={{
                    // backgroundColor: "#ebf7f5",
                    textAlign: "center",
                  }}
                >
                  {item.actual_leads ? (
                    indianNumbers(item.actual_leads, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>
                <td
                  style={{
                    //  background: "#fef8ee",
                    textAlign: "center",
                  }}
                >
                  {item.targeted_collectable ? (
                    indianNumbers(item.targeted_collectable, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>
                <td
                  style={{
                    //  background: "#fef8ee",
                    textAlign: "center",
                  }}
                >
                  {item.actual_collectable ? (
                    indianNumbers(item.actual_collectable, 2)
                  ) : (
                    <span>&#8208;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyTable;
