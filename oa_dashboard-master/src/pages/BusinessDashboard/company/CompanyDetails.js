import React, { useRef, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import BreadCrumb from "../../../components/common/BreadCrumb";

const CompanyDetails = () => {
  const [founderdet, setFounderdet] = React.useState([{ id: 0 }]);
  const [check, setCheck] = React.useState(false);
  const hiddenFile = React.useRef(null);
  const [activeTab, setactiveTab] = useState(1);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [edit, setEdit] = useState(true);

  const inputRef = useRef();

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
    <div className="page-content">
      <BreadCrumb title=" Company" pageTitle="Sow" />
      <div>
        {/* <Card>
          <CardBody>
            <div
              
              
            >
              <div className="d-flex flex-column justify-content-center align-items-center mb-4 p-4"></div>

              <form onSubmit={handleCheck}>
                <Row>
                  <Col>
                    <div>
                      <label htmlFor="entity" className="form-label">
                        Select Entity Type
                      </label>

                      <div className="input-group">
                        <select className="form-select" id="entity" required>
                          <option selected>Select</option>

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
                        Enter NGO Number
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
                          className="btn" style={{
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
                          type="submit"
                          id="button-addon1"
                          // onClick={handleCheck}
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
        </Card> */}

        <Card>
          <CardBody>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-3">Company Details</h5>
                <div>
                  <i
                    className=" ri-edit-box-line fs-24 "
                    style={{ cursor: "pointer", color: "#b83016" }}
                    onClick={() => {
                      setEdit(false);
                      inputRef.current.focus();
                    }}
                  ></i>
                </div>
              </div>
              <div>
                <img
                  src={avatar}
                  alt="img"
                  className="rounded-circle avatar-md"
                />

                <button
                  type="button"
                  className="btn  btn-label waves-effect waves-light "
                  style={{
                    marginLeft: "16px",
                    paddingLeft: "14px",
                    backgroundColor: "#ec5c24",
                  }}
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
                    <label htmlFor="entity" className="form-label">
                      Select Entity Type
                    </label>

                    <div className="input-group">
                      <select
                        className="form-select"
                        id="entity"
                        required
                        style={{ color: "#bdbcbc" }}
                      >
                        <option>Select</option>

                        <option selected={false} value="1">
                          One
                        </option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </Col>
                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="entity" className="form-label" required>
                      Enter NGO Number
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={"jwnswj"}
                        readOnly={true}
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        required
                        style={{ color: "#bdbcbc" }}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs="6" className="mb-4">
                  <div>
                    <label htmlFor="company" className="form-label">
                      Company Name
                    </label>
                    <input
                      defaultValue={"company name"}
                      type="text"
                      className="form-control"
                      id="company"
                      placeholder=""
                      readOnly={edit}
                      ref={inputRef}
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
                    <label htmlFor="ind" className="form-label">
                      Industry Type
                    </label>

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
                    <label htmlFor="fund" className="form-label">
                      Funding Status
                    </label>

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
                <Col xs="12">
                  <div>
                    <label htmlFor="startdate" className="form-label">
                      About Company
                    </label>
                    <textarea style={{ width: "100%", height: "120px" }} />
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div
              style={
                {
                  //   padding: "21px",
                  //   paddingBottom: "32px",
                  //   border: "1px solid #e3c8fc",
                  //   marginTop: "24px",
                }
              }
            >
              <h5 className="mb-3">Company Address</h5>
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
                  className="btn btn-outline btn-label waves-effect waves-light w-xs px-2"
                  style={{ marginLeft: "10px", borderColor: "#ec5c24" }}
                >
                  <i className="bx bx-reset align-middle fs-14 me-1"></i>
                  Reset
                </button>
                <button
                  type="button"
                  className="btn  btn-label waves-effect waves-light w-xs px-2"
                  style={{ marginLeft: "10px", backgroundColor: "#ec5c24" }}
                >
                  <i className="bx bx-save align-middle me-1  fs-14 "></i>
                  Save
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div
              style={
                {
                  //   padding: "21px",
                  //   paddingBottom: "32px",
                  //   border: "1px solid #e3c8fc",
                  //   marginTop: "24px",
                }
              }
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Founder Details</h5>
                <button
                  type="button"
                  className="btn  waves-effect waves-light"
                  style={{ backgroundColor: "#ec5c24" }}
                  onClick={handleAddFounder}
                >
                  <i className=" ri-add-fill align-middle me-1"></i>
                  Add More
                </button>
              </div>

              {founderdet?.map((item) => {
                return (
                  <>
                    <Row className="mb-3">
                      <Col xs="6">
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
                      <Col xs="6">
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
                      <Col xs="6" className="mt-3">
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
                      <Col xs="6" className="mt-3">
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
                      {/* <Col xs="6" className="d-flex flexGrow-1">
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
                        </Col> */}
                      {/* <Col xs="6" className="d-flex align-items-center mt-4">
                          <i
                            className=" bx bx-x-circle text-danger"
                            style={{ fontSize: "26px" }}
                            onClick={() => handleFounderDel(item.id)}
                          ></i>
                        </Col> */}
                    </Row>
                  </>
                );
              })}
              {/* <div
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
                </div> */}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="table-responsive">
              <table className="table table-nowrap" style={{}}>
                <thead>
                  <tr style={{ background: "#f0f4ff" }}>
                    <th scope="col">Founder Name</th>
                    <th scope="col">Founder Mail ID</th>
                    <th scope="col">Founder Contact</th>
                    <th scope="col">Founder Linkedin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">Rahul Ramachandran</td>
                    <td>rahuka@gah.coms</td>
                    <td>1234567890</td>
                    <td>
                      <i className=" bx bxl-linkedin-square fs-21 text-secondary ms-4"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDetails;
