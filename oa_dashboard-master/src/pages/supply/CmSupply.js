import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import { supply_data_cms } from "../../assets/utils/SupplyApi";
import { farming } from "../../globalConfig";
import CmSupplyTable from "./CmSupplyTable";
import DashboardSupplyTable from "./DashboardSupplyTable";

const CmSupply = () => {
  document.title = "Taskmo | Supply";
  const [projectsData, setProjectsData] = React.useState([]);
  const [totalData, setTotalData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setisErr] = React.useState(false);
  let supplyId = sessionStorage.getItem("supplyid");
  const role = sessionStorage.getItem("role");
  const getCmSupplyData = () => {
    let apiLink = farming.farming_URL + supply_data_cms;
    setIsLoading(true);
    let data = {
      st_date: "2023-02-01",
      end_date: "2023-02-28",
      rm_id: role == "rm" ? "19" : role != "rm" && role != "cm" ? "all" : "",
    };

    if (role == "cm") {
      delete data.rm_id;
    }
    axios
      .get(apiLink, {
        params: data,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data, "reschecking");
        setProjectsData(res.data.projects);
        let ot = res.data.totalData.map((item, i) => ({
          ...item,
          id: Number(i + 1),
        }));
        setTotalData(ot);
      })
      .catch((err) => setisErr(true))
      .finally(() => setIsLoading(false));
  };
  React.useEffect(() => {
    getCmSupplyData();
  }, []);
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title mb-0">CM Lead Details</h5>
                  <div>
                    <div style={{ height: "30px" }}></div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/* <ProjectLeadsTable data={projectList} /> */}
                <CmSupplyTable
                  projectsData={projectsData}
                  totalData={totalData}
                />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default CmSupply;
