import axios from "axios";
import moment from "moment";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import { projection, projection1 } from "../../../assets/utils/managementapi";
import { api, farming } from "../../../globalConfig";
import WeekTable from "./WeekTable";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Week = () => {
  const [totalData, setTotalData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const history = useHistory();

  console.log(moment(startDate).format("/MM/YYYY"), "date");
  const month = moment(startDate).format("/MM/YYYY");

  React.useEffect(() => {
    let link;
    if (history.location.pathname == "/founders/monthly-summary") {
      link = farming.farming_URL + projection1 + month;
    } else {
      link = farming.farming_URL + projection + month;
    }

    axios
      .get(link)
      .then((res) => {
        setTotalData(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, [month]);

  return (
    <div className="page-content">
      <Container>
        <Col lg={12}>
          {/* <CardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title mb-0">Week</h5>
                <div>
                  <div style={{ height: "35px", marginRight: "220px" }}>
                    <div style={{ width: "135px" }}>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option selected disabled>
                          select
                        </option>
                        {month.map((item) => {
                          return (
                            <>
                              <option value={item}>{item}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader> */}

          {loading ? (
            <Card
              md={4}
              className="shine"
              style={{ width: "100%", height: "400px" }}
            ></Card>
          ) : err ? (
            <>oops something went wrong...!</>
          ) : (
            <WeekTable
              totalData={totalData}
              setStartDate={setStartDate}
              startDate={startDate}
              month={month}
            />
          )}
        </Col>
      </Container>
    </div>
  );
};

export default Week;
