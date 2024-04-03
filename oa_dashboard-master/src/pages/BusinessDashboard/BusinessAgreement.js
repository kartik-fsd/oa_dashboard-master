import React from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import BusinessAgreementHeaders from "./BusinessAgreementHeaders";
import BusinessAgreementTable from "./BusinessAgreementTable";

const BusinessAgreement = () => {
  return (
    <React.Fragment>
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
                  <h5 className="card-title mb-0">Agreement</h5>
                  <div>
                    <div style={{ height: "40px", marginRight: "230px" }}></div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <BusinessAgreementHeaders />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BusinessAgreement;
