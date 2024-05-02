import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const FourCards = () => {
  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };
  return (
    <div className="page-content">
      <Row>
        <Col xl={3}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium mb-0 text-muted">
                    Milestone
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <div className="mb-4">
                    <h4 className="fs-22 fw-semibold ff-secondary m-0 text-dark">
                      <span>98%</span>
                      <span className="ms-2 fs-15">reached</span>
                    </h4>
                    <span
                      className="badge badge-soft mt-1 invisible "
                      style={{ fontSize: "9px", backgroundColor: "#f07d47" }}
                    >
                      <i className=" ri-arrow-down-line align-bottom me-1 "></i>
                      10% Less Than Expected
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-warning fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      High Milestone
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-warning">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-danger fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Lowest Perf
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-danger">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i
                      className=" ri-stop-fill  fs-16 "
                      style={{ color: "#b83016" }}
                    ></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Average Perf Rate
                    </p>
                  </div>
                  <p className="m-0 fs-12 " style={{ color: "#b83016" }}>
                    123
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-success fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Approved Rate
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-success">123</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium mb-0 text-muted">
                    Revenue
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div className="mb-4">
                  <h4 className="fs-22 fw-semibold ff-secondary m-0 text-dark">
                    <span>{indianNumbers(1536784, 2)}</span>
                    {/* <span className="ms-2 fs-15">reached</span> */}
                  </h4>
                  <span
                    className="badge badge-soft mt-1 "
                    style={{ fontSize: "9px", backgroundColor: "#f07d47" }}
                  >
                    <i className=" ri-arrow-down-line align-bottom me-1"></i>
                    10% Less Than Expected
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-warning fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      High Client
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-warning">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-danger fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Lowest Client
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-danger">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i
                      className=" ri-stop-fill  fs-16 "
                      style={{ color: "#b83016" }}
                    ></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Average Revenue
                    </p>
                  </div>
                  <p className="m-0 fs-12 " style={{ color: "#b83016" }}>
                    123
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-success fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Performed Revenue
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-success">123</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium mb-0 text-muted">
                    Expenses
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div className="mb-4">
                  <h4 className="fs-22 fw-semibold ff-secondary m-0 text-dark">
                    <span>{indianNumbers(203146, 2)}</span>
                    {/* <span className="ms-2 fs-15">reached</span> */}
                  </h4>
                  <span
                    className="badge badge-soft mt-1 "
                    style={{ fontSize: "9px", backgroundColor: "#f07d47" }}
                  >
                    <i className=" ri-arrow-up-line align-bottom me-1"></i>
                    3% greater Than Expected
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-warning fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Tasker Payout
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-warning">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-danger fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Project Expense
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-danger">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill  fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Unique Taskers
                    </p>
                  </div>
                  <p className="m-0 fs-12 " style={{ color: "#b83016" }}>
                    123
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-success fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Average Taskers
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-success">123</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium mb-0 text-muted">
                    Billing
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div className="mb-4">
                  <h4 className="fs-22 fw-semibold ff-secondary m-0 text-dark">
                    <span>{indianNumbers(203146, 2)}</span>
                    {/* <span className="ms-2 fs-15">reached</span> */}
                  </h4>
                  <span
                    className="badge badge-soft mt-1 "
                    style={{ fontSize: "9px", backgroundColor: "#f07d47" }}
                  >
                    <i className=" ri-arrow-up-line align-bottom me-1"></i>
                    3% greater Than Expected
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-warning fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Billed
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-warning">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-danger fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Unbilled
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-danger">123</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill  fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Wave Off
                    </p>
                  </div>
                  <p className="m-0 fs-12 " style={{ color: "#b83016" }}>
                    123
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <i className=" ri-stop-fill text-success fs-16 "></i>

                    <p className="m-0 fs-14" style={{ fontWeight: "500" }}>
                      Average DSO
                    </p>
                  </div>
                  <p className="m-0 fs-12 text-success">123</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FourCards;
