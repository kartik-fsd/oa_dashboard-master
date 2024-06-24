import React, { useContext, useState } from "react";

import { Card, CardBody, Col, Container, Row } from "reactstrap";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../../../components/common/BreadCrumb";
import Stats from "./Stats";
import Leads from "./Leads";
import Taskers from "./Taskers";

const AsmViewProject = () => {
  const [customHoverTab, setcustomHoverTab] = React.useState("0");

  const customHovertoggle = (tab) => {
    if (customHoverTab !== tab) {
      setcustomHoverTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <span>
            {" "}
            <BreadCrumb title={`ASM Project`} pageTitle="Sow" />
          </span>
          {/* <div onClick={history.goBack}>testing</div> */}
          <Row>
            <Col xxl={12}>
              {/* <h5 className="mb-3">Custom Hover Tabs</h5> */}
              <div style={{ boxShadow: "none" }}>
                <Card className="border">
                  <Nav pills className="nav nav-pills custom-hover-nav-tabs">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "0",
                        })}
                        onClick={() => {
                          customHovertoggle("0");
                        }}
                      >
                        <i className="ri-pie-chart-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Statistics
                        </h5>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "1",
                        })}
                        onClick={() => {
                          customHovertoggle("1");
                        }}
                      >
                        <i className=" mdi mdi-account-tie-outline  nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Networks
                        </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "2",
                        })}
                        onClick={() => {
                          customHovertoggle("2");
                        }}
                      >
                        <i className="mdi mdi-script-text-outline nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">Leads</h5>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Card>
                <div className="p-0">
                  <TabContent activeTab={customHoverTab} className="text-muted">
                    <TabPane tabId="0" id="custom-hover-customere">
                      <div className="">
                        <Stats />
                      </div>
                    </TabPane>
                    <TabPane tabId="1" id="custom-hover-customere">
                      <div className="">
                        <Taskers />
                      </div>
                    </TabPane>
                    <TabPane tabId="2" id="custom-hover-customere">
                      <div className="">
                        <Leads />
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AsmViewProject;
