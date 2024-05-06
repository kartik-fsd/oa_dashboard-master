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
  Label,
  Container,
  Input,
} from "reactstrap";
import { Card, Col, Row } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import FormEditor from "./ParaCk";
import FileUpload from "./FileUpload";
import { useParams } from "react-router-dom";
import Select from "react-select";
import {
  company_list_select,
  create_agreement,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { upload_issue_proof } from "../../../assets/utils/sow";
import { dangernotify, successnotify, warningnotify } from "../../Toasts";
import "./Select.css";

function AddAgreement({ isOpen, toggle, setModal, setCheck, check }) {
  const { id } = useParams();
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [resurl, setResurl] = React.useState("");
  const [all, setAll] = useState({});
  const [but, setbut] = React.useState(false);

  document.title = "OnX | Business";
  function handleMulti2(selectedMulti2) {
    setselectedMulti2(selectedMulti2);
  }
  const [company_list, setCompany_list] = useState({});
  React.useEffect(() => {
    const link = api.ONX_URL + company_list_select;
    axios
      .get(link)
      .then((res) => {
        const dataEnter = [];
        res.data?.company_list.forEach((item) => {
          const sample = {
            value: item.brand_name,
            label: item.brand_name,
            data: { ...item },
          };
          dataEnter.push(sample);
        });
        setCompany_list(dataEnter);
      })
      .catch((err) => console.group(err));
  }, []);
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
  const formatOptionData = (it) => {
    return (
      <div>
        <img
          src={it?.data?.brand_logo}
          height="30px"
          alt=""
          width="30px"
          style={{ borderRadius: "50%" }}
        />
        <span className="text-dark fw-semibold text-capitalize mx-2">
          {it?.data?.brand_name}
        </span>
      </div>
    );
  };

  const save = (e) => {
    e.preventDefault();
    console.log(all, "send", !isOpen);
    setbut(true);

    const path = api.ONX_URL + create_agreement;
    if (Object.keys(all)?.length >= 4) {
      axios
        .post(path, all)
        .then((res) => {
          if (res.data.error) {
            dangernotify(res.data.message);
          } else {
            successnotify("Success");
            setModal(!isOpen);
            setCheck(!check);
            setTimeout(() => {
              setbut(false);
            }, 1000);
          }
        })
        .catch((err) => console.log(err, "err"));
    } else {
      warningnotify("Please fill all the details");
      setTimeout(() => {
        setbut(false);
      }, 1000);
    }
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
          <Col lg={12}>
            <div className="mb-3 custom">
              <Label
                htmlFor="choices-multiple-remove-button"
                className="form-label"
              >
                Select company
              </Label>
              <div className="mb-3">
                <Select
                  aria-label=".form-select-sm example"
                  // onChange={(e) => {
                  //   setCompanyId();
                  //   console.log(e?.data.company_id, "idd");
                  // }}
                  onChange={(e) => {
                    setAll({
                      ...all,
                      company_id: e?.data?.company_id,
                    });
                  }}
                  options={company_list}
                  formatOptionLabel={formatOptionData}
                  isClearable
                  getOptionValue={(option) => option?.data?.brand_name}
                ></Select>
              </div>
            </div>
          </Col>
          <Col className="mb-2 d-flex align-items-center ">
            <div className="col-md-6 me-3">
              <label htmlFor="AgreementTitle" className="form-label">
                Agreement Title
              </label>

              <input
                type="text"
                name="agreement_title"
                className="form-control mt-2 mr-2"
                id="AgreementTitle"
                placeholder="Agreement Title"
                onChange={(e) => {
                  setAll({
                    ...all,
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
                onChange={(e) => {
                  setAll({
                    ...all,
                    agreement_type: e.target.value,
                  });
                }}
              />
            </div>
          </Col>
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
                  style={{ zIndex: 0 }}
                  onClick={() => {
                    successnotify("Uploaded");
                    setAll({
                      ...all,
                      agreement_upload: resurl,
                    });
                  }}
                >
                  Upload
                </button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* <div>
                <label htmlFor="uploadE1">Agreement Description</label>
                <Container style={{ padding: 10 }} id="uploadE1">
                  <Form method="post">
                    <CKEditor
                      editor={ClassicEditor}
                      //data="<p'>Add description</p>"

                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                    />
                  </Form>
                </Container>
              </div> */}
              <div>
                <Label
                  className="form-label"
                  htmlFor="des-info-description-input"
                >
                  Description
                </Label>
                <textarea
                  className="form-control"
                  placeholder="Enter Description"
                  id="des-info-description-input"
                  rows="3"
                  onChange={(event) => {
                    setAll({
                      ...all,
                      agreement_description: event.target.value,
                    });
                  }}
                ></textarea>
              </div>
            </Col>
            <div className="d-flex justify-content-end">
              <Button
                style={{ backgroundColor: "#ec5c24" }}
                onClick={save}
                disabled={but}
                className="fs-15 me-2 mt-2"
              >
                <i
                  className=" ri-download-2-line align-bottom me-2 text-light-muted"
                  style={{ fontSize: "15px", cursor: "pointer" }}
                ></i>
                Save
              </Button>
            </div>
          </Row>
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default AddAgreement;
