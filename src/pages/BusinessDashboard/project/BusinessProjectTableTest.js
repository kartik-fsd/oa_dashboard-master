import React, { useState } from "react";
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";
import {
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  Progress,
  Row,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap";

import classnames from "classnames";

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const BusinessProjectTableTest = () => {
  //for stepper;
  const [progressbarvalue, setprogressbarvalue] = useState(2);
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);

  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 5) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setprogressbarvalue(value);
  }

  const columns = [
    {
      name: "Company",
      width: "250px",
      selector: (row) => row.title,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div>
              <img
                className="rounded-circle avatar-sm"
                alt=""
                src="/user-dummy-img.jpg"
              />
            </div>
            <div>
              <div>Roopen Transportation services Priate Limited</div>
              <div>
                <span
                  className="badge"
                  style={{ backgroundColor: "#ec5c24", color: "#fff" }}
                >
                  L00245
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Project Title",
      selector: (row) => row.year,
      cell: (d) => <div>Merchant Onboarding</div>,
    },
    {
      name: "Spoc Details",
      selector: (row) => row.year,
      cell: (d) => (
        <div>
          <div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div>Chandler Bing</div>
              <div>
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#ec5c24",
                    color: "#fff",
                  }}
                >
                  L00245
                </span>
              </div>
            </div>
            <div className="text-muted fs-10">Chandlerbing@gmail.com</div>
            <div className="text-muted fs-10">7654545343</div>
          </div>
        </div>
      ),
    },
    {
      name: "Created By",
      width: "250px",
      selector: (row) => row.year,
      cell: (d) => (
        <div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              minHeight: "80px",
            }}
          >
            <div>
              {" "}
              <img
                className="rounded-circle avatar-sm"
                alt=""
                src="/user-dummy-img.jpg"
              />
            </div>
            <div>
              <div>Monica Geller</div>
              <div className="fs-10 text-muted">08-12-2023 00:00 pm</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Project Journey",
      selector: (row) => row.year,
      width: "200px",
      cell: (d) => (
        <div>
          <div className="progress-nav mb-1">
            <Progress value={progressbarvalue} style={{ height: "5px" }} />

            <Nav
              className="nav-pills progress-bar-tab custom-nav"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: activeTab === 1,
                      done: activeTab <= 5 && activeTab >= 0,
                    },
                    "rounded-pill"
                  )}
                  onClick={() => {
                    toggleTab(1, 0);
                  }}
                  tag="button"
                >
                  1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: activeTab === 2,
                      done: activeTab <= 5 && activeTab > 1,
                    },
                    "rounded-pill"
                  )}
                  onClick={() => {
                    toggleTab(2, 33);
                  }}
                  tag="button"
                >
                  2
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: activeTab === 3,
                      done: activeTab <= 5 && activeTab > 2,
                    },
                    "rounded-pill"
                  )}
                  onClick={() => {
                    toggleTab(3, 66);
                  }}
                  tag="button"
                >
                  3
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: activeTab === 4,
                      done: activeTab <= 5 && activeTab > 3,
                    },
                    "rounded-pill"
                  )}
                  onClick={() => {
                    toggleTab(4, 100);
                  }}
                  tag="button"
                >
                  4
                </NavLink>
              </NavItem>
            </Nav>
          </div>

          {/* <TabContent activeTab={activeTab}>
            <TabPane tabId={1}>
              <div
                style={{
                  width: "250px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>DD-MM-YY</div>
                <div>HH-MM</div>
              </div>
            </TabPane>

            <TabPane tabId={2}>
              <div
                style={{
                  width: "250px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>DD-MM-YY</div>
                <div>HH-MM</div>
              </div>
            </TabPane>
            <TabPane tabId={3}>
              <div
                style={{
                  width: "250px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>DD-MM-YY</div>
                <div>HH-MM</div>
              </div>
            </TabPane>
            <TabPane tabId={4}>
              <div
                style={{
                  width: "250px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div>DD-MM-YY</div>
                <div>HH-MM</div>
              </div>
            </TabPane>
          </TabContent> */}
          <div style={{ display: "flex", gap: "5px" }}>
            <div
              id="steparrow-gen-info"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "150px",
                marginLeft: "-50px",
              }}
            >
              <div className="fs-10">DD-MM-YY</div>
              <div className="fs-10 text-muted">HH-MM</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "150px",
                marginLeft: "-40px",
              }}
            >
              <div className="fs-10">DD-MM-YY</div>
              <div className="fs-10 text-muted">HH-MM</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "150px",
                marginLeft: "-30px",
              }}
            >
              <div className="fs-10">DD-MM-YY</div>
              <div className="fs-10 text-muted">HH-MM</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginLeft: "-5px",
              }}
            >
              <div className="fs-10">DD-MM-YY</div>
              <div className="fs-10 text-muted">HH-MM</div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable columns={columns} data={data} />
      </DataTableExtensions>
    </>
  );
};

export default BusinessProjectTableTest;
