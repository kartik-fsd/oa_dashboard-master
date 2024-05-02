import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, Col, Row, Card, CardBody } from "reactstrap";
import { bulkaddpayreq, splitdateNew } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import ConfirmModal from "../../../components/common/ConformationModal";
import { successnotify, warningnotify } from "../../Toasts";
import { useHistory } from "react-router-dom";

function SplitModal({ show, onCloseClick, id, updated, setUpdated }) {
  const [sData, setsData] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [show1, setShow1] = React.useState(false);
  const [isLoaderSubmit, setIsLoaderSubmit] = React.useState(false);
  const [isErrSubmit, setIsErrSubmit] = React.useState(false);
  const [total, setTotal] = useState();
  const [submitData, setSubmitData] = useState([]);
  const [subTrue, setSubTrue] = useState(false);
  const history = useHistory();
  const onCloseClick1 = () => {
    setShow1(!show1);
  };
  const data = JSON.parse(localStorage.getItem("splitreqdata"));
  const Sdate = () => {
    const body = {};
    body.req_id = id;
    let link = farming.farming_URL + splitdateNew;
    axios
      .post(link, body)
      .then((res) => {
        setLoading(false);
        setsData(res.data.alldata.results);
        setTotal(res.data.alldata.total);
        setSubmitData(res.data.alldata.submitData);
        console.log(res.data.alldata.isSubmit, "kk");
        setSubTrue(res.data.alldata.isSubmit);
      })
      .catch((err) => console.log(err));
  };

  const submitDates = () => {
    if (data?.leads == total) {
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
            onCloseClick1();
            onCloseClick();
            setUpdated(!updated);
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

  React.useEffect(() => {
    Sdate();
  }, [id]);

  return (
    <Modal
      fade={true}
      isOpen={show}
      toggle={() => {
        setsData([]);
        setTotal();
        setSubmitData([]);
        setSubTrue(false);
        onCloseClick();
      }}
      centered={true}
      size="xl"
    >
      <ModalBody className="py-3 px-5">
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
                            <div
                              className="avatar-title rounded-circle   "
                              style={{
                                color: "#b83016",
                                backgroundColor: "#f07d47",
                              }}
                            >
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
                            {data?.brand_name}-{data?.sow_id}{" "}
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
                          src={data?.profile_image}
                          alt=""
                          className="rounded-circle avatar-sm"
                          style={{ width: "32px", height: "32px" }}
                        />
                      ) : (
                        <div className="avatar-sm">
                          <div
                            className="avatar-title rounded-circle "
                            style={{
                              color: "#b83016",
                              backgroundColor: "#f07d47",
                            }}
                          >
                            {data?.req_name?.charAt(0) ?? ""}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="fs-10">
                        <div>{data?.req_name} &nbsp; </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        {/* <div className="fs-10">Req on </div> */}
                        <div
                          className="fs-10 fs-10 text-muted"
                          style={{ fontWeight: 500 }}
                        >
                          &nbsp;{data?.request_date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amt_table " style={{ color: "#b83016" }}>
                    {data?.user_type == "direct_sp" ? (
                      <span
                        className="badge rounded-pill badge-soft-success"
                        style={{ width: "60px" }}
                      >
                        Managed
                      </span>
                    ) : data?.user_type == "indirect_sp" ? (
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
                      {data?.leads} * {data?.p_cpl}
                    </span>
                  </div>
                  <div>
                    <span className="badge rounded-pill badge-soft-dark">
                      {data?.display_date}
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
                {!loading ? (
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
                                  className="badge rounded-pill badge-soft"
                                  style={{
                                    width: 110,
                                    backgroundColor: "#f07d47",
                                  }}
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
                ) : (
                  <span>loading</span>
                )}
              </table>
            </div>
          </Col>
        </Row>
        <button
          style={{
            float: "right",
            backgroundColor: "#3F5289",
            opacity: `${!subTrue ? 0.6 : 1}`,
            marginTop: "30px",
            color: "#fff",
          }}
          type="button"
          className="btn w-sm btn"
          disabled={!subTrue}
          onClick={() => {
            setShow1(!show1);
          }}
        >
          SPLIT
        </button>
      </ModalBody>
      <ConfirmModal
        show={show1}
        onCloseClick={onCloseClick1}
        submitDates={submitDates}
        statement={`You want to split the request ${id}`}
        src={"/SpliGif.gif"}
        ButtonText={"Yes, Split it!"}
      />
    </Modal>
  );
}

export default SplitModal;
