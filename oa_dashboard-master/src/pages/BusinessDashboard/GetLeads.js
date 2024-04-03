import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  Progress,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

const GetLeads = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [progressbarvalue, setprogressbarvalue] = useState(50);
  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  }
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Row>
            <Col lg={4}>
              <Card style={{ height: "150px", padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    // justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div className="avatar-group-item">
                      <div className="avatar-xs">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          <img
                            src={"/logo192.png"}
                            width="15px"
                            height="15px"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: "900" }}>
                      Zoom car private limited
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div>
                      {" "}
                      <span style={{ fontWeight: "600" }}>
                        Service&nbsp;:
                      </span>{" "}
                      Merchant onboarding
                    </div>
                    <div>
                      {" "}
                      <span style={{ fontWeight: "600" }}>
                        Source of Lead&nbsp;:
                      </span>{" "}
                      LinkedIn Approach
                    </div>
                    <div>
                      {" "}
                      <span style={{ fontWeight: "600" }}>
                        Date&nbsp;:
                      </span>{" "}
                      07-12-2022 12:49 PM
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col lg={8}>
              <Card style={{ height: "150px", padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: "600" }}>Name&nbsp;:</span>{" "}
                        Digvijay Singh Shekhawat
                      </div>
                      <div>
                        {" "}
                        <span style={{ fontWeight: "600" }}>
                          Phone&nbsp;:
                        </span>{" "}
                        9887861907
                      </div>
                      <div>
                        {" "}
                        <span style={{ fontWeight: "600" }}>
                          Email&nbsp;:
                        </span>{" "}
                        digvijay.shekhawat@zoomcar.com
                      </div>
                      <div>
                        {" "}
                        <span style={{ fontWeight: "600" }}>
                          Created by&nbsp;:
                        </span>{" "}
                        Madhuresh Kumar
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div>testing</div>
                    <div className="progress-nav" style={{ width: "250px" }}>
                      <Progress
                        value={progressbarvalue}
                        style={{ height: "3px", marginTop: "-17px" }}
                      />

                      <Nav
                        className="nav-pills progress-bar-tab custom-nav"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            to="#"
                            id="pills-gen-info-tab"
                            // className={"rounded-pill bg-red"}
                          >
                            <div className="avatar-group-item">
                              <div className="avatar-xs">
                                <div className="avatar-title rounded-circle bg-light text-primary">
                                  1
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            to="#"
                            id="pills-gen-info-tab"
                            className={classnames(
                              {
                                active: activeTab === 2,
                                done: activeTab <= 4 && activeTab > 1,
                              },
                              "rounded-pill"
                            )}
                          >
                            <div className="avatar-group-item">
                              <div className="avatar-xs">
                                <div className="avatar-title rounded-circle bg-light text-primary">
                                  2
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            to="#"
                            id="pills-gen-info-tab"
                            className={classnames(
                              {
                                active: activeTab === 3,
                                done: activeTab <= 4 && activeTab > 2,
                              },
                              "rounded-pill"
                            )}
                          >
                            <div className="avatar-group-item">
                              <div className="avatar-xs">
                                <div className="avatar-title rounded-circle bg-light text-primary">
                                  3
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "280px",
                        }}
                      >
                        <div style={{ marginLeft: "-15px", marginTop: "10px" }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div style={{ fontSize: "8px" }}>
                              Lead Nurturing
                            </div>
                            <div style={{ fontSize: "8px" }}>
                              DD-MM-YY HH:MM
                            </div>
                          </div>
                        </div>
                        <div style={{ marginLeft: "15px", marginTop: "10px" }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div style={{ fontSize: "8px" }}>Lead Maturing</div>
                            <div style={{ fontSize: "8px" }}>
                              DD-MM-YY HH:MM
                            </div>
                          </div>
                        </div>
                        <div style={{ marginLeft: "18px", marginTop: "10px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{ fontSize: "8px", marginLeft: "30px" }}
                            >
                              Hot Lead
                            </div>
                            <div style={{ fontSize: "8px", marginLeft: "5px" }}>
                              DD-MM-YY HH:MM
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <i
                      className="ri-more-fill"
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    ></i>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card style={{ padding: "20px" }}>
                <div>
                  {" "}
                  <span style={{ fontWeight: "600" }}>Description</span>:
                  Zoomcar holds the distinction of being India’s first personal
                  mobility platform, with the introduction of car sharing
                  services in 2013 and today is the market leader in the
                  self-drive space with over 10,000 cars in its fleet. With a
                  strong focus on the mobile experience, Zoomcar allows users to
                  rent cars by the hour, day, week, or month. Headquartered in
                  Bangalore, Zoomcar is over 250 people strong and operates in
                  45+ cities across India. In 2018, Zoomcar introduced India’s
                  first peer2peer based
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Card style={{ padding: "20px" }}>
                <Label>Lead Details</Label>
                <Input />
                <br />
                <Label>Lead Requirements</Label>
                <Input />
                <br />
                <Label>Lead Milestone</Label>
                <Input />
                <br />
                <Label>Lead Criteria</Label>
                <Input />
                <br />
                <Label>Lead Criteria</Label>
                <Input />
                <br />
                <Label>Other note / Reference</Label>
                <Input />
                <br />
                <Label>Commercial</Label>
                <Input />
                <br />
              </Card>
            </Col>
            <Col lg={4}>
              <Card style={{ height: "200px" }}>
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      width: "100%",
                      border: ".8px solid #663595",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>Remarks</div>
                    <div>
                      <Button>Add</Button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100px",
                    }}
                  >
                    No Remarks
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GetLeads;
