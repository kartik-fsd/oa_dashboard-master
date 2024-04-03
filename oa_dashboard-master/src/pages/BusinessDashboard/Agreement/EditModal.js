import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  CardBody,
  Form,
  Input,
  Label,
  FormGroup,
  Container,
} from "reactstrap";
import { Card, Col, Row } from "reactstrap";
//import FormEditor from "./ParaCk";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { upload_issue_proof } from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";
import axios from "axios";
import { agreement_update } from "../../../assets/utils/Business";
import { successnotify, warningnotify } from "../../Toasts";
function AddAgreement({
  isOpen,
  toggle,
  title,
  type,
  description,
  id,
  setCheck,
  check,
}) {
  document.title = "Editors | Velzon - React Admin & Dashboard Template";
  const [all, setAll] = useState({});
  const [editorData, setEditorData] = useState();
  const [resurl, setResurl] = React.useState("");
  const saveData = (e) => {
    e.preventDefault();
    console.log(all, "send");
    const link = api.TASKMO_URL + agreement_update;
    axios
      .patch(link, all)
      .then((res) => {
        successnotify("success");
        toggle();
        setCheck(!check);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));
  };
  const uploadDoc = (e) => {
    const path = api.AWS_URL + upload_issue_proof;
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axios
      .post(path, axiosData)
      .then((res) => {
        setResurl(res?.data?.url);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));
  };
  return (
    <Card>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        centered={true}
        size="lg"
        fullscreen="lg"
        backdrop={true}
        fade={true}
        scrollable={true}
      >
        <ModalHeader toggle={toggle}>Agreement Details</ModalHeader>
        <ModalBody>
          <Col className="mb-2 d-flex align-items-center mx-3">
            <div className="col-md-6 me-4">
              <label htmlFor="AgreementTitle" className="form-label">
                Agreement Title
              </label>

              <input
                type="text"
                name="agreement_title"
                className="form-control mt-2 mr-2"
                id="AgreementTitle"
                placeholder="Agreement Title"
                defaultValue={title}
                onChange={(e) => {
                  setAll({
                    ...all,
                    agreement_id: id,
                    agreement_title: e.target.value,
                  });
                }}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="Agreement Type" className="form-label">
                Agreement Type
              </label>

              <input
                type="text"
                name="agreement_type"
                className="form-control mt-2"
                id="Agreement Type"
                placeholder="AgreementType"
                defaultValue={type}
                onChange={(e) => {
                  setAll({
                    ...all,
                    agreement_id: id,
                    agreement_type: e.target.value,
                  });
                }}
              />
            </div>
          </Col>

          <Row>
            <Col lg={13}>
              <div>
                <label htmlFor="ckedit" className="form-label  mx-3 mt-4">
                  Agreement Description
                </label>

                <Container style={{ padding: 10 }} id="ckedit">
                  <Form method="post">
                    <CKEditor
                      editor={ClassicEditor}
                      //data="<p'>Add description</p>"
                      data={description}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setAll({
                          ...all,
                          agreement_id: id,
                          agreement_description: data,
                        });
                      }}
                    />
                  </Form>
                </Container>
              </div>
            </Col>
          </Row>

          <Row className="my-3">
            <Col lg={7}>
              <label htmlFor="uploadE">Upload Document</label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  style={{ display: "block" }}
                  onChange={(e) => {
                    uploadDoc(e);
                  }}
                />
                <button
                  className="btn btn-outline-success"
                  type="button"
                  id="inputGroupFileAddon04"
                  onClick={() => {
                    setAll({
                      ...all,
                      agreement_id: id,
                      agreement_upload: resurl,
                    });
                    successnotify("Uploaded");
                  }}
                >
                  Upload
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveData} style={{ fontSize: 15 }}>
            <i
              className=" ri-download-2-line align-bottom me-2 text-light-muted"
              style={{ fontSize: "15px", cursor: "pointer" }}
            ></i>{" "}
            Save
          </Button>{" "}
          <Button color="warning" onClick={toggle} style={{ fontSize: 15 }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
}

export default AddAgreement;
