import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { farming } from "../../../globalConfig";
import {
  getInv,
  getSplitDate,
  splitdate,
  bulkaddpayreq,
} from "../../../assets/utils/farmingBase";

import axios from "axios";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import GetDataData from "./GetDataData";
import { useHistory, useParams } from "react-router-dom";
import { successnotify, warningnotify } from "../../Toasts";
const customStyles = {
  // hide the close button
  ".Select-value-icon": {
    display: "none",
    visibility: "hidden",
  },
};
const SplitRequest = () => {
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem("splitreqdata"));
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [invData, setInvData] = useState([]);
  const [splitreq, setSplitReq] = React.useState({});
  const [totalLeadscount, setTotalLeadscount] = React.useState(0);

  //dates
  const [dateData, setDateData] = React.useState([]);
  const [mainMinDate, setMainMinDate] = useState("");
  const [mainMaxDate, setMainMaxDate] = useState("");
  const [testData, setTestData] = useState([]);
  const history = useHistory();
  let countLo = localStorage.getItem("count");
  if (Number(countLo) != 1) {
    localStorage.setItem("dates", JSON.stringify([]));
    localStorage.setItem("disadate", JSON.stringify([]));
    localStorage.setItem("count", 1);
  }

  const dateDataloc = JSON.parse(localStorage.getItem("dates"));

  const handleSplitReqChange = (value) => {
    setSplitReq({ value });
    console.log(value, "tsetinval");
    // let obj = { value: { value } };
    let dates = JSON.parse(localStorage.getItem("dates"));
    // dates.push(obj);
    dates = value;
    localStorage.setItem("dates", JSON.stringify(dates));
    // console.log(dates);
  };

  // loader for submit dates;
  const [isLoaderSubmit, setIsLoaderSubmit] = React.useState(false);
  const [isErrSubmit, setIsErrSubmit] = React.useState(false);

  const submitDates = () => {
    let otData = JSON.parse(localStorage.getItem("disadate"));

    let ot = otData.map((item) => ({
      start_date: item.from,
      end_date: item.to,
      total_leads: item.leads,
      inv_id: item.valu,
      req_id: id,
    }));

    let calcSum = ot.reduce((acc, el) => acc + Number(el.total_leads), 0);
    console.log(otData, "otdata", ot, totalLeadscount, calcSum);

    if (totalLeadscount == calcSum) {
      let link = farming.farming_URL + bulkaddpayreq;
      setIsLoaderSubmit(true);
      axios
        .post(link, ot)
        .then((res) => {
          if (res.data.error) {
            warningnotify("Something went wrong");
          } else {
            setIsLoaderSubmit(false);
            successnotify("Success");
            history.push("/paymentrequest");
          }
        })
        .catch((err) => {
          warningnotify("Something went wrong");
          setIsErrSubmit(false);
        })
        .finally(() => {
          setIsLoaderSubmit(false);
        });
    } else {
      warningnotify("All dates not selected");
    }
  };

  const getLeadsdata = () => {
    let apilink = farming.farming_URL + splitdate;
    setIsLoading(true);
    axios
      .post(apilink, { req_id: data.req_id })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data.alldata, "testingit");
        setLeadsData(res.data.alldata);
        setTotalLeadscount(res.data.alldata.total);

        localStorage.setItem(
          "countes",
          JSON.stringify(res.data.alldata?.datedata)
        );
      })
      .catch((err) => {
        setIsErr(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getInvData = () => {
    let link = farming.farming_URL + getInv;
    setIsLoading(true);
    axios
      .get(link)
      .then((res) => {
        setIsLoading(false);
        setInvData(res?.data?.invoice);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const getMinMaxDates = () => {
    const body = {};
    body.req_id = id;
    let link = farming.farming_URL + getSplitDate;
    axios
      .post(link, body)
      .then((res) => {
        setDateData(res.data.alldata.datedata);
        setMainMaxDate(res.data.alldata.max_date);
        setMainMinDate(res.data.alldata.min_date);
        setTestData(res.data.alldata.datedata);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getLeadsdata();
    getInvData();
    getMinMaxDates();
    localStorage.removeItem("count");
    localStorage.removeItem("count2");
  }, []);
  return isLoading ? (
    <>...loading</>
  ) : (
    <div className="page-content">
      <Container fluid>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div>
                            {data?.brand_logo ? (
                              <img
                                src={data.brand_logo}
                                alt=""
                                className="rounded-circle avatar-sm"
                                style={{ width: "32px", height: "32px" }}
                              />
                            ) : (
                              <div className="avatar-sm">
                                <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                                  {data?.brand_name?.charAt(0) ?? ""}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <div
                              className="fs-11"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "underline",
                              }}
                            >
                              <div>
                                {data.brand_name}-{data.sow_id}{" "}
                              </div>
                            </div>
                            <div className="fs-10 text-muted">
                              {data?.project_title ?? ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div>
                          {data?.brand_logo ? (
                            <img
                              src={data.profile_image}
                              alt=""
                              className="rounded-circle avatar-sm"
                              style={{ width: "32px", height: "32px" }}
                            />
                          ) : (
                            <div className="avatar-sm">
                              <div className="avatar-title rounded-circle bg-soft-primary  text-primary">
                                {data?.req_name?.charAt(0) ?? ""}
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="fs-10">
                            <div>{data.req_name} &nbsp; </div>
                          </div>
                          <div style={{ display: "flex" }}>
                            {/* <div className="fs-10">Req on </div> */}
                            <div
                              className="fs-10 fs-10 text-muted"
                              style={{ fontWeight: 500 }}
                            >
                              &nbsp;{data.request_date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="amt_table text-primary">
                        {data.user_type == "direct_sp" ? (
                          <span
                            className="badge rounded-pill badge-soft-success"
                            style={{ width: "60px" }}
                          >
                            Managed
                          </span>
                        ) : data.user_type == "indirect_sp" ? (
                          <span
                            className="badge rounded-pill badge-soft-warning"
                            style={{ width: "60px" }}
                          >
                            Grouped
                          </span>
                        ) : (
                          <span
                            className="badge rounded-pill badge-soft-info"
                            style={{ width: "60px" }}
                          >
                            Direct
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="fs-12" style={{ fontWeight: 600 }}>
                          {data.leads} * {data.p_cpl}
                        </span>
                      </div>
                      <div>
                        <span className="badge rounded-pill badge-soft-dark">
                          {data.display_date}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    flexWrap: "wrap",
                  }}
                >
                  {leadsData?.datedata?.map((item) => (
                    <div key={item.slno}>
                      <div
                        className="badge text-bg-primary"
                        style={{ fontSize: "20px" }}
                      >
                        {item?.date} : {item?.leads}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <h4>Split Invoices</h4>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      styles={customStyles}
                      isClearable={false}
                      options={invData}
                      onChange={handleSplitReqChange}
                      hideSelectedOptions
                      className="custom-select"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <h4>Invoice Details</h4>
                    <div>
                      {splitreq?.value?.map((item, i) => (
                        <div key={i}>
                          <div>
                            <Row style={{ padding: "15px" }}>
                              <Col xs={4}>{item?.label}</Col>
                              <Col>
                                <GetDataData
                                  valu={dateDataloc[i]}
                                  minDate1={mainMinDate}
                                  maxDate1={mainMaxDate}
                                  checkdata={dateData}
                                  id={Number(i) + 1}
                                  // countes={leadsData}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
                      {isLoaderSubmit ? (
                        ""
                      ) : (
                        <Button
                          className="bg-primary"
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          clear Dates
                        </Button>
                      )}
                      {isLoaderSubmit ? (
                        <Button
                          className="bg-primary"
                          style={{
                            fontSize: "5px",
                            height: "37px",
                            width: "101px",
                          }}
                        >
                          <div
                            className="spinner-border text-light"
                            role="status"
                            style={{ height: "20px", width: "20px" }}
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </Button>
                      ) : (
                        <Button className="bg-primary" onClick={submitDates}>
                          Submit Dates
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default SplitRequest;
