import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import ProjectLeadsTable from "../../ManagerDashboard/ProjectLeadsTable";
import BusinessProjectTable from "./BusinessProjectTable";
import BusinessProjectTableTest from "./BusinessProjectTableTest";
import axios from "axios";
import { api } from "../../../globalConfig";
import {
  leads_list_business,
  project_card,
  project_list,
} from "../../../assets/utils/Business";

const BusinessProjectTest = () => {
  const [projectList, setProjectList] = useState([]);
  const [cardsList, setCardsList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isErr, setisErr] = useState(false);
  const [filt, setFilt] = useState("intro");

  const getProjectListData = () => {
    let apiData = api.TASKMO_URL + project_list;
    setIsLoading(true);
    axios
      .get(apiData, { params: { status: filt } })
      .then((res) => {
        setIsLoading(false);
        setProjectList(res.data?.company_list);
        console.log(res.data, "dataproject");
      })
      .catch((err) => setisErr(true))
      .finally(() => setIsLoading(false));
  };

  const getCardData = () => {
    let link = api.TASKMO_URL + project_card;
    setLoading2(true);
    axios
      .get(link)
      .then((res) => {
        setLoading2(false);
        console.log(res.data.leads_cards, "testing");
        setCardsList(res.data?.leads_cards[0]);
      })
      .catch((err) => setisErr(true))
      .finally(() => setLoading2(false));
  };

  useEffect(() => {
    getProjectListData();
    getCardData();
  }, [filt]);

  // React.useEffect(() => {
  //   const link = api.TASKMO_URL + leads_list_business;

  //   axios
  //     .get(link, { params: { status: filt } })
  //     .then((res) => setLeadList(res.data.leads_list))
  //     .catch((err) => console.log(err));
  // }, [filt, check]);
  return loading2 ? (
    <>...loading</>
  ) : (
    <div className="page-content">
      <Container fluid>
        <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
          <CardHeader style={{ border: "none", paddingBottom: "none" }}>
            <h5>Projects</h5>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={2} style={{ flexGrow: "1" }}>
                <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-success text-success rounded-circle fs-3">
                          <i
                            className={"align-middle  ri-shopping-bag-line"}
                          ></i>
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                          Total
                        </p>
                        <h4 className=" mb-0">{cardsList.total_leads}</h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={2} style={{ flexGrow: "1" }}>
                <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
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
                        <h4 className=" mb-0">
                          {cardsList?.creation_leads ?? 0}
                        </h4>
                      </div>
                      <div className="flex-shrink-0 align-self-end">
                        <span className={"badge badge-soft-danger me-1"}>
                          {cardsList?.created_at_late ?? 0}
                        </span>
                        <span className={"badge badge-soft-success"}>
                          {cardsList?.created_at_early ?? 0}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={2} style={{ flexGrow: "1" }}>
                <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
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
                        <h4 className=" mb-0">
                          {cardsList?.project_intro ?? 0}
                        </h4>
                      </div>
                      <div className="flex-shrink-0 align-self-end">
                        <span className={"badge badge-soft-danger me-1"}>
                          {cardsList?.project_intro_late ?? 0}
                        </span>
                        <span className={"badge badge-soft-success"}>
                          {" "}
                          {cardsList?.project_intro_early ?? 0}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={2} style={{ flexGrow: "1" }}>
                <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
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
                        <h4 className=" mb-0">{cardsList.pilot_status}</h4>
                      </div>
                      <div className="flex-shrink-0 align-self-end">
                        <span className={"badge badge-soft-danger me-1"}>
                          {cardsList.pilot_status_late}
                        </span>
                        <span className={"badge badge-soft-success"}>
                          {" "}
                          {cardsList.pilot_status_early}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={2} style={{ flexGrow: "1" }}>
                <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
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
                        <h4 className=" mb-0">{cardsList?.hot_lead ?? 0}</h4>
                      </div>
                      <div className="flex-shrink-0 align-self-end">
                        <span className={"badge badge-soft-danger me-1"}>
                          {cardsList?.hot_lead_late ?? 0}
                        </span>
                        <span className={"badge badge-soft-success"}>
                          {cardsList?.hot_lead_early ?? 0}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Col lg={12}>
              <Card style={{ boxShadow: "0px 0px 3px #00000029" }}>
                <CardHeader style={{ padding: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5 className="card-title mb-0 invisible">dfed</h5>

                    <div
                      style={{
                        height: "40px",
                        marginRight: "228px",
                        marginBottom: "11px",
                      }}
                    >
                      <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle className="btn  " tag="button">
                          <button
                            type="button"
                            className="btn  waves-effect waves-light"
                            style={{
                              backgroundColor: "#ec5c24",
                            }}
                          >
                            <i className=" ri-filter-3-line align-bottom fs-14 me-1"></i>
                            Filter
                          </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => setFilt("intro")}
                          >
                            <i
                              className=" ri-checkbox-blank-circle-fill fs-16 align-bottom me-2 "
                              style={{ color: "#b83016" }}
                            ></i>
                            Initiation
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => setFilt("pilot")}
                          >
                            <i className=" ri-checkbox-blank-circle-fill fs-16 align-bottom me-2 text-warning"></i>
                            Pilot
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilt("live");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill fs-16 align-bottom me-2 text-success"></i>
                            Live
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <BusinessProjectTable
                    isLoading={isLoading}
                    data={projectList}
                  />
                </CardBody>
              </Card>
            </Col>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default BusinessProjectTest;
