import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { title } from "../../common/pathName";
import AudiencesMetrics from "../DashboardAnalytics/AudiencesMetrics";
import TopReferrals from "../DashboardAnalytics/TopReferrals";
import UpgradeAccountNotise from "../DashboardAnalytics/UpgradeAccountNotise";
import UsersByDevice from "../DashboardAnalytics/UsersByDevice";
import ItemDetails from "../NFTMarketDetails/Itemdetails/Index";
import BreadCrumb from "../../components/common/BreadCrumb";
import { withTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import SowContent from "./sow/SowContent";
import Training from "./training/Training";
import { sessionToken } from "../../assets/config/sessionToken";
import ProjectPayout from "./ProjectPayout/ProjectPayout";
import FseList from "./fseList/FseList";
import StatsContent from "./stats/StatsContent";
import Issues from "./issues/Issues";
const DashboardMainPage = () => {
  const [customHoverTab, setcustomHoverTab] = React.useState("1");
  const customHovertoggle = (tab) => {
    if (customHoverTab !== tab) {
      setcustomHoverTab(tab);
    }
  };

  const path = useLocation();
  const final = path.pathname.slice(1);
  const split = final.split("/");
  const Cap = split[0][0].toUpperCase() + split[0].slice(1);
  document.title = `${title}`;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={`${split[1]}`} pageTitle="Sow" />
          <Row>
            <Col xxl={12}>
              {/* <h5 className="mb-3">Custom Hover Tabs</h5> */}
              <Card>
                <div className="border">
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
                        <h5 className="nav-titl nav-tab-position m-0">Stats</h5>
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
                        <i className="ri-file-text-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">Sow</h5>
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
                        <i className="ri-slideshow-3-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Training
                        </h5>
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
                        <i className=" ri-briefcase-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Lead Generation
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
                        <i className="ri-group-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Tasker
                        </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "5",
                        })}
                        onClick={() => {
                          customHovertoggle("5");
                        }}
                      >
                        <i className=" ri-briefcase-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Issues
                        </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "6",
                        })}
                        onClick={() => {
                          customHovertoggle("6");
                        }}
                      >
                        <i className=" ri-fire-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Merchant
                        </h5>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <CardBody className="p-0">
                  <TabContent activeTab={customHoverTab} className="text-muted">
                    <TabPane tabId="0" id="custom-hover-customere">
                      {/* <h6>Sow</h6> */}
                      <div className="">
                        <StatsContent />
                      </div>
                    </TabPane>
                    <TabPane tabId="1" id="custom-hover-customere">
                      {/* <h6>Sow</h6> */}
                      <div className="">
                        <SowContent />
                      </div>
                    </TabPane>

                    <TabPane tabId="2" id="custom-hover-customere">
                      {/* <h6>Training</h6> */}
                      <div className="">
                        <Training />
                      </div>
                    </TabPane>

                    <TabPane tabId="3" id="custom-hover-customere">
                      <div className="">
                        {/* <Training /> */}
                        <ProjectPayout />
                      </div>
                    </TabPane>

                    <TabPane tabId="4" id="custom-hover-customere">
                      <div className="">
                        <FseList />
                      </div>
                    </TabPane>
                    <TabPane tabId="5" id="custom-hover-customere">
                      <div className="">
                        <Issues />
                      </div>
                    </TabPane>
                    <TabPane tabId="6" id="custom-hover-customere">
                      <div className="">
                        <Issues />
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(DashboardMainPage));
