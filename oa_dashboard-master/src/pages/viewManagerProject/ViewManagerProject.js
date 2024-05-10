import React, { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { title } from "../../common/pathName";
// import AudiencesMetrics from "../DashboardAnalytics/AudiencesMetrics";
// import TopReferrals from "../DashboardAnalytics/TopReferrals";
// import UpgradeAccountNotise from "../DashboardAnalytics/UpgradeAccountNotise";
// import UsersByDevice from "../DashboardAnalytics/UsersByDevice";
// import ItemDetails from "../NFTMarketDetails/Itemdetails/Index";
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
// import SowContent from "./sow/SowContent";
// import Training from "./training/Training";
import { sessionToken } from "../../assets/config/sessionToken";
import FseList from "../Dashboard/fseList/FseList";
import ProjectPayout from "../Dashboard/ProjectPayout/ProjectPayout";
import Training from "../Dashboard/training/Training";
import SowContent from "../Dashboard/sow/SowContent";
import PayoutDetails from "../ManagerDashboard/PayoutDetails/PayoutDetails";
import ClientReport from "../ManagerDashboard/clientreport/ClientReport";
import OaAssign from "../ManagerDashboard/clientreport/Oa/OaAssign";
import StatsContentManager from "../ManagerDashboard/stats/StatsContentManager";
import Issues from "../Dashboard/issues/Issues";
import { api } from "../../globalConfig";
import axios from "axios";
// import ProjectPayout from "./ProjectPayout/ProjectPayout";
// import FseList from "./fseList/FseList";
// import StatsContent from "./stats/StatsContent";
import { extract_token } from "../../assets/utils/common";
import SuperPartner from "../ManagerDashboard/superPartner/SuperPartner";
import CampLeads from "../ManagerDashboard/superPartner/CampLeads";
import { month_menu } from "../../assets/utils/sow";
import { Context } from "../../App";
import ProjectOverViewSection from "../BusinessDashVel/ProjectOverViewSection";
import { project_details } from "../../assets/utils/Business";
import Campaign from "../BusinessDashVel/Tabs/Campaign";
import "./viewproject.css";

const ViewManagerProject = () => {
  const path = useLocation();
  const final = path.pathname.slice(1);

  const history = useHistory();
  const split = final.split("/");

  console.log(split, "tesitngsplit");
  const { id } = useParams();
  const sowIdData = id.split("-")[0];
  const Cap = split[0][0].toUpperCase() + split[0].slice(1);
  document.title = `${title}`;

  const [context, setContext] = useContext(Context);

  const [customHoverTab, setcustomHoverTab] = React.useState("0");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userType, setUserType] = React.useState(undefined);
  const [userRole, setUserRole] = React.useState("");
  const [isErr, setIsErr] = React.useState(false);
  const [monthData, setMonthData] = useState([]);
  const [projectDetails, setProjectDetails] = useState(false);
  const [overViewData, setOverViewData] = React.useState([]);

  const accessType = sessionStorage.getItem("useraccesstype");
  const user = context?.oaDetials?.role;

  console.log(context?.oaDetials?.role, accessType, "contextfasak");

  let projectDetailsURL = api.ONX_URL + project_details;

  React.useEffect(() => {
    if (context?.projectId > 0) {
      setProjectDetails(true);
      axios
        .get(projectDetailsURL, { params: { project_id: context?.projectId } })
        .then((res) => {
          if (res?.data?.error) {
            setIsErr(true);
          } else {
            setIsLoading(false);
            setOverViewData(res?.data?.project_details);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setProjectDetails(false);
    }
  }, [context?.projectId, userRole]);

  const getMonths = () => {
    let monthapi = api.OA_URL + month_menu;
    setIsLoading(true);
    axios
      .get(monthapi, { params: { sow_id: sowIdData } })
      .then((res) => {
        console.log(res?.data?.months, "monthresponse");
        setMonthData(res.data.months);
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  React.useEffect(() => {
    const pathname = api.VENDOR_URL + extract_token;
    setIsLoading(true);
    axios
      .get(pathname)
      .then((res) => {
        setIsLoading(false);
        setUserType(res.data.type);
        setUserRole(res.data.role);
      })
      .catch((err) => setIsErr(true))
      .finally(() => {
        setIsLoading(false);
      });
    getMonths();
  }, []);

  const customHovertoggle = (tab) => {
    if (customHoverTab !== tab) {
      setcustomHoverTab(tab);
    }
  };

  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <span>
            {" "}
            <BreadCrumb title={`${split[1]}`} pageTitle="Sow" />
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
                        <i className="ri-file-text-line nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Projects
                        </h5>
                      </NavLink>
                    </NavItem>
                    {context?.projectId != 0 && (
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customHoverTab === "10",
                          })}
                          onClick={() => {
                            customHovertoggle("10");
                          }}
                        >
                          <i className="ri  ri-profile-line nav-icon nav-tab-position"></i>
                          <h5 className="nav-titl nav-tab-position m-0">
                            Details
                          </h5>
                        </NavLink>
                      </NavItem>
                    )}
                    {accessType == "fin" || accessType == "business" ? (
                      ""
                    ) : (
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customHoverTab === "8",
                          })}
                          onClick={() => {
                            customHovertoggle("8");
                          }}
                        >
                          <i className="mdi mdi-account-tie-outline nav-icon nav-tab-position"></i>
                          <h5 className="nav-titl nav-tab-position m-0">
                            Networks
                          </h5>
                        </NavLink>
                      </NavItem>
                    )}
                    {accessType == "fin" || accessType == "business" ? (
                      ""
                    ) : (
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
                          <i className="mdi mdi-account-group-outline nav-icon nav-tab-position"></i>
                          <h5 className="nav-titl nav-tab-position m-0">
                            Pro Network
                          </h5>
                        </NavLink>
                      </NavItem>
                    )}

                    {accessType == "fin" || accessType == "business" ? (
                      ""
                    ) : (
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
                          <i className="mdi mdi-human-male-board nav-icon nav-tab-position"></i>
                          <h5 className="nav-titl nav-tab-position m-0">
                            Training
                          </h5>
                        </NavLink>
                      </NavItem>
                    )}

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "7",
                        })}
                        onClick={() => {
                          customHovertoggle("7");
                        }}
                      >
                        <i className="mdi mdi-script-text-outline nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">Leads</h5>
                      </NavLink>
                    </NavItem>

                    {accessType == "fin" || accessType == "business" ? (
                      ""
                    ) : (
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
                          <i className="ri-wallet-3-line nav-icon nav-tab-position"></i>
                          <h5 className="nav-titl nav-tab-position m-0">
                            Payout
                          </h5>
                        </NavLink>
                      </NavItem>
                    )}

                    {/* <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customHoverTab === "3",
                        })}
                        onClick={() => {
                          customHovertoggle("3");
                        }}
                      >
                        <i className="mdi mdi-application-import nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          client Report
                        </h5>
                      </NavLink>
                    </NavItem> */}

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
                        <i className="mdi mdi-key-alert-outline nav-icon nav-tab-position"></i>
                        <h5 className="nav-titl nav-tab-position m-0">
                          Issues
                        </h5>
                      </NavLink>
                    </NavItem>

                    {/* {user === "super_admin" && (
                      <NavItem className="top-bar">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customHoverTab === "12",
                          })}
                          onClick={() => {
                            customHovertoggle("12");
                          }}
                        >
                          <i className="mdi mdi-fire nav-icon nav-tab-position"></i>
                          <h5 className="nav-titl nav-tab-position m-0">
                            Campaign
                          </h5>
                        </NavLink>
                      </NavItem>
                    )} */}
                  </Nav>
                </Card>
                <div className="p-0">
                  <TabContent activeTab={customHoverTab} className="text-muted">
                    <TabPane tabId="0" id="custom-hover-customere">
                      {/* <h6>Sow</h6> */}
                      <div className="">
                        <StatsContentManager monthData={monthData} />
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
                        {/* <Training /> */}
                        <PayoutDetails type={userType} />
                      </div>
                    </TabPane>

                    <TabPane tabId="3" id="custom-hover-customere">
                      <div className="">
                        {/* <Training /> */}
                        {/* <ProjectPayout />÷ */}
                        <ClientReport />
                      </div>
                    </TabPane>

                    <TabPane tabId="4" id="custom-hover-customere">
                      <div className="">
                        {/* <FseList /> */}
                        <Training type={userType} />
                      </div>
                    </TabPane>
                    <TabPane tabId="5" id="custom-hover-customere">
                      <div className="">
                        {/* <FseList /> */}
                        <SuperPartner type={userType} />
                      </div>
                    </TabPane>
                    <TabPane tabId="6" id="custom-hover-customere">
                      <div className="">
                        {/* <FseList /> */}
                        <Issues />
                      </div>
                    </TabPane>

                    <TabPane tabId="7" id="custom-hover-customere">
                      <div className="">
                        <ProjectPayout />
                      </div>
                    </TabPane>

                    <TabPane tabId="8" id="custom-hover-customere">
                      <div className="">
                        <FseList type={userType} />
                      </div>
                    </TabPane>
                    {/* <TabPane tabId="8" id="custom-hover-customere">
                      <div className="">
                        <Issues />
                      </div>
                    </TabPane> */}
                    <TabPane tabId="9" id="custom-hover-customere">
                      <div className="">
                        <CampLeads />
                      </div>
                    </TabPane>
                    <TabPane tabId="10" id="custom-hover-customere">
                      <ProjectOverViewSection data={overViewData} />
                    </TabPane>
                    {/* <TabPane tabId="12" id="custom-hover-customere">
                      <Campaign />
                    </TabPane> */}
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

export default withRouter(withTranslation()(ViewManagerProject));
