import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Table } from "reactstrap";
import ManagementSummaryTable from "./ManagementSummaryTable";
import { Link } from "react-router-dom";
import PreviewCardHeader from "./PreviewCardHeader";
import "./ManagementSummary.css";
import $ from "jquery";

$(document).ready(function () {
  $(".main-table").clone(true).appendTo("#table-scroll").addClass("clone");
});
const ManagementSummary = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <Col lg={12}>
            <Card>
              <CardHeader style={{ padding: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title mb-0">Management Summary</h5>
                  <div>
                    <div style={{ height: "40px" }}></div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ManagementSummaryTable />
              </CardBody>
            </Card>
          </Col> */}

          <Col xl={12}>
            <Card>
              <PreviewCardHeader title="Manager Summary" />
              <CardBody>
                <div className="live-preview">
                  <div className="table-responsive">
                    <Table className="table-bordered align-middle table-nowrap mb-0 main-table">
                      <thead style={{ backgroundColor: "grey" }}>
                        <tr>
                          <th className="headcol " scope="col">
                            Project
                          </th>
                          <th scope="col">April-2023</th>
                          <th scope="col">May-2023</th>
                          <th scope="col">June-2023</th>
                          <th scope="col">July-2023</th>
                          <th scope="col">August-2023</th>
                          <th scope="col">September-2023</th>
                          <th scope="col">October-2023</th>
                          <th scope="col">November-2023</th>
                          <th scope="col">December-2023</th>
                          <th scope="col">January-2024</th>
                          <th scope="col">February-2024</th>
                          <th scope="col">March-2024</th>
                          <th scope="col">April-2024</th>

                          {/* <th scope="col"></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          "Revenue Target",
                          "Revenue Pipleline",
                          "Revenue Achieved",
                          "Payout",
                          "Gross Margin",
                          "Billed",
                          "UnBilled",
                          "Collected",
                        ].map((item, i) => (
                          <>
                            <tr>
                              <td
                                className="fw-medium"
                                style={{ backgroundColor: "grey" }}
                              >
                                {item}
                              </td>
                              <td>Implement new UX</td>
                              <td>
                                <span className="badge badge-soft-primary">
                                  Backlog
                                </span>
                              </td>
                              <td>Lanora Sandoval</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                              <td>$4,521</td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: "275px" }}>
                    <code>{/* <BorderedTables /> */}</code>
                  </pre>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManagementSummary;
