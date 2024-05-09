import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import MyLeadsTable from "./MyLeadsTable";

const MyProjects = () => {
  const [modal_signUpModals, setmodal_signUpModals] = useState(false);
  function tog_signUpModals() {
    setmodal_signUpModals(!modal_signUpModals);
  }
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

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
                  <h5 className="card-title mb-0">MyLeads</h5>
                  <div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          id="basiInput"
                          placeholder="search"
                          style={{ width: "300px" }}
                        />
                      </div>
                      <div>
                        {/* <Button onClick={() => tog_signUpModals()}>
                          {" "}
                          <i className="ri-add-line label-icon align-middle fs-12 me-2"></i>
                          ADD
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/* <ScrollHorizontal style={{ width: "100%" }} /> */}
                <MyLeadsTable style={{ width: "100%" }} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default MyProjects;
