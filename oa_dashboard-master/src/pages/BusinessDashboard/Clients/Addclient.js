import React from "react";
import { Card, CardBody, Col, Label, Row } from "reactstrap";
import BreadCrumb from "../../../components/common/BreadCrumb";
import Flatpickr from "react-flatpickr";
import { api } from "../../../globalConfig";
import { client_details } from "../../../assets/utils/Business";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { isError } from "lodash";

const Addclient = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsErr] = React.useState(false);
  const [clientDet, setClientDet] = React.useState({});
  const { id: clientId } = useParams();
  const defaultDate = moment(clientDet.client_since).format("YYYY-MM-DD");

  React.useEffect(() => {
    const link = api.TASKMO_URL + client_details;
    setIsLoading(true);
    axios
      .get(link, { params: { client_id: clientId } })
      .then((res) => {
        setIsLoading(false);
        setClientDet(res.data.client_details);
      })
      .catch((err) => setIsErr(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <>...loading</>
  ) : isError ? (
    <>something went wrong</>
  ) : (
    <div className="page-content">
      <BreadCrumb title="Add Client" pageTitle="Sow" />
      {/* <div
        style={
          {
              padding: "21px",
              paddingBottom: "32px",
              border: "1px solid #e3c8fc",
            marginTop: "24px",
          }
        }
      >
        <h5 className="mb-3" style={{ color: "#602994" }}>
          Add New Client
        </h5>
        <Row>
          <Col xs={8}>
            <div>
              <label htmlFor="entity" className="form-label" required>
                Email Address
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
                >
                  Submit
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div> */}
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
            <h5 className="mb-3">Client Personal Details </h5>

            <Row className="mt-4">
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="clt" className="form-label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clt"
                    placeholder=""
                    defaultValue={clientDet.client_name}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="phn" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phn"
                    placeholder=""
                    defaultValue={clientDet.client_phone}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="desg" className="form-label">
                    Mail Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desg"
                    placeholder=""
                    defaultValue={clientDet.client_email}
                    readOnly
                    style={{ color: "grey" }}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="link" className="form-label">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    placeholder=""
                    defaultValue={clientDet.client_linkedIn}
                  />
                </div>
              </Col>
              {/* <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="startdate" className="form-label">
                    Date
                  </label>
                  <input type="date" className="form-control" id="startdate" />
                </div>
              </Col>

              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="comp" className="form-label">
                    Company
                  </label>

                  <div className="input-group">
                    <select className="form-select" id="comp">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <label htmlFor="comp" className="form-label">
                    GST
                  </label>

                  <div className="input-group">
                    <select className="form-select" id="comp">
                      <option value="" selected>
                        Choose GST
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div id="passwordHelpBlock" className="form-text">
                    <span>
                      * If not available
                      <span
                        style={{
                          textDecoration: "underline  ",
                          color: "#561b8b",
                          cursor: "pointer",
                        }}
                        // onClick={handleGstModal}
                      >
                        click here
                      </span>
                      to add new GST
                    </span>
                  </div>
                </div>
              </Col> */}
            </Row>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h5 className="mb-3">Client Professional Details</h5>
          <Row>
            <Col xs="6" className="mb-4">
              <div>
                <label htmlFor="comp" className="form-label">
                  Designation
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="link"
                  placeholder=""
                  defaultValue={clientDet.client_designation}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Label className="form-label ">Since</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    defaultDate: [defaultDate],
                  }}
                  onChange={(e) => console.log(e[0], "calendar")}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h5 className="mb-3">Company Details</h5>
          <Row>
            <Col xs="6" className="mb-4">
              <div>
                <label htmlFor="comp" className="form-label">
                  Choose Company
                </label>

                <div className="input-group">
                  <select className="form-select" id="comp">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Label className="form-label ">Gst</Label>
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  placeholder=""
                  defaultValue={clientDet.gst}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div className="d-flex justify-content-end gap-2 ">
        {/* <button
          type="button"
          className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
          style={{ marginLeft: "10px" }}
        >
          <i className="bx bx-reset fs-16 me-2"></i>
          Reset
        </button> */}
        <button
          type="button"
          className="btn  btn-label waves-effect waves-light w-xs px-2"
          style={{ marginLeft: "10px", background: "#ec5c24" }}
        >
          <i className=" ri-arrow-down-line align-middle fs-14 ms-1 "></i>
          Update
        </button>
      </div>
    </div>
  );
};

export default Addclient;
