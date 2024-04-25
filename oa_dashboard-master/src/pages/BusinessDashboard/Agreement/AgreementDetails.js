import React, { useContext, useState } from "react";
import { CardBody, CardHeader, Col, Row } from "reactstrap";
import { Card, Container } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import EditModal from "./EditModal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { agreement_details } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import axios from "axios";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { dataAravindApproval } from "../../../assets/utils/TaskmoUrl";
import { Context } from "../../../App";
import { successnotify } from "../../Toasts";

function AddAgreementDetails() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const [context, setContext] = useContext(Context);

  console.log(id, "ddd");
  let loc = location.pathname.split("/");
  loc?.shift();
  loc?.pop();
  loc = loc.join("");

  const [AgreeData, setData] = useState([]);
  const [check, setCheck] = useState(false);
  React.useEffect(() => {
    const link = api.TASKMO_URL + agreement_details;
    axios
      .get(link, { params: { agreement_id: id } })
      .then((res) => {
        setData(res.data.agreement_details);
      })
      .catch((err) => console.group(err));
  }, [check]);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleAgreementConfirm = () => {
    let itemtests = [
      {
        lead_id: 0,
        agreement_id: Number(id),
        request_to_id: "94",
        request_by_id: context.oaDetials.portal_user_id,
        lead_acknowledgement_type: "agreement_action",
        notification_type: "notify",
      },
    ];
    axios
      .post(dataAravindApproval, itemtests)
      .then((res) => {
        successnotify("Approval Sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="page-content" fluid>
      <BreadCrumb title={"Agreement List"} pageTitle="Sow" />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <Row className="align-items-center g-3">
                <div className="col-md-auto">
                  <div className="avatar-md">
                    <div className="avatar-title bg-white rounded-circle">
                      {
                        <img
                          src={AgreeData.brand_logo}
                          alt=""
                          className="avatar-md"
                          style={{ borderRadius: "50%" }}
                        />
                      }
                    </div>
                  </div>
                </div>
                <div
                  className="col-md d-flex align-items-center"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <div className="d-flex gap-4 align-items-center ">
                      <div>
                        <h4
                          className="fw-bold text-primary mb-2"
                          style={{ fontSize: "15px" }}
                        >
                          {AgreeData.company_name}
                        </h4>
                        {/* <span className="badge text-bg-primary">
                              {AgreeData.com_status}
                            </span> */}
                        <span className="text-muted">
                          {AgreeData.brand_name}
                        </span>
                      </div>
                      <span
                        className="badge bg-info "
                        style={{
                          padding: 4,
                          fontSize: 12,
                          marginBottom: 23,
                          width: 80,
                        }}
                      >
                        {AgreeData.agreement_unique_id}
                      </span>
                      <span
                        className={`badge  ${
                          AgreeData?.agreement_status === "active"
                            ? "bg-success"
                            : AgreeData?.agreement_status === "rejected"
                            ? "bg-danger"
                            : AgreeData?.agreement_status === "pending"
                            ? "btn-warning"
                            : ""
                        }`}
                        style={{
                          padding: 4,
                          fontSize: 12,
                          marginBottom: 23,
                          width: 80,
                        }}
                      >
                        {AgreeData?.agreement_status?.charAt(0).toUpperCase() +
                          AgreeData?.agreement_status?.slice(1)}
                      </span>
                    </div>
                  </div>
                  <span
                    className="d-flex align-items-center cursor-pointer mb-5"
                    onClick={toggleModal}
                  >
                    <i className=" ri-edit-box-line fs-20 mx-2" />
                  </span>
                </div>
                <div>
                  <hr
                    className="dashed-line"
                    style={{ border: "1px dashed grey" }}
                  />
                </div>
                <Col xs="12">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                      Agreement Details
                    </h6>
                  </div>

                  <div className="d-flex">
                    <div className="d-flex flex gap-2 " style={{ flex: "1 0" }}>
                      <div className="fs-11 d-flex gap-3">
                        <p className="m-0" style={{ width: "100px" }}>
                          Agreement Title
                        </p>
                        <p className="m-0" style={{ fontWeight: "500" }}>
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {AgreeData?.agreement_title}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex gap-2 " style={{ flex: "1 0" }}>
                      <div className="fs-11 d-flex gap-3">
                        <p className="m-0" style={{ width: "100px" }}>
                          Agreement Type:
                        </p>
                        <p className="m-0" style={{ fontWeight: "500" }}>
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {AgreeData?.agreement_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mb-4">
                    <hr
                      className="dashed-line"
                      style={{ border: "1px dashed grey" }}
                    />
                  </div>
                </Col>
                <Col xs="12">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                      Agreement Description
                    </h6>
                  </div>

                  <div
                    className="text-muted"
                    dangerouslySetInnerHTML={{
                      __html: AgreeData?.agreement_description,
                    }}
                  />
                  <div className="mt-4 mb-4">
                    <hr
                      className="dashed-line"
                      style={{ border: "1px dashed grey" }}
                    />
                  </div>
                </Col>
                {/* <div
                  style={{
                    display: "flex",
                    padding: 10,
                    border: "1px solid #D5D5D5",
                    borderRadius: 5,
                    marginTop: 15,
                    marginLeft: 10,
                    width: "max-content",
                  }}
                >
                  <h5>Document</h5>
                  <span id="legal-register-no" style={{ marginLeft: 10 }}>
                    {AgreeData.agreement_upload ? (
                      <a
                        href={AgreeData.agreement_upload}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <i className="cursor-pointer ri-download-line fs-17"></i>{" "}
                      </a>
                    ) : (
                      <i className=" ri-download-line fs-10"></i>
                    )}
                  </span>
                </div> */}
              </Row>
              <div className="d-flex justify-content-between">
                {!AgreeData.agreement_upload ? (
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light cursor-pointer h-75"
                    disabled
                  >
                    <span>Document</span>
                    <i className="ri-download-line align-middle ms-1 fs-14"></i>
                  </button>
                ) : (
                  <a
                    href={AgreeData.agreement_upload}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light cursor-pointer"
                    >
                      <span>Document</span>
                      <i className="ri-download-line align-middle ms-1 fs-14"></i>
                    </button>
                  </a>
                )}
                {AgreeData?.agreement_approval_status != "Sent" && (
                  <Row>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary"
                        style={{ marginBottom: "20px" }}
                        onClick={handleAgreementConfirm}
                      >
                        Send Agreement
                      </button>
                    </div>
                  </Row>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <EditModal
        isOpen={modal}
        toggle={toggleModal}
        title={AgreeData?.agreement_title}
        type={AgreeData.agreement_type}
        description={AgreeData?.agreement_description}
        id={id}
        setCheck={setCheck}
        check={check}
      />
    </Container>
  );
}

export default AddAgreementDetails;
