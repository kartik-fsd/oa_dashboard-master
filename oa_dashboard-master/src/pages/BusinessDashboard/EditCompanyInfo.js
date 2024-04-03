import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import avatar from "../../../src/assets/images/users/avatar-1.jpg";
import DataTable from "react-data-table-component";
import { AddClient, AddGst } from "./Modals";

const EditCompanyInfo = () => {
  const hiddenFile = React.useRef(null);
  const [check, setCheck] = React.useState(false);
  const [founderdet, setFounderdet] = React.useState([{ id: 0 }]);
  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const toggle2 = () => {
    setModal2(!modal2);
  };

  const handleAddGst = () => {
    setModal(!modal);
  };

  const handleAddClient = () => {
    setModal2(!modal2);
  };

  const gstSetModal = () => {
    setModal2(false);
    setModal(!modal);
  };
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

  const columns = [
    {
      name: "GST",
      selector: (row) => "gst",
      width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <div></div>,
    },

    {
      name: "Address",
      selector: (row) => 1234567890,
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <p>1234567890</p>,
    },
    {
      name: "City",
      selector: (row) => <p>example@gmail.com</p>,
      width: "200px",
      sortable: true,
      center: true,

      cell: (d) => <p>example@gamil.com</p>,
    },

    {
      name: "State",
      selector: (row) => "state",
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <p>PiyushKumar</p>,
    },
    {
      name: "Pincode",
      selector: (row) => "pincode",
      // width: "250px",
      sortable: true,
      center: true,

      cell: (d) => <p>08-12-2022</p>,
    },
    {
      name: "Country",
      selector: (row) => "country",
      // width: "300px",
      sortable: true,
      center: true,

      cell: (d) => <div></div>,
    },
  ];

  return (
    <div className="page-content">
      {/* <ToastContainer /> */}

      <Container fluid>
        <Card>
          <CardBody>
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
                        className="avatar-title rounded-circle bg-light text-primary"
                        style={{ fontSize: "24px", fontWeight: "600" }}
                      >
                        D
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div>
                    <span style={{ fontWeight: "600" }}>Company:</span>
                    <span style={{ marginLeft: "4px" }}>
                      Uengage Services Private Limited
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>Brand:</span>
                    <span style={{ marginLeft: "4px" }}>Uengage</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>Industry Type:</span>
                    <span style={{ marginLeft: "4px" }}>Foodtech</span>
                  </div>
                </Col>
                <Col xs={4}>
                  <div>
                    <span style={{ fontWeight: "600" }}>Company Phone:</span>
                    <span style={{ marginLeft: "4px" }}>1234567890</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>Comapny Email:</span>
                    <span style={{ marginLeft: "4px" }}>example@gmail.com</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "600" }}>Date:</span>
                    <span style={{ marginLeft: "4px" }}>
                      08-12-2023 03:26PM
                    </span>
                  </div>
                </Col>

                <Col xs={2}>
                  <div
                    style={{
                      width: "120px",
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
                    UEN123456789
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
                Edit Company
              </h5>
              <form>
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
                        Corporate Identification Number(CIN)
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
                Edit Founder Details
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
                      <Col xs="auto" className="d-flex align-items-center mt-4">
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
                <p className="text-center fs-16 font-weight-light">Add More</p>
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
                Edit About Company Details
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
                Edit Company Address Details
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
            <div
              style={{
                padding: "21px",
                paddingBottom: "32px",
                border: "1px solid #e3c8fc",
                marginTop: "24px",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-3" style={{ color: "#602994" }}>
                  GST Details
                </h5>
                <div className="d-flex ">
                  <div className="d-flex justify-content-end gap-2 ">
                    <button
                      type="button"
                      className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
                      onClick={handleAddGst}
                    >
                      <i className="bx bx-plus fs-16 me-2  "></i>
                      Add GST
                    </button>
                  </div>
                  <div className="d-flex justify-content-end gap-2 ">
                    <button
                      type="button"
                      className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
                      style={{ marginLeft: "10px" }}
                      onClick={handleAddClient}
                    >
                      <i className="bx bx-plus fs-16 me-2 "></i>
                      Add Client
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <DataTable
                  columns={columns}
                  data={[{}]}
                  pagination
                  onRowClicked={(d) => ""}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
      <AddGst modal={modal} toggle={toggle} />
      <AddClient modal={modal2} toggle={toggle2} gstModal={gstSetModal} />
    </div>
  );
};

export default EditCompanyInfo;
