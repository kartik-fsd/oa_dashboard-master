import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  sp_document_detials,
  sp_document_list,
  document_verify,
} from "../../assets/utils/mepApi";
import { api, farming } from "../../globalConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { successnotify, warningnotify } from "../Toasts";
import AreYouSureModal from "../../components/common/AreYouSureModal";
import DeleteModal from "../../components/common/DeleteModal";
import BreadCrumb from "../../components/common/BreadCrumb";
import {
  getclustercity,
  onboard_vendor,
  send_offer_letter,
} from "../../assets/utils/SupplyApi";
import { toast } from "react-toastify";
import InvoiceDetails from "../Finance/Commericals/InvoiceDetails";

const Onboardingdetails = () => {
  const [spDet, setSpDet] = useState({});
  const [stat, setStat] = useState("verify");
  const [res, setRes] = useState("reset");
  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [clusterCityData, setClusterCityData] = useState([]);
  const [modal_edit, set_modal_edit] = useState(false);
  const { id } = useParams();
  const send_offer_url = send_offer_letter;
  React.useEffect(() => {
    const link = api.VENDOR_URL + sp_document_detials;
    axios
      .get(link, { params: { asm_id: id } })
      .then((res) => {
        console.log(res.data.sp_details.type, "checkingspdeatils");
        setSpDet(res.data.sp_details);
      })
      .catch((err) => console.log(err));
  }, [check]);

  const closeConfirm = () => {
    setOpen(!open);
  };
  const closeConfirm2 = () => {
    setOpen2(!open2);
  };
  const closeConfirm3 = () => {
    setOpen3(!open3);
  };

  const handleVerify = (res) => {
    const link = api.VENDOR_URL + document_verify;
    const body = {
      asm_id: id,
      verify_status: res,
    };

    axios
      .patch(link, body)
      .then((res) => {
        setCheck(!check);
        setOpen(false);
        setOpen2(false);
        successnotify("success");
      })
      .catch((err) => {
        console.log(err);
        warningnotify("oops something went wrong...!");
      });
  };

  const getClusterCity = (id) => {
    let link = farming.farming_URL + getclustercity;
    axios
      .get(link, { params: { cluster_id: id } })
      .then((res) => {
        setClusterCityData(res?.data?.city);
        set_modal_edit(true);
        console.log(res?.data?.city, "resp");
      })
      .catch((err) => console.log(err, "err"));
  };

  const handleSendOffer = () => {
    let type4link = api.VENDOR_URL + onboard_vendor;
    let link = spDet.type == "4" ? type4link : send_offer_url;
    const bodyEnter = {
      asm_id: id,
    };
    axios
      .post(link, bodyEnter)
      .then((res) => {
        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setOpen3(!open3);
        setCheck(!check);
      });
  };

  return (
    <div className="page-content">
      <BreadCrumb title={"Profile Verification"} pageTitle="Project Leads" />
      <Container>
        <Card>
          <CardBody>
            <Row className=" py-2">
              <Col xs="3">
                <div className="d-flex gap-2">
                  <img
                    // src={spDet.profile_image}
                    src={
                      spDet?.profile_image?.substr(0, 4) === "http"
                        ? spDet?.profile_image
                        : "/user-dummy-img.jpg"
                    }
                    alt="profile img"
                    className="rounded avatar-sm"
                  />
                  <div className="d-flex flex-column gap-2">
                    <p className="m-0 fs-14" style={{ fontWeight: "600" }}>
                      {spDet.full_name}
                    </p>
                    <p className="m-0 fs-12 text-muted">{spDet.dob}</p>
                  </div>
                </div>
              </Col>
              <Col xs="1">
                <div
                  className="d-flex flex-column gap-2 justify-content-center align-items-center"
                  onClick={() => {
                    getClusterCity(spDet.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p className="m-0 fs-12 text-muted">Cluster</p>
                  <p
                    className="m-0 fs-14 text-capitalize"
                    style={{ fontWeight: "600" }}
                  >
                    <span
                      // style={{ textDecoration: "underline" }}
                      className="text-secondary"
                    >
                      {" "}
                      {spDet.cluster_name ?? "-"}
                    </span>
                  </p>
                  <p className="m-0 fs-10 text-muted text-capitalize">
                    {spDet.emp_type?.split("_").join(" ")}
                  </p>
                </div>
              </Col>
              <Col xs={"8"}>
                <Row>
                  <Col xs="4">
                    <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                      <p className="m-0 fs-12 text-muted">Email</p>
                      <p
                        className="m-0 fs-14 "
                        style={{ fontWeight: "600", wordBreak: "break-word" }}
                      >
                        {spDet.email_id}
                      </p>
                    </div>
                  </Col>
                  <Col xs="3">
                    <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                      <p className="m-0 fs-12 text-muted">Phone</p>
                      <p
                        className="m-0 fs-14 text-capitalize"
                        style={{ fontWeight: "600" }}
                      >
                        {spDet.mobile_number}
                      </p>
                    </div>
                  </Col>
                  <Col xs="3">
                    <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                      <p className="m-0 fs-12 text-muted">City</p>
                      <p
                        className="m-0 fs-14 text-capitalize"
                        style={{ fontWeight: "600" }}
                      >
                        {spDet.city}
                      </p>
                    </div>
                  </Col>
                  <Col xs="2">
                    <div className="d-flex  justify-content-center align-items-center mt-3">
                      <span
                        className={`badge rounded-pill text-bg-${
                          spDet.status == "verified"
                            ? "success fs-14"
                            : spDet.status == "none"
                            ? "warning fs-14"
                            : spDet.status == "needs_review"
                            ? "info fs-12"
                            : spDet.status == "rejected"
                            ? "danger fs-14"
                            : "primary fs-14"
                        } `}
                        style={{ minWidth: "90px" }}
                      >
                        {spDet.status == "verified"
                          ? "Verified"
                          : spDet.status == "none"
                          ? "New"
                          : spDet.status == "needs_review"
                          ? "Needs Review"
                          : spDet.status == "rejected"
                          ? "Rejected"
                          : "Duplicate"}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mt-2">
          <CardBody>
            <CardBody>
              <Row>
                <h5 className="mb-3">ID-Card Verification Front Side</h5>
                <Col xs={"5"}>
                  <div className="d-flex flex-column gap-2">
                    <p className="fs-12">ID FRONT SUBMITTED</p>
                    <Zoom>
                      <img
                        //   src={spDet.aadhar_front_image}
                        src={
                          spDet?.aadhar_front_image?.substr(0, 4) === "http"
                            ? spDet?.aadhar_front_image
                            : "/Rectangle 23412.png"
                        }
                        alt="aadhar_front"
                        width={300}
                        height={200}
                      />
                    </Zoom>
                    <p className="fs-12">
                      {/* Created At: <span>testing</span> */}
                    </p>
                  </div>
                </Col>
                <Col xs={"7"}>
                  <div className="mt-4"></div>
                  <div
                    style={{
                      marginTop: "40px",
                      border: "1px solid #ebebeb",
                      borderRadius: "6px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      gap: "16px",
                      padding: "12px",
                      height: "200px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <Col xs={2}>
                        <p
                          className="m-0 text-muted"
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          Aadhar <span>:</span>
                        </p>
                      </Col>
                      <Col xs={10} className="px-3">
                        <p className="m-0 fs-16"> {spDet.aadhar_number}</p>
                      </Col>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Col xs={2}>
                        <p
                          className="m-0 text-capitalize text-muted"
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          Name<span>:</span>
                        </p>
                      </Col>
                      <Col xs={10} className="px-3">
                        <p className="m-0 text-capitalize fs-16">
                          {spDet.full_name}
                        </p>
                      </Col>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Col xs={2}>
                        <p
                          className="m-0 text-muted"
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          DOB<span>:</span>
                        </p>
                      </Col>
                      <Col xs={10} className="px-3">
                        <p className="m-0 fs-16">{spDet.dob}</p>
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <h5 className="mb-3">ID-Card Verification Back Side</h5>

                <Col xs={"5"}>
                  <div className="d-flex flex-column gap-2">
                    <p className="fs-12">ID BACK SUBMITTED</p>
                    <Zoom>
                      <img
                        //   src={spDet.aadhar_back_image}
                        src={
                          spDet?.aadhar_back_image?.substr(0, 4) === "http"
                            ? spDet?.aadhar_back_image
                            : "/Rectangle 23413.png"
                        }
                        alt="aadhar_back"
                        width={300}
                        height={200}
                      />
                    </Zoom>
                    <p className="fs-12">
                      {/* Created At: <span>testing</span> */}
                    </p>
                  </div>
                </Col>
                <Col xs={"7"}>
                  <div className="mt-4"></div>
                  <div
                    style={{
                      border: "1px solid #ebebeb",
                      borderRadius: "6px",
                      marginTop: "40px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      gap: "16px",
                      padding: "12px",
                      height: "200px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <Col xs={2}>
                        <p
                          className="m-0 text-capitalize  text-muted"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          Address<span>:</span>
                        </p>
                      </Col>
                      <Col xs={10} className="px-3">
                        <p className="m-0 text-capitalize fs-16">
                          {spDet.aadhar_address}
                        </p>
                      </Col>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Col xs={2}>
                        <p
                          className="m-0 text-capitalize text-muted"
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          City<span>:</span>
                        </p>
                      </Col>
                      <Col xs={10} className="px-3">
                        <p className="m-0 text-capitalize fs-16">
                          {spDet.aadhar_city}
                        </p>
                      </Col>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Col xs={2}>
                        <p
                          className="m-0 text-capitalize text-muted"
                          style={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          State<span>:</span>
                        </p>
                      </Col>
                      <Col xs={10} className="px-3">
                        <p className="m-0 text-capitalize fs-16">
                          {spDet.aadhar_state}
                        </p>
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <h5 className="mb-3">Selfie Match With ID</h5>

                <Col xs={"5"}>
                  <div className="d-flex flex-column gap-2">
                    <p className="fs-12">SELFIE SUBMITTED</p>
                    <Zoom>
                      <img
                        // src="https://taskmotech1b.s3.amazonaws.com/kkkj.jpeg1679580551008_kkkj.jpeg"
                        src={
                          spDet?.profile_image?.substr(0, 4) === "http"
                            ? spDet?.profile_image
                            : "/user-dummy-img.jpg"
                        }
                        alt="aadhar_front"
                        width={300}
                        height={200}
                      />
                    </Zoom>
                    <p className="fs-12">
                      {/* Created At: <span>testing</span> */}
                    </p>
                  </div>
                </Col>
                <Col xs={"7"}>
                  <div className="d-flex flex-column gap-2">
                    <p className="fs-12">ID SUBMITTED</p>
                    <Zoom>
                      <img
                        // src="https://taskmotech1b.s3.amazonaws.com/kkkj.jpeg1679580551008_kkkj.jpeg"
                        src={
                          spDet?.aadhar_front_image?.substr(0, 4) === "http"
                            ? spDet?.aadhar_front_image
                            : "/Rectangle 23412.png"
                        }
                        alt="aadhar_front"
                        width={300}
                        height={200}
                      />
                    </Zoom>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col className="d-flex justify-content-between align-items-center">
                  <div
                    className="m-0 fs-14 text-danger"
                    style={{
                      visibility:
                        spDet.status == "duplicate" ? "visible" : "hidden",
                    }}
                  >
                    Note :
                    <span className="text-warning">
                      &nbsp;Already aadhar is assigned with another number
                      Please Check!
                    </span>
                  </div>

                  <div>
                    {spDet.status != "verified" ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger waves-effect waves-light me-4 px-4 "
                          onClick={() => {
                            // handleVerify("reset");
                            setOpen2(!open2);
                          }}
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          className="btn btn-success waves-effect waves-light px-4"
                          style={{
                            display: spDet.status == "duplicate" && "none",
                          }}
                          onClick={() => {
                            // handleVerify("verify");
                            setOpen(!open);
                          }}
                        >
                          Verify
                        </button>
                      </div>
                    ) : spDet.is_release == "yes" ||
                      spDet.onboard_status == "onboarded" ? (
                      <div>
                        <p className="text-danger text-end">
                          Offer letter has been already sent!
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          className="btn waves-effect waves-light text-light"
                          style={{ backgroundColor: "#ec5c24" }}
                          onClick={() => setOpen3(!open3)}
                          // disabled
                        >
                          Send Offer Letter
                        </button>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </CardBody>
        </Card>
      </Container>
      {open && (
        <AreYouSureModal
          onCloseClick={closeConfirm}
          show={open}
          onSubmitClick={handleVerify}
          value={"verify"}
          statement={`SP-ID : ${id} profile will be verified!`}
        />
      )}
      {open2 && (
        <DeleteModal
          onCloseClick={closeConfirm2}
          show={open2}
          statement={`SP-ID : ${id} data will be reset!`}
          onSubmitClick={handleVerify}
          value={"reset"}
        />
      )}

      {open3 && (
        <AreYouSureModal
          onCloseClick={closeConfirm3}
          show={open3}
          onSubmitClick={handleSendOffer}
          value={"verify"}
          statement={`You want to send offer letter to this profile!`}
        />
      )}

      {modal_edit && (
        <Modal
          id="signupModals"
          tabIndex="-1"
          isOpen={modal_edit}
          toggle={() => set_modal_edit(false)}
          centered={true}
          size="md"
        >
          <ModalHeader
            className="p-3"
            toggle={() => {
              set_modal_edit(false);
            }}
          >
            Cluster Name
          </ModalHeader>
          <ModalBody>
            <table className="table table-bordered border-light table-nowrap">
              <thead>
                <tr>
                  <th style={{ marginLeft: "10px" }} scope="col">
                    City
                  </th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {clusterCityData.map((item) => (
                  <tr key={item.value}>
                    <td style={{ marginLeft: "10px" }}>{item.label}</td>
                    <td>{item.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default Onboardingdetails;
