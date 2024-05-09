import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { project_leads } from "../../assets/utils/dashboard";
import { api } from "../../globalConfig";
import ProjectLeadsTable from "./ProjectLeadsTable";
import { project_card } from "../../assets/utils/Business";

const ProjectLeads = () => {
  document.title = "OnX | Management";
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState(false);
  let link = api.OA_URL + project_leads;
  const getProductData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(link);
      setProjectList(res?.data?.project_list);
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

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
                  <h5 className="card-title mb-0" style={{ color: "#b83016" }}>
                    Hot Leads
                  </h5>
                  <div>
                    <div style={{ height: "40px" }}></div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ProjectLeadsTable data={projectList} />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectLeads;
