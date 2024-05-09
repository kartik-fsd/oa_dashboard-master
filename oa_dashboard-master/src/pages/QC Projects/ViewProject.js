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
// import FseList from "../Dashboard/fseList/FseList";
// import CampLeads from "../ManagerDashboard/superPartner/CampLeads";
import classnames from "classnames";
import SowContent from "../Dashboard/sow/SowContent";
// import FseList from "../Dashboard/fseList/FseList";
import ProjectPayout from "../Dashboard/ProjectPayout/ProjectPayout";
import ImageDesc from "./QcScript/ImageDesc";
import QcScripts from "./QcScript/QcScripts";

const ViewProject = () => {
  const [customHoverTab, setcustomHoverTab] = React.useState("1");

  const customHovertoggle = (tab) => {
    if (customHoverTab !== tab) {
      setcustomHoverTab(tab);
    }
  };

  //background: "#F3F3F8",
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
                        Projects
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
                      <h5 className="nav-titl nav-tab-position m-0">Taskers</h5>
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
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customHoverTab === "3",
                      })}
                      onClick={() => {
                        customHovertoggle("3");
                      }}
                    >
                      <i className="mdi mdi-image-outline nav-icon nav-tab-position "></i>
                      <h5 className="nav-titl nav-tab-position m-0">
                        Image Desc
                      </h5>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customHoverTab === "4",
                      })}
                      onClick={() => {
                        customHovertoggle("4");
                      }}
                    >
                      <i className="mdi mdi-image-edit-outline nav-icon nav-tab-position"></i>
                      <h5 className="nav-titl nav-tab-position m-0">
                        QC Script
                      </h5>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <TabContent activeTab={customHoverTab} className="text-muted">
                <TabPane tabId="0" id="custom-hover-customere">
                  {/* <h6>Sow</h6> */}
                  <div className="table-responsive mt-4">
                    <SowContent />
                  </div>
                </TabPane>

                <TabPane tabId="1" id="custom-hover-customere">
                  <div className="table-responsive">
                    {/* <FseList type={userType} /> */}
                  </div>
                </TabPane>

                <TabPane tabId="2" id="custom-hover-customere">
                  <div className="table-responsive">
                    <ProjectPayout />
                  </div>
                </TabPane>
                <TabPane tabId="3" id="custom-hover-customere">
                  <div className="table-responsive">
                    <ImageDesc />
                  </div>
                </TabPane>
                <TabPane tabId="4" id="custom-hover-customere">
                  <div className="table-responsive">
                    <QcScripts />
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

export default ViewProject;
