import React, { useEffect } from "react";

import FeatherIcon from "feather-icons-react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Interweave } from "interweave";
import { useParams } from "react-router-dom";
import { UncontrolledCarousel } from "reactstrap";
import axios from "axios";
import { single_sow } from "../../assets/utils/sow";
import { api } from "../../globalConfig";
import AddImage from "./AddImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { update_media_sow } from "../../assets/utils/dashboard";

const CustomerProcess = (props) => {
  const { singleSowData, setSingleSowData } = props;
  const { id } = useParams();
  const sowId = id;
  const [customerMedia, setCustomerMedia] = React.useState();
  const [single, setSingle] = React.useState({});
  // const [data, setData] = React.useState({sampleData});
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [mediaId, setMediaid] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [uploadLoader, setUploadLoader] = React.useState(false);

  const singleSowUrl = api.VENDOR_URL + single_sow;
  const updateMediaSowUrl = api.VENDOR_URL + update_media_sow;

  useEffect(() => {
    const data = {
      sow_id: sowId,
    };
    if (sowId > 0) {
      setUploadLoader(true);
      axios
        .get(singleSowUrl + `?sow_id=${sowId}`)
        .then((res) => {
          const dataSample = res.data.data;
          setSingle(dataSample);
          let dataPush = [];
          if (dataSample?.customer?.length > 0) {
            for (let i = 0; i < dataSample?.customer?.length; i++) {
              dataPush.push({
                header: " ",
                altText: `${dataSample.customer[i].title}`,
                caption: `${dataSample.customer[i].description}`,
                key: `${i}+1`,
                src: dataSample.customer[i].media_image,
                media_id: dataSample.customer[i].media_id,
              });
            }
            setCustomerMedia(dataPush);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setUploadLoader(false));
    }
  }, []);

  const handleClickOpen = (a) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSowDetails = (e) => {
    setShow(true);
  };

  const handleYes = (id) => {
    const patchData = {
      media_id: mediaId,
      status: "inactive",
    };
    setUploadLoader(true);
    axios
      .patch(updateMediaSowUrl, patchData)
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
            autoClose: "1000",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setOpen(false);
          setUploadLoader(false);

          props.setChange(!props.change);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setUploadLoader(false));
  };

  return uploadLoader ? (
    <>
      <div
        className="spinner-border "
        style={{ color: "#b83016" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  ) : (
    <div>
      {/* <h1>sample</h1> */}
      {/* <ToastContainer /> */}
      <Row>
        <Col sx={12} md={12}></Col>
      </Row>

      <label htmlFor="ControlInputAdd" className="label_edit_sow">
        Share Media Images
      </label>
      <Row className="scroll_row">
        {props?.data?.data?.media?.length < 1 ? (
          <Col sx={12} md={4}>
            <div className="mb-4">
              <div className="total_delete1">
                <div
                  className="upload_css1"
                  onClick={(e) => {
                    handleSowDetails();
                  }}
                  id="resumeSel1"
                >
                  <FeatherIcon
                    icon="file-plus"
                    style={{ color: "#6C58FB" }}
                    size={40}
                  />
                  <span>Add Image/Video</span>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="fs-12 text-danger mt-3">
                  Note: Please upload image having 1080 X 1080
                </p>
              </div>
            </div>
          </Col>
        ) : (
          <></>
        )}

        {props.data?.data?.media
          ?.map((res, index) => {
            return (
              <Card className="p-3" key={index}>
                <Row>
                  <Col sx={12} md={5}>
                    <div
                      className="delete_icon1 d-flex justify-content-center align-items-center"
                      style={{ zIndex: "100" }}
                      onClick={() => {
                        handleClickOpen();
                        setMediaid(res.media_id);
                      }}
                    >
                      <FeatherIcon
                        icon="trash"
                        style={{ color: "white" }}
                        size={15}
                      />
                    </div>
                    {res.link_type == "image" ? (
                      <img
                        src={res.media_image}
                        alt=""
                        height={400}
                        width={"98%"}
                        className="imgs_css"
                      />
                    ) : (
                      <video
                        src={res.media_image}
                        alt=""
                        height={400}
                        width={"98%"}
                        className="imgs_css"
                        controls
                      />
                    )}
                    {/* <div className="d-flex justify-content-center align-items-center">
                      <p className="fs-12 text-danger">
                        Note: Please upload image having 1500 X 900
                      </p>
                    </div> */}
                  </Col>
                  <Col md={7}>
                    <CardBody className="d-flex flex-column align-items-start">
                      <h4 className="card-title mb-2">{res.title}</h4>
                      <div style={{ textAlign: "left" }}>
                        <Interweave content={res.description} />
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            );
          })
          .reverse()}
      </Row>
      <Row className="scroll_row">
        <Col sx={12} md={4} className="p-2 mx-2">
          {customerMedia?.length > 0 ? (
            <>
              <UncontrolledCarousel
                dark={true}
                interval={false}
                items={customerMedia}
                style={{
                  height: "580px",
                  width: "360px",
                  border: "1px solid black",
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Col>
        {/* <Col sx={12} md={8} style={{ height: "580px" }}>
          <div
            className="total_delete1 m-2 d-flex flex-column"
            style={{
              height: "580px",
              contain: "content",
              overflow: "scroll",
            }}
          >
            <Row className="d-flex flex-column mt-4 mx-4">
              <label className="p-0">Customer Download Link</label>

              <input
                type="text"
                defaultValue={props.data.data?.utm_link}
                onChange={(e) => {
                  // let dataProps = props.data?.data?.utm_link;
                  // dataProps = e.target.value;
                  // props.setData({ ...dataProps });

                  singleSowData.utm_link = e.target.value;
                  setSingleSowData({ ...singleSowData });
                }}
                style={{ height: "30px", width: "75%" }}
              />
            </Row>
            <div>
              <div className="d-flex justify-content-between mt-4 mx-4">
                <label>Customer Process</label>
                <i
                  className="ri ri-add-circle-line text-danger fs-20 cursor-pointer"
                  onClick={() => {
                    setShow1(true);
                  }}
                ></i>
              </div>
              <div>
                {customerMedia?.map((cus, index) => (
                  <div key={index}>
                    <Card body style={{ textAlign: "left", marginTop: "20px" }}>
                      <div className="total_delete">
                        <div
                          className="delete_icon"
                          onClick={() => {
                            handleClickOpen();
                            setMediaid(cus.media_id);
                          }}
                          style={{ top: "0" }}
                        >
                          <FeatherIcon
                            icon="trash"
                            style={{ color: "white" }}
                            size={15}
                          />
                        </div>
                      </div>
                      <div>
                        Step {index + 1} : {cus.caption}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col> */}
      </Row>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={show}
        toggle={() => {
          setShow(false);
        }}
        centered={true}
        size="xs"
      >
        <ModalBody>
          <AddImage
            dataType={"add_share_media"}
            setChange={props.setChange}
            change={props.change}
          />
        </ModalBody>
      </Modal>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={show1}
        toggle={() => {
          setShow1(false);
        }}
        centered={true}
        size="xs"
      >
        <ModalBody>
          <AddImage
            dataType={"add_customer_media"}
            setChange={props.setChange}
            change={props.change}
          />
        </ModalBody>
      </Modal>
      <Modal isOpen={open} toggle={handleClose} centered={true}>
        <ModalBody className="py-3 px-5">
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#ec5c24,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you sure you want to delete this record ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              data-bs-dismiss="modal"
              // onClick={onCloseClick}
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
              // onClick={onDeleteClick}
              onClick={() => {
                handleYes();
                handleClose();
              }}
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CustomerProcess;
