import React from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import AsmProjectTable from "./AsmProjectTable";

const Projects = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5 className="card-title mb-0 fs-20">ASM Projects</h5>

              {/* <button
                className="btn btn-primary  "
                //   onClick={dmModal}
                style={{ marginRight: "220px" }}
              >
                <i
                  className="ri-add-line align-middle me-1 "
                  style={{ marginBottom: "30px" }}
                ></i>
                DM
              </button> */}
            </CardHeader>
            <CardBody>
              <AsmProjectTable />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Projects;
