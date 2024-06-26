import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import OverDueInvoicesTable from "../AccountReceivable/OverDueInvoicesTable";
import ClientTable from "./ClientTable";

const ClientMain = () => {
  document.title = "OnX | Finance";
  const [modal_edit2, set_modal_edit2] = useState(false);
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
                <h5
                  className=" fw-600 fs-16"
                  style={{
                    letterSpacing: "2px",
                    marginLeft: "15px",
                    color: "#b83016",
                  }}
                >
                  Client
                </h5>

                <div>
                  <div style={{ height: "40px", marginRight: "230px" }}>
                    <button
                      className="btn d-none"
                      onClick={() => set_modal_edit2(true)}
                      style={{ backgroundColor: "#ec5c24" }}
                    >
                      {" "}
                      <i className="ri-add-line align-middle me-1"></i>Client
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <ClientTable
                modal_edit2={modal_edit2}
                set_modal_edit2={set_modal_edit2}
              />
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default ClientMain;
