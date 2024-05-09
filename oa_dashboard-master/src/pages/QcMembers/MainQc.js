import React from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import classnames from "classnames";
import { QcMembers } from "./QcMembers";
import QcManagers from "../QcManagers/QcManagers";

const MainQc = () => {
  const [customHoverTab, setcustomHoverTab] = React.useState("1");

  const customHovertoggle = (tab) => {
    if (customHoverTab !== tab) {
      setcustomHoverTab(tab);
    }
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="border" style={{ background: "#fff" }}>
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
                      <i className="ri-file-text-line nav-icon nav-tab-position"></i>
                      <h5 className="nav-titl nav-tab-position m-0">
                        Dashboard
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
                      <i className="mdi mdi-account-tie-outline nav-icon nav-tab-position"></i>
                      <h5 className="nav-titl nav-tab-position m-0">Agents</h5>
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
                      <h5 className="nav-titl nav-tab-position m-0">
                        Managers
                      </h5>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>

              <TabContent activeTab={customHoverTab} className="text-muted">
                <TabPane tabId="0" id="custom-hover-customere">
                  <div className="table-responsive"></div>
                </TabPane>

                <TabPane tabId="1" id="custom-hover-customere">
                  <div className="table-responsive">
                    <QcMembers />
                  </div>
                </TabPane>

                <TabPane tabId="2" id="custom-hover-customere">
                  <div className="table-responsive">
                    <QcManagers />
                  </div>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainQc;
