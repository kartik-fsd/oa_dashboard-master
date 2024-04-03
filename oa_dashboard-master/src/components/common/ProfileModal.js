import axios from "axios";
import React, { useContext } from "react";
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
import img from "../../assets/images/profile-bg.jpg";
import { oa_details, profile_upload } from "../../assets/utils/sow";
import { api } from "../../globalConfig";
import "./profile.css";
import { UserContext } from "../../layouts/Header";
import Zoom from "react-medium-image-zoom";

const ProfileModal = ({
  profileMod,
  setProfileMod,
  setProfImg,
  userData,
  setCheck,
  check,
}) => {
  const [url, setUrl] = React.useState("");

  const imageUpload = (e) => {
    const link = api.AWS_URL + profile_upload;
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axiosData.append("id", userData.id);
    axios
      .post(link, axiosData)
      .then((res) => {
        setUrl(res.data.results.url);
        setProfImg(url);
        setCheck(!check);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    // <div>
    //   <Modal
    //     id="signupModals"
    //     tabIndex="-1"
    //     isOpen={profileMod}
    //     toggle={() => {
    //       setProfileMod(!profileMod);
    //     }}
    //     top="true"
    //     size="md"
    //     centered={true}
    //   >
    //     <ModalHeader
    //       className="p-3"
    //       toggle={() => {
    //         setProfileMod(!profileMod);
    //       }}
    //     >
    //       <></>
    //     </ModalHeader>

    //     <ModalBody>
    //       <div className="d-flex gap-5">
    //         <div className="text-capitalize">
    //           <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
    //             <img
    //               src={url}
    //               className="rounded-circle avatar-xl img-thumbnail user-profile-image"
    //               alt="user-profile"
    //             />
    //             <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
    //               <Input
    //                 id="profile-img-file-input"
    //                 type="file"
    //                 className="profile-img-file-input"
    //               />
    //               <Label
    //                 htmlFor="profile-img-file-input"
    //                 className="profile-photo-edit avatar-xs"
    //               >
    //                 <span className="avatar-title rounded-circle bg-light text-body">
    //                   <i className="ri-camera-fill"></i>
    //                 </span>
    //               </Label>
    //             </div>
    //           </div>
    //         </div>
    //         <div>
    //           <p className="text-bold">P ID: {userData.id}</p>
    //           <p className="text-bold">Name: {userData.full_name}</p>
    //           <p className="text-bold">Phone: {userData.mobile_number}</p>
    //           <p className="text-bold">Email: {userData.email_id}</p>
    //         </div>
    //       </div>
    //     </ModalBody>
    //   </Modal>
    // </div>
    <Modal
      isOpen={profileMod}
      toggle={() => setProfileMod(!profileMod)}
      size="md"
      centered
    >
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            // validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={12}>
              <input
                type="hidden"
                id="memberid-input"
                className="form-control"
                defaultValue=""
              />
              <div className="px-1 pt-1">
                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                  {/* <img
                    src={""}
                    alt=""
                    id="cover-img"
                    className="img-fluid"
                    style={{ height: "180px", width: "100%" }}
                  /> */}
                  <div
                    className="d-flex justify-content-center align-items-center fw-bold text-white"
                    style={{
                      height: "150px",
                      width: "100%",
                      backgroundImage:
                        "linear-gradient(to right,#472668,#673695,#472668)",
                      fontSize: "35px",
                      fontFamily: "fantasy",
                    }}
                  >
                    Taskmo
                  </div>
                  <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                    <div className="flex-grow-1"></div>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-3 align-items-center">
                        <div>
                          <label
                            htmlFor="cover-image-input"
                            className="mb-0"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Select Cover Image"
                          >
                            {/* <div className="avatar-xs">
                              <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                <i className="ri-image-fill"></i>
                              </div>
                            </div> */}
                          </label>
                          {/* <input
                            className="form-control d-none"
                            defaultValue=""
                            id="cover-image-input"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                          /> */}
                        </div>
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          onClick={() => setProfileMod(false)}
                          id="createMemberBtn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                        src={url || userData?.profile_image}
                        alt="profile-img "
                        id="member-img"
                        className="avatar-xl rounded-circle "
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="mb-3">
                <Label htmlFor="teammembersName" className="form-label">
                  Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="teammembersName"
                  value={userData.full_name}
                  readOnly
                  name="name"
                />
              </div> */}
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="pid" className="form-label">
                  P ID
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="designation"
                  readOnly
                  value={userData?.id}
                  name="pid"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="teammembersName" className="form-label">
                  Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="teammembersName"
                  value={userData?.full_name}
                  readOnly
                  name="name"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="number" className="form-label">
                  Number
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="designation"
                  readOnly
                  value={userData?.mobile_number}
                  name="number"
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <Label htmlFor="email" className="form-label">
                  Email
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="designation"
                  readOnly
                  value={userData.email_id}
                  name="email"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="hstack gap-2 justify-content-end">
                {/* <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setProfileMod(false)}
                >
                  Close
                </button> */}
                {/* <button type="submit" className="btn btn-success" id="addNewMember">{!isEdit ? "Add Member" : "Save"}</button> */}
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ProfileModal;
