import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import EarningsTable from "./EarningsTable";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "../../globalConfig";
import {
  search_clusters,
  tsm_earnings,
  tsm_performing,
} from "../../assets/utils/SupplyApi";

// import "flatpickr-monthselect-plugin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Earnings.css";
import moment from "moment";
import Select from "react-select";
import ChartForEarning from "./ChartForEarning";

const Earnings = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [clusterType, setClusterType] = React.useState("");
  const [isStatus, setisStatus] = React.useState("all");
  const [totalPerfomance, setTotalPerformance] = React.useState("");
  const [dataInsert, setDataInsert] = React.useState("");
  document.title = "OnX | Supply";
  const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    // <button className="example-custom-input" onClick={onClick} ref={ref}>
    //   {value}
    // </button>
    <input value={value} onClick={onClick} className="example-custom-input1" />
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  console.log(
    location.pathname,
    "testing",
    moment(startDate).format("MM"),
    moment(startDate).format("YYYY")
  );

  const getPerformanceData = () => {
    let apiData;
    if (location.pathanme == "/supply/earnings") {
      apiData = api.VENDOR_URL + tsm_earnings;
    } else {
      apiData = api.VENDOR_URL + tsm_performing;
    }
    setIsLoading(true);
    axios
      .get(apiData, {
        params: {
          month: moment(startDate).format("MM"),
          year: moment(startDate).format("YYYY"),
          cluster_id: isStatus?.value ?? "all",
        },
      })
      .then((res) => {
        setIsLoading(false);
        setData(res?.data?.asm_list?.performance);
        setData2(res?.data.asm_list?.months);
        setDataInsert({
          title: "Cluster Wise Performance",
          totalCluster: res?.data.asm_list?.total_cluster,
          totalClusterPerformance:
            res?.data.asm_list?.total_cluster_performance,
        });
        // console.log(res.data.asm_list.total_performance, "fsaksrh");
        setTotalPerformance(res.data.asm_list.total_performance);
      })
      .catch((err) => setIsErr(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPerformanceData();
  }, [location.pathname, startDate, isStatus]);

  React.useEffect(() => {
    let apilink = api.VENDOR_URL + search_clusters;
    axios
      .get(apilink)
      .then((res) => {
        let obj = { label: "all", value: "all" };
        let ot = res.data.cluster_list;
        ot.unshift(obj);
        setClusterType(ot);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleisStatus = (isStatus) => {
    setisStatus(isStatus);
    console.log(isStatus, "check");
  };

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* <Col lg={12}>
              <Card>
                <CardBody>
                  <ChartForEarning dataInsert={dataInsert} />
                </CardBody>
              </Card>
            </Col> */}
            <Col lg={12}>
              <Card
                style={{
                  // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  borderRadius: "15px",
                }}
              >
                <CardHeader style={{ padding: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5 className="card-title mb-0">
                      {location.pathname == "/supply/earnings"
                        ? "Earnings"
                        : "Performance"}
                    </h5>
                    <div style={{ marginLeft: "670px" }}>
                      <div className="input-light" style={{ width: "200px" }}>
                        <Select
                          defaultInputValue="all"
                          value={isStatus}
                          defaultValue={isStatus || "Select"}
                          onChange={(e) => {
                            handleisStatus(e);
                          }}
                          options={clusterType}
                          name="choices-single-default"
                          id="idStatus"
                        ></Select>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          height: "40px",
                          marginRight: "20px",
                          paddingTop: "0px",
                        }}
                      >
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="MM-yyyy"
                          showMonthYearPicker
                          showFullMonthYearPicker
                          showFourColumnMonthYearPicker
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <>
                    <div>
                      <ChartForEarning dataInsert={dataInsert} />
                    </div>
                    <br />
                    <div>
                      {!isLoading && (
                        <EarningsTable
                          className="my-earning"
                          performance={data}
                          months={data2}
                          date={startDate}
                          totalPerfomance={totalPerfomance}
                        />
                      )}
                    </div>
                  </>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Earnings;
