import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { update_company_details } from "../../../assets/utils/Business";
import { upload_issue_proof } from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const EditCompMod = ({ open, setOpen, data, check, setCheck }) => {
  const [img, setImg] = React.useState("");
  const [change, setChange] = React.useState(true);
  const [editData, setEditData] = React.useState({});
  const { id } = useParams();

  console.log(id, "editdata");

  const imageUpload = (e) => {
    const link = api.AWS_URL + upload_issue_proof;
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    // axiosData.append("id", userData.id);
    axios
      .post(link, axiosData)
      .then((res) => {
        // console.log(res.data.url, "ddt");
        setImg(res.data.url);
        setChange(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdate = () => {
    const link = api.ONX_URL + update_company_details;
    editData.company_id = id;
    if (img !== "") {
      editData.brand_logo = img;
    }

    axios
      .patch(link, editData)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setOpen(false);
      })
      .catch((err) => warningnotify("something went wrong...!"));
  };

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setEditData({});
        }}
        centered={true}
        size={"md"}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setEditData({});
          }}
        >
          Company Details
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12" className="mt-4">
              <div className="text-center mb-4 mt-n5 pt-2">
                <div className="position-relative d-inline-block">
                  <div className="position-absolute bottom-0 end-0">
                    <label
                      htmlFor="member-image-input"
                      className="mb-0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="Select Member Image"
                    >
                      <div className="avatar-xs">
                        <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                          <i className="ri-edit-2-line"></i>
                        </div>
                      </div>
                    </label>
                    <input
                      className="form-control d-none"
                      defaultValue=""
                      id="member-image-input"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => {
                        imageUpload(e);
                      }}
                    />
                  </div>
                  <div className="avatar-xl">
                    <div className="avatar-title bg-light rounded-circle">
                      <img
                        src={change ? data.brand_logo : img}
                        alt="profile-img "
                        id="member-img"
                        className="avatar-xl rounded-circle "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12">
              <div>
                <label htmlFor="basiInput" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="basiInput"
                  defaultValue={data.company_name}
                  onChange={(e) =>
                    setEditData({ ...editData, company_name: e.target.value })
                  }
                />
              </div>
            </Col>
            <Col xs="12" className="mt-4">
              <div>
                <label htmlFor="basiInput" className="form-label">
                  Company Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="basiInput"
                  defaultValue={data.company_title}
                  onChange={(e) =>
                    setEditData({ ...editData, company_title: e.target.value })
                  }
                />
              </div>
            </Col>
            <Col xs="12" className="mt-4">
              <div>
                <label htmlFor="basiInput" className="form-label">
                  Brand Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="basiInput"
                  defaultValue={data.brand_name}
                  onChange={(e) =>
                    setEditData({ ...editData, brand_name: e.target.value })
                  }
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn  waves-effect waves-light text-light"
            style={{ backgroundColor: "#ec5c24" }}
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditCompMod;
