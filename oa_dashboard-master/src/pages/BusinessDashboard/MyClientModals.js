import React from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import avatar from "../../../src/assets/images/users/avatar-1.jpg";
import axios from "axios";

export const MyClientModals = ({ modal, toggle }) => {
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} centered={true} size={"xl"}>
        <ModalHeader toggle={toggle}>Add Company</ModalHeader>
        <ModalBody>
          <div
            style={{
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
            }}
          >
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Col xs={"1"} className="">
                <div className="avatar-group-item">
                  <div className="avatar-sm">
                    <div
                      className="avatar-title rounded-circle bg-light"
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#b83016",
                      }}
                    >
                      D
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={3}>
                <div>
                  <span style={{ fontWeight: "600" }}>Name:</span>
                  <span style={{ marginLeft: "4px" }}>Deepanjan Banerjee</span>
                </div>
                <div>
                  <span style={{ fontWeight: "600" }}>Designation:</span>
                  <span style={{ marginLeft: "4px" }}>Acquisition Lead</span>
                </div>
              </Col>
              <Col xs={3}>
                <div>
                  <span style={{ fontWeight: "600" }}>Phone:</span>
                  <span style={{ marginLeft: "4px" }}>1234567890</span>
                </div>
                <div>
                  <span style={{ fontWeight: "600" }}>Email</span>
                  <span style={{ marginLeft: "4px" }}>example@gmail.com</span>
                </div>
              </Col>

              <Col xs={2}>
                <div
                  style={{
                    width: "180px",
                    backgroundColor: "#236b97",
                    padding: "4px 10px",
                    borderRadius: "2px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ecf1f5",
                    textTransform: "uppercase",
                    textAlign: "left",
                  }}
                >
                  Date:08-12-20203 1:46 PM
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
              marginTop: "24px",
            }}
          >
            <div>
              <h5 className="mb-3" style={{ color: "#602994" }}>
                Edit Client Details
              </h5>

              {/* <label htmlFor="entity" className="form-label" required>
                Edit Client Details
              </label> */}

              <div className="input-group" style={{ width: "40%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter email address"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  required
                />

                <button
                  className="btn"
                  style={{
                    backgroundColor: "#ec5c24",
                    color: "whitesmoke",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#dd4319")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ec5c24")
                  }
                  type="submit"
                  id="button-addon1"
                >
                  Check
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
              marginTop: "24px",
            }}
          >
            <h5 className="mb-3" style={{ color: "#602994" }}>
              Edit Personal Details
            </h5>
            <Row className="mt-4">
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="personal" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="personal"
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="link" className="form-label">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    placeholder=""
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
              marginTop: "24px",
            }}
          >
            <h5 className="mb-3" style={{ color: "#602994" }}>
              Edit Company Details
            </h5>
            <Row className="mt-4">
              <Col xs="6" className="mb-4">
                <div>
                  {/* <label htmlFor="entity" className="form-label">
                      Choose Company
                    </label> */}
                  {/* <input type="text" className="form-control" id="fund" placeholder=""/> */}

                  <div className="input-group">
                    <select className="form-select" id="entity" required>
                      <option selected>Choose Company</option>

                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  {/* <label htmlFor="entity" className="form-label">
                      Choose Company
                    </label> */}
                  {/* <input type="text" className="form-control" id="fund" placeholder=""/> */}

                  <div className="input-group">
                    <select className="form-select" id="entity" required>
                      <option selected></option>

                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
              marginTop: "24px",
            }}
          >
            <h5 className="mb-3" style={{ color: "#602994" }}>
              Edit Client Professional Details
            </h5>
            <Row className="mt-4">
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="designation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input type="date" className="form-control" id="date" />
                </div>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            {/* <button type="button" className="btn btn-outline " style={{borderColor:"#ec5c24"}}>
                    Reset
                  </button> */}
            <button
              type="button"
              className="btn btn-outline btn-label waves-effect waves-light w-xs px-2"
              style={{ marginLeft: "10px", borderColor: "#ec5c24" }}
            >
              <i className="bx bx-reset fs-16 me-2"></i>
              Reset
            </button>
            <button
              type="button"
              className="btn  btn-label waves-effect waves-light w-xs px-2"
              style={{ marginLeft: "10px", backgroundColor: "#ec5c24" }}
            >
              <i className="bx bx-save fs-16 me-2 pt-1"></i>
              Save
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
