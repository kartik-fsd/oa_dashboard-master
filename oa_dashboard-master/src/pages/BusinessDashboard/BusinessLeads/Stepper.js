import React, { useState } from "react";
import { Nav, NavItem, NavLink, Progress } from "reactstrap";
import classnames from "classnames";

const Stepper = ({ rowData }) => {
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

  React.useEffect(() => {
    rowData?.lead_nurturing_status == "1" &&
    rowData?.lead_maturing_status == "0" &&
    rowData?.hot_lead_status == "0" &&
    rowData?.hot_lead_status == "0"
      ? toggleTab(1, 0)
      : rowData?.lead_nurturing_status == "1" &&
        rowData?.lead_maturing_status == "1" &&
        rowData?.hot_lead_status == "0" &&
        rowData?.hot_lead_status == "0"
      ? toggleTab(2, 35)
      : rowData?.lead_nurturing_status == "1" &&
        rowData?.lead_maturing_status == "1" &&
        rowData?.hot_lead_status == "1" &&
        rowData?.hot_lead_status == "0"
      ? toggleTab(3, 70)
      : rowData?.lead_nurturing_status == "1" &&
        rowData?.lead_maturing_status == "1" &&
        rowData?.hot_lead_status == "1" &&
        rowData?.hot_lead_status == "1"
      ? toggleTab(4, 100)
      : toggleTab(1, 0);
  }, [rowData]);

  return (
    <div>
      <div
        className="progress-nav mb-2 "
        style={{
          width:
            window.location.pathname == "/business-dashboard/project"
              ? "300px"
              : "300px",
        }}
      >
        <Progress value={progressbarvalue} style={{ height: "1px" }} />

        <Nav className="nav-pills progress-bar-tab custom-nav" role="tablist">
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
          {/* {window.location.pathname == "/business-dashboard/project" ? ( */}
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
                  active: activeTab === 4,
                  done: activeTab <= 5 && activeTab > 3,
                },
                "rounded-pill"
              )}
              //   onClick={() => {
              //     toggleTab(3, 100);
              //   }}
              tag="button"
            >
              <span className="fs-10">4</span>
            </NavLink>
          </NavItem>
          {/* ) : (
            <></>
          )} */}
        </Nav>
      </div>
    </div>
  );
};

export default Stepper;
