import React from "react";
import { Card, Container } from "reactstrap";

const ClientReport = () => {
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <Card className="p-3">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "300px" }}
            >
              <h1>Coming soon</h1>
            </div>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ClientReport;
