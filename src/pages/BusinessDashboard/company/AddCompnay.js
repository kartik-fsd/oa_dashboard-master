import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Progress,
} from "reactstrap";
// import Stepper from "../BusinessLeads/Stepper";
import classnames from "classnames";

const AddCompnay = ({ open, setOpen }) => {
  const [activeTab, setactiveTab] = useState(1);
  const [activeArrowTab, setactiveArrowTab] = useState(4);
  const [activeVerticalTab, setactiveVerticalTab] = useState(7);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
  const [passedverticalSteps, setPassedverticalSteps] = useState([1]);

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
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => setOpen(false)}
        centered={true}
        size={"md"}
      >
        <ModalHeader toggle={() => setOpen(false)} style={{ color: "#b83016" }}>
          Add Comapny
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column justify-content-center align-items-center mb-4 ">
            <div>
              <div
                className="progress-nav mb-2 "
                style={{
                  width: "240px",
                }}
              >
                <Progress value={progressbarvalue} style={{ height: "1px" }} />

                <Nav
                  className="nav-pills progress-bar-tab custom-nav"
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                      id="pills-gen-info-tab"
                      className={classnames(
                        {
                          active: activeTab === 1,
                          done: activeTab <= 4 && activeTab >= 0,
                        },
                        "rounded-pill"
                      )}
                      //   onClick={() => {
                      //     toggleTab(1, 0);
                      //   }}
                      tag="button"
                    >
                      <span className="fs-10">1</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                      to="#"
                      id="pills-gen-info-tab"
                      className={classnames(
                        {
                          active: activeTab === 2,
                          done: activeTab <= 4 && activeTab > 1,
                        },
                        "rounded-pill"
                      )}
                      //   onClick={() => {
                      //     toggleTab(2, 50);
                      //   }}
                      tag="button"
                    >
                      <span className="fs-10">2</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                      to="#"
                      id="pills-gen-info-tab"
                      className={classnames(
                        {
                          active: activeTab === 3,
                          done: activeTab <= 4 && activeTab > 2,
                        },
                        "rounded-pill"
                      )}
                      //   onClick={() => {
                      //     toggleTab(3, 100);
                      //   }}
                      tag="button"
                    >
                      <span className="fs-10">3</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
            <div style={{ display: "flex", gap: "46px", fontSize: "10px" }}>
              <div className="d-flex flex-column align-items-center gap-1">
                <span style={{ fontWeight: "500" }}>New Company Details</span>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span style={{ fontWeight: "500" }}>New Client Details</span>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span style={{ marginRight: "20px", fontWeight: "500" }}>
                  GST details
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="basiInput" className="form-label">
              Entity Type
            </label>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
            >
              <option selected>select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div>
            <label htmlFor="basiInput" className="form-label">
              Basic Input
            </label>
            <input type="password" className="form-control" id="basiInput" />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            {/* <button
              type="button"
              className="btn btn-outline btn-label waves-effect waves-light w-xs px-2"
              style={{ marginLeft: "10px" ,borderColor:"#ec5c24"}}
            >
              <i className="bx bx-reset fs-16 me-2"></i>
              Reset
            </button> */}
            <button
              type="button"
              className="btn  btn-label waves-effect waves-light w-xs px-2"
              style={{ marginLeft: "10px", backgroundColor: "#ec5c24" }}
            >
              <i className=" ri-check-line  align-middle fs-14 me-1 "></i>
              Check
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddCompnay;
