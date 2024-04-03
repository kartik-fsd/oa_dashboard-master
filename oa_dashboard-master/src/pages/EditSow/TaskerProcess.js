import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { api } from "../../globalConfig";
import { app_training_video, upload_brand_logo } from "../../assets/utils/sow";
import {
  confirm_sow_enable,
  upload_qc_script,
} from "../../assets/utils/dashboard";

const TaskerProcess = ({ data: { data }, singleSowData, setSingleSowData }) => {
  const { id } = useParams();
  const hiddenFileInput = React.useRef(null);
  const hiddenFileInput1 = React.useRef(null);
  const hiddenLogoInput = React.useRef(null);
  const handleClickuploadtraining = () => {
    hiddenFileInput.current.click();
  };
  const handleClickQcScript = () => {
    hiddenFileInput1.current.click();
  };
  const handleClickBrandLogo = () => {
    hiddenLogoInput.current.click();
  };
  const handleChangeuploadtraining = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("sow_id", id);
    const apilink = api.AWS_URL + app_training_video;
    axios
      .post(apilink, formData)
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // });)

  const handleChangeuploadQcScript = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("sow_id", id);
    const apilink = api.AWS_URL + upload_qc_script;
    axios
      .post(apilink, formData)
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleChangeuploadLogo = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0], "hii");
    formData.append("project_id", data.project_id);
    const apilink = api.AWS_URL + upload_brand_logo;
    axios
      .post(apilink, formData)
      .then((res) => {
        toast(res.data?.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Training Link</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={data?.training_link}
              onChange={(e) => {
                singleSowData.training_link = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
            />
          </Col>
          {/* <Col lg={6}>
            <Label>QC script</Label>
            <div style={{ display: "flex", gap: "5px" }}>
              <Input
                type="text"
                name="qc_script"
                defaultValue={data?.qc_script}
                className="w-100"
              />
              <div>
                <input
                  type="file"
                  htmlFor="lablelab1"
                  style={{ display: " none" }}
                  onChange={handleChangeuploadQcScript}
                  ref={hiddenFileInput1}
                />
                <Button onClick={handleClickQcScript} id="lablelab1">
                  Upload
                </Button>
              </div>
            </div>
          </Col> */}
          <Col lg={6}>
            <label className="p-0">Customer Download Link</label>

            <Input
              type="text"
              defaultValue={data?.utm_link}
              onChange={(e) => {
                // let dataProps = props.data?.data?.utm_link;
                // dataProps = e.target.value;
                // props.setData({ ...dataProps });

                singleSowData.utm_link = e.target.value;
                setSingleSowData({ ...singleSowData });
              }}
              // style={{ height: "30px", width: "75%" }}
            />
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Introduction Video</Label>
            <div style={{ display: "flex", gap: "5px" }}>
              <Input
                type="text"
                name="projecttitle"
                defaultValue={data?.training_video}
                className="w-100"
              />
              <div>
                <input
                  type="file"
                  htmlFor="lablelab"
                  style={{ display: " none" }}
                  onChange={handleChangeuploadtraining}
                  ref={hiddenFileInput}
                />
                <Button onClick={handleClickuploadtraining} id="lablelab">
                  Upload
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <Label>Brand Logo</Label>
            <div style={{ display: "flex", gap: "5px" }}>
              <Input
                type="text"
                name="brand_logo"
                defaultValue={data?.brand_logo}
                className="w-100"
              />
              <div>
                <input
                  type="file"
                  htmlFor="lablelab1"
                  accept="image/x-png,image/gif,image/jpeg"
                  style={{ display: " none" }}
                  onChange={handleChangeuploadLogo}
                  ref={hiddenLogoInput}
                />
                <Button onClick={handleClickBrandLogo} id="lablelab1">
                  Upload
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Row className="align-items-center g-3">
          <Col lg={6}>
            <Label>Table</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={data?.table_ref_name}
              readOnly
            />
          </Col>
          <Col lg={6}>
            <Label>Json</Label>
            <Input
              type="text"
              name="projecttitle"
              defaultValue={data?.json_data}
              readOnly
            />
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <Label className="form-label">Introduction Text</Label>
        <CKEditor
          editor={ClassicEditor}
          data={data?.introduction_text}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            singleSowData.introduction_text = editor.getData();

            setSingleSowData({ ...singleSowData });
          }}
        />
      </div>

      <div className="mb-3">
        <Label className="form-label">Whom to Sell?</Label>
        <CKEditor
          editor={ClassicEditor}
          data={data?.project_desc}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            singleSowData.project_desc = editor.getData();

            setSingleSowData({ ...singleSowData });
          }}
        />
      </div>

      <div className="mb-3">
        <Label className="form-label">How to Sell?</Label>
        <CKEditor
          editor={ClassicEditor}
          data={data?.payout_criteria}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            singleSowData.payout_criteria = editor.getData();

            setSingleSowData({ ...singleSowData });
          }}
        />
      </div>

      <div className="mb-3">
        <Label className="form-label">Terms and conditions</Label>
        <CKEditor
          editor={ClassicEditor}
          data={data?.other_terms}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            singleSowData.other_terms = editor.getData();

            setSingleSowData({ ...singleSowData });
          }}
        />
      </div>
    </div>
  );
};

export default TaskerProcess;
