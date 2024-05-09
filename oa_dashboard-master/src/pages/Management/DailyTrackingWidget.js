import axios from "axios";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { pipeline_card } from "../../assets/utils/managementapi";
import { api } from "../../globalConfig";

const DailyTrackingWidget = ({ year }) => {
  const pipeline_card_url = api.VENDOR_URL + pipeline_card;

  const [cardData, setCardData] = React.useState([]);

  axios
    .get(pipeline_card_url, { params: { fy: year } })
    .then((res) => {
      setCardData(res.data?.card_data);
    })
    .catch((err) => {
      console.error(err);
    });
  return (
    <React.Fragment>
      <Row>
        {cardData.map((item, key) => (
          <Col xl={6} md={6} key={key}>
            <Card className="card-animate">
              <CardBody style={{ height: "200px" }}>
                <Row className="border-bottom">
                  <Col>
                    <Row className="flex-nowrap">
                      <div style={{ width: "48px" }}>
                        <div
                          className={`flex-shrink-0 chat-user-img-active gap-2 py-2 `}
                        >
                          <img
                            src={item.parent_profile}
                            alt="logo"
                            className="rounded-circle avatar-sm"
                            height={60}
                            width={60}
                          />
                        </div>
                      </div>
                      <div className="mx-3">
                        <p className="fs-16 m-0">{item.parent_name}</p>
                        <p className="text-muted fs-10 m-0">{item.team_name}</p>
                      </div>
                    </Row>
                  </Col>
                  <Col className="d-flex flex-column align-items-end justify-content-end fs-18 fw-bold">
                    ₹{item.overall}
                    <p className="fs-10 text-muted fw-normal">Total Pipeline</p>
                  </Col>
                </Row>
                <Row
                  className="my-2"
                  style={{ height: "105px", overflow: "overlay" }}
                >
                  {item.team.map((it) => (
                    <>
                      <Col className="my-2" md={6}>
                        <Row>
                          <Col md={12}>
                            <div className="d-flex ">
                              <div
                                className={`flex-shrink-0`}
                                style={{ width: "48px" }}
                              >
                                <img
                                  src={it.user_profile}
                                  alt="logo"
                                  className="rounded-circle avatar-xs"
                                  height={50}
                                />
                              </div>
                              <div>
                                <p className="fs-12 m-0">{it.user_name}</p>
                                <p className="fs-10 m-0 mb-2">
                                  {" "}
                                  ₹{it.total_target}
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default DailyTrackingWidget;
