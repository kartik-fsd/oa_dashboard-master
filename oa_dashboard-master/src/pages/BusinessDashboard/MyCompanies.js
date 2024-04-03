import React from "react";
import "./mycompanies.css";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import avatar from "../../../src/assets/images/users/avatar-1.jpg";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { AddCompanyModal } from "./Modals";
import { useHistory } from "react-router-dom";

const MyCompanies = () => {
  const history = useHistory();
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const tableCell = {
    profile: () => {
      return (
        <Row>
          <Col xs="auto">
            <img
              src={avatar}
              alt="img"
              className="rounded-circle avatar-sm"
            ></img>
          </Col>
          <Col className="d-flex flex-grow-1">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  wordBreak: "break-word",
                  margin: "0px",
                  fontWeight: "600",
                }}
              >
                dvbdhjfbgfgfgfhgg
              </p>
              <p style={{ margin: "0px" }}>qwertfdd</p>
            </div>
          </Col>
        </Row>
      );
    },
    id: () => {
      return (
        <div
          style={{
            width: "100px",
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
          uen1234456
        </div>
      );
    },
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => "UEN213443",
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <tableCell.id />,
    },

    {
      name: "profile",
      selector: (row) => "profile",
      width: "300px",
      sortable: true,
      center: true,

      cell: (d) => (
        <div style={{ flexGrow: "1", padding: "6px" }}>
          <tableCell.profile />
        </div>
      ),
    },
    {
      name: "Created by",
      selector: (row) => "Created by",
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <p>PiyushKumar</p>,
    },
    {
      name: "Date",
      selector: (row) => "08-12-2022",
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <p>08-12-2022</p>,
    },
    {
      name: "Total Clients",
      selector: (row) => 0,
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => 0,
    },
    {
      name: "Total GST",
      selector: (row) => 0,
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => 0,
    },
  ];

  const handleAddCompany = () => {
    toggle();
  };

  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        {/* <Container fluid>
          <div>
            <Row style={{ marginBottom: "12px" }}>
              <Col xs={6}>
                <div
                  style={{
                    width: "60px",
                    padding: "10px 8px",
                    borderRadius: "2px",
                    fontWeight: "600",
                    fontSize: "14px",
                    background: "#236b97",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      border: "2px solid #fff",
                      padding: "3px 4px",
                      background: "#0d4263",
                    }}
                  >
                    227
                  </span>
                </div>
              </Col>
              <Col xs={6} style={{ display: "flex",justifyContent:'flex-end',gap:'12px' }}>
                <div
                  className="input-group flex-nowrap"
                  style={{ width: "250px" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                  />
                  <span className="input-group-text" id="addon-wrapping"><i className="bx bx-search-alt-2 fs-21" ></i></span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm custom-toggle active"
                  data-bs-toggle="button"
                >
                  <span className="icon-on fs-14">
                    <i
                      className="ri-add-line align-bottom me-1 fs-14"
                      
                    ></i>
                    Add Company
                  </span>
                </button>
              </Col>
            </Row>
            <Card
              style={{ borderLeft: "4px solid #236b97", marginBottom: "10px" }}
            >
              <CardBody>
                <Row>
                  <Col
                    xs="auto"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "110px",
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
                      uen1234456
                    </div>
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col xs="auto">
                        <img
                          src={avatar}
                          alt="img"
                          className="rounded-circle avatar-md"
                        />
                      </Col>

                      <Col
                        style={{
                          display: "flex",
                          flexGrow: "1",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            wordBreak: "break-word",
                            color: "#37769f",
                            fontSize: "12px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          asdfghjsdfghjdfghjkdfghjksdsfghjghghj
                        </p>
                        <p
                          style={{
                            wordBreak: "break-word",
                            fontWeight: "300",
                            fontSize: "12px",
                            color: "#696969",
                            margin: "0px",
                          }}
                        >
                          xcfgsdf
                        </p>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    xs={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>
                        Created by:
                      </span>
                      <span style={{ marginLeft: "4px" }}>PiyushKumar</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>
                        Date:
                      </span>
                      <span style={{ marginLeft: "4px" }}>
                        21-12-2023 03:26PM
                      </span>
                    </div>
                  </Col>
                  <Col
                    xs={2}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      flexGrow: "1",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>
                        Total Clients:
                      </span>
                      <span style={{ marginLeft: "4px" }}>0</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>
                        Total GST:
                      </span>
                      <span style={{ marginLeft: "4px" }}>0</span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Container> */}
        <Card>
          <CardHeader
            className="d-flex justify-content-between"
            style={{ marginTop: "10px", padding: "13px" }}
          >
            <h5 className="card-title mb-0 fs-20">MyCompanies</h5>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn btn-primary" onClick={handleAddCompany}>
                <i
                  className="ri-add-line align-middle me-1 "
                  style={{ marginBottom: "30px" }}
                ></i>
                Add Company
              </button>
              <div
                className="input-group flex-nowrap"
                style={{ width: "250px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                />
                <span className="input-group-text" id="addon-wrapping">
                  <i className="bx bx-search-alt-2 fs-21"></i>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardBody style={{ paddingTop: "25px" }}>
            <DataTable
              columns={columns}
              data={[{}]}
              pagination
              onRowClicked={(d) =>
                history.push("/business-dashboard/my-companies/123")
              }
            />
          </CardBody>
        </Card>
        <AddCompanyModal modal={modal} toggle={toggle} />
      </div>
    </>
  );
};

export default MyCompanies;
