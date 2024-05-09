import React from "react";
import "./fseTable.css";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import CountUp from "react-countup";

createTheme("solarized", {
  text: {
    primary: "black",
    secondary: "#b2b2b2",
  },
  background: {
    default: "#fff",
  },
  boxshadow: {
    default: "5px 5px 30px #DEDEDEBF",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#f1f1f1",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const NoFoTable = ({ data }) => {
  const Dropdownone = (d) => {
    return <></>;
  };

  const columns = [
    {
      name: "Profile",
      selector: (d) => d.profile_image,
      sortable: true,
      center: true,
      width: "150px",
      cell: (d) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
            gap: "12px",
          }}
        >
          <div
            style={{
              border:
                d.onboard_status == "none"
                  ? "2px solid #F4C459"
                  : d.onboard_status == "onboarded"
                  ? "2px solid green"
                  : d.onboard_status == "inactive"
                  ? "2px solid red"
                  : "2px solid blue",
              width: "70px",
              height: "70px",
              borderRadius: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ zIndex: "100" }}>
              {/* <Avatar
                alt="Profile"
                sx={{ width: 56, height: 56 }}
                src={
                  d.profile_image.length > 5
                    ? d.profile_image.substr(0, 4) === "http"
                      ? d.profile_image
                      : `https://isp.taskmo.in/fieldon_images/${d.profile_image}`
                    : window.location.origin + "/images/default_profile.svg"
                }
                className="profile_table_images"
              /> */}
              <img
                src={
                  d.profile_image.length > 5
                    ? d.profile_image.substr(0, 4) === "http"
                      ? d.profile_image
                      : `https://isp.taskmo.in/fieldon_images/${d.profile_image}`
                    : window.location.origin + "/user-dummy-img.jpg"
                }
                alt=""
                className="rounded-circle avatar-sm rofile_table_images"
                style={{ width: 60, height: 60 }}
              ></img>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "User id",
      selector: "user_id",
      cell: (d) => <div className="colName">{d.user_id}</div>,
      sortable: true,
      // center: true,
    },
    {
      name: "Request id",
      selector: "request_id",
      width: "80px",
      cell: (d) => <div className="colName">{d.request_id}</div>,
      sortable: true,
      // center: true,
    },
    {
      name: "Name",
      selector: "fse",
      cell: (d) => <div className="colName">{d.fse}</div>,
      sortable: true,
      center: true,
    },
    {
      name: "Mobile Number",
      selector: "fse_mob",
      cell: (d) => <div className="colNmae">{d.fse_mob}</div>,
      sortable: true,
      center: true,
    },
    {
      name: "Pan Number",
      selector: "pan_number",
      cell: (d) => <div className="colNmae">{d.pan_number}</div>,
      sortable: true,
      center: true,
    },
    {
      name: "DOJ",
      selector: "doj",
      cell: (d) => <div className="amt_table">{d.doj}</div>,
      sortable: true,
      center: true,
    },
    {
      name: "Lead Count",
      selector: "total_leads",
      width: "70px",
      cell: (d) => <div className="amt_table">{d.total_leads}</div>,
      sortable: true,
      center: true,
    },
    {
      name: "CPL",
      selector: "cpl",
      cell: (d) => <div className="amt_table">{d.cpl}</div>,
      sortable: true,
      center: true,
    },
    {
      name: "AMOUNT",
      selector: "total_payout",
      cell: (d) => <div className="amt_table">&#x20B9;{d.total_payout}</div>,
      sortable: true,
      center: true,
    },
  ];

  const dataTable = {
    columns,
    data: data && data?.leads,
  };
  return (
    <div>
      <Row style={{ gap: "" }}>
        <Col xs={"4"}>
          <Card className="card-animate overflow-hidden text-dark">
            <CardBody style={{ zIndex: "1" }}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ fontWeight: "600" }}
              >
                <p style={{ margin: "0px" }}>Total FSE</p>
                <p style={{ margin: "0px" }}>
                  <CountUp
                    start={0}
                    end={data?.no_of_users}
                    decimals={0}
                    duration={2}
                  />
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={"4"}>
          <Card className="card-animate overflow-hidden text-dark">
            <CardBody style={{ zIndex: "1" }}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ fontWeight: "600" }}
              >
                <p style={{ margin: "0px" }}>Total Lead</p>
                <p style={{ margin: "0px" }}>
                  <CountUp
                    start={0}
                    end={data?.total_leads}
                    decimals={0}
                    duration={2}
                  />
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={"4"}>
          <Card className="card-animate overflow-hidden text-dark">
            <CardBody style={{ zIndex: "1" }}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ fontWeight: "600" }}
              >
                <p style={{ margin: "0px" }}>Total Amount</p>
                <p style={{ margin: "0px" }}>
                  <CountUp
                    start={0}
                    end={data?.total_amount}
                    decimals={0}
                    duration={3}
                  />
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card>
        <CardHeader>
          <h4>FSE Table</h4>
        </CardHeader>

        <CardBody>
          <DataTableExtensions
            {...dataTable}
            filterPlaceholder={`Search`}
            print={false}
            export={false}
          >
            <DataTable
              columns={columns}
              data={dataTable}
              defaultSortFieldId={1}
              pagination
              paginationPerPage={5}
              theme="solarized"
            />
          </DataTableExtensions>
        </CardBody>
      </Card>
    </div>
  );
};

export default NoFoTable;
