import axios from "axios";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { filter_fy } from "../../assets/utils/managementapi";
import { api } from "../../globalConfig";
import DailyTrackingTable from "./DailyTrackingTable";
import DailyTrackingWidget from "./DailyTrackingWidget";
import BusinessTrackingTable from "./BusinessTrackingTable";

const BusinessRoaster = () => {
  const [percent, setPercent] = React.useState(0);
  let colorArrayData = [
    {
      id: "tooltip0",
      color: "#0400ff",
      colorback: "#0400ff",
      data: "%",
      backColor: false,
    },
    {
      id: "tooltip1",
      color: "#1e8c00",
      colorback: "#1e8c00",
      backColor: false,
      data: "₹",
    },
    {
      id: "tooltip2",
      color: "#4e00a3",
      colorback: "#4e00a3",
      backColor: false,
      data: "L",
    },
  ];
  const [colorArray, setColorArray] = React.useState(colorArrayData);
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
      <Container>
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
                  className="text-primary fw-600 fs-16"
                  style={{ letterSpacing: "2px", marginLeft: "15px" }}
                >
                  Business Roaster
                </h5>
                <div>
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
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    // marginLeft: "auto",
                    marginRight: "10px",
                  }}
                >
                  {colorArray.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        id={item.id}
                        onClick={() => {
                          setPercent(
                            item.color == "#ff6969"
                              ? 0
                              : item.color == "#088395"
                              ? 1
                              : 2
                          );
                          let check = colorArray.map((it) =>
                            it.id == item.id
                              ? { ...it, backColor: true }
                              : { ...it, backColor: false }
                          );
                          setColorArray(check);
                        }}
                        style={{
                          width: "25px",
                          height: "25px",
                          border: "1px solid red",
                          borderColor:
                            item.backColor == true ? item.colorback : "white",
                          borderRadius: "4px",
                          backgroundColor:
                            item.backColor == true ? item.colorback : "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid red",
                            borderColor: item.color,
                            width: "12px",
                            height: "12px",
                            borderRadius: "6px",
                            background: item.color,
                            cursor: "pointer",
                          }}
                        ></div>
                      </div>
                      {/* <div style={{ color: "black" }}>{item.data}</div> */}

                      <UncontrolledTooltip
                        placement="top"
                        target={item.id}
                        style={{ zIndex: "9999" }}
                      >
                        {item.id == "tooltip0"
                          ? "Billable"
                          : item.id == "tooltip1"
                          ? "Performed"
                          : "Invoice"}
                      </UncontrolledTooltip>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <>{/* <DailyTrackingWidget year={year} /> */}</>
              <>
                <BusinessTrackingTable year={year} />
              </>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default BusinessRoaster;
