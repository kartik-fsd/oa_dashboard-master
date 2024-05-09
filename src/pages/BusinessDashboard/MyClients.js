import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import DataTable from "react-data-table-component";
import avatar from "../../../src/assets/images/users/avatar-1.jpg";
import { MyClientModals } from "./MyClientModals";

const MyClients = () => {
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleClientEdit = () => {
    setModal(!modal);
  };

  const tableCell = {
    profile: () => {
      return (
        <Row>
          <Col xs="auto">
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
                Dipanjan Banerjee
              </p>
              <p style={{ margin: "0px", opacity: "0" }}>qwertfdd</p>
            </div>
          </Col>
        </Row>
      );
    },
    company: () => {
      return (
        <>
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
        </>
      );
    },
  };

  const columns = [
    {
      name: "profile",
      selector: (row) => "profile",
      width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <tableCell.profile />,
    },

    {
      name: "Phone",
      selector: (row) => 1234567890,
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <p>1234567890</p>,
    },
    {
      name: "Email",
      selector: (row) => <p>example@gmail.com</p>,
      width: "200px",
      sortable: true,
      center: true,

      cell: (d) => <p>example@gamil.com</p>,
    },

    {
      name: "company",
      selector: (row) => "company",
      width: "300px",
      sortable: true,
      center: true,

      cell: (d) => (
        <div style={{ flexGrow: "1", padding: "6px" }}>
          <tableCell.company />
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
  ];

  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5 className="card-title mb-0 fs-20">MyClients</h5>
              <div style={{ display: "flex", gap: "12px" }}>
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
                  onClick={handleClientEdit}
                >
                  <i
                    className=" ri-edit-2-line align-middle me-1 "
                    style={{ marginBottom: "30px" }}
                  ></i>
                  Edit Client
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
                onRowClicked={(d) => ""}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
      <MyClientModals modal={modal} toggle={toggle} />
    </>
  );
};

export default MyClients;
