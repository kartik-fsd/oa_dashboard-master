import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import img from "../../../assets/images/users/avatar-1.jpg";
import classnames from "classnames";
import { api } from "../../../globalConfig";
import { company_details } from "../../../assets/utils/Business";
import axios from "axios";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { useParams } from "react-router-dom";
import CompanyDetEdit from "./CompanyDetEdit";
import CompanyAddressEdit from "./CompanyAddressEdit";
import FounderDetEdit from "./FounderDetEdit";
import EditCompMod from "./EditCompMod";
import AboutCompMod from "./AboutCompMod";
import AddClientMod from "../BusinessLeads/AddClientMod";
import AddgstDet from "./AddgstDet";

const CompDet = () => {
  const [cardHeaderTab, setcardHeaderTab] = useState("1");
  const [clientDet, setClientDet] = useState({});
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [gstTab, setGstTab] = React.useState(false);
  const [clientTab, setClientTab] = React.useState([]);
  const [check, setCheck] = React.useState(false);

  console.log(clientDet, "fasak");
  const { id } = useParams();

  const cardHeaderToggle = (tab) => {
    if (cardHeaderTab !== tab) {
      setcardHeaderTab(tab);
    }
  };

  React.useEffect(() => {
    const link = api.ONX_URL + company_details;

    axios
      .get(link, { params: { company_id: id } })
      .then((res) => {
        setClientDet(res.data.client_details);
        setClientTab(res.data.client_details.clients);
        console.log(res.data.client_details, "checkingapi");
      })
      .catch((err) => console.log(err));
  }, [check]);

  return (
    <div className="page-content">
      <BreadCrumb title="Company" pageTitle="Sow" />
      <Row>
        <Col lg={12}>
          <Card className="mt-n3">
            <div>
              <CardBody className="pb-0 px-4 py-4">
                <Row className="mb-3">
                  <div className="col-md">
                    <Row className="align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            {
                              <img
                                src={clientDet.brand_logo}
                                alt=""
                                className="avatar-md"
                                style={{ borderRadius: "50%" }}
                              />
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div>
                          <div className="d-flex gap-4 align-items-start">
                            <h4
                              className="fw-bold "
                              style={{ fontSize: "15px", color: "#b83016" }}
                            >
                              {clientDet.company_name}
                            </h4>
                            {/* <span className="badge text-bg-primary">
                              {clientDet.com_status}
                            </span> */}
                            <span
                              className="badge badge-soft"
                              style={{ backgroundColor: "#f07d47" }}
                            >
                              {clientDet.company_unique_id}
                            </span>
                            <div style={{ marginLeft: "auto" }}>
                              <i
                                className=" ri-edit-box-line fs-18 "
                                style={{ cursor: "pointer", color: "#b83016" }}
                                onClick={() => {
                                  setOpen4(!open4);
                                }}
                              ></i>
                            </div>
                          </div>

                          <div>{clientDet.brand_name}</div>
                          {/* <div className="hstack gap-3 flex-wrap mt-3 fs-11">
                            <div>
                              Company ID :{" "}
                              <span
                                className="fw-medium text-info"
                                style={{ cursor: "pointer" }}
                                // onClick={() => tog_animationFlip("compId")}
                              >
                                2345
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              <div>
                                Agreement ID :&nbsp;
                                <span
                                  className="fw-medium  text-info"

                                  // onClick={() => tog_animationFlip("agreeId")}
                                  //   onClick={() => set_modal_edit(true)}
                                >
                                  23456
                                </span>
                              </div>
                            </div>
                            <div className="vr"></div>

                            <div>
                              Lead ID :{" "}
                              <span className="fw-medium text-info">12345</span>
                            </div>
                            <div className="vr"></div>

                            <div>
                              Client ID :{" "}
                              <span className="fw-medium text-info">12345</span>
                            </div>
                            <div className="vr"></div>

                            <div>
                              Project ID :{" "}
                              <span className="fw-medium text-info">12345</span>
                            </div>
                            <div className="vr"></div>

                            <div>
                              Commercial Bond ID :{" "}
                              <span className="fw-medium text-info">12345</span>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div>
                        <hr
                          className="dashed-line"
                          style={{ border: "1px dashed grey" }}
                        />
                      </div>
                    </Row>
                  </div>
                  <Col xs="12">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                        Company Details
                      </h6>

                      <i
                        className=" ri-edit-box-line fs-18 "
                        style={{ cursor: "pointer", color: "#b83016" }}
                        onClick={() => {
                          setOpen1(!open1);
                        }}
                      ></i>
                    </div>
                    <div className="d-flex">
                      <div
                        className="d-flex flex-column gap-2 "
                        style={{ flex: "1 0" }}
                      >
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            Entity Type
                          </p>
                          <p
                            className="m-0 fs-12 text-dark "
                            style={{ fontWeight: "500" }}
                          >
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.entity_type}
                          </p>
                        </div>
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            Industry Type
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.industry_type}
                          </p>
                        </div>
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            Website
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.webiste_link}
                          </p>
                        </div>
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            TDS
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.company_tds}
                          </p>
                        </div>
                      </div>
                      <div style={{ flex: "1 0" }}>
                        <div className="d-flex flex-column gap-2 ">
                          <div className="fs-11 d-flex gap-3">
                            <p className="m-0" style={{ width: "150px" }}>
                              {clientDet.entity_type == "Private Limited"
                                ? "Company Registration no"
                                : clientDet.entity_type == "Public Limited"
                                ? "Company Registration no"
                                : clientDet.entity_type == "Proprietorship"
                                ? "GST no"
                                : clientDet.entity_type == "LLP"
                                ? "LLP no"
                                : "NGO no"}
                            </p>
                            <p
                              className="m-0 fs-12 text-dark "
                              style={{ fontWeight: "500" }}
                            >
                              &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                              {clientDet.com_status}
                            </p>
                          </div>
                          <div className="fs-11 d-flex gap-3">
                            <p className="m-0" style={{ width: "150px" }}>
                              Funding Status
                            </p>
                            <p className="m-0" style={{ fontWeight: "500" }}>
                              &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                              {clientDet.funding_status}
                            </p>
                          </div>
                          <div className="fs-11 d-flex gap-3">
                            <p className="m-0" style={{ width: "150px" }}>
                              Linkedin
                            </p>
                            <p className="m-0" style={{ fontWeight: "500" }}>
                              &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                              {clientDet.company_linkedIn}
                            </p>
                          </div>
                          <div className="fs-11 d-flex gap-3">
                            <p className="m-0" style={{ width: "150px" }}>
                              Company Start Date
                            </p>
                            <p className="m-0" style={{ fontWeight: "500" }}>
                              &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                              {clientDet.start_date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <hr
                        className="dashed-line"
                        style={{ border: "1px dashed grey" }}
                      />
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                        Company Description
                      </h6>
                      <i
                        className=" ri-edit-box-line fs-18 "
                        style={{ cursor: "pointer", color: "#b83016" }}
                        onClick={() => {
                          setOpen5(!open5);
                        }}
                      ></i>
                    </div>

                    <p className="fs-12" style={{ color: "#939393" }}>
                      {clientDet.company_discription}
                    </p>
                    <div className="mt-4 mb-4">
                      <hr
                        className="dashed-line "
                        style={{ border: "1px dashed grey" }}
                      />
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                        Comapny Address
                      </h6>
                      <i
                        className=" ri-edit-box-line fs-18 "
                        style={{ cursor: "pointer", color: "#b83016" }}
                        onClick={() => {
                          setOpen2(!open2);
                        }}
                      ></i>
                    </div>

                    <div className="d-flex">
                      <div
                        className="d-flex flex-column gap-2 "
                        style={{ flex: "1 0" }}
                      >
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            Pincode
                          </p>
                          <p
                            className="m-0 fs-12 text-dark "
                            style={{ fontWeight: "500" }}
                          >
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.company_pin}
                          </p>
                        </div>
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            City
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.company_city}
                          </p>
                        </div>
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "80px" }}>
                            State
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.company_state}
                          </p>
                        </div>
                      </div>
                      <div style={{ flex: "1 0" }}>
                        <div className="d-flex flex-column gap-2 ">
                          <div className="fs-11 d-flex gap-3">
                            <p className="m-0" style={{ width: "120px" }}>
                              Address
                            </p>
                            <p
                              className="m-0 fs-12 text-dark "
                              style={{ fontWeight: "500", width: "421px" }}
                            >
                              &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                              {clientDet.company_address}
                            </p>
                          </div>
                          <div className="fs-11 d-flex gap-3">
                            <p className="m-0" style={{ width: "120px" }}>
                              Country
                            </p>
                            <p className="m-0" style={{ fontWeight: "500" }}>
                              &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                              {clientDet.company_country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <hr
                        className="dashed-line"
                        style={{ border: "1px dashed grey" }}
                      />
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                        GST Details
                      </h6>
                      <i
                        className=" ri-edit-box-line fs-18 "
                        style={{ cursor: "pointer", color: "#b83016" }}
                        onClick={() => {
                          setOpen6(!open6);
                        }}
                      ></i>
                    </div>

                    <div className="table-responsive">
                      <table
                        className="table "
                        // style={{ tableLayout: "fixed" }}
                      >
                        <thead>
                          <tr
                            className="fs-11"
                            style={{ background: "#f0f4ff" }}
                          >
                            <th scope="col">GST</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Pincode</th>
                            <th scope="col">Country</th>
                            {/* <th scope="col"></th> */}
                          </tr>
                        </thead>
                        <tbody className="fs-11">
                          {clientDet.gsts?.map((item) => {
                            return (
                              <>
                                <tr>
                                  <td scope="row">{item.gst}</td>
                                  <td
                                    style={{
                                      // display: "block",
                                      width: "400px",
                                      overflowWrap: "break-word",
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {item.address}
                                  </td>
                                  <td>{item.city}</td>
                                  <td>{item.state}</td>
                                  <td>{item.pincode}</td>
                                  <td>{item.country}</td>
                                  {/* <td>
                                    {gstTab ? (
                                      <i
                                        className=" ri-arrow-up-s-line fs-18"
                                        onClick={() => setGstTab(!gstTab)}
                                      ></i>
                                    ) : (
                                      <i
                                        className=" ri-arrow-down-s-line fs-18"
                                        onClick={() => {
                                          setGstTab(!gstTab);
                                          setClientTab(item.client);
                                        }}
                                      ></i>
                                    )}
                                  </td> */}
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 mb-4">
                      <hr
                        className="dashed-line"
                        style={{ border: "1px dashed grey" }}
                      />
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                        Client Details
                      </h6>
                      <i
                        className=" ri-edit-box-line fs-18 "
                        style={{ cursor: "pointer", color: "#b83016" }}
                        onClick={() => {
                          setOpen3(!open3);
                        }}
                      ></i>
                    </div>
                    <table className="table table-nowrap fs-11" style={{}}>
                      <thead>
                        <tr style={{ background: "#f0f4ff" }}>
                          <th scope="col">Client Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Designation</th>
                          <th scope="col">Linkedin</th>
                        </tr>
                      </thead>
                      <tbody className="fs-11">
                        {clientTab?.map((item) => {
                          return (
                            <>
                              <tr>
                                <td scope="row">{item.client_name}</td>
                                <td>{item.client_email}</td>
                                <td>{item.client_phone}</td>
                                <td>{item.client_designation}</td>
                                <td>
                                  <a
                                    href={item.client_linkedIn}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className=" bx bxl-linkedin-square fs-21 text-secondary ms-4"></i>
                                  </a>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="mt-4 mb-4">
                      <hr
                        className="dashed-line"
                        style={{ border: "1px dashed grey" }}
                      />
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                        Founder Details
                      </h6>
                      <i
                        className=" ri-edit-box-line fs-18 "
                        style={{ cursor: "pointer", color: "#b83016" }}
                        onClick={() => {
                          setOpen7(!open7);
                        }}
                      ></i>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-nowrap fs-11" style={{}}>
                        <thead>
                          <tr style={{ background: "#f0f4ff" }}>
                            <th scope="col">Founder Name</th>
                            <th scope="col">Founder Mail ID</th>
                            <th scope="col">Founder Contact</th>
                            <th scope="col">Founder Linkedin</th>
                          </tr>
                        </thead>
                        <tbody className="fs-11">
                          {clientDet.founder_details?.map((item) => {
                            return (
                              <>
                                <tr>
                                  <td scope="row">{item.founder_name}</td>
                                  <td>{item.founder_email}</td>
                                  <td>{item.contact}</td>
                                  <td>
                                    <a href={item.linkedIn} target="_blank">
                                      <i className=" bx bxl-linkedin-square fs-21 text-secondary ms-4"></i>
                                    </a>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 mb-4">
                      <hr
                        className="dashed-line"
                        style={{ border: "1px dashed grey" }}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
      <CompanyDetEdit
        open={open1}
        setOpen={setOpen1}
        data={clientDet}
        check={check}
        setCheck={setCheck}
      />
      <CompanyAddressEdit
        open={open2}
        setOpen={setOpen2}
        data={clientDet}
        check={check}
        setCheck={setCheck}
      />
      <FounderDetEdit
        open={open7}
        setOpen={setOpen7}
        data={clientDet}
        check={check}
        setCheck={setCheck}
      />
      <AddClientMod
        open={open3}
        setOpen={setOpen3}
        companyName={clientDet.company_name}
        check={check}
        setCheck={setCheck}
      />
      <AddgstDet
        open={open6}
        setOpen={setOpen6}
        companyGst={clientDet.gst}
        check={check}
        setCheck={setCheck}
      />
      <EditCompMod
        open={open4}
        setOpen={setOpen4}
        data={clientDet}
        check={check}
        setCheck={setCheck}
      />
      <AboutCompMod
        open={open5}
        setOpen={setOpen5}
        data={clientDet}
        check={check}
        setCheck={setCheck}
      />
    </div>
  );
};

export default CompDet;
