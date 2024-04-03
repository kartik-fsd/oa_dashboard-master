import React from "react";
import { Card, CardBody, CardHeader, Col, Label, Row } from "reactstrap";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { widget } from "./cradItem";
import { api } from "../../globalConfig";
import { bussiness_stats_overall } from "../../assets/utils/managementapi";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

const BuissnessCrad = () => {
  const date = new Date();
  const todayDate = moment(date).format("YYYY-MM-DD");

  const [stats, setStats] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [flit, setFilt] = React.useState(todayDate);

  React.useEffect(() => {
    const link = api.TASKMO_URL + bussiness_stats_overall;

    axios
      .get(link, { params: { date: flit } })
      .then((res) => {
        setStats(res.data.supply_data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [flit]);

  return (
    <div className="page-content">
      <div>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Cards</h5>
              </div>
              <div>
                {/* <Label className="form-label mb-0">Basic</Label> */}
                <Flatpickr
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  onChange={(e) => setFilt(moment(e[0]).format("YYYY-MM-DD"))}
                  style={{ width: "200px" }}
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      {loading ? (
        <Row>
          {Array.from({ length: 10 })?.map((item) => {
            return (
              <>
                <Col xs="3">
                  <Card
                    className="shine"
                    style={{ width: "250px", height: "120px" }}
                  >
                    <CardBody></CardBody>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      ) : (
        <Row>
          {stats?.map((item) => {
            return (
              <>
                <Col xs="3">
                  <Card className={"card-animate "}>
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p
                            className={
                              "text-uppercase fw-medium mb-0 text-muted"
                            }
                          >
                            {item.title}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5 className={"fs-14 mb-0 text-success "}>
                            <i
                              className={"fs-13 align-middle fs-21" + item.icon}
                            ></i>
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4
                            className={"fs-22 fw-semibold ff-secondary mb-4 "}
                          >
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                //   prefix={item.prefix}
                                //   suffix={item.suffix}
                                separator={","}
                                end={item.daily}
                                decimals={2}
                                duration={4}
                              />
                            </span>
                          </h4>
                          {/* <Link to="#" className={"text-decoration-underline "}>
                  net
                </Link> */}
                          <div>
                            <span>{item.monthly}</span>
                            {/* <span>yearly</span> */}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span>{item.yearly}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default BuissnessCrad;
