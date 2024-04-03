import React from "react";
// import { Col, Row, Form, Button } from "react-bootstrap";

// import FeatherIcon from "feather-icons-react";
import axios from "axios";
// import { sow_media_upload } from "../../utils";
// import { dataToken } from "../config/token";
import { useParams } from "react-router-dom";
// import { Bars } from "react-loader-spinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Col, Input, Row } from "reactstrap";
import { api } from "../../globalConfig";
import { sow_media_upload } from "../../assets/utils/dashboard";
import { toast } from "react-toastify";

function AddImage(props) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

  const sowMediaUploadURL = api.AWS_URL + sow_media_upload;

  const fileUpload2 = (e) => {
    const fileSelect = document.getElementById("resumeSel2"),
      fileElem = document.getElementById("resumeEle2");
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
  const imageUpload = (e, type) => {
    setLoading(true);
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axiosData.append("sow_id", id);
    axiosData.append("type", type);
    axiosData.append("description", data.description);
    axiosData.append("title", data.title);
    const files = e.target.files;
    let output = "";
    for (const file of files) {
      output += `${file.type || "unknown"}\n`;
    }
    axiosData.append("link_type", output.split("/")[0]);
    axios
      .post(sowMediaUploadURL, axiosData)
      .then((res) => {
        setLoading(false);
        props.setChange(!props.change);
        if (res.data.error) {
          toast(res.data.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          toast("Successfully added", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Row className="my-3">
        {props.dataType == "add_share_media" ? (
          <Col sx={12}>
            <label htmlFor="ControlInputAdd" className="label_edit_sow">
              Image Title
            </label>
            <Input
              type="text"
              onChange={(e) => {
                data.title = e.target.value;
                setData({ ...data });
              }}
            />
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <Row className="my-3">
        {props.dataType !== "add_share_media" ? (
          <Col sx={12}>
            <label htmlFor="ControlInputAdd" className="label_edit_sow">
              Image Description
            </label>{" "}
            <Input
              type="text"
              onChange={(e) => {
                data.description = e.target.value;
                setData({ ...data });
              }}
            />
          </Col>
        ) : (
          <Col sx={12}>
            <label htmlFor="ControlInputAdd" className="label_edit_sow">
              Share Description
            </label>

            <CKEditor
              editor={ClassicEditor}
              id="editor"
              Essentials
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                // editor.getData();
                data.description = editor.getData();
                setData({ ...data });
              }}
            />
          </Col>
        )}
      </Row>
      {data.description ? (
        <Row>
          <Col sx={12}>
            <input
              type="file"
              id="resumeEle2"
              style={{ display: "none" }}
              onChange={(e) => {
                const dataEnter =
                  props.dataType == "add_share_media"
                    ? "share_media"
                    : "customer_media";
                imageUpload(e, dataEnter);
              }}
            />
            <div
              className="upload_css"
              id="resumeSel2"
              onClick={() => {
                fileUpload2();
              }}
            >
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <i className="ri ri-add-circle-line fs-20 cursor-pointer"></i>
                  <span>Upload Image/Video</span>
                </>
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddImage;
