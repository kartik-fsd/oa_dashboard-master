import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import avatar from "../../../src/assets/images/users/avatar-1.jpg";
import axios from "axios";
import "./mycompanies.css";
export const AddCompanyModal = ({ modal, toggle }) => {
  const [founderdet, setFounderdet] = React.useState([{ id: 0 }]);
  const [check, setCheck] = React.useState(false);
  const hiddenFile = React.useRef(null);
  const handleAddFounder = () => {
    const obj = {};

    obj.id = founderdet.length + 1;

    setFounderdet([...founderdet, obj]);
  };

  const handleFounderDel = (id) => {
    const ot = founderdet.filter((el) => el.id !== id);
    setFounderdet(ot);
  };

  const handleCheck = (event) => {
    event.preventDefault();

    setCheck(true);
  };

  const handleLogoClick = () => {
    hiddenFile.current.click();
  };

  const handleLogoChange = (e) => {
    const logoData = new FormData();
    logoData.append("file", e.target.files[0]);
  };
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} centered={true} size={"xl"}>
        <ModalHeader toggle={toggle}>Add Company</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <div
                style={{
                  padding: "21px",
                  paddingBottom: "32px",
                  // border: "1px solid #e3c8fc",
                }}
              >
                <h5 className="mb-3" style={{ color: "#602994" }}>
                  Add Entity Details
                </h5>
                <form onSubmit={handleCheck}>
                  <Row>
                    <Col>
                      <div>
                        <label htmlFor="entity" className="form-label">
                          Select Entity Type
                        </label>
                        {/* <input type="text" className="form-control" id="fund" placeholder=""/> */}

                        <div className="input-group">
                          <select className="form-select" id="entity" required>
                            <option selected>Select Entity Type</option>

                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <label htmlFor="entity" className="form-label" required>
                          Enter GST Number
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            required
                          />

                          <button
                            className="btn btn-primary"
                            type="submit"
                            id="button-addon1"
                          >
                            Check
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </CardBody>
          </Card>

          {check && (
            <>
              <div
                style={{
                  padding: "21px",
                  paddingBottom: "32px",
                  border: "1px solid #e3c8fc",
                  marginTop: "24px",
                }}
              >
                <h5 className="mb-3" style={{ color: "#602994" }}>
                  Add Company Details
                </h5>
                <div>
                  <img
                    src={avatar}
                    alt="img"
                    className="rounded-circle avatar-md"
                  />

                  <button
                    type="button"
                    className="btn btn-primary btn-label waves-effect waves-light "
                    style={{ marginLeft: "16px", paddingLeft: "14px" }}
                    onClick={handleLogoClick}
                  >
                    <i className="bx bx-upload fs-16 me-2"></i>
                    Upload Brand Logo
                  </button>
                  <input
                    type="file"
                    ref={hiddenFile}
                    className="d-none"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleLogoChange}
                  />
                </div>
                <Row className="mt-4">
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="company" className="form-label">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="brand" className="form-label">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="web" className="form-label">
                        Website
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="web"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="fund" className="form-label">
                        Fund Status
                      </label>
                      {/* <input type="text" className="form-control" id="fund" placeholder=""/> */}

                      <div className="input-group">
                        <select className="form-select" id="fund">
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="ind" className="form-label">
                        Industry
                      </label>
                      {/* <input type="text" className="form-control" id="fund" placeholder=""/> */}

                      <div className="input-group">
                        <select className="form-select" id="ind">
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="link" className="form-label">
                        LinkedIn Url
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="link"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="tds" className="form-label">
                        TDS
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tds"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="startdate" className="form-label">
                        Company Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="startdate"
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
                  Add Founder Details
                </h5>

                {founderdet?.map((item) => {
                  return (
                    <>
                      <Row className="mb-3">
                        <Col xs="3">
                          <div>
                            <label htmlFor="fnd" className="form-label">
                              Founder Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="fnd"
                              placeholder=""
                            />
                          </div>
                        </Col>
                        <Col xs="3">
                          <div>
                            <label htmlFor="email" className="form-label">
                              Founder Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder=""
                            />
                          </div>
                        </Col>
                        <Col xs="3">
                          <div>
                            <label htmlFor="found" className="form-label">
                              Founder Contact
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="found"
                              placeholder=""
                            />
                          </div>
                        </Col>
                        <Col xs="2" className="d-flex flexGrow-1">
                          <div>
                            <label htmlFor="tds" className="form-label">
                              Founder LinkedIn
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="tds"
                              placeholder=""
                            />
                          </div>
                        </Col>
                        <Col
                          xs="auto"
                          className="d-flex align-items-center mt-4"
                        >
                          <i
                            className=" bx bx-x-circle"
                            style={{ fontSize: "26px", color: "#7946aa" }}
                            onClick={() => handleFounderDel(item.id)}
                          ></i>
                        </Col>
                      </Row>
                    </>
                  );
                })}
                <div
                  style={{
                    padding: "25px",
                    background: "#faf8ff",
                    marginTop: "30px",
                  }}
                >
                  <div
                    className="d-flex justify-content-center mb-2"
                    onClick={handleAddFounder}
                  >
                    <i
                      className=" bx bx-plus-circle fs-24 "
                      style={{ color: "#7946aa" }}
                    ></i>
                  </div>
                  <p className="text-center fs-16 font-weight-light">
                    Add More
                  </p>
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
                  Add About Company Details
                </h5>
                {/* <input
              type="text"
              className="form-control"
              id=""
              placeholder=""
              style={{ height: "120px" }}
            /> */}
                <textarea style={{ width: "100%", height: "120px" }} />
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
                  Add Company Address Details
                </h5>
                <Row>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="code" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <div>
                      <label htmlFor="addrs" className="form-label">
                        Company Address
                      </label>
                      {/* <input
                    type="text"
                    className="form-control"
                    id="addrs"
                    placeholder=""
                    style={{ height: "128px" }}
                  /> */}
                      <textarea style={{ width: "100%", height: "128px" }} />
                    </div>
                  </Col>
                  <Col xs="6" className="mb-4">
                    <Row>
                      <Col xs="12" className="mb-4">
                        <div>
                          <label htmlFor="state" className="form-label">
                            State
                          </label>

                          <div className="input-group">
                            <select className="form-select" id="state">
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </Col>
                      <Col xs="12">
                        <div>
                          <label htmlFor="cont" className="form-label">
                            Country
                          </label>

                          <div className="input-group">
                            <select className="form-select" id="cont">
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end gap-2 ">
                  {/* <button type="button" className="btn btn-outline-primary ">
                    Reset
                  </button> */}
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="bx bx-reset fs-16 me-2"></i>
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="bx bx-save fs-16 me-2 pt-1"></i>
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export const AddGst = ({}) => {
  return (
    <div>
      <Row className="mt-4">
        <Col xs="6" className="mb-4">
          <div>
            <label htmlFor="gst" className="form-label">
              GST
            </label>
            <input
              type="text"
              className="form-control"
              id="gst"
              placeholder=""
            />
          </div>
        </Col>
        <Col xs="6" className="mb-4">
          <div>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder=""
            />
          </div>
        </Col>
        <Col xs="6" className="mb-4">
          <div>
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              placeholder=""
            />
          </div>
        </Col>
        <Col xs="6" className="mb-4">
          <div>
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder=""
            />
          </div>
        </Col>
        <Col xs="6" className="mb-4">
          <div>
            <label htmlFor="pincode" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              placeholder=""
            />
          </div>
        </Col>

        <Col xs="6" className="mb-4">
          <div>
            <label htmlFor="pincode" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              placeholder=""
            />
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-end gap-2 mt-4 ">
        {/* <button
          type="button"
          className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
          style={{ marginLeft: "10px" }}
        >
          <i className="bx bx-reset align-middle fs-14 me-1"></i>
          Reset
        </button> */}
        <button
          type="button"
          className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
          style={{ marginLeft: "10px" }}
        >
          <i className="bx bx-save align-middle me-1  fs-14 "></i>
          Save
        </button>
      </div>
    </div>
  );
};

export const AddClient = ({ modal, toggle, gstModal }) => {
  const handleGstModal = () => {
    gstModal();
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true} size={"lg"}>
        <ModalHeader toggle={toggle}>Add Client</ModalHeader>
        <ModalBody>
          <div
            style={{
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
              // marginTop: "24px",
            }}
          >
            <h5 className="mb-3" style={{ color: "#602994" }}>
              Add New Client
            </h5>
            <Row>
              <Col xs={8}>
                <div>
                  <label htmlFor="entity" className="form-label" required>
                    Email Address
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      required
                    />

                    <button
                      className="btn btn-primary"
                      type="submit"
                      id="button-addon1"
                    >
                      Submit
                    </button>
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
              Client Personal Details{" "}
            </h5>

            <Row className="mt-4">
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="clt" className="form-label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clt"
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="phn" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phn"
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="desg" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desg"
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="startdate" className="form-label">
                    Date
                  </label>
                  <input type="date" className="form-control" id="startdate" />
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
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="comp" className="form-label">
                    Company
                  </label>

                  <div className="input-group">
                    <select className="form-select" id="comp">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="comp" className="form-label">
                    GST
                  </label>

                  <div className="input-group">
                    <select className="form-select" id="comp">
                      <option value="" selected>
                        Choose GST
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div id="passwordHelpBlock" className="form-text">
                    <span>
                      * If not available
                      <span
                        style={{
                          textDecoration: "underline  ",
                          color: "#561b8b",
                          cursor: "pointer",
                        }}
                        onClick={handleGstModal}
                      >
                        click here
                      </span>
                      to add new GST
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2 ">
              <button
                type="button"
                className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
                style={{ marginLeft: "10px" }}
              >
                <i className="bx bx-reset fs-16 me-2"></i>
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
                style={{ marginLeft: "10px" }}
              >
                <i className="bx bx-save fs-16 me-2 pt-1"></i>
                Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
