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
  ModalBody,
  Button,
} from "reactstrap";

import Flatpickr from "react-flatpickr";

import { Link, useParams } from "react-router-dom";
import { api, farming } from "../../globalConfig";
import { approve_commercial, view_commercial } from "../../assets/utils/OnxUrl";
import axios from "axios";
import moment from "moment";
import { Interweave } from "interweave";
import { toast } from "react-toastify";
import { extract_token } from "../../assets/utils/common";
import { approve_agreement } from "../../assets/utils/Business";

const InvoiceBusiness = ({
  data,
  set_modal_edit,
  update,
  setUpdate,
  logo,
  commData,
}) => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [agData, setAgData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [calendar, setCalender] = React.useState(false);
  const [calModalOpen, setCalModalOpen] = React.useState(false);
  const [dateModal, setDateModal] = React.useState(null);

  document.title = "Invoice Details | OnX";

  const handleApprove = () => {
    let approveApi = api.ONX_URL + approve_agreement;

    axios
      .put(approveApi, { agreement_id: data.agreement_id, end_time: dateModal })
      .then((res) => {
        setUpdate(!update);
        setCalModalOpen(false);
        set_modal_edit(false);
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
        setIsLoading(false);
        setUserData({ role: res.data.role, type: res.data.type });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getTokenDetails();
  }, []);
  return (
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
                              src={data.brand_logo}
                              width="60px"
                              height="60px"
                              className="card-logo card-logo-dark rounded-circle"
                              alt="logo dark"
                            />
                          </div>
                          <div>
                            <div className="fs-16">{data?.company_name}</div>
                            <div className="text-muted fs-10">
                              {data?.industry_type}
                            </div>
                            <div className="text-muted fs-10">
                              {data?.company_registration_number}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginTop: "30px" }}>
                          <h6 className="d-flex">
                            <div
                              className="text-muted fw-normal"
                              style={{ width: "120px" }}
                            >
                              Agreement Title
                            </div>{" "}
                            <div id="legal-register-no">
                              : {data?.agreement_title}
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
                              : {data.agreement_type}
                            </div>
                          </h6>

                          {data.agreement_status == "active" && (
                            <h6 className="d-flex">
                              <div
                                className="text-muted fw-normal"
                                style={{ width: "120px" }}
                              >
                                Validity
                              </div>{" "}
                              <div id="legal-register-no">
                                : {/* {data?.agreement_start_date} to &nbsp; */}
                                {data?.agreement_end_date}
                              </div>
                            </h6>
                          )}

                          {/* <h6 className="d-flex">
                            <div
                              className="text-muted fw-normal"
                              style={{ width: "120px" }}
                            >
                              GST
                            </div>{" "}
                            <div id="legal-register-no">
                              : {data?.agreement_gst}
                            </div>
                          </h6> */}

                          <h6 className="d-flex">
                            <div style={{ display: "flex", gap: "10px" }}>
                              {/* <div>
                                <div
                                  className="text-muted fw-normal"
                                  style={{ width: "120px" }}
                                >
                                  Attachment file
                                </div>
                              </div> */}

                              {/* <div>
                                <span id="legal-register-no">
                                  {" "}
                                  {data.agreement_upload ? (
                                    <a
                                      href={data.agreement_upload}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <i className="cursor-pointer ri-download-line fs-16"></i>{" "}
                                    </a>
                                  ) : (
                                    <i className=" ri-download-line fs-16"></i>
                                  )}
                                </span>
                              </div> */}
                            </div>
                          </h6>
                        </div>
                      </div>

                      <div className="flex-shrink-0 mt-sm-0 mt-3">
                        <h6 className="d-flex align-items-center gap-3">
                          <div>
                            <div>
                              <span id="legal-register-no">
                                {data.agreement_upload ? (
                                  <a
                                    href={data.agreement_upload}
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
                          <span id="legal-register-no">
                            <Badge
                              color={
                                data?.agreement_status == "active"
                                  ? "success"
                                  : "warning"
                              }
                              className="w-100 fs-16"
                            >
                              {data?.agreement_unique_id}
                            </Badge>
                          </span>
                        </h6>

                        <div className="mb-0">
                          {/* <span className="text-muted fw-normal">Date :</span>{" "}
                          <span id="contact-no">
                            {" "}
                            {data?.agreement_start_date}
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Col>

                <Col lg={12}>
                  <CardBody>
                    {/* <div className="border-top border-top-dashed mt-2"></div> */}
                    <div>
                      {/* <h6 className="text-muted text-uppercase fw-semibold mb-3">
                        Payment Details:
                      </h6> */}
                    </div>

                    <div className="fs-12">
                      <h6>Agreement Description : </h6>
                      <Interweave content={data?.agreement_description} />
                    </div>

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
                                Agreement Created by : {data?.created_by_name} -{" "}
                                {data?.created_by_id} on{" "}
                                {data?.agreement_start_date}
                              </div>
                            </div>{" "}
                          </span>
                        </p>
                      </div>
                    </div>

                    {data.agreement_status == "active" ? (
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
                                  {data?.approved_by ?? "No Name"} -{" "}
                                  {data?.approved_on ?? "NaN"}
                                </div>
                              </div>
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {data.agreement_status == "pending" && calendar == true ? (
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Link
                          to="#"
                          onClick={handleApprove}
                          className="btn btn-success"
                        >
                          <i className="ri-check-line align-bottom me-1"></i>{" "}
                          Approve
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}

                    {data.agreement_status == "pending" && calendar == false ? (
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <Link
                          to="#"
                          // onClick={handleApprove}
                          onClick={() => setCalModalOpen(true)}
                          className="btn btn-success"
                        >
                          <i className="ri-check-line align-bottom me-1"></i>{" "}
                          Select Validity
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

        {/* calendar modal */}
        {calModalOpen && (
          <Modal
            id="signupModals"
            tabIndex="-1"
            isOpen={calModalOpen}
            toggle={() => {
              setCalModalOpen(false);
            }}
            centered={true}
            size="xs"
          >
            <ModalBody>
              <Row className="align-items-center g-3">
                <Col lg={12}>
                  <div className="mt-3">
                    <Label className="form-label mb-3">
                      Please select the Validity Date
                    </Label>
                    <Flatpickr
                      className="form-control "
                      defaultValue={dateModal}
                      onChange={(e) => {
                        setDateModal(e[0]);
                      }}
                      options={{
                        inline: true,
                        dateFormat: "Y-m-d",
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <span
                      to="#"
                      onClick={handleApprove}
                      className="btn btn-success"
                    >
                      <i className="ri-check-line align-bottom me-1"></i>{" "}
                      Approve
                    </span>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        )}
      </>
    </div>
  );
};

export default InvoiceBusiness;
