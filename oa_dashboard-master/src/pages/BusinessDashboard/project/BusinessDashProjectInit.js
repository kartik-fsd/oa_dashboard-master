import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import StepperLeads from "./StepperLeads";
import FlipModal from "../../BusinessDashVel/FlipModal";
import axios from "axios";
import { api } from "../../../globalConfig";
import {
  project_details,
  search_approval_list,
} from "../../../assets/utils/Business";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import StepperProject from "../BusinessLeads/StepperProject";
import Select from "react-select";
import { dataAravindApproval } from "../../../assets/utils/TaskmoUrl";
import { Context } from "../../../App";
import { successnotify } from "../../Toasts";

const BusinessDashProjectInit = () => {
  const { id } = useParams();

  //modal flip
  const [context, setContext] = useContext(Context);
  const [modal_animationFlip, setmodal_animationFlip] = useState(false);
  const [modalType, setModalType] = useState("");
  const [approve, setApprove] = useState(false);
  const [show, setShow] = useState(false);
  const [leadsDet, setLeadsDet] = useState({});
  const [opt, setOpt] = React.useState([]);
  const [seletecUserIdArr, setSelectedUserIdArr] = useState([]);

  const project_details_url = api.TASKMO_URL + project_details;
  const search_approval_list_url = api.TASKMO_URL + search_approval_list;

  function tog_animationFlip(d) {
    setModalType(d);
    setmodal_animationFlip(!modal_animationFlip);
  }

  useEffect(() => {
    axios
      .get(project_details_url, { params: { project_id: id } })
      .then((res) => {
        setLeadsDet(res?.data?.project_details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleKamOptions = () => {
    setShow(true);
    axios
      .get(search_approval_list_url, { params: { search: "operation" } })
      .then((res) => {
        const dataEnter = [];
        res.data?.search_list.forEach((item) => {
          const sample = {
            value: item.full_name,
            label: item.full_name,
            data: { ...item },
          };
          dataEnter.push(sample);
        });
        setOpt(dataEnter);
      })

      .catch((err) => console.log(err));
  };

  const formatOptionData = (it) => {
    let item = it.data;
    console.log(item, "fasak");
    return (
      <div>
        <img
          src={item.profile}
          height="30px"
          alt=""
          width="30px"
          style={{ borderRadius: "50%" }}
        />
        <span className="text-dark fw-semibold text-capitalize mx-2">
          {item.full_name}
          <span
            className="badge badge-soft ms-1 me-1"
            style={{ backgroundColor: "#f07d47" }}
          >
            {item.team_name}
          </span>
          -<span className="text-muted ms-1">{item.role_designation}</span>
        </span>
      </div>
    );
  };

  const approvalSendFunction = () => {
    console.log("daadsd");
    let itemtests = [
      {
        lead_id: Number(leadsDet?.lead_id),
        project_id: Number(id),
        request_to_id: seletecUserIdArr.data.portal_user_id,
        request_by_id: context.oaDetials.portal_user_id,
        lead_acknowledgement_type: "kam",
        notification_type: "approval",
      },
    ];

    axios
      .post(dataAravindApproval, itemtests)
      .then((res) => {
        successnotify("Successfully Sent");
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div>
            <Col sx={12}>
              <Card>
                <Row>
                  <Col xs="8">
                    <CardBody className="pb-0 px-4">
                      <Row className="mb-3">
                        <div className="col-md">
                          <Row className="align-items-center g-3">
                            <div className="col-md-auto">
                              <div className="avatar-md">
                                <div className="avatar-title bg-white rounded-circle">
                                  {
                                    <img
                                      src={leadsDet.brand_logo}
                                      alt=""
                                      className="avatar-md"
                                      style={{ borderRadius: "50%" }}
                                    />
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="col-md">
                              <div>
                                <h4 className="fw-bold text-capitalize">
                                  {leadsDet.project_title}
                                  <span>
                                    &nbsp;-&nbsp;{leadsDet.project_unique_id}
                                  </span>
                                </h4>
                                <div
                                  className="hstack  flex-wrap mt-2 fs-10"
                                  style={{ justifyContent: "space-between" }}
                                >
                                  <div style={{ width: "150px" }}>
                                    Name :
                                    <span
                                      className="fw-medium text-dark"
                                      style={{ wordBreak: "break-all" }}
                                      // onClick={() => tog_animationFlip("compId")}
                                    >
                                      &nbsp;{leadsDet.client_name}
                                    </span>
                                  </div>
                                  <div
                                    className="vr"
                                    style={{ height: "16px" }}
                                  ></div>
                                  <div style={{ width: "150px" }}>
                                    <div>
                                      Phone :&nbsp;
                                      <span className="fw-medium  text-dark">
                                        {leadsDet.client_phone}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="vr"
                                    style={{ height: "16px" }}
                                  ></div>
                                  <div style={{ width: "150px" }}>
                                    <div>
                                      Email :&nbsp;
                                      <span className="fw-medium  text-dark">
                                        {leadsDet.client_email}
                                      </span>
                                    </div>
                                  </div>
                                  {/* <div className="vr"></div> */}

                                  {/* <div>
                            Name :<span className="fw-medium">{1234}</span>
                          </div> */}
                                </div>
                                <div
                                  className="hstack  flex-wrap mt-2 fs-10"
                                  style={{ justifyContent: "space-between" }}
                                >
                                  <div style={{ width: "150px" }}>
                                    Type :
                                    <span
                                      className="fw-medium text-dark"
                                      style={{ wordBreak: "break-all" }}
                                      // onClick={() => tog_animationFlip("compId")}
                                    >
                                      &nbsp;{leadsDet.entity_type}
                                    </span>
                                  </div>
                                  <div
                                    className="vr"
                                    style={{ height: "16px" }}
                                  ></div>
                                  <div style={{ width: "150px" }}>
                                    <div>
                                      Industry :&nbsp;
                                      <span className="fw-medium  text-dark">
                                        {leadsDet.industry_type}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="vr"
                                    style={{ height: "16px" }}
                                  ></div>
                                  <div style={{ width: "150px" }}>
                                    <div>
                                      Funding :&nbsp;
                                      <span className="fw-medium  text-dark">
                                        {leadsDet.funding_status}
                                      </span>
                                    </div>
                                  </div>
                                  {/* <div className="vr"></div> */}

                                  {/* <div>
                            Name :<span className="fw-medium">{1234}</span>
                          </div> */}
                                </div>
                                <div
                                  className="hstack  flex-wrap mt-2 fs-10"
                                  style={{ justifyContent: "space-between" }}
                                >
                                  <div style={{ width: "150px" }}>
                                    Start :
                                    <span
                                      className="fw-medium text-dark"
                                      style={{ wordBreak: "break-all" }}
                                      // onClick={() => tog_animationFlip("compId")}
                                    >
                                      &nbsp;{leadsDet.project_start_date}
                                    </span>
                                  </div>
                                  <div
                                    className="vr"
                                    style={{ height: "16px" }}
                                  ></div>
                                  <div style={{ width: "150px" }}>
                                    <div>
                                      End :&nbsp;
                                      <span className="fw-medium  text-dark">
                                        {leadsDet.project_start_date}
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="vr"
                                    style={{ height: "16px" }}
                                  ></div>
                                  <div style={{ width: "150px" }}>
                                    <div>
                                      Vertical :&nbsp;
                                      <span className="fw-medium  text-dark">
                                        {leadsDet.project_vertical}
                                      </span>
                                    </div>
                                  </div>
                                  {/* <div className="vr"></div> */}

                                  {/* <div>
                            Name :<span className="fw-medium">{1234}</span>
                          </div> */}
                                </div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </Row>
                    </CardBody>
                  </Col>
                  <Col
                    xs="4"
                    className="d-flex align-items-center justify-content-start p-0"
                  >
                    <div
                      className="d-flex flex-column"
                      style={{
                        border: "1px solid #e4e9f6",
                        padding: "16px",
                        borderRadius: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "70px",
                          fontSize: "9px",
                          marginBottom: "8px",
                        }}
                      >
                        <div className="d-flex flex-column align-items-center gap-2">
                          <span>Creation</span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                          <span>Inititaion</span>
                          <span style={{ fontSize: "8px" }}></span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                          <span>Pilot</span>
                          <span style={{ fontSize: "8px" }}></span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                          <span>Live</span>
                          <span style={{ fontSize: "8px" }}></span>
                        </div>
                      </div>
                      <div style={{ alignSelf: "center" }}>
                        {<StepperProject rowData={leadsDet} />}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "45px",
                          fontSize: "9px",
                        }}
                      >
                        <div className="d-flex flex-column align-items-center gap-1">
                          <span style={{ textAlign: "center" }}>
                            {leadsDet?.proj_created_at}
                          </span>
                          {/* <span style={{ fontSize: "8px" }}>HH-MM</span> */}
                        </div>
                        <div className="d-flex flex-column align-items-center gap-1">
                          <span style={{ textAlign: "center" }}>
                            {leadsDet?.project_intro_date}
                          </span>
                          <span style={{ fontSize: "8px" }}>
                            {/* {d.lead_maturing_date?.split(" ")[1]} */}
                          </span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-1">
                          <span style={{ textAlign: "center" }}>
                            {leadsDet?.pilot_date}
                          </span>
                          <span style={{ fontSize: "8px" }}>
                            {/* {d.hot_lead_date?.split(" ")[1]} */}
                          </span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-1">
                          <span style={{ textAlign: "center" }}>
                            {leadsDet?.live_date}
                          </span>
                          <span style={{ fontSize: "8px" }}>
                            {/* {d.hot_lead_date?.split(" ")[1]} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={12}>
              <Card>
                <CardHeader style={{ color: "#405189" }}>Pilot</CardHeader>
                <CardBody>
                  {approve ? (
                    <>
                      <div style={{ color: "#405189" }}>SOW</div>
                      <Col xs="12" style={{ marginTop: "10px" }}>
                        <Card
                          style={{
                            boxShadow: "0px 0px 3px #00000029",
                            // padding: "5px",
                            // margin: "5px",
                          }}
                        >
                          <CardHeader
                            style={{ padding: "5px", background: "#F4F4F4" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0 10px",
                                height: "35px",
                              }}
                            >
                              <div style={{ fontWeight: 600 }}>Sow ID</div>
                              <div>Date</div>
                              <div>Approval Status</div>
                            </div>
                          </CardHeader>
                          <CardBody style={{ padding: "0px" }}>
                            <div>
                              {[
                                {
                                  sowid: "1500",
                                  date: "08-12-2023",
                                  status: "active",
                                },
                              ].map((item, i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    minHeight: "50px",
                                    padding: "5px 20px",
                                  }}
                                >
                                  <div>{item.sowid}</div>
                                  <div>{item.date}</div>
                                  <div>
                                    <span
                                      className={
                                        approve
                                          ? "badge text-bg-success"
                                          : "badge text-bg-light"
                                      }
                                    >
                                      {approve ? "Active" : "-"}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </>
                  ) : (
                    <></>
                  )}
                  <div style={{ color: "#405189" }}>Check List</div>
                  <Col xs="12" style={{ marginTop: "10px" }}>
                    <Card
                      style={{
                        boxShadow: "0px 0px 3px #00000029",
                        // padding: "5px",
                        // margin: "5px",
                      }}
                    >
                      <CardHeader
                        style={{ padding: "5px", background: "#F4F4F4" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 15px",
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>OPS CheckList</div>
                          <div>
                            {approve ? (
                              <div>Status</div>
                            ) : (
                              <Button
                                onClick={handleKamOptions}
                                style={{
                                  backgroundColor: "#405189",
                                  color: "#FFFFFF",
                                  minWidth: "60px",
                                  height: "35px",
                                }}
                              >
                                <i className="ri-download-fill align-bottom mt-2"></i>
                                &nbsp;sent
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody style={{ padding: "0px" }}>
                        <div>
                          {[
                            { name: "Client Information" },
                            { name: "Client Introduction" },
                            { name: "Supply Readiness" },
                            { name: "Training Documents" },
                            { name: "POA (Weekyly & Monthly)" },
                          ].map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                                minHeight: "50px",
                                borderBottom:
                                  i == 4 ? "none" : "1px solid #DEDEDE",
                                padding: "5px 20px",
                              }}
                            >
                              <div>{item.name}</div>
                              <div>
                                <span
                                  className={
                                    approve
                                      ? "badge text-bg-success"
                                      : "badge text-bg-light"
                                  }
                                >
                                  {approve ? "approved" : "-"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xs="12" style={{ marginTop: "10px" }}>
                    <Card
                      style={{
                        boxShadow: "0px 0px 3px #00000029",
                        // padding: "5px",
                        // margin: "5px",
                      }}
                    >
                      <CardHeader
                        style={{ ping: "5px", background: "#F4F4F4" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 10px",
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>Tech checklist</div>
                          <div>
                            <Button
                              style={{
                                backgroundColor: "#405189",
                                color: "#FFFFFF",
                                minWidth: "60px",
                                height: "35px",
                              }}
                            >
                              Create CRM
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody style={{ padding: "0px" }}>
                        <div>
                          {[
                            { name: "API integration if any" },
                            { name: "Customised CRM if any" },
                            { name: "Client Dashboard access & view" },
                          ].map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                                minHeight: "50px",
                                borderBottom:
                                  i == 2 ? "none" : "1px solid #DEDEDE",
                                padding: "5px 20px",
                              }}
                            >
                              <div>{item.name}</div>
                              <div>
                                <span className={"badge text-bg-light"}>-</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </div>
          <Modal
            fade={true}
            isOpen={show}
            toggle={() => setShow(false)}
            centered={true}
            size="lg"
          >
            <ModalBody className="py-3 px-5">
              <div className=" d-flex gap-2">
                <Col xs="10" className="mt-2">
                  <Label className="mt-1">Select Users</Label>
                  <Select
                    aria-label=".form-select-sm example"
                    onChange={(e) => setSelectedUserIdArr(e)}
                    // isMulti
                    options={opt}
                    formatOptionLabel={formatOptionData}
                    isClearable
                  ></Select>
                </Col>
                <Col
                  xs="2"
                  className="d-flex align-items-end justify-content-start"
                >
                  <button
                    type="button"
                    className="btn  waves-effect waves-light"
                    style={{ width: "80%", backgroundColor: "#ec5c24" }}
                    onClick={approvalSendFunction}
                  >
                    Send
                  </button>
                </Col>
              </div>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default BusinessDashProjectInit;
