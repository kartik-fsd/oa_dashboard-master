import axios from "axios";
import { Tooltip } from "chart.js";
import { Interweave } from "interweave";
import React, { useState } from "react";
import CountUp from "react-countup";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { investors_details } from "../../assets/utils/managementapi";
import { overall_leads_chart_oa } from "../../assets/utils/sow";
import Widgets from "../../components/common/Widgets";
import { api } from "../../globalConfig";
import DashedLineChart from "../Charts/MainChart/DashedLineChart";
import { DashedLine, DashedLine2 } from "../Charts/OptionsChart/OptionsChart";
import EcommerceProductDetail from "../Ecommerce/EcommerceProducts/EcommerceProductDetail";

const PipelineModal = ({ setOpen, open, data }) => {
  const params = useLocation();
  const [graphData, setGraphData] = React.useState({});
  const [projectDetails, setProjectDetails] = useState([]);
  console.log(data, "testingdata");
  const [ttop, setttop] = useState(false);
  const getTheModalData = () => {
    let apiData = api.VENDOR_URL + investors_details;
    axios
      .get(apiData, {
        params: {
          sow_id: data?.sow_id,
          month: data?.month_data,
          year: data?.year,
        },
      })
      .then((res) => {
        setProjectDetails(res?.data?.project_details);
        console.log(res.data?.project_details, "projects");
      })
      .catch((err) => console.log(err, "err"));
  };

  console.log(params.pathname, "params");
  const getOverallLeadsData = () => {
    const apiDataGraph = api.OA_URL + overall_leads_chart_oa;
    axios
      .get(apiDataGraph, {
        params: {
          sow_id: data?.sow_id,
          month: data?.month_data,
          type: "month",
          year: data?.year,
        },
      })
      .then((res) => {
        console.log(res, "respdaata");
        setGraphData({
          // type: num,
          title: "month",
          data: res.data?.overall,
          colors: ["#683395", "#09B29C", "#F6B84B", "#FF0100", "#a5adff"],
        });
      })
      .catch((err) => console.log(err, "err"));
  };

  React.useEffect(() => {
    console.log("testin", "2");
    if (open == true) {
      getOverallLeadsData();
      getTheModalData();
    }
  }, [open]);
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="xl"
        toggle={() => {
          setOpen(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
          }}
        >
          <h4 style={{ color: "#3f5289 " }}>Project Details</h4>
        </ModalHeader>
        <ModalBody>
          <Row className="mt-3">
            <Col lg={12}>
              <Card
                className="mt-n3"
                style={{
                  borderRadius: "10px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                }}
              >
                <div>
                  <CardBody className="pb-0 px-4">
                    <Row className="mb-3">
                      <div
                        style={{
                          display: "flex",
                          gap: "80px",
                          alignItems: "start",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ paddingTop: "15px" }}>
                          <div className="col-md">
                            <Row className="align-items-center g-3">
                              <div className="col-md-auto">
                                <div className="avatar-md">
                                  <div className="avatar-title bg-white rounded-circle">
                                    {
                                      <img
                                        loading="lazy"
                                        src={
                                          projectDetails.brand_logo
                                            ? projectDetails.brand_logo
                                            : "/logo512.png"
                                        }
                                        alt=""
                                        className="avatar-md"
                                        style={{ borderRadius: "50%" }}
                                      />
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="col-md">
                                <div>
                                  <h4 className="fw-bold">
                                    {projectDetails?.project_title} -{" "}
                                    {data?.sow_id}
                                    {/* <span>
                                      &nbsp;-&nbsp;{"AMADFSFFA324"}(123)
                                    </span> */}
                                  </h4>
                                  {/* <div className="text-muted">
                                    {projectDetails?.brand_name}
                                  </div> */}

                                  <div className="hstack gap-1 mt-1 fs-11">
                                    <div className="me-3 d-flex align-items-center">
                                      <i className="ri-ancient-gate-line me-1 text-black-75 fs-16 align-middle "></i>
                                      &nbsp;{projectDetails?.company_name}
                                      &nbsp;&nbsp;
                                    </div>
                                    <div className="d-flex align-items-center me-3">
                                      <i className="ri-bank-line me-1 text-black-75 fs-16 align-middle"></i>
                                      {projectDetails?.industry_type}{" "}
                                      &nbsp;&nbsp;
                                    </div>

                                    <div className="d-flex align-items-center me-3">
                                      <i className="ri-building-line me-1 text-black-75 fs-16 align-middle"></i>
                                      {projectDetails?.brand_name}
                                    </div>
                                  </div>
                                  <div className="hstack gap-3 flex-wrap mt-2">
                                    {/* <div>
                                      Company ID :{" "}
                                      <span
                                        className="fw-medium text-info"
                                        style={{ cursor: "pointer" }}
                                        // onClick={() => tog_animationFlip("compId")}
                                      >
                                        {"DGEGEGW"}
                                      </span>
                                    </div> */}

                                    <div>
                                      {/* <div>
                                        Agreement ID :&nbsp;
                                        <span
                                          className="fw-medium  text-info"
                                          // style={
                                          //   context?.oaDetials?.role ==
                                          //     "super_admin" ||
                                          //   context?.oaDetials?.role == "head"
                                          //     ? { cursor: "pointer" }
                                          //     : {
                                          //         pointerEvents: "none",
                                          //       }
                                          // }
                                          // onClick={() => tog_animationFlip("agreeId")}
                                          // onClick={() => set_modal_edit(true)}
                                        >
                                          {"fsadfsafsadf"}
                                        </span>
                                      </div> */}

                                      <div
                                        style={{
                                          position: "absolute",
                                          marginTop: "1px",
                                        }}
                                      >
                                        <p className="text-danger mt-1 fs-10">
                                          {/* Commercial approval pending */}
                                        </p>
                                      </div>
                                    </div>
                                    {/* <div className="vr"></div> */}
                                    {/* <div>
                                      Lead ID :{" "}
                                      <span className="fw-medium"></span>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                            marginTop: "5px",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: data?.mileVisble === 0 ? "none" : "",
                            }}
                          >
                            <p className="text-muted text-uppercase fs-14 text-end mb-2">
                              {"MileStone"}
                            </p>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <i
                                  className={"ri-service-line fs-20 text-muted"}
                                ></i>
                              </div>

                              <div className="flex-grow-1 ms-3">
                                <h2 className="mb-0">
                                  <span
                                    className="counter-value"
                                    data-target="197"
                                  >
                                    <CountUp
                                      start={0}
                                      prefix={""}
                                      suffix={""}
                                      separator={","}
                                      end={projectDetails.milestone}
                                      decimals={"0"}
                                      duration={4}
                                    />
                                  </span>
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-auto">
                        <div className=" text-muted">
                          {/* <h5 className="fs-14">
                            Company Description : <span></span>
                          </h5> */}
                          <p>
                            {" "}
                            <Interweave
                              content={projectDetails?.company_discription}
                            />
                          </p>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="g-4">
            <Col lg={4}>
              <Row style={{ height: "100%" }}>
                <Col lg={12}>
                  <Card
                    className=""
                    style={{
                      borderRadius: "10px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                    }}
                  >
                    <CardBody>
                      <Row>
                        <Col xl={8} style={{ width: "100%" }}>
                          <div className="mt-xl-0 mt-5">
                            <Row>
                              <Col md={12} className="flex-grow-1">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "25px",
                                  }}
                                >
                                  {/* <div>
                                    <img
                                      style={{ width: "60px", height: "60px" }}
                                      src={"/user-dummy-img.jpg"}
                                      alt=""
                                      className="rounded-circle avatar-xs"
                                    />
                                  </div> */}
                                  {/* <div>
                                    <h5>{"project"} </h5>
                                  </div> */}
                                </div>

                                <div
                                  className="mt-3"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Source
                                    </div>
                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.source_of_lead}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Started on
                                    </div>
                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.start_date}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Category
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp; {projectDetails?.category}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Network
                                    </div>
                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.network_status ==
                                        "open_network"
                                          ? "Open"
                                          : "Close"}
                                        &nbsp; - &nbsp;
                                        {projectDetails?.app_status == "show"
                                          ? "Show"
                                          : "Hide"}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Payment Per Lead{" "}
                                    </div>

                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.payment_per_lead}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Revenue Per Lead{" "}
                                    </div>

                                    <div>
                                      <span className="text-dark">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.revenue_per_lead}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Sales Leads{" "}
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.sales_leads}
                                      </span>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      KAM{" "}
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp; {projectDetails?.kam_name}
                                      </span>
                                    </div>
                                  </div>

                                  <div style={{ display: "flex" }}>
                                    <div
                                      className="text-muted fs-12"
                                      style={{ width: "130px" }}
                                    >
                                      Gross Margin{" "}
                                    </div>
                                    <div>
                                      <span className="text-dark text-capitalize">
                                        :&nbsp;&nbsp;{" "}
                                        {projectDetails?.gross_margin}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg={8}>
              <Card
                style={{
                  height: "302px",
                  padding: "10px",
                  paddingTop: "0px",
                  borderRadius: "10px",
                  overflow: "scroll",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                }}
              >
                <CardBody>
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">
                      project Details :{" "}
                      <span>
                        {/* <Tooltip
                          placement="top"
                          isOpen={ttop}
                          target="TooltipTop"
                          toggle={() => {
                            setttop(!ttop);
                          }}
                        > */}
                        {/* Youtube */}
                        {/* </Tooltip> */}
                        {/* <div
                          // href="apps-ecommerce-add-product"
                          id="TooltipTop"
                          className="btn btn-soft-primary"
                          // onClick={() => setOpen(true)}
                        >
                          <i className="ri-live-fill align-bottom"></i>
                        </div> */}
                      </span>
                    </h5>
                    <p>
                      {" "}
                      <Interweave content={projectDetails?.introduction_text} />
                    </p>
                  </div>

                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Target Audience :</h5>
                    <p>
                      <Interweave content={projectDetails?.target_audience} />
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {params.pathname == "/management/dailytracking" && (
            <Row>
              <Col xs={12}>
                <Card
                  style={{
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  }}
                >
                  <CardBody>
                    <DashedLine2 data={graphData} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PipelineModal;
