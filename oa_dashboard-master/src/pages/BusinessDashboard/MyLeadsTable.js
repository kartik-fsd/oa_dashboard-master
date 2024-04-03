import axios from "axios";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink, useHistory } from "react-router-dom";
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
} from "reactstrap";
import { business } from "../../globalConfig";
import classnames from "classnames";
import "./MyLeadsTable.css";

const MyLeadsTable = ({ dataone }) => {
  const history = useHistory();
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [progressbarvalue, setprogressbarvalue] = useState(50);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        // color: "red",
        background: "#CAE6E2",
        height: "70px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        // borderRadius: "44px",
      },
    },
    table: {
      style: {
        minHeight: "400px",
      },
    },
  };

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

  const api =
    "https://admin-api.taskmo.co/api" +
    "/business-leads/all/all/all/all/all/__search__/1";
  let API_KEY = localStorage.getItem("businessToken");
  const tokenEnter = {
    headers: {
      "x-auth-token": API_KEY,
    },
  };
  axios
    .get(api, tokenEnter)
    .then((res) => {})
    .catch((err) => console.log(err, "testingerr"));

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      width: "140px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      width: "140px",
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
      width: "160px",
    },
    {
      name: "Created by",
      selector: (row) => row.createdby,
    },
    {
      name: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ marginLeft: "30px" }}>created on </div>
            <div style={{ display: "flex", gap: "100px" }}>
              <div>D</div>
              <div>T</div>
            </div>
          </div>
        </div>
      ),
      width: "180px",
      selector: (row) => row.createdon,
      cell: (d) => (
        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "80px" }}>{d.createdon?.split(" ")[0]}</div>
            <div style={{ width: "70px" }}>{d.createdon?.split(" ")[1]}</div>
          </div>
        </div>
      ),
    },
    {
      name: "company",
      selector: (row) => row.year,
      center: true,
      width: "180px",
      cell: (d) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <img
              src="assets/images/users/avatar-2.jpg"
              alt=""
              className="rounded-circle avatar-xxs"
            />
          </div>
          <div>{d.companyname}</div>
        </div>
      ),
    },
    {
      name: (
        <div>
          <div style={{ marginLeft: "70px" }}>Lead Journey</div>
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginLeft: "13px",
              marginTop: "5px",
            }}
          >
            <div style={{ fontSize: "9px" }}>Nurturing</div>
            <div style={{ fontSize: "9px" }}>Maturing</div>
            <div style={{ fontSize: "9px" }}>Hot Lead</div>
          </div>
        </div>
      ),
      selector: (row) => row.year,
      width: "300px",
      cell: (d) => (
        <div className="w-100" style={{ padding: "20px" }}>
          <div className="progress-nav" style={{ width: "60%" }}>
            <Progress
              value={progressbarvalue}
              style={{ height: "3px", marginTop: "-0px" }}
            />

            <Nav
              className="nav-pills progress-bar-tab custom-nav"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  // className={"rounded-pill bg-red"}
                >
                  <div className="avatar-group-item">
                    <div className="avatar-xs">
                      <div className="avatar-title rounded-circle bg-light text-primary">
                        1
                      </div>
                    </div>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: activeTab === 2,
                      done: activeTab <= 4 && activeTab > 1,
                    },
                    "rounded-pill"
                  )}
                >
                  <div className="avatar-group-item">
                    <div className="avatar-xs">
                      <div className="avatar-title rounded-circle bg-light text-primary">
                        2
                      </div>
                    </div>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: activeTab === 3,
                      done: activeTab <= 4 && activeTab > 2,
                    },
                    "rounded-pill"
                  )}
                >
                  <div className="avatar-group-item">
                    <div className="avatar-xs">
                      <div className="avatar-title rounded-circle bg-light text-primary">
                        3
                      </div>
                    </div>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </div>

          <div className="d-flex w-100 justify-content-between">
            {/* <p className="m-0">class1</p>
            <p className="m-0">clasw 2</p>
            <p className="m-0"> lcass 3</p> */}
          </div>
          {/* <TabContent activeTab={activeTab}>
            <TabPane style={{ width: "100%" }} tabId={1}>
              <div>sample1</div>
            </TabPane>

            <TabPane style={{ width: "100%" }} tabId={2}>
              <div>sample2</div>
            </TabPane>

            <TabPane style={{ width: "100%" }} tabId={3}>
              <div>sample3</div>
            </TabPane>
          </TabContent> */}
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
    {
      id: 1,
      name: "Beetlejuice",
      phone: "12345654543",
      email: "testing@test.com",
      createdby: "testingperson",
      logo: "https//google.com",
      companyname: "testing co",
      year: "1988",
      createdon: "12-02-2022 12:00pm",
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        onRowClicked={() => history.push("/business-dashboard/my-leads/123")}
        customStyles={customStyles}
        fixedHeader
        pagination
      />
    </div>
  );
};

export default MyLeadsTable;
