import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import BusinessProjectTable from "./BusinessProjectTable";

const BusinessProject = () => {
  return (
    <div className="page-content">
      <div>
        <Row>
          <Col md={2} style={{ flexGrow: "1" }}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                      <i className={"align-middle  ri-shopping-bag-line"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Total
                    </p>
                    <h4 className=" mb-0">1234</h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={2} style={{ flexGrow: "1" }}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                      <i
                        className={"align-middle   ri-checkbox-circle-line"}
                      ></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Creation
                    </p>
                    <h4 className=" mb-0">1234</h4>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-danger me-1"}>12</span>
                    <span className={"badge badge-soft-success"}>12</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={2} style={{ flexGrow: "1" }}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                      <i className={"align-middle   ri-rocket-2-line"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Initiation
                    </p>
                    <h4 className=" mb-0">1234</h4>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-danger me-1"}>12</span>
                    <span className={"badge badge-soft-success"}>12</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={2} style={{ flexGrow: "1" }}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                      <i className={"align-middle   bx bx-user"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Pilot
                    </p>
                    <h4 className=" mb-0">1234</h4>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-danger me-1"}>12</span>
                    <span className={"badge badge-soft-success"}>12</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={2} style={{ flexGrow: "1" }}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                      <i className={"align-middle  ri-tv-line"}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                      Live
                    </p>
                    <h4 className=" mb-0">1234</h4>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span className={"badge badge-soft-danger me-1"}>12</span>
                    <span className={"badge badge-soft-success"}>12</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-end">
            <h5>My Projects</h5>
            <div style={{ marginRight: "228px" }}>
              <div>
                {/* <button
                  type="button"
                  className="btn  waves-effect waves-light me-3"
                  //   onClick={() => setOpen(!open)}
                >
                  <i className=" ri-add-fill align-bottom me-1 fs-14"></i>
                  Add Lead
                </button> */}
                <button
                  type="button"
                  className="btn  waves-effect waves-light text-light"
                  style={{
                    backgroundColor: "#ec5c24",
                  }}
                >
                  <i className="ri-filter-3-line align-bottom me-1 fs-14" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <BusinessProjectTable />
        </CardBody>
      </Card>
    </div>
  );
};

export default BusinessProject;
