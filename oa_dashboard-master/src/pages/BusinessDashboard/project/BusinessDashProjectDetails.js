import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import FlipModal from "../../BusinessDashVel/FlipModal";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../../globalConfig";
import { project_details } from "../../../assets/utils/Business";
import axios from "axios";
import OverViewSection from "../../BusinessDashVel/Tabs/OverViewSection";

import { fse_leads_data, sow_fse_list } from "../../../assets/utils/sow";
import { APIClient } from "../../../assets/config/sessionToken";
import ProjectLeadsTable from "../../ManagerDashboard/ProjectLeadsTable";
import { project_leads } from "../../../assets/utils/dashboard";
import LeadProjDetails from "./LeadProjDetails";
import { BasicTable } from "../../Dashboard/ProjectPayout/DataTables/datatableCom";
import BreadCrumb from "../../../components/common/BreadCrumb";
const BusinessDashProjectDetails = () => {
  const history = useHistory();
  const { id } = useParams();

  const [projectDetails, setProjectDetails] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [projectList, setProjectList] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [customActiveTab, setcustomActiveTab] = useState("1");

  let link = api.OA_URL + project_leads;
  const getProductData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(link);
      setProjectList(res?.data?.project_list);
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const getProjectDetails = async () => {
    let apiLink = api.ONX_URL + project_details;
    setIsLoading(true);
    try {
      let {
        data: { project_details },
      } = await axios.get(apiLink, { params: { project_id: id } });
      setIsLoading(false);
      console.log(project_details, "testingtesting");
      setProjectDetails(project_details);
    } catch (error) {
      setIsErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom Tabs Bordered
  const [activeTab, setcustomActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  //modal flip
  const [modal_animationFlip, setmodal_animationFlip] = useState(false);
  const [modalType, setModalType] = useState("");
  function tog_animationFlip(d) {
    setModalType(d);
    setmodal_animationFlip(!modal_animationFlip);
  }

  React.useEffect(() => {
    getProjectDetails();
  }, []);

  const promise = new APIClient();
  let sow = "12";

  // useEffect(() => {
  //   let dataCheck = "only_leads";
  //   const pathname = api.OA_URL + sow_fse_list;

  //   promise
  //     .get(pathname, { sow_id: sow, switch_type: dataCheck })
  //     .then((res) => {
  //       setTableData(res.data?.data);
  //       console.log(res.data, "restab");
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // }, []);

  const handleLeadsList = (sow) => {
    const link = api.OA_URL + fse_leads_data;

    axios
      .get(link, {
        params: { sow_id: sow, overall: "partial" },
      })
      .then((res) => setTableData(res.data.leads))
      .catch((err) => console.log(err));
  };

  return isLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Project" pageTitle="Sow" />
        <Col xs="12">
          <Card style={{ boxShadow: "0px 0px 3px #00000029", width: "100%" }}>
            <CardBody>
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  {" "}
                  <div>
                    <img
                      className="rounded-circle avatar-md"
                      alt=""
                      src={projectDetails.brand_logo}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      // color: "#405189",
                      fontWeight: 600,
                      fontSize: "16px",
                      gap: "10px",
                      display: "flex",
                    }}
                  >
                    <div>{projectDetails.project_title}</div>
                    <div>
                      {/* <span className="badge text-bg-primary">
                        {projectDetails.company_unique_id}
                      </span> */}
                      <span
                        className="badge badge-soft"
                        style={{ backgroundColor: "#f07d47" }}
                      >
                        {" "}
                        {projectDetails.company_unique_id}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: "20px", marginTop: "5px" }}
                  >
                    <div
                      style={{
                        color: "#121212",
                        fontWeight: 600,
                        fontSize: "10px",
                        display: "flex",
                        width: "150px",
                        gap: "5px",
                      }}
                    >
                      <div>company ID: </div>
                      <div
                        style={{ color: "#405189", cursor: "pointer" }}
                        onClick={() => tog_animationFlip("compIdb")}
                      >
                        {projectDetails.company_unique_id}
                      </div>
                    </div>
                    <div style={{ color: "#9CA8D0" }}>|</div>
                    <div
                      style={{
                        color: "#121212",
                        fontWeight: 600,
                        fontSize: "10px",
                        display: "flex",
                        width: "130px",
                        gap: "5px",
                      }}
                    >
                      <div> Agreement ID: </div>
                      <div
                        style={{ color: "#405189", cursor: "pointer" }}
                        onClick={() => tog_animationFlip("agreeIdb")}
                      >
                        {projectDetails.agreement_unique_id}
                      </div>
                    </div>
                    <div style={{ color: "#9CA8D0" }}>|</div>
                    <div
                      style={{
                        color: "#121212",
                        fontWeight: 600,
                        fontSize: "10px",
                        display: "flex",
                        width: "100px",
                        gap: "5px",
                      }}
                    >
                      <div>Client ID: </div>
                      <div
                        style={{ color: "#405189", cursor: "pointer" }}
                        onClick={() => tog_animationFlip("clientIdb")}
                      >
                        {projectDetails.client_unique_id}
                      </div>
                    </div>
                    <div style={{ color: "#9CA8D0" }}>|</div>
                    <div
                      style={{
                        color: "#121212",
                        fontWeight: 600,
                        fontSize: "10px",
                        display: "flex",
                        width: "80px",
                        gap: "5px",
                      }}
                    >
                      <div>Lead ID: </div>
                      <div style={{ color: "#B7B7B7" }}>
                        {projectDetails.lead_unique_id}
                      </div>
                    </div>
                    <div style={{ color: "#9CA8D0" }}>|</div>
                    <div
                      style={{
                        color: "#121212",
                        fontWeight: 600,
                        fontSize: "10px",
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      {/* <div> Project ID: </div>
                      <div style={{ color: "#B7B7B7" }}>MER0423P0285</div> */}
                    </div>
                    {/* <div style={{ color: "#9CA8D0" }}>|</div> */}
                    <div
                      style={{
                        color: "#121212",
                        fontWeight: 600,
                        fontSize: "10px",
                        display: "flex",
                        gap: "5px",
                        width: "180px",
                      }}
                    >
                      <div>Commercial Bond ID: </div>
                      <div style={{ color: "#B7B7B7" }}>
                        {projectDetails.commercial_unique_id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter style={{ border: "none" }}>
              <div>
                <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                  {/* <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("1");
                      }}
                      href="#"
                      style={{ color: "#121212", fontWeight: 600 }}
                    >
                      Lead Details
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("1");
                      }}
                      href="#"
                      style={{ color: "#121212", fontWeight: 600 }}
                    >
                      Project Details
                    </NavLink>
                  </NavItem>
                  {projectDetails.sow_id != 0 && (
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3");
                          handleLeadsList(projectDetails.sow_id);
                        }}
                        href="#"
                        style={{ color: "#121212", fontWeight: 600 }}
                      >
                        Project Statistics
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col>
          {/* <Row>
            <Col xs="4">
              <Card
                style={{ boxShadow: "0px 0px 3px #00000029", height: "80px" }}
              >
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col xs="4">
              <Card
                style={{ boxShadow: "0px 0px 3px #00000029", height: "80px" }}
              >
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col xs="4">
              <Card
                style={{ boxShadow: "0px 0px 3px #00000029", height: "80px" }}
              >
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row> */}
        </Col>
        {modal_animationFlip && (
          <FlipModal
            modal_animationFlip={modal_animationFlip}
            setmodal_animationFlip={setmodal_animationFlip}
            tog_animationFlip={tog_animationFlip}
            modalType={modalType}
            type={"newBusiness"}
            data={[]}
            projectData={projectDetails}
          />
        )}
      </Container>
      <TabContent activeTab={activeTab} className="text-muted">
        <TabPane tabId="1" id="home">
          <div style={{ padding: "12px" }}>
            <OverViewSection data={projectDetails} />
          </div>

          {/* <LeadProjDetails /> */}
        </TabPane>

        {/* <TabPane tabId="2" id="product">
          <div style={{ padding: "12px" }}>
            <OverViewSection data={projectDetails} />
          </div>
        </TabPane> */}

        <TabPane tabId="3" id="messages">
          <BasicTable data={tableData} />
          {/* <ProjectLeadsTable data={projectList} /> */}
        </TabPane>

        <TabPane tabId="4" id="settings">
          <ProjectLeadsTable data={projectList} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default BusinessDashProjectDetails;
