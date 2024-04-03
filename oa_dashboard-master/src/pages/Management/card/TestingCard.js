import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Progress, Row } from "reactstrap";
import img from "../../../assets/images/users/avatar-1.jpg";
import FourCards from "./FourCards";
import ProgressTable from "./ProgressTable";
const TestingCard = () => {
  const arr = [1, 1, 2];
  return (
    <div className="page-content">
      <Row>
        {arr.map((item) => {
          return (
            <>
              <Col lg="4" md="6" xs="12" key={item}>
                <Card className="ribbon-box right overflow-hidden">
                  <CardBody className="text-center p-4">
                    <Col xs="12" className="d-flex justify-content-end mb-3">
                      <span
                        className="badge text-bg-warning"
                        style={{ fontSize: "8px" }}
                      >
                        Invoice A/C Not Created
                      </span>
                    </Col>
                    <img
                      src={img}
                      alt=""
                      height="60"
                      style={{ borderRadius: "50%" }}
                    />
                    <h5 className="mb-1 mt-2">
                      <Link
                        to="apps-ecommerce-seller-details"
                        className="link-primary"
                      >
                        Brand Name
                      </Link>
                    </h5>
                    <div className="mb-4">
                      <p className="text-muted m-0 mb-1 fs-11 ">
                        Project Name-Project ID
                      </p>
                      <span className="badge badge-soft-success">Status</span>
                    </div>
                    <Row className="justify-content-center"></Row>
                    <Row className="mt-4">
                      <Col lg={12} className="mb-3">
                        <div
                          className=" d-flex justify-content-between mb-1"
                          style={{ fontSize: "10px" }}
                        >
                          <p className="m-0">Milestone</p>
                          <p className="m-0">500</p>
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
                            className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                            role="progressbar"
                            style={{ width: "30%" }}
                            aria-valuenow="30"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </Col>
                      <Col lg={12} className="mb-3">
                        <div
                          className=" d-flex justify-content-between mb-1"
                          style={{ fontSize: "10px" }}
                        >
                          <p className="m-0">Revenue</p>
                          <p className="m-0">100000</p>
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
                            className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
                            role="progressbar"
                            style={{ width: "30%" }}
                            aria-valuenow="30"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </Col>
                      <Col lg={12} className="mb-3">
                        <div
                          className=" d-flex justify-content-between mb-1"
                          style={{ fontSize: "10px" }}
                        >
                          <p className="m-0">Expenses</p>
                          <p className="m-0">35000</p>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated bg-danger "
                            role="progressbar"
                            style={{ width: "40%" }}
                            aria-valuenow="40"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </Col>
                      <Col lg={12} className="mb-3">
                        <div
                          className=" d-flex justify-content-between mb-1"
                          style={{ fontSize: "10px" }}
                        >
                          <p className="m-0">Billing</p>
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
                          <p
                            className="m-0"
                            style={{ fontSize: "9px", width: "25%" }}
                          >
                            Billed
                          </p>
                          <p
                            className="m-0"
                            style={{ fontSize: "9px", width: "30%" }}
                          >
                            Unbilled
                          </p>
                          <p
                            className="m-0"
                            style={{ fontSize: "9px", width: "45%" }}
                          >
                            Collected
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
      <FourCards />
      <ProgressTable />
    </div>
  );
};

export default TestingCard;
