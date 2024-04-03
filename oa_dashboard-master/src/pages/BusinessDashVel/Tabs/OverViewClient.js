import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const OverViewClient = ({ data }) => {
  return (
    <div>
      <Row>
        <Col xl={12} lg={12}>
          <Card>
            <CardBody>
              <div className="text-muted">
                <h6 className="mb-3 fw-semibold text-uppercase">
                  {data?.company_title}
                </h6>
                <p>{data?.company_discription}</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverViewClient;
