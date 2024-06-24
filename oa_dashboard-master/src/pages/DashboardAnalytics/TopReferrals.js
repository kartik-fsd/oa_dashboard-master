import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { APIClient } from "../../assets/config/sessionToken";

//import Images
import illustrator from "../../assets/images/illustrator-1.png";
import { earnings_fse_chart } from "../../assets/utils/sow";
import { api } from "../../globalConfig";
import moment from "moment";

const TopReferrals = ({ graphData, monthData }) => {
  const params = useParams();
  let id = params.id.split("-")[0];

  const promise = new APIClient();
  const current_date = new Date();
  const current_month = moment(current_date).format("MM");
  const current_year = moment(current_date).format("YYYY");
  const earningUrl =
    api.OA_URL +
    earnings_fse_chart +
    `?sow_id=${id}&type=month&month=${current_month}&year=${current_year}`;

  const [earningStats, setEarningStats] = useState({});
  const [isUserDropdown, setUserDropdown] = React.useState(false);

  useEffect(() => {
    setEarningStats({ ...graphData });
  }, [graphData]);

  const handleDropDown = (e, num) => {
    const trainingDailyUrl =
      api.OA_URL +
      earnings_fse_chart +
      `?sow_id=${id}&type=${e[0]}&month=${e[1]}&year=${e[2]}`;
    axios
      .get(trainingDailyUrl)
      .then((res) => {
        setEarningStats(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Col xl={6} md={6} className="w-100" style={{ height: "95%" }}>
        <Card className="card-height-100 w-100" style={{ height: "100%" }}>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Earning Stats</h4>
            <div className="flex-shrink-0">
              <Dropdown
                className="card-header-dropdown"
                isOpen={isUserDropdown}
                toggle={() => setUserDropdown(!isUserDropdown)}
                direction="start"
              >
                <DropdownToggle
                  tag="a"
                  className="text-reset dropdown-btn"
                  role="button"
                >
                  <span className="text-muted fs-16">
                    <i className="mdi mdi-dots-vertical align-middle"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  {/* <DropdownItem onClick={() => handleDropDown("month", "5")}>
                    Current Month
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropDown("last_month", "5")}
                  >
                    Last Month
                  </DropdownItem> */}
                  {monthData?.map((item) => (
                    <>
                      <DropdownItem
                        onClick={() =>
                          handleDropDown(["month", item.value, item.year])
                        }
                      >
                        {item.label}
                      </DropdownItem>
                    </>
                  ))}
                  <DropdownItem
                    onClick={() => handleDropDown(["overall", "0", "0"])}
                  >
                    Overall
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>

          <CardBody>
            <Row className="align-items-center">
              <Col xs={11}>
                <h6 className="text-muted text-uppercase fw-semibold text-truncate fs-12 mb-3">
                  Total Earnings
                </h6>
                <h4 className="mb-0"> ₹ {earningStats?.total_earning}</h4>
                <p className="mb-0 mt-2 text-muted">
                  <span
                    className="badge badge-soft-success mb-0"
                    style={{
                      color: "#fff",
                      background: "#ba94f9",
                      width: "30px",
                    }}
                  >
                    {earningStats?.direct?.toLocaleString("en-US", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </span>{" "}
                  <span className="fs-10">{`( ${Math.floor(
                    (earningStats?.direct / earningStats?.total_users) * 100
                  )?.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}%)`}</span>{" "}
                  Direct Network
                </p>
                <p className="mb-0 mt-2 text-muted">
                  <span
                    className="badge badge-soft-success mb-0"
                    style={{
                      color: "#fff",
                      background: "#FFA45E",
                      width: "30px",
                    }}
                  >
                    {earningStats?.managed}
                  </span>{" "}
                  <span className="fs-10">{`( ${(
                    (earningStats?.managed / earningStats?.total_users) *
                    100
                  ).toFixed(0)}%)`}</span>{" "}
                  Managed Network
                </p>
              </Col>
              <Col xs={1}>
                {/* <div className="text-center">
                  <img src={illustrator} className="img-fluid" alt="" />
                </div> */}
                <Row className="w-100 d-flex align-items-center justify-content-around">
                  {/* <div
                    style={{
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      background: "#ba94f9",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                    className="d-flex justify-content-center align-items-center fs-16 fw-bold"
                  >
                    {earningStats?.direct}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      background: "#FFA45E",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                    className="d-flex justify-content-center align-items-center fs-16 fw-bold"
                  >
                    {earningStats?.grouped}
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      background: "#63bbbe",
                      borderRadius: "5px",
                      padding: "2px 8px",
                    }}
                    className="d-flex justify-content-center align-items-center fs-16 fw-bold"
                  >
                    {earningStats?.managed}
                  </div> */}
                </Row>
              </Col>
            </Row>
            <div className="mt-3 pt-2">
              <div className="progress progress-lg rounded-pill">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${earningStats?.phase1 || 0}%` }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: `${earningStats?.phase2 || 0}%` }}
                  aria-valuenow="18"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: `${earningStats?.phase3 || 0}%` }}
                  aria-valuenow="22"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${earningStats?.phase4 || 0}%`,
                    backgroundColor: "#ec5c24",
                  }}
                  aria-valuenow="16"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${earningStats?.phase5 || 0}%` }}
                  aria-valuenow="19"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="mt-3 pt-2">
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i className="mdi mdi-circle align-middle text-danger me-2"></i>
                    0 - 1,000
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">{+earningStats?.phase1}%</p>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i className="mdi mdi-circle align-middle text-warning me-2"></i>
                    1,000 - 5,000
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">{+earningStats?.phase2}%</p>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i className="mdi mdi-circle align-middle text-info me-2"></i>
                    5,000 - 10,000
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">{+earningStats?.phase3}%</p>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i
                      className="mdi mdi-circle align-middle  me-2"
                      style={{ color: "#b83016" }}
                    ></i>
                    10,000 - 15,000
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">{+earningStats?.phase4}%</p>
                </div>
              </div>
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i className="mdi mdi-circle align-middle text-success me-2"></i>
                    Above 15,000
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">{+earningStats?.phase5}%</p>
                </div>
              </div>
              {/* <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i className="mdi mdi-circle align-middle text-warning me-2"></i>
                    www.medium.com
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">12.22%</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-truncate text-muted fs-14 mb-0">
                    <i className="mdi mdi-circle align-middle text-danger me-2"></i>
                    Other
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="mb-0">17.58%</p>
                </div>
              </div> */}
            </div>

            {/* <div className="mt-2 text-center">
              <Link to="#" className="text-muted text-decoration-underline">
                Show All
              </Link>
            </div> */}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TopReferrals;
