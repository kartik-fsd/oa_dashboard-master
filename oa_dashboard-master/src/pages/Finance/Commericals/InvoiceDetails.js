import React from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Table,
  CardHeader,
  Container,
  Badge,
  Input,
  Label,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { Link, useParams } from "react-router-dom";
import { api, farming } from "../../../globalConfig";
import {
  approve_commercial,
  view_commercial,
} from "../../../assets/utils/OnxUrl";
import axios from "axios";
import moment from "moment";
import { Interweave } from "interweave";
import { toast } from "react-toastify";
import { extract_token } from "../../../assets/utils/common";

const InvoiceDetails = ({
  data,
  set_modal_edit,
  update,
  setUpdate,
  logo,
  commData,
}) => {
  const { id } = useParams();
  console.log(data, "datadata");
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [agData, setAgData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [billCost, setBillCost] = React.useState("");
  console.log(data, "faskaone");

  document.title = "Invoice Details | OnX";
  const getAgreementData = () => {
    let apiAgree = api.ONX_URL + view_commercial;
    setIsLoading(true);
    axios
      .get(apiAgree, { params: { project_id: data || id } })
      .then((res) => {
        setAgData(res.data.agreement_details);
        setIsLoading(false);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  const handleApprove = () => {
    setOpen(!open);
  };

  const handleSubmitBillableCost = () => {
    let approveApi = farming.farming_URL + approve_commercial;
    let body = {
      project_id: id,
      billable_cost: billCost,
    };

    console.log(body, 1234);
    axios
      .put(approveApi, body)
      .then((res) => {
        // setUpdate(!update);
        set_modal_edit(false);
        setOpen(false);
        toast(res.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
      })
      .catch((err) => {
        set_modal_edit(false);
        toast(err.response.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-danger text-white",
        });
      });
  };

  const getTokenDetails = () => {
    let tokenapi = api.VENDOR_URL + extract_token;
    setIsLoading(true);
    axios
      .get(tokenapi)
      .then((res) => {
        console.log(res.data.role, "tejasres");
        setIsLoading(false);
        setUserData({ role: res.data.role, type: res.data.type });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getAgreementData();
    getTokenDetails();
  }, []);
  return isLoading ? (
    <>...loading</>
  ) : isError ? (
    <>something went wrong</>
  ) : (
    <div>
      <>
        {/* <BreadCrumb title="Invoice Details" pageTitle="Invoices" /> */}

        <Row>
          <Col xxl={12}>
            <Card id="demo">
              <Row>
                <Col lg={12}>
                  <CardHeader className="border-bottom-dashed p-4">
                    <div className="d-flex" style={{ gap: "100px" }}>
                      <div className="flex-grow-1">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <img
                              src={logo}
                              width="60px"
                              height="60px"
                              className="card-logo card-logo-dark rounded-circle"
                              alt="logo dark"
                            />
                          </div>
                          <div>
                            <div className="fs-16">
                              {agData?.company_name || agData.project_title}
                            </div>
                            <div className="text-muted fs-10">
                              {agData?.industry_type}
                            </div>
                            <div className="text-muted fs-10">
                              {agData?.company_registration_number}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginTop: "30px" }}>
                          <h6 className="d-flex">
                            <div
                              className="text-muted fw-normal"
                              style={{ width: "120px" }}
                            >
                              Agreement Id
                            </div>{" "}
                            <div id="legal-register-no">
                              : {agData?.agreement_id}
                            </div>
                          </h6>

                          <h6 className="d-flex">
                            <div
                              className="text-muted fw-normal"
                              style={{ width: "120px" }}
                            >
                              Type
                            </div>{" "}
                            <div id="legal-register-no">
                              : {agData?.industry_type}
                            </div>
                          </h6>

                          <h6 className="d-flex">
                            <div
                              className="text-muted fw-normal"
                              style={{ width: "120px" }}
                            >
                              Validity
                            </div>{" "}
                            <div id="legal-register-no">
                              : {/* {data?.agreement_start_date} to &nbsp; */}
                              {moment(agData?.agreement_end_date).format(
                                "DD-MMM-YYYY"
                              )}
                            </div>
                          </h6>
                          <h6 className="d-flex">
                            <div
                              className="text-muted fw-normal"
                              style={{ width: "120px" }}
                            >
                              Billable Value
                            </div>{" "}
                            <div id="legal-register-no">
                              : {agData?.billable_cost}
                            </div>
                          </h6>

                          {/* <h6 className="d-flex">
                            <div style={{ display: "flex", gap: "10px" }}>
                              <div>
                                <div
                                  className="text-muted fw-normal"
                                  style={{ width: "120px" }}
                                >
                                  Attachment file
                                </div>
                              </div>

                              <div>
                                <span id="legal-register-no">
                                  {" "}
                                  {agData.agreement_upload ? (
                                    <a
                                      href={agData.agreement_upload}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <i className="cursor-pointer ri-download-line fs-16"></i>{" "}
                                    </a>
                                  ) : (
                                    <i className=" ri-download-line fs-16"></i>
                                  )}
                                </span>
                              </div>
                            </div>
                          </h6> */}
                        </div>
                      </div>

                      <div className="flex-shrink-0 mt-sm-0 mt-3">
                        <h6 className="d-flex align-items-center justify-content-center">
                          <div className="me-2">
                            <span id="legal-register-no">
                              {" "}
                              {agData.agreement_upload ? (
                                <a
                                  href={agData.agreement_upload}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="cursor-pointer ri-download-line fs-16"></i>{" "}
                                </a>
                              ) : (
                                <i className=" ri-download-line fs-16"></i>
                              )}
                            </span>
                          </div>
                          <span id="legal-register-no">
                            <Badge
                              color={
                                data?.agreement_status == "active"
                                  ? "success"
                                  : "warning"
                              }
                              className="w-100 fs-16"
                            >
                              {agData?.agreement_unique_id}
                            </Badge>
                          </span>
                        </h6>
                        {/* 
                        <h6 className="mb-0">
                          <span className="text-muted fw-normal">Date :</span>{" "}
                          <span id="contact-no">
                            {" "}
                            {moment(agData?.agreement_date).format(
                              "DD-MMM-YYYY"
                            )}
                          </span>
                        </h6> */}
                      </div>
                    </div>
                  </CardHeader>
                </Col>

                <Col lg={12}>
                  <CardBody className="p-4">
                    {/* <div className="border-top border-top-dashed mt-2"></div> */}
                    <div className="mt-3">
                      {/* <h6 className="text-muted text-uppercase fw-semibold mb-3">
                        Payment Details:
                      </h6> */}
                    </div>

                    <div>
                      <Interweave content={agData?.agreement_description} />
                    </div>

                    {agData[0]?.costs?.length != 0 ?? 0 ? (
                      <div className="mt-3">
                        <div className="table-responsive">
                          <Table className="align-middle table-wrap mb-0">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  style={{
                                    width: "200px",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  Name
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    width: "400px",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  Description
                                </th>
                                <th scope="col">Billable Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {agData?.costs?.map((item) => (
                                <>
                                  <tr>
                                    <td
                                      style={{
                                        width: "200px",
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      {item.cost_item_name}
                                    </td>
                                    <td
                                      style={{
                                        width: "400px",
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      {item.cost_description}
                                    </td>
                                    <td>₹{item.cost_billable_price}</td>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mt-1">
                      <div className="alert alert-info">
                        <p className="mb-0">
                          {/* <span className="fw-semibold">NOTES:</span> */}
                          <span id="note">
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: "10px",
                              }}
                            >
                              <div>
                                Agreement Created by : {agData?.created_by_name}{" "}
                                - {agData?.created_by_id} on :{" "}
                                {moment(agData?.agreement_date).format(
                                  "DD-MMM-YYYY"
                                )}
                              </div>
                            </div>{" "}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-1">
                      <div className="alert alert-primary">
                        <p className="mb-0">
                          {/* <span className="fw-semibold">NOTES:</span> */}
                          <span id="note">
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: "10px",
                              }}
                            >
                              <div>
                                {" "}
                                Agreement Approved by :{" "}
                                {agData?.approved_by_name} -{" "}
                                {agData?.approved_on}
                                {/* <div>
                                  {" "}
                                  Commercial approved by :{" "}
                                  {agData?.commercial_by_name} -{" "}
                                  {agData?.commercial_by_id}
                                </div>

                                <div>
                                  {" "}
                                  Commercial approved on date :{" "}
                                  {agData?.commercial_by_date}
                                </div> */}
                              </div>
                            </div>{" "}
                          </span>
                        </p>
                      </div>
                    </div>

                    {commData != "pending" ? (
                      <div className="mt-1">
                        <div className="alert alert-success">
                          <p className="mb-0">
                            {/* <span className="fw-semibold">NOTES:</span> */}
                            <span id="note">
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <div>
                                  <div>
                                    Commercial Approved by :{" "}
                                    {agData?.commercial_by_name} -{" "}
                                    {agData?.commercial_by_id}
                                  </div>
                                </div>
                                <div>
                                  {/* <div>
                                  {" "}
                                  Agreement Approved by :{" "}
                                  {agData?.approved_by_name} -{" "}
                                  {agData?.approved_by_id}
                                </div> */}

                                  <div>
                                    &nbsp;on :{" "}
                                    {agData?.commercial_approved_date}
                                  </div>
                                </div>
                              </div>{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {(commData == "pending" &&
                      userData.role == "head" &&
                      userData.type == "fin") ||
                    userData.role == "super_admin" ? (
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Link
                          to="#"
                          onClick={handleApprove}
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
                          Enter Billable Cost
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setBillCost("");
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setBillCost("");
          }}
        >
          Enter Billable Cost
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xl={"8"}>
              <div>
                {/* <label htmlFor="basiInput" className="form-label">
                  Basic Input
                </label> */}
                <input
                  type="number"
                  className="form-control"
                  id="basiInput"
                  onChange={(e) => setBillCost(e.target.value)}
                />
              </div>
            </Col>
            <Col xl={"4"}>
              <button
                type="button"
                className="btn btn-success waves-effect waves-light"
                disabled={billCost == "" ? true : false}
                onClick={handleSubmitBillableCost}
              >
                <i className="ri-printer-line align-bottom me-1"></i>
                Approve
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default InvoiceDetails;
