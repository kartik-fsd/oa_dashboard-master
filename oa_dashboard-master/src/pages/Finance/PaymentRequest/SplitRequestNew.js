// import React from "react";
// import { Container } from "reactstrap";

// const SplitRequestNew = () => {
//   return (
//     <div className="page-content">
//       <Container fluid>testing</Container>
//     </div>
//   );
// };

// export default SplitRequestNew;
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
  splitdateNew,
  bulkaddpayreq,
} from "../../../assets/utils/farmingBase";

import axios from "axios";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import GetDataData from "./GetDataData";
import { useHistory, useParams } from "react-router-dom";
import { successnotify, warningnotify } from "../../Toasts";
import ConfirmModal from "../../../components/common/ConformationModal";
const customStyles = {
  // hide the close button
  ".Select-value-icon": {
    display: "none",
    visibility: "hidden",
  },
};

const SplitRequestNew = () => {
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem("splitreqdata"));
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [isErr, setIsErr] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [invData, setInvData] = useState([]);
  const [splitreq, setSplitReq] = React.useState({});
  const [totalLeadscount, setTotalLeadscount] = React.useState(0);
  console.log(id, "ddl");
  //dates
  const [dateData, setDateData] = React.useState([]);
  const [mainMinDate, setMainMinDate] = useState("");
  const [mainMaxDate, setMainMaxDate] = useState("");
  const [testData, setTestData] = useState([]);
  const [total, setTotal] = useState();
  const [subTrue, setSubTrue] = useState(false);
  const [submitData, setSubmitData] = useState([]);
  const [sData, setsData] = useState([]);
  const history = useHistory();
  let countLo = localStorage.getItem("count");
  if (Number(countLo) != 1) {
    localStorage.setItem("dates", JSON.stringify([]));
    localStorage.setItem("disadate", JSON.stringify([]));
    localStorage.setItem("count", 1);
  }

  const dateDataloc = JSON.parse(localStorage.getItem("dates"));
  const onCloseClick = () => {
    setShow(!show);
  };
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
    if (data.leads == total) {
      console.log(submitData, "dd");
      let link = farming.farming_URL + bulkaddpayreq;
      setIsLoaderSubmit(true);
      axios
        .post(link, submitData)
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

  const Sdate = () => {
    const body = {};
    body.req_id = id;
    let link = farming.farming_URL + splitdateNew;
    axios
      .post(link, body)
      .then((res) => {
        setsData(res.data.alldata.results);
        setTotal(res.data.alldata.total);
        setSubmitData(res.data.alldata.submitData);
        console.log(res.data.alldata.isSubmit, "kk");
        setSubTrue(res.data.alldata.isSubmit);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    Sdate();
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
                <div className="table-responsive table-card">
                  <table className="table table-nowrap mb-0">
                    <thead className="table-light">
                      <tr style={{ textAlign: "center" }}>
                        <th scope="col">MPA ID</th>
                        <th scope="col">Month</th>
                        <th scope="col">Count</th>
                        <th scope="col">Dates</th>

                        <th scope="col">ATD</th>
                        <th scope="col">PTD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sData?.map((result) => (
                        <tr key={result?.inv_id} style={{ color: "#3F5289" }}>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {"  "}
                            <span className="px-4">
                              {result?.inv_id == null
                                ? "--"
                                : `MPA${result?.inv_id}`}
                            </span>
                          </td>
                          <td
                            className="px-4 fs-11"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {result?.month}
                          </td>
                          <td
                            style={{ textAlign: "center" }}
                            className="fs-11 px-4 "
                          >
                            {result?.total_leads <= result?.atd - result?.ptd ||
                            result?.atd == null ? (
                              <span
                                className=" badge-soft-success"
                                style={{
                                  fontWeight: 900,
                                  borderRadius: "50%",
                                  padding: "6px",
                                }}
                              >
                                {result?.total_leads}
                              </span>
                            ) : (
                              <span
                                className=" badge-soft-danger"
                                style={{
                                  fontWeight: 900,
                                  borderRadius: "50%",
                                  padding: "6px",
                                }}
                              >
                                {result?.total_leads}
                              </span>
                            )}
                          </td>

                          <td style={{}}>
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                                // justifyContent: "center",
                              }}
                            >
                              {result?.createdDates?.map((item) => (
                                <div key={item.inv_id}>
                                  <span
                                    className="badge rounded-pill badge-soft-primary"
                                    style={{ width: 110 }}
                                  >
                                    {item?.ops_dat} : {item?.leads}
                                  </span>
                                </div>
                              ))}
                            </div>{" "}
                          </td>
                          <td
                            style={{ textAlign: "center" }}
                            className="px-5 fs-11"
                          >
                            {result?.atd}
                          </td>
                          <td
                            style={{ textAlign: "center" }}
                            className="px-5 fs-11"
                          >
                            {result?.ptd}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <button
          style={{
            float: "right",
            backgroundColor: "#3F5289",
            opacity: `${!subTrue ? 0.6 : 1}`,
            color: "#fff",
          }}
          type="button"
          className="btn w-sm btn"
          disabled={!subTrue}
          onClick={() => {
            setShow(!show);
          }}
        >
          SPLIT
        </button>
      </Container>
      <ConfirmModal
        show={show}
        onCloseClick={onCloseClick}
        submitDates={submitDates}
        statement={`You want to split the request ${id}`}
        src={"/SpliGif.gif"}
        ButtonText={"Yes, Split it!"}
      />
    </div>
  );
};

export default SplitRequestNew;
