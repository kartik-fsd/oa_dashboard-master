import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { filter_fy } from "../../assets/utils/managementapi";
import { api } from "../../globalConfig";
import DailyTrackingTable from "./DailyTrackingTable";
import DailyTrackingWidget from "./DailyTrackingWidget";

const DailyTracking = () => {
  const [opt, setOpt] = React.useState([]);
  const [year, setYear] = React.useState("FY24");
  document.title = "OnX | Management";
  React.useEffect(() => {
    const link = api.VENDOR_URL + filter_fy;

    axios
      .get(link)
      .then((res) => setOpt(res.data.search_fy))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page-content">
      <Container id="force">
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
                <h5
                  className=" fw-600 fs-16"
                  style={{
                    letterSpacing: "2px",
                    marginLeft: "15px",
                    color: "#b83016",
                  }}
                >
                  Sales Roaster
                </h5>
                {/* <div>
                  <div style={{ height: "35px", marginRight: "220px" }}>
                    <div style={{ width: "120px" }}>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        onChange={(e) => setYear(e.target.value)}
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
                </div> */}
              </div>
            </CardHeader>
            <CardBody>
              <>{/* <DailyTrackingWidget year={year} /> */}</>
              <>
                <DailyTrackingTable year={year} />
              </>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default DailyTracking;
