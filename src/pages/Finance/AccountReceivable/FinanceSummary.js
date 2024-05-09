import axios from "axios";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { accSummary } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import ProjectLeadsTable from "../../ManagerDashboard/ProjectLeadsTable";
import FinanceSummaryTable from "./FinanceSummaryTable";
import "./financesummary.css";
import DownloadAcc from "./DownloadAcc";
// test

const FinanceSummary = () => {
  const [data, setData] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setIsErr] = React.useState(false);
  const [filter, setFilter] = React.useState("receivables");
  const [loc, setLoc] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const token = sessionStorage.getItem("token");
  document.title = "OnX | Finance";
  console.log(filter, "qwd");
  console.log(window.location.pathname, "chages");
  const getAccData = () => {
    let apiData = farming.farming_URL + accSummary + "/" + filter;
    setIsLoading(true);
    axios
      .get(apiData)
      .then((res) => {
        setData(res.data);
        console.log(res.data, "rcnj");
      })
      .catch((err) => setIsErr(true))
      .finally(() => setIsLoading(false));
  };
  React.useEffect(() => {
    getAccData();
    setLoc(window.location.pathname);
  }, [filter, check]);
  const indianNumbers = (num, len) => {
    return (
      " ₹ " +
      Number(num).toLocaleString("en-IN", {
        maximumFractionDigits: len,
      })
    );
  };

  return (
    <>
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
                    className="fw-600 fs-16"
                    style={{
                      letterSpacing: "2px",
                      marginLeft: "15px",
                      color: "#b83016",
                    }}
                  >
                    Receivables Summary
                  </h5>
                  <div className="d-flex gap-3 align-items-center">
                    {window.location.pathname == "/management/ar-summary" ? (
                      <div>
                        <a
                          href={`${farming.farming_URL}/invoatoken/download/accSummary?type=client&token=${token}`}
                          download
                        >
                          <i
                            className=" ri-download-2-line "
                            style={{
                              fontSize: "24px",
                              cursor: "pointer",
                              color: "#b83016",
                            }}
                          ></i>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <i
                          className=" ri-download-2-line "
                          style={{
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#b83016",
                          }}
                          onClick={() => setOpen(!open)}
                        ></i>
                      </div>
                    )}
                    <div
                      className="d-flex gap-2 align-items-center"
                      style={{ marginRight: "230px" }}
                    >
                      <div
                        style={{
                          height: "40px",
                          // marginRight: "230px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          className="badge badge-soft d-flex align-items-center px-4  fs-16"
                          style={{
                            height: "40px",
                            backgroundColor: "#fde8d7",
                            color: "#f07d47",
                            cursor: "not-allowed",
                          }}
                        >
                          Total : {indianNumbers(data.total?.toFixed(2))}
                        </span>
                      </div>
                      <div>
                        <UncontrolledDropdown className="dropdown d-inline-block">
                          <DropdownToggle
                            style={{
                              background: "#fff",
                              border: "none",
                              display:
                                loc !== "/finance/ar-summary"
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#ec5c24",
                                color: "whitesmoke",
                                transition: "background-color 0.3s ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#dd4319")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#ec5c24")
                              }
                            >
                              <i
                                className=" ri-filter-3-line align-bottom me-1  fs-14"
                                // style={{
                                //   fontSize: "13px",
                                // }}
                              ></i>
                              Filter
                            </button>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("receivables");
                              }}
                            >
                              <i className=" ri-exchange-dollar-fill align-bottom me-2 text-muted"></i>
                              Receivables
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("bad_debt");
                              }}
                            >
                              <i className=" ri-delete-back-2-line align-bottom me-2 text-muted"></i>
                              Bad Debt
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("all");
                              }}
                            >
                              <i className=" ri-user-follow-line align-bottom me-2 text-muted"></i>
                              All
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <FinanceSummaryTable
                  check={check}
                  setCheck={setCheck}
                  data={data}
                  isLoading={isLoading}
                  err={err}
                  filter={filter}
                />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
      <DownloadAcc open={open} setOpen={setOpen} />
    </>
  );
};

export default FinanceSummary;
