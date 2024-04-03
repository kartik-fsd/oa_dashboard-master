import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import CommercialTableHeaders from "./CommercialTableHeaders";

const Commercial = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Col lg={12}>
          <Card>
            <CardHeader style={{ padding: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title mb-0">Commercial</h5>
                <div>
                  <div style={{ height: "40px", marginRight: "230px" }}>
                    {/* <button className="btn btn-primary">
                      {" "}
                      <i className="ri-add-line align-middle me-1"></i>Client
                    </button> */}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <CommercialTableHeaders />
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default Commercial;
