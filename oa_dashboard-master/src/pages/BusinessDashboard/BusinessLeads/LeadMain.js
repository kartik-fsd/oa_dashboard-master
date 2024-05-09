import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { lead_details } from "../../../assets/utils/Business";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { api } from "../../../globalConfig";
import StepperLeads from "../StepperLeads";
import LeadDetails from "./LeadDetails";
import LeadDetView from "./LeadDetView";

const LeadMain = () => {
  const [leadsDet, setLeadDet] = React.useState({});
  const [check, setCheck] = React.useState(false);

  //add loader
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  console.log(leadsDet, "reesleadsDet");
  React.useEffect(() => {
    const link = api.ONX_URL + lead_details;
    setIsLoading(true);
    axios
      .get(link, { params: { lead_id: id } })
      .then((res) => {
        setIsLoading(false);
        setLeadDet(res.data.lead_details);
      })
      .catch((err) => console.group(err))
      .finally(() => setIsLoading(false));
  }, [check]);

  return isLoading ? (
    <>...loading</>
  ) : (
    <div className="page-content">
      <BreadCrumb title={"Lead Details"} />
      <Card>
        <Row className="w-100">
          <Col xs="8">
            <CardBody className="pb-0 ps-4">
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
                        <h4 className="fw-bold">
                          {leadsDet.company_name}
                          <span>&nbsp;-&nbsp;{leadsDet.lead_unique_id}</span>
                        </h4>
                        <div
                          className="hstack  flex-wrap mt-2 fs-12"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ width: "250px" }}>
                            Source of Lead :
                            <span
                              className="fw-medium text-dark"
                              style={{ wordBreak: "break-all" }}
                              // onClick={() => tog_animationFlip("compId")}
                            >
                              &nbsp;{leadsDet.source_of_lead}
                            </span>
                          </div>
                          <div className="vr" style={{ height: "16px" }}></div>
                          <div style={{ width: "250px" }} className="fs-12">
                            <div>
                              Created by :&nbsp;
                              <span className="fw-medium  text-dark">
                                {leadsDet.created_by}
                              </span>
                            </div>
                          </div>
                          {/* <div className="vr"></div> */}

                          {/* <div>
                            Name :<span className="fw-medium">{1234}</span>
                          </div> */}
                        </div>
                        <div
                          className="hstack  flex-wrap mt-2 fs-12"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ width: "250px" }}>
                            Name :&nbsp;
                            <span
                              className="fw-medium text-dark"
                              style={{ wordBreak: "break-all" }}
                              // onClick={() => tog_animationFlip("compId")}
                            >
                              &nbsp;{leadsDet.client_name}
                            </span>
                          </div>
                          <div className="vr" style={{ height: "16px" }}></div>
                          <div className="fs-12">
                            <div style={{ width: "250px" }}>
                              Phone :&nbsp;
                              <span className="fw-medium  text-dark">
                                &nbsp;{leadsDet.client_phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="hstack  flex-wrap mt-2 fs-12"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ width: "250px" }}>
                            Email :&nbsp;
                            <span className="fw-medium text-dark">
                              &nbsp;{leadsDet.client_email}
                            </span>
                          </div>
                          {/* <div className="vr" style={{ height: "16px" }}></div>
                          <div>
                            <div style={{ width: "250px" }}>
                              Job role :&nbsp;
                              <span className="fw-medium  text-dark">
                                &nbsp;Assosiate director
                              </span>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </Row>
            </CardBody>
          </Col>
        </Row>
      </Card>

      {/* {leadsDet.lead_maturing_status == "0" ? (
        <LeadDetails />
      ) : (
        <LeadDetView data={leadsDet} setCheck={setCheck} check={check} />
      )} */}
      <LeadDetView data={leadsDet} setCheck={setCheck} check={check} />
    </div>
  );
};

export default LeadMain;
