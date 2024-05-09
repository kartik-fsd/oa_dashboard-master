import React from "react";
import { Badge, Card, CardBody, Col, Row } from "reactstrap";
import CountUp from "react-countup";
import classStyle from "./payout.module.css";

function QCcards(props) {
  return (
    <Row className="d-flex justify-content-around">
      <Col sm={3} className="d-flex flex-column justify-content-between">
        {(props.cardMap || []).map((item, key) => (
          <Col key={key} md={12}>
            <Card className={"card-animate " + item.bgColor}>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span
                      className={
                        "avatar-title rounded-2 fs-2 bg-soft-" +
                        item.iconClass +
                        " text-" +
                        item.iconClass
                      }
                    >
                      <i className={item.icon}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p
                      className={
                        "text-uppercase fw-medium mb-3 text-" + item.labelClass
                      }
                    >
                      {item.label}
                    </p>
                    <h4 className={"fs-4 mb-3 " + item.counterClass}>
                      <span className="counter-value">
                        <CountUp
                          start={0}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          separator={item.separator}
                          end={item.counter}
                          decimals={item.decimals}
                          duration={4}
                        />
                      </span>
                    </h4>
                    <p className={"mb-0 text-" + item.captionClass}>
                      {item.caption}
                    </p>
                  </div>
                  <div className="flex-shrink-0 align-self-center">
                    <span
                      className={
                        "fs-12 badge badge-soft-" + item.percentageClass
                      }
                    >
                      <i
                        className={"fs-13 align-middle me-1 " + item.badge}
                      ></i>
                      {item.percentage}
                      <span></span>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Col>

      <Col md={9}>
        <div>
          <Card>
            <CardBody>
              <table
                style={{ width: "100%" }}
                // className={classStyle.table_leads}
              >
                <tbody>
                  <tr rowSpan="2" className={classStyle.tr_leads}>
                    <td colSpan="2" className={classStyle.td_leads}>
                      <p style={{ margin: "0", color: "#495057" }}>L1 QC</p>
                    </td>
                    <td colSpan="2" className={classStyle.td_leads}>
                      <p style={{ margin: "0", color: "#495057" }}>L2 Qc</p>
                    </td>
                    <td colSpan="2" className={classStyle.td_leads}>
                      <p style={{ margin: "0", color: "#495057" }}>L3 QC</p>
                      <Row>
                        <Col md={6}>
                          <i className="ri ri-check-fill text-success fs-16"></i>
                        </Col>
                        <Col md={6}>
                          <i className="ri ri-close-fill text-danger fs-16"></i>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div className={classStyle.internal_qc_icons}>
                        <div>
                          <i
                            className="mdi mdi-briefcase-check-outline"
                            style={{ fontSize: "24px", color: "green" }}
                          ></i>
                          <p
                            style={{
                              alignSelf: "center",
                              margin: "0",
                              fontWeight: "normal",
                              fontSize: "10px",
                            }}
                          >
                            Approved
                          </p>
                        </div>
                      </div>
                    </td>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div className={classStyle.internal_qc_icons}>
                        <p
                          style={{
                            fontSize: "18px",
                            margin: "0",
                            alignSelf: "center",
                          }}
                        >
                          {props.leadsstats.internal_approved}
                        </p>
                      </div>
                    </td>
                    <td className={classStyle.td_leads}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        <Badge color="success" style={{ width: "220px" }} pill>
                          Lead has been approved
                        </Badge>
                      </span>
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_approved_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_approved_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_approved_approved}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td className={classStyle.td_leads}>
                      <div className={classStyle.reconfirm_icons1}>
                        <div>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "normal",
                            }}
                          >
                            <Badge
                              color="warning"
                              style={{ width: "220px" }}
                              pill
                            >
                              Needs reconciliation
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_approved_rejected}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_approved_rejected}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_approved_rejected}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div className={classStyle.internal_qc_icons}>
                        <div>
                          <i
                            className="mdi mdi-briefcase-remove-outline"
                            style={{ fontSize: "24px", color: "red" }}
                          ></i>
                          <p
                            style={{
                              alignSelf: "center",
                              margin: "0",
                              fontWeight: "normal",
                              fontSize: "10px",
                              width: "70px",
                            }}
                          >
                            Rejected
                          </p>
                        </div>
                      </div>
                    </td>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div className={classStyle.internal_qc_icons}>
                        <p
                          style={{
                            fontSize: "18px",
                            margin: "0",
                            alignSelf: "center",
                            width: "50px",
                          }}
                        >
                          {props.leadsstats.internal_rejected}
                        </p>
                      </div>
                    </td>
                    <td className={classStyle.td_leads}>
                      <div className={classStyle.reconfirm_icons1}>
                        <div>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "normal",
                            }}
                          >
                            <Badge
                              color="warning"
                              style={{ width: "220px" }}
                              pill
                            >
                              Needs reconciliation
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_rejected_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_rejected_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_rejected_approved}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td className={classStyle.td_leads}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        <Badge color="danger" style={{ width: "220px" }} pill>
                          Lead is rejected
                        </Badge>
                      </span>
                      {/* <CloseIcon style={{ color: "red" }} />( */}
                      {/* {props.leadsstats.client_approved_rejected}) */}
                    </td>
                    <td
                      className={classStyle.td_leads}
                      style={{ width: "100px" }}
                    >
                      {props.leadsstats.client_rejected_rejected}
                    </td>
                    <td
                      className={classStyle.td_leads}
                      style={{ width: "100px" }}
                    >
                      {props.leadsstats.client_rejected_rejected}
                    </td>
                    <td
                      className={classStyle.td_leads}
                      style={{ width: "100px" }}
                    >
                      {props.leadsstats.client_rejected_rejected}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div
                        className={classStyle.internal_qc_icons}
                        style={{ gap: "16px" }}
                      >
                        <div>
                          <i
                            className="mdi mdi-briefcase-eye-outline"
                            style={{ fontSize: "24px", color: "#B4B4B4" }}
                          ></i>
                          <p
                            style={{
                              alignSelf: "center",
                              margin: "0",
                              fontWeight: "normal",
                              fontSize: "10px",
                            }}
                          >
                            Doubt
                          </p>
                        </div>
                      </div>
                    </td>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div
                        className={classStyle.internal_qc_icons}
                        style={{ gap: "16px" }}
                      >
                        <p
                          style={{
                            fontSize: "18px",
                            margin: "0",
                            alignSelf: "center",
                          }}
                        >
                          {props.leadsstats.internal_doubt}
                        </p>
                      </div>
                    </td>
                    <td className={classStyle.td_leads}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        <Badge color="success" style={{ width: "220px" }} pill>
                          Lead is approved
                        </Badge>
                      </span>
                      {/* <CheckIcon style={{ color: "green" }} />( */}
                      {/* {props.leadsstats.client_doubt_approved}) */}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_doubt_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_doubt_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_doubt_approved}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td className={classStyle.td_leads}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        <Badge color="danger" style={{ width: "220px" }} pill>
                          Lead is rejected
                        </Badge>
                      </span>
                      {/* <CloseIcon style={{ color: "red" }} />( */}
                      {/* {props.leadsstats.client_doubt_rejected}) */}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_doubt_rejected}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_doubt_rejected}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_doubt_rejected}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div className={classStyle.internal_qc_icons}>
                        <div>
                          <i
                            className="mdi mdi-briefcase-clock-outline"
                            style={{ fontSize: "24px", color: "#F7B84A" }}
                          ></i>
                          <p
                            style={{
                              alignSelf: "center",
                              margin: "0",
                              fontWeight: "normal",
                              fontSize: "10px",
                            }}
                          >
                            Pending
                          </p>
                        </div>
                      </div>
                    </td>
                    <td rowSpan="2" className={classStyle.td_leads}>
                      <div className={classStyle.internal_qc_icons}>
                        <p
                          style={{
                            fontSize: "18px",
                            margin: "0",
                            alignSelf: "center",
                          }}
                        >
                          {props.leadsstats.internal_pending}
                        </p>
                      </div>
                    </td>
                    <td className={classStyle.td_leads}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        <Badge color="warning" style={{ width: "220px" }} pill>
                          Needs reconciliation
                        </Badge>
                      </span>
                      {/* <CheckIcon style={{ color: "green" }} />( */}
                      {/* {props.leadsstats.client_pending_approved}) */}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_pending_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_pending_approved}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_pending_approved}
                    </td>
                  </tr>
                  <tr className={classStyle.tr_leads}>
                    <td className={classStyle.td_leads}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "normal",
                        }}
                      >
                        <Badge color="danger" style={{ width: "220px" }} pill>
                          Lead is rejected
                        </Badge>
                      </span>
                      {/* <CloseIcon style={{ color: "red" }} />( */}
                      {/* {props.leadsstats.client_pending_rejected}) */}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_pending_rejected}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_pending_rejected}
                    </td>
                    <td className={classStyle.td_leads}>
                      {props.leadsstats.client_pending_rejected}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </Col>
    </Row>
  );
}

export default QCcards;
