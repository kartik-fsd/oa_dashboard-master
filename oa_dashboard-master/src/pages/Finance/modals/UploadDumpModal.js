import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import {
  payout_report,
  upload_lead_report,
  upload_payout_report,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import { successnotify } from "../../Toasts";

const UploadDumpModal = ({ open, setOpen, d }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const payout_reportnew = farming.farming_URL + payout_report;
  const token = sessionStorage.getItem("token");

  const imageUpload1 = (e, id) => {
    const link = farming.farming_URL + upload_payout_report;
    setLoading(true);
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axiosData.append("req_id", id);
    axios
      .post(link, axiosData)
      .then((res) => {
        setData(res.data.rep);
        // setShow1(true);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const imageUpload = (e, id, type) => {
    const link = farming.farming_URL + upload_lead_report;

    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axiosData.append("id", id);
    axiosData.append("type", type);

    axios
      .post(link, axiosData)
      .then((res) => {
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: `success`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // window.location.reload();
        successnotify("success");
        window.location.reload();
      })

      .catch((e) => {
        console.log(e);
      });
  };

  console.log(d, "data123");

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
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
          <h5 style={{ color: "#3f5289 " }}>Dump Update</h5>
        </ModalHeader>
        <ModalBody>
          <Row className="mt-2">
            <Col sx={4} md={4}>
              <div className="d-flex flex-column align-items-center">
                <h4 className="mb-4 leadgenerator1">Lead Report</h4>
                {d.lead_report !== "" ? (
                  <div className="d-flex ">
                    <a href={d.lead_report}>
                      {/* <button className="btn-css-download">
                    <FeatherIcon icon="download-cloud" size={24} />
                  </button> */}
                      <i className=" ri-download-cloud-2-fill fs-24 text-success"></i>
                    </a>
                  </div>
                ) : (
                  <div className="d-flex">
                    {/* <FeatherIcon icon="upload-cloud" size={24} /> */}
                    <input
                      type="file"
                      ref={img1}
                      onChange={(e) => {
                        imageUpload(e, d.req_id, "lead_report");
                      }}
                      style={{ display: "none" }}
                    />
                    <i
                      className=" ri-upload-cloud-2-fill fs-24 text-danger"
                      onClick={() => img1.current.click()}
                    ></i>
                  </div>
                )}
              </div>
            </Col>
            <Col sx={4} md={4}>
              <div className="d-flex flex-column align-items-center">
                <h4 className="mb-4 leadgenerator1">Manual Report</h4>
                {d.manual_report !== "" ? (
                  <div className="d-flex ">
                    <a href={d.manual_report}>
                      {/* <button className="btn-css-download">
                          <FeatherIcon icon="download-cloud" size={24} />
                        </button> */}
                      <i className=" ri-download-cloud-2-fill fs-24 text-success"></i>
                    </a>
                  </div>
                ) : (
                  <>
                    {d.type == "other_expenses" ? (
                      <div className="d-flex ">
                        {/* <FeatherIcon icon="upload-cloud" size={24} /> */}
                        <input
                          type="file"
                          ref={img2}
                          onChange={(e) => {
                            imageUpload(e, d.req_id, "manual_report");
                          }}
                        />
                        <i
                          className=" ri-upload-cloud-2-fill fs-24 text-danger"
                          onClick={() => img2.current.click()}
                        ></i>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </Col>
            <Col sx={4} md={4}>
              <div className="d-flex flex-column align-items-center">
                <h4 className="mb-4 leadgenerator1">Payout Data</h4>
                {d.count > 0 ? (
                  <div className="d-flex ">
                    <a
                      href={`${payout_reportnew}?token=${token}&req_id=${d.req_id}`}
                    >
                      {/* <button className="btn-css-download">
                          <FeatherIcon icon="download-cloud" size={24} />
                        </button> */}
                      <i className=" ri-download-cloud-2-fill fs-24 text-success"></i>
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="d-flex ">
                      <label className="">
                        {loading ? (
                          // <CircularProgress
                          //   size={24}
                          //   className="text-light"
                          // />
                          <Spinner style={{ backgroundColor: "#ec5c24" }}>
                            {" "}
                            Loading...{" "}
                          </Spinner>
                        ) : (
                          // <FeatherIcon icon="upload-cloud" size={24} />
                          <i
                            className=" ri-upload-cloud-2-fill fs-24 text-danger"
                            onClick={() => img3.current.click()}
                          ></i>
                        )}
                        <input
                          type="file"
                          ref={img3}
                          onChange={(e) => {
                            imageUpload1(e, d.req_id);
                          }}
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UploadDumpModal;
