import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  Progress,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import MyLeadsTable from "./MyLeadsTable";
import axios from "axios";

const MyLeads = () => {
  const [companyData, setCompanyData] = React.useState([]);
  const [activeTab, setactiveTab] = useState(1);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [modal_signUpModals, setmodal_signUpModals] = useState(false);
  function tog_signUpModals() {
    setmodal_signUpModals(!modal_signUpModals);
  }
  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  }

  const getCompanyData = () => {
    let API_KEY = localStorage.getItem("businessToken");
    const tokenEnter = {
      headers: {
        "x-auth-token": API_KEY,
      },
    };
    let api = "https://digital.admin.api.taskmo.co/api" + "/company/all";
    axios
      .get(api, tokenEnter)
      .get((res) => {})
      .catch((err) => console.log(err, "checkerr"));
  };
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Col lg={12}>
            <Card>
              <CardHeader style={{ padding: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5 className="card-title mb-0">MyLeads</h5>
                  <div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          id="basiInput"
                        />
                      </div>
                      <div>
                        <Button onClick={() => tog_signUpModals()}>
                          {" "}
                          <i className="ri-add-line label-icon align-middle fs-12 me-2"></i>
                          ADD
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {/* <ScrollHorizontal style={{ width: "100%" }} /> */}
                <MyLeadsTable style={{ width: "100%" }} />
              </CardBody>
            </Card>
          </Col>

          <Modal
            size="lg"
            id="signupModals"
            tabIndex="-1"
            isOpen={modal_signUpModals}
            toggle={() => {
              tog_signUpModals();
            }}
            centered
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                tog_signUpModals();
              }}
            >
              Lead Details
            </ModalHeader>
            {/* <Alert color="success" className="rounded-0 mb-0">
                    <p className="mb-0">Up to <span className="fw-semibold">50% OFF</span>, Hurry up before the stock ends</p>
                </Alert> */}
            <ModalBody>
              <form>
                <Row>
                  <Col>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter your name"
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="mb-3">
                      <label htmlFor="workEmail" className="form-label">
                        Work Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="workEmail"
                        placeholder="Enter your email"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="phone"
                        placeholder="Enter your number"
                      />
                    </div>
                  </Col>
                  <Col>
                    <Label>source of lead</Label>
                    <select
                      className="form-select"
                      aria-label=".form-select-sm example"
                      name="source_of_lead"
                      // onChange={(e) => {
                      //   handleChange(e);
                      // }}
                    >
                      <option>Select source of lead</option>

                      {/* {oaData?.map((item) => (
                                  <option
                                    key={item?.employee_id}
                                    value={item?.workids_id}
                                  >
                                    {item?.full_name}
                                  </option>
                                ))} */}
                    </select>
                  </Col>
                  <Col>
                    <Label>service</Label>
                    <select
                      className="form-select"
                      aria-label=".form-select-sm example"
                      name="source_of_lead"
                      // onChange={(e) => {
                      //   handleChange(e);
                      // }}
                    >
                      <option>Select service</option>

                      {/* {oaData?.map((item) => (
                                  <option
                                    key={item?.employee_id}
                                    value={item?.workids_id}
                                  >
                                    {item?.full_name}
                                  </option>
                                ))} */}
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Select company</Label>
                    <select
                      className="form-select"
                      aria-label=".form-select-sm example"
                      name="source_of_lead"
                      // onChange={(e) => {
                      //   handleChange(e);
                      // }}
                    >
                      <option>Select service</option>

                      {/* {oaData?.map((item) => (
                                  <option
                                    key={item?.employee_id}
                                    value={item?.workids_id}
                                  >
                                    {item?.full_name}
                                  </option>
                                ))} */}
                    </select>
                  </Col>
                </Row>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary mt-3">
                    Sign Up Now
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default MyLeads;
