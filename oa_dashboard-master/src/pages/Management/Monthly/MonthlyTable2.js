import React from "react";
import CountUp from "react-countup";
import { Badge, Card, CardBody, Col, Row, Table } from "reactstrap";
import classStyle from "../../Dashboard/ProjectPayout/payout.module.css";
import { Link } from "react-router-dom";

const MonthlyTable2 = (props) => {
  return (
    <div>
      <Row className="d-flex justify-content-around">
        <Col
          sm={3}
          className="d-flex flex-column justify-content-between gap-2"
        >
          {(props.cardMap || []).map((item, key) => (
            <Col key={key} md={12}>
              <Card className={"card-animate " + item.bgColor}>
                <CardBody>
                  <div className="d-flex align-items-center px-2">
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
                          "text-uppercase fw-medium mb-1 text-" +
                          item.labelClass
                        }
                      >
                        {item.label}
                      </p>
                      <h4 className={"fs-4 mb-1 " + item.counterClass}>
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={item.counter}
                            decimals={item.decimals}
                            duration={0}
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

        <Col md={9} style={{ paddingBottom: "1.5rem" }}>
          <Card className="h-100 justify-content-center">
            <CardBody className="align-items-center">
              <Table className="table-bordered align-middle table-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "33%" }}></th>
                    <th scope="col" style={{ width: "33%" }}>
                      Expected
                    </th>
                    <th scope="col" style={{ width: "33%" }}>
                      Actual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <td className="fw-medium">01</td> */}
                    <td>Payment</td>
                    <td>
                      {/* <span className="badge badge-soft-primary">Backlog</span>s */}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    {/* <td className="fw-medium">02</td> */}
                    <td>Payout</td>
                    <td>
                      {/* <span className="badge badge-soft-secondary">
                        
                      </span> */}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    {/* <td className="fw-medium">03</td> */}
                    <td>Expenses</td>
                    <td>
                      {/* <span className="badge badge-soft-success"></span> */}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    {/* <td className="fw-medium">04</td> */}
                    <td>Gross Margin</td>
                    <td>
                      <span className="badge badge-soft-secondary"></span>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MonthlyTable2;
