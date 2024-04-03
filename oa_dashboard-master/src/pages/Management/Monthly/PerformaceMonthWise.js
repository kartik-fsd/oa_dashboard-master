import React from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import { api } from "../../../globalConfig";
import { filter_fy } from "../../../assets/utils/managementapi";
import axios from "axios";
import DailyTrackingTable from "../DailyTrackingTable";

const PerformaceMonthWise = () => {
  const [opt, setOpt] = React.useState([]);
  const [year, setYear] = React.useState("FY24");

  React.useEffect(() => {
    const link = api.VENDOR_URL + filter_fy;

    axios
      .get(link)
      .then((res) => setOpt(res.data.search_fy))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page-content">
      <Container fluid>
        <Col lg="12">
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5
                  className="text-primary fw-600 fs-16"
                  style={{ letterSpacing: "2px", marginLeft: "15px" }}
                >
                  Monthly Performance
                </h5>

                <div>
                  <div style={{ height: "35px", marginRight: "240px" }}>
                    <div className="d-flex gap-2" style={{ height: "50px" }}>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        // onChange={(e) => setYear(e.target.value)}
                      >
                        {opt.map((item) => {
                          return (
                            <option
                              key={item.financial_year}
                              value={item.financial_year}
                              selected
                            >
                              {item.financial_year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <DailyTrackingTable year={year} />
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default PerformaceMonthWise;
