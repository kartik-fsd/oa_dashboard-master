import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import FeatherIcon from "feather-icons-react";
import "./TaskerInfo.css";
import {
  sow_media_upload,
  update_media_sow,
} from "../../assets/utils/dashboard";
import { api } from "../../globalConfig";
import { Context } from "../../App";

const fileUpload = (e) => {
  const fileSelect = document.getElementById("resumeSel"),
    fileElem = document.getElementById("resumeEle");
  fileSelect.addEventListener(
    "click",
    function (e) {
      if (fileElem) {
        fileElem.click();
      }
    },
    false
  );
};
const fileUpload1 = (e) => {
  const fileSelect = document.getElementById("resumeSel1"),
    fileElem = document.getElementById("resumeEle1");
  fileSelect.addEventListener(
    "click",
    function (e) {
      if (fileElem) {
        fileElem.click();
      }
    },
    false
  );
};

const TaskerInfo = (props) => {
  const [context, setContext] = useContext(Context);

  const { singleSowData, setSingleSowData, change, setChange } = props;
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [mediaId, setMediaid] = React.useState("");
  const [startDateDisp, setStartDateDisp] = React.useState("");

  //urls
  const sowMediaUploadURL = api.AWS_URL + sow_media_upload;
  const updateMediaSowUrl = api.VENDOR_URL + update_media_sow;

  const imageUpload = (e, type) => {
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axiosData.append("sow_id", id);
    axiosData.append("type", type);
    axiosData.append("description", "header_img");
    axiosData.append("link_type", "image");
    axiosData.append("title", "header_img");
    const files = e.target.files;
    let output = "";

    for (const file of files) {
      output += `${file.type || "unknown"}\n`;
    }

    axios
      .post(sowMediaUploadURL, axiosData)
      .then((res) => {
        const datapush = { media_image: res.data.results.url };
        if (type == "header") {
          props.data.data.header.push({ ...datapush });
        } else if (type == "share_media") {
          props.data.data.media.push({ ...datapush });
        } else if (type == "customer_media") {
          props.data.data.customer.push({ ...datapush });
        }
        props.setChange(!props.change);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClickOpen = (a) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(context.oaDetials.email_id, "oaDetials");

  const handleYes = (id) => {
    const patchData = {
      media_id: mediaId,
      status: "inactive",
    };
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
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setOpen(false);
          props.setChange(!props.change);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="mb-3">
        <Row className="scroll_row d-flex flex-column align-items-center justify-content-center m-2">
          {props.data.data?.header?.length < 1 ? (
            <Col sx={12} md={6}>
              <div className="mb-4">
                <input
                  type="file"
                  id="resumeEle"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    imageUpload(e, "header");
                  }}
                />
                <div
                  className="upload_css"
                  id="resumeSel"
                  onClick={() => {
                    fileUpload();
                  }}
                >
                  <FeatherIcon
                    icon="upload-cloud"
                    style={{ color: "#6C58FB" }}
                    size={40}
                  />
                  <span>Upload Header Image</span>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="fs-12 text-danger">
                  Note: Please upload image having 1024 X 512
                </p>
              </div>
            </Col>
          ) : (
            <></>
          )}
          {props.data.data?.header
            ?.map((res, index) => {
              return (
                <Col
                  sx={12}
                  md={8}
                  key={index}
                  className="d-flex justify-content-center"
                >
                  <div className="mb-4">
                    <div className="total_delete">
                      <div
                        className="delete_icon"
                        onClick={() => {
                          handleClickOpen();
                          setMediaid(res.media_id);
                        }}
                        style={{ right: "0", marginRight: "12px" }}
                      >
                        <FeatherIcon
                          icon="trash"
                          style={{ color: "white" }}
                          size={15}
                        />
                      </div>
                      <img
                        src={res.media_image}
                        alt=""
                        height={377}
                        width={720}
                        className="imgs_css"
                      />
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-center align-items-center">
                    <p className="fs-12 text-danger">
                      Note: Please upload image having 1500 X 900
                    </p>
                  </div> */}
                </Col>
              );
            })
            .reverse()}
        </Row>
      </div>
      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Project Title</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={props.data.data?.project_title}
              onChange={(e) => {
                singleSowData.project_title = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            />
          </Col>

          <Col lg={6}>
            <Label>Vertical</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.job_category}
              onChange={(e) => {
                singleSowData.job_category = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option>Select Vertical</option>
              <option value="hyp_fot">HYPFOT</option>
              <option value="hyp_dat">HYPDAT</option>
              <option value="dig_cxt">DIGCXT</option>
              <option value="dig_mot">DIGMOT</option>
              <option value="hyp_vet">HYPVET</option>
              <option value="hyp_ret">HYPRET</option>
            </select>
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Start Date</Label>
            <Flatpickr
              className="form-control"
              id="exampleInputdate"
              defaultValue={props.data.data?.start_date}
              // options={{
              //   minDate: "today",
              //   maxDate: new Date().fp_incr(2),
              // }}
              name="date"
              onChange={(e) => {
                setStartDateDisp(e[0]);
                singleSowData.start_date = moment(e[0]).format("YYYY-MM-DD");
                setSingleSowData({ ...singleSowData });
              }}
            />
          </Col>

          <Col lg={6}>
            <Label>End Date</Label>
            <Flatpickr
              className="form-control"
              id="exampleInputdate"
              options={{
                minDate: startDateDisp,
                // maxDate: new Date().fp_incr(2),
              }}
              defaultValue={props.data.data?.end_date}
              name="date"
              // onChange={handleChange}
              onChange={(e) => {
                singleSowData.end_date = moment(e[0]).format("YYYY-MM-DD");
                setSingleSowData({ ...singleSowData });
              }}
            />
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Trending</Label>
            {/* <Input
              type="text"
              name="projecttitle"
              defaultValue={props.data.data?.is_trending}
            /> */}

            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.is_trending}
              onChange={(e) => {
                singleSowData.is_trending = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option></option>

              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Col>

          <Col lg={6}>
            <Label>Payout Type</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.pay_type}
              onChange={(e) => {
                singleSowData.pay_type = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option></option>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fort Nightly</option>
              <option value="monthly">Monthly</option>
            </select>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>CPL</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={props.data.data?.xleads}
              readOnly={
                context.oaDetials.email_id == "naveen.ram@taskmo.com" ||
                context.oaDetials.email_id == "swaroop.chandra@taskmo.com"
                  ? false
                  : true
              }
            />
          </Col>

          <Col lg={6}>
            <Label>Enable Status</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              // onChange={handleChange}
              defaultValue={props.data.data?.enable_for}
              onChange={(e) => {
                singleSowData.enable_for = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option></option>
              <option value="none">None</option>
              <option value="open_network">Open Network</option>
              <option value="closed_network">Close Network</option>
              {/* <option value="both">Both</option> */}
            </select>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Active Sow Type</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.type}
              onChange={(e) => {
                singleSowData.type = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option>Select Type</option>
              <option value="1">Merchant Acquisition</option>
              <option value="2">Partner Onboarding</option>
              <option value="3">Finance</option>
              <option value="4">Seller Onboarding</option>
              <option value="5">Customer Acquisition</option>
              <option value="6">Data Moderation</option>
              <option value="7">TeleCalling</option>
            </select>
          </Col>

          <Col lg={6}>
            <Label>App View Status</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.app_view_status}
              onChange={(e) => {
                singleSowData.app_view_status = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option></option>
              <option value="none">None</option>
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </select>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Target Audience</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={props.data.data?.target_audience}
              onChange={(e) => {
                singleSowData.target_audience = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            />
          </Col>

          <Col lg={6}>
            <Label>Compulsary Training</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.training_compulsory}
              onChange={(e) => {
                singleSowData.training_compulsory = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Vendor CPL</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={props.data.data?.vendor_cpl}
              readOnly={
                context.oaDetials.email_id == "naveen.ram@taskmo.com" ||
                context.oaDetials.email_id == "swaroop.chandra@taskmo.com"
                  ? false
                  : true
              }
            />
          </Col>
          <Col lg={6}>
            <Label>Manage SP</Label>
            <select
              className="form-select"
              aria-label=".form-select-sm example"
              name="title"
              defaultValue={props.data.data?.is_managed}
              onChange={(e) => {
                singleSowData.is_managed = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            >
              <option></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Col>
        </Row>
      </div>
      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Support Number</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={props.data.data?.support_number}
              onChange={(e) => {
                singleSowData.support_number = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            />
          </Col>
          <Col lg={6}></Col>
        </Row>
      </div>
      <Modal isOpen={open} toggle={handleClose} centered={true}>
        <ModalBody className="py-3 px-5">
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
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

export default TaskerInfo;
