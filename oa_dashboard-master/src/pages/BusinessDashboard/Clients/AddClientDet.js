import axios from "axios";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { client_details } from "../../../assets/utils/Business";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { api } from "../../../globalConfig";
import ClientPers from "./ClientPers";
import ClientProf from "./ClientProf";
import Compantdetils from "./Compantdetils";

const AddClientDet = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsErr] = React.useState(false);
  const [clientDet, setClientDet] = React.useState({});
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const { id: clientId } = useParams();
  console.log(clientDet, "checking");
  const defaultDate = moment(clientDet?.client_since).format("YYYY-MM-DD");
  console.log(clientDet?.client_since, defaultDate, "checkonit");
  console.log(defaultDate, "idd");

  console.log(clientDet, "datadetaial");

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
  }, [check]);
  return (
    <div className="page-content">
      <BreadCrumb title="Client Details" pageTitle="Sow" />
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
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
                    <div className="d-flex gap-4 align-items-center ">
                      <h4
                        className="fw-bold text-primary m-0"
                        style={{ fontSize: "15px" }}
                      >
                        {clientDet.company_name}
                      </h4>
                      {/* <span className="badge text-bg-primary">
                              {clientDet.com_status}
                            </span> */}
                      <span className="badge badge-soft-primary">
                        {clientDet.company_unique_id}
                      </span>
                      <div style={{ marginLeft: "auto" }}>
                        <i
                          className=" ri-edit-box-line fs-18 text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpen3(!open3);
                          }}
                        ></i>
                      </div>
                    </div>

                    <div>
                      {clientDet.brand_name}
                      <p className="m-0 mt-1 fs-11 text-muted">
                        {clientDet.gst}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <hr
                    className="dashed-line"
                    style={{ border: "1px dashed grey" }}
                  />
                </div>
                <Col xs="12">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                      Client Personal Details
                    </h6>
                    <i
                      className=" ri-edit-box-line fs-18 text-primary"
                      style={{ cursor: "pointer" }}
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
                      <div className="fs-11 d-flex gap-3 align-items-centertificationDropdown`.">
                        <p className="m-0" style={{ width: "80px" }}>
                          Client Name
                        </p>
                        <p
                          className="m-0 fs-12 text-dark "
                          style={{ fontWeight: "500" }}
                        >
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {clientDet.client_name}
                        </p>
                        <span className="badge badge-soft-primary">
                          {clientDet.client_unique_id}
                        </span>
                      </div>
                      <div className="fs-11 d-flex gap-3">
                        <p className="m-0" style={{ width: "80px" }}>
                          Mail ID
                        </p>
                        <p className="m-0" style={{ fontWeight: "500" }}>
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {clientDet.client_email}
                        </p>
                      </div>
                      {/* <div className="fs-11 d-flex gap-3">
                        <p className="m-0" style={{ width: "80px" }}>
                          State
                        </p>
                        <p className="m-0" style={{ fontWeight: "500" }}>
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {clientDet.company_state}
                        </p>
                      </div> */}
                    </div>
                    <div style={{ flex: "1 0" }}>
                      <div className="d-flex flex-column gap-2 ">
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "120px" }}>
                            Phone
                          </p>
                          <p
                            className="m-0 fs-12 text-dark "
                            style={{ fontWeight: "500", width: "421px" }}
                          >
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.client_phone}
                          </p>
                        </div>
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "120px" }}>
                            Linkedin
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.client_linkedIn}
                          </p>
                        </div>
                        {/* <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "120px" }}>
                            City
                          </p>
                          <p className="m-0" style={{ fontWeight: "500" }}>
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.company_city}
                          </p>
                        </div> */}
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
                      Client Professional Details
                    </h6>
                    <i
                      className=" ri-edit-box-line fs-18 text-primary"
                      style={{ cursor: "pointer" }}
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
                          Designation
                        </p>
                        <p
                          className="m-0 fs-12 text-dark "
                          style={{ fontWeight: "500" }}
                        >
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {clientDet.client_designation}
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: "1 0" }}>
                      <div className="d-flex flex-column gap-2 ">
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "120px" }}>
                            Since
                          </p>
                          <p
                            className="m-0 fs-12 text-dark "
                            style={{ fontWeight: "500", width: "421px" }}
                          >
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet?.client_since}
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
                {/* <Col xs="12">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-3 mt-1" style={{ fontWeight: "600" }}>
                      GST Details
                    </h6>
                    <i
                      className=" ri-edit-box-line fs-18 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpen3(!open3);
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
                          GST
                        </p>
                        <p
                          className="m-0 fs-12 text-dark "
                          style={{ fontWeight: "500" }}
                        >
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {clientDet.gst}
                        </p>
                      </div>
                      <div className="fs-11 d-flex gap-3">
                        <p className="m-0" style={{ width: "80px" }}>
                          State
                        </p>
                        <p className="m-0" style={{ fontWeight: "500" }}>
                          &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                          {clientDet.company_city}
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: "1 0" }}>
                      <div className="d-flex flex-column gap-2 ">
                        <div className="fs-11 d-flex gap-3">
                          <p className="m-0" style={{ width: "120px" }}>
                            City
                          </p>
                          <p
                            className="m-0 fs-12 text-dark "
                            style={{ fontWeight: "500", width: "421px" }}
                          >
                            &#x3a;&#xa0;&#xa0;&#xa0;&#xa0;
                            {clientDet.company_address}
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
                </Col> */}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ClientPers
        open={open1}
        setOpen={setOpen1}
        data={clientDet}
        setCheck={setCheck}
        check={check}
      />
      <ClientProf
        open={open2}
        setOpen={setOpen2}
        data={clientDet}
        setCheck={setCheck}
        check={check}
      />
      <Compantdetils
        open={open3}
        setOpen={setOpen3}
        data={clientDet}
        setCheck={setCheck}
        check={check}
      />
    </div>
  );
};

export default AddClientDet;
