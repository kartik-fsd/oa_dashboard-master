import { Interweave } from "interweave";
import moment from "moment";
import React, { useState } from "react";
import "./FlipModal.css";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import CostTable from "./Tabs/CostTable";
import { v4 as uuid } from "uuid";
import Select from "react-select";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import "./FlipModal.css";
import { successnotify, warningnotify } from "../Toasts";
import { api } from "../../globalConfig";
import { create_project } from "../../assets/utils/OnxUrl";
import axios from "axios";
import { update_lead_details } from "../../assets/utils/Business";

const FlipModal = ({
  modal_animationFlip,
  setmodal_animationFlip,
  tog_animationFlip,
  modalType,
  data,
  type = "nothing",
  approve,
  setApprove,
  projectData = {},
  dataFromnewAddProject = {},
  setCheck = () => {},
  check = false,
}) => {
  const current_date = new Date();
  const [selectedOptions, setSelectedOptions] = useState([]);

  //for business projectdetails

  const [startDateStatus, setStartDateStatus] = useState(false);
  const [endDateStatus, setEndDateStatus] = useState(false);
  const [but, setbut] = React.useState(false);
  const defaultData = {
    project_title: "",
    project_service: "Merchant Onboarding",
    project_vertical: "Field Based",
    project_start_date: new Date(),
    project_end_date: new Date(),
  };

  const [formDataBus, setFormDataBus] = React.useState(defaultData);
  const [spocObj, setSpocObj] = React.useState([]);

  const [objsingleSpoc, setObjSingleSpoc] = React.useState({
    spoc_name: "",
    spoc_email: "",
    spoc_contact: "",
  });

  const update_lead_details_url = api.ONX_URL + update_lead_details;

  const handleDelete = (idd) => {
    let delItem = spocObj.filter((item) => item.id !== idd);
    setSpocObj(delItem);
  };

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  const handleClickProjectDet = () => {
    let combine = [...spocObj];

    console.log(spocObj, "testingspocobje");

    formDataBus.spoc_detail = JSON.stringify(combine);
    // console.log(
    //   formDataBus,
    //   "testingformdata",
    //   project_start_date,
    //   project_end_date
    // );

    let apiData = api.ONX_URL + create_project;
    let obj2 = {
      lead_id: dataFromnewAddProject.lead_id,
      company_id: dataFromnewAddProject.company_id,
      client_id: dataFromnewAddProject.client_id,
    };

    let body = { ...obj2, ...formDataBus };

    let axioscheck = Object.values(formDataBus);

    body.project_start_date = moment(body.project_start_date).format(
      "YYYY-MM-DD"
    );
    body.project_end_date = moment(body.project_end_date).format("YYYY-MM-DD");

    if (
      startDateStatus == false ||
      endDateStatus == false ||
      body.project_title == ""
    ) {
      warningnotify("Please Enter all the fields");
      setTimeout(() => {
        setbut(false);
      }, 1000);
      return "";
    } else {
      axios
        .post(apiData, body)
        .then((res) => {
          successnotify("Successfully Saved");
          setmodal_animationFlip(!modal_animationFlip);
          setCheck(!check);
        })
        .catch((err) => {
          warningnotify("something went wrong");
          setTimeout(() => {
            setbut(false);
          }, 1000);
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => {
            setbut(false);
          }, 1000);
        });
      const dateEnter = {
        lead_id: dataFromnewAddProject.lead_id,
        hot_lead_status: "1",
        hot_lead_date: moment(current_date).format("YYYY-MM-DD"),
      };
      axios
        .patch(update_lead_details_url, dateEnter)
        .then((res) => {
          console.log("success lead intro updated");
        })
        .catch((err) => {
          warningnotify("something went wrong");
          console.log(err);
        });
    }
  };

  const options = [
    { value: "Naveen Ram", label: "Naveen Ram (co-founder)" },
    { value: "Prashant Janadri", label: "Prashant Janadri (co-founder)" },
  ];

  return (
    <div>
      {/* Flip Animation */}
      <Modal
        id="flipModal"
        isOpen={modal_animationFlip}
        toggle={() => {
          tog_animationFlip();
        }}
        modalClassName="flip"
        centered
        size="lg"
      >
        {type == "newaddproject" ? (
          <ModalHeader
            className="modal-title item"
            id="flipModalLabel"
            toggle={() => {
              tog_animationFlip();
            }}
          >
            {" "}
            Project Details
          </ModalHeader>
        ) : (
          ""
        )}
        {type == "core-founder" ? (
          <ModalHeader> Operation Checklist</ModalHeader>
        ) : (
          <>
            {type != "newaddproject" && (
              <ModalHeader
                // style={{
                //   borderBottom: type == "newBusiness" ? "1px dotted #D5D5D5" : "none",
                // }}
                className="modal-title item"
                id="flipModalLabel"
                toggle={() => {
                  tog_animationFlip();
                }}
              >
                <>
                  {modalType == "compId" && (
                    <>
                      {data.company_name}&nbsp; ({data.company_unique_id})
                    </>
                  )}

                  {modalType == "agreeId" && (
                    <>
                      <>
                        {data.company_name}&nbsp; ({data.agreement_unique_id})
                      </>
                    </>
                  )}

                  {modalType == "commercialId" && (
                    <>
                      <>
                        {data.company_name}&nbsp; ({data.commercial_unique_id})
                      </>
                    </>
                  )}

                  {/* new business */}
                  {(modalType == "compIdb" ||
                    modalType == "agreeIdb" ||
                    modalType == "clientIdb") && (
                    <>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div>
                          <img
                            className="rounded-circle avatar-sm"
                            alt=""
                            src={projectData?.brand_logo}
                          />
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                color: "#405189",
                                fontSize: "16px",
                              }}
                            >
                              {projectData?.company_title}
                            </div>
                            <div>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: "#ec5c24",
                                  color: "#fff",
                                }}
                              >
                                {projectData?.company_unique_id}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              color: "#838383",
                              fontWeight: 0,
                              fontSize: "12px",
                            }}
                          >
                            {projectData?.brand_name}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              </ModalHeader>
            )}
          </>
        )}
        {type == "nothing" ? (
          <ModalBody>
            {/* className="pt-3 mb-3 fw-semibold text-uppercase border-top border-top-dashed mt-4" */}
            {modalType == "compId" ? (
              <>
                {/* <div
                className="fs-16 pt-3 mb-3 fw-semibold text-uppercase border-top border-top-dashed"
                style={{ display: "flex", gap: "20px" }}
              >
                <div>
                  <img
                    src={data.brand_logo}
                    alt=""
                    className="rounded-circle avatar-md"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <h5 className="fs-12  fw-semibold text-capitalize">
                    Name &nbsp;:&nbsp;{" "}
                    <span className="text-muted text-capitalize">
                      {data.client_name}
                    </span>{" "}
                  </h5>
                  <h5 className="fs-12  fw-semibold text-capitalize">
                    Email &nbsp;:&nbsp;
                    <span className="text-muted text-capitalize">
                      {data.client_email}
                    </span>
                  </h5>
                  <h5 className="fs-12  fw-semibold text-capitalize">
                    Designation &nbsp;: &nbsp;
                    <span className="text-muted text-capitalize">
                      {data.client_designation}
                    </span>
                  </h5>
                </div>
              </div> */}
                <h6 className="fs-16 pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4 ">
                  Company Description :{" "}
                </h6>
                <p className="text-muted">{data.company_discription}</p>
                <h6 className="fs-16 pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4 ">
                  Client Details :{" "}
                </h6>
                <Table className="table-hover table-striped align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data.client_name}</td>

                      <td>{data.client_email}</td>
                      <td>{data.client_phone}</td>
                      <td>{data.client_designation}</td>
                    </tr>
                  </tbody>
                </Table>
                <h6 className="fs-16 pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4 ">
                  SPOC Details :{" "}
                </h6>
                <Table className="table-hover table-striped align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.spoc_detail?.length > 0 ? (
                      data.spoc_detail?.map((data) => (
                        <>
                          <tr>
                            <td>{data.spoc_name}</td>

                            <td>{data.spoc_email}</td>
                            <td>{data.spoc_contact}</td>
                          </tr>
                        </>
                      ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </Table>{" "}
              </>
            ) : (
              ""
            )}

            {modalType == "agreeId" ? (
              <>
                <div className="pt-3 border-top border-top-dashed ">
                  <h6 className="my-3 fw-semibold text-uppercase">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {data?.agreement_title} &nbsp;:&nbsp;
                        {data?.agreement_date} &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        {data?.project_status == "active" ? (
                          <div className="badge  bg-success fs-12">Active</div>
                        ) : data?.project_status == "inactive" ? (
                          <div className="badge  bg-danger fs-12">Inactive</div>
                        ) : (
                          <div className="badge bg-warning fs-12">New</div>
                        )}
                      </div>
                      {/* <div>&nbsp;&nbsp; &nbsp;</div> */}
                      <div className="d-flex align-items-center justify-content-center me-4">
                        <a
                          href={data?.agreement_upload}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              border: "1px solid #3F5289",
                              borderRadius: "6px",
                              padding: "2px 10px",
                            }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <i
                              className="ri-download-2-line  fs-16"
                              style={{ color: "#b83016" }}
                            ></i>
                          </span>
                        </a>
                      </div>
                    </div>
                  </h6>

                  <Row>
                    <Col>
                      <div>
                        <div>
                          <Interweave content={data?.agreement_description} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}

            {modalType == "commercialId" ? (
              <>
                <>
                  <h6 className="pt-3 mb-3 fw-semibold text-uppercase border-top border-top-dashed  d-flex gap-2">
                    Commercial Bond :
                    <span>
                      <code>Table Items</code>
                    </span>
                  </h6>
                  <CostTable cdata={data?.cost} />
                </>
              </>
            ) : (
              ""
            )}
          </ModalBody>
        ) : (
          ""
        )}

        {type == "newBusiness" && modalType == "compIdb" ? (
          <ModalBody>
            {console.log(projectData, "projectData")}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div style={{ color: "#121212", fontSize: 15, fontWeight: 600 }}>
                Company Details
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="fs-12"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ display: "flex" }} className="mt-3">
                    <div
                      style={{
                        minWidth: "100px",
                        fontSize: "12px",
                        color: "#151515",
                        fontWeight: 300,
                      }}
                    >
                      Entity type
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.entity_type}
                    </div>
                  </div>

                  <div style={{ display: "flex" }} className="mt-2">
                    <div
                      style={{
                        minWidth: "100px",
                        fontSize: "12px",
                        color: "#151515",
                        fontWeight: 300,
                      }}
                    >
                      Industry Type
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.industry_type}
                    </div>
                  </div>

                  <div style={{ display: "flex" }} className="mt-2">
                    <div
                      style={{
                        minWidth: "100px",
                        fontSize: "12px",
                        color: "#151515",
                        fontWeight: 300,
                      }}
                    >
                      Website
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;
                      <a
                        href={projectData?.webiste_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {projectData?.webiste_link}
                      </a>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      color: "#151515",
                      fontWeight: 300,
                    }}
                    className="mt-2"
                  >
                    <div style={{ minWidth: "100px", fontSize: "12px" }}>
                      TDS
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.company_tds}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }} className="mt-3">
                      <div
                        style={{
                          minWidth: "150px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        {projectData?.entity_type == "Proprietorship"
                          ? "GST"
                          : projectData?.entity_type == "Private Limited"
                          ? "Company Registration"
                          : projectData?.entity_type == "LLP"
                          ? "LLP Number"
                          : projectData?.entity_type == "Public Limited"
                          ? "Company Registration"
                          : projectData?.entity_type == "NGO"
                          ? "NGO"
                          : "NGO Name"}
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {projectData?.entity_type == "Proprietorship"
                          ? projectData?.company_gst
                          : projectData?.entity_type == "Private Limited"
                          ? projectData?.company_registration_number
                          : projectData?.entity_type == "LLP"
                          ? projectData?.llp_number
                          : projectData?.entity_type == "Public Limited"
                          ? projectData?.company_registration_number
                          : projectData?.entity_type == "NGO"
                          ? projectData?.ngo_name
                          : ""}
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "150px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Funding status
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.funding_status}
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "150px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        LinkedIn
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;
                        <a
                          href={projectData?.company_linkedIn}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          {projectData?.company_linkedIn}
                        </a>
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "150px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Company Start Date
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.company_start}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "15px",
                gap: "10px",
              }}
            >
              <div
                style={{ color: "#121212", fontSize: "15px", fontWeight: 600 }}
              >
                Company Description
              </div>
              <div style={{ color: "#6F6F6F", fontSize: "12px" }}>
                {projectData?.company_discription}
              </div>
            </div>
            <div
              style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
            ></div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  color: "#121212",
                  fontSize: 15,
                  fontWeight: 600,
                  marginTop: "15px",
                }}
              >
                Company Address
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="fs-12"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ display: "flex" }} className="mt-3">
                    <div
                      style={{
                        minWidth: "100px",
                        fontSize: "12px",
                        color: "#151515",
                        fontWeight: 300,
                      }}
                    >
                      Pincode
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.company_pin}
                    </div>
                  </div>

                  <div style={{ display: "flex" }} className="mt-2">
                    <div
                      style={{
                        minWidth: "100px",
                        fontSize: "12px",
                        color: "#151515",
                        fontWeight: 300,
                      }}
                    >
                      City
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.company_city}
                    </div>
                  </div>

                  <div style={{ display: "flex" }} className="mt-2">
                    <div
                      style={{
                        minWidth: "100px",
                        fontSize: "12px",
                        color: "#151515",
                        fontWeight: 300,
                      }}
                    >
                      State
                    </div>
                    <div style={{ color: "#151515" }}>
                      :&nbsp;&nbsp;&nbsp;&nbsp;{projectData?.company_state}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "baseline" }}
                      className="mt-3"
                    >
                      <div
                        style={{
                          minWidth: "150px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Address
                      </div>
                      <div>:</div>
                      <div
                        style={{
                          color: "#151515",
                          width: "250px",
                          fontSize: "11px",
                          marginLeft: "15px",
                        }}
                      >
                        {projectData?.company_address}
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "150px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Country
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;
                        {projectData?.country ?? "India"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "15px",
                gap: "10px",
              }}
            >
              <div
                style={{ color: "#121212", fontSize: "15px", fontWeight: 600 }}
                className="mt-3"
              >
                Founders Details
              </div>
              <div>
                <table
                  className="testing"
                  style={{ boxShadow: "0px 0px 3px #00000029" }}
                >
                  <tr className="abc">
                    <th className="thinside">Founder Name</th>
                    <th className="thinside">Founder Mail ID</th>
                    <th className="thinside">Founder Contact</th>
                    <th className="thinside">Founder LinkedIn</th>
                  </tr>
                  {projectData?.founder_details?.map((item, i) => (
                    <tr className="abc" key={item.id}>
                      <td className="testintd fs-10">{item?.founder_name}</td>
                      <td className="testintd fs-10">{item?.founder_email}</td>
                      <td className="testintd fs-10">{item?.ounder_contact}</td>
                      <td className="testintd fs-10">
                        {item?.ounder_linkedIn}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            {/* gst */}{" "}
            <div
              style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "15px",
                gap: "10px",
              }}
            >
              <div
                style={{ color: "#121212", fontSize: "15px", fontWeight: 600 }}
                className="mt-3"
              >
                Goods and Services Tax (GST)
              </div>
              <div>
                <table
                  className="testing"
                  style={{ boxShadow: "0px 0px 3px #00000029" }}
                >
                  <tr className="abc">
                    <th className="thinside">GST</th>
                    <th className="thinside">Address</th>
                    <th className="thinside">City</th>
                    <th className="thinside">State</th>
                    <th className="thinside">Pincode</th>
                    <th className="thinside">Country</th>
                  </tr>
                  {projectData?.gsts?.map((item, i) => (
                    <tr className="abc" key={item.id}>
                      <td className="testintd fs-11">{item?.gst}</td>
                      <td className="testintd fs-11">{item?.address}</td>
                      <td className="testintd fs-11">{item?.city}</td>
                      <td className="testintd fs-11">{item?.state}</td>
                      <td className="testintd fs-11">{item?.pincode}</td>
                      <td className="testintd fs-11">{item?.country}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </ModalBody>
        ) : (
          ""
        )}

        {type == "newBusiness" && modalType == "agreeIdb" ? (
          <ModalBody>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    color: "#121212",
                    fontSize: 15,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Agreement Details</div>
                  <div style={{ cursor: "pointer" }}>
                    <a
                      href={projectData.agreement_upload}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i
                        className="ri-download-2-line "
                        style={{ color: "#b83016" }}
                      ></i>
                    </a>
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: "120px" }}
                  className="fs-12"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }} className="mt-3">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Agreement ID
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;
                        {projectData.agreement_unique_id}
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Validity
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;{projectData.agreement_date}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div style={{ display: "flex" }} className="mt-3">
                        <div
                          style={{
                            minWidth: "150px",
                            fontSize: "12px",
                            color: "#151515",
                            fontWeight: 300,
                          }}
                        >
                          Type
                        </div>
                        <div style={{ color: "#151515" }}>
                          :&nbsp;&nbsp;&nbsp;&nbsp;{projectData.agreement_type}
                        </div>
                      </div>

                      <div style={{ display: "flex" }} className="mt-2">
                        <div
                          style={{
                            minWidth: "150px",
                            fontSize: "12px",
                            color: "#151515",
                            fontWeight: 300,
                          }}
                        >
                          Billable Value
                        </div>
                        <div style={{ color: "#151515" }}>
                          :&nbsp;&nbsp;&nbsp;&nbsp;{projectData.billable_cost}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "15px",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    color: "#121212",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Agreement Description
                </div>
                <div style={{ color: "#6F6F6F", fontSize: "12px" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: projectData.agreement_description,
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
              ></div>

              <div
                style={{
                  color: "#121212",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
                className="mt-4"
              >
                Purchase Order
              </div>
              {projectData?.po_unique_id ? (
                <Card className="mt-3">
                  <CardBody style={{ padding: "0px" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          background: "#F0F4FF",
                          padding: "10px",
                        }}
                      >
                        <div style={{ width: "28%" }}>Title</div>
                        <div style={{ width: "28%" }}>Value</div>
                        <div style={{ width: "27%" }}>Type</div>
                        <div style={{ width: "25%" }}>Date</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px",
                        }}
                      >
                        <div style={{ width: "28%" }}>
                          <div>{projectData?.po_title}</div>
                          <div>
                            <span
                              className="badge"
                              style={{
                                backgroundColor: "#ec5c24",
                                color: "#fff",
                              }}
                            >
                              {projectData?.po_unique_id}
                            </span>
                          </div>
                        </div>
                        <div style={{ width: "28%" }}>
                          <div>{projectData?.po_value}</div>
                        </div>
                        <div
                          style={{ width: "27%", fontSize: "12px" }}
                          className="text-capitalize"
                        >
                          {projectData?.po_type?.split("_").join(" ")}
                        </div>
                        <div style={{ width: "25%" }}>
                          <div>{projectData?.po_created_at}</div>
                          <div
                            style={{ color: "#405189", fontSize: "10px" }}
                            // className="text-muted fs-10"
                          >
                            {projectData?.po_validity == "Expired"
                              ? "Expired"
                              : `Expires in ${projectData?.po_validity} days`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <p>No Data Found</p>
                </div>
              )}
              <div
                style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "15px",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    color: "#121212",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Founders Details
                </div>
                <div>
                  <div className="table-responsive">
                    <Table className="align-middle table-wrap mb-0">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{
                              width: "200px",
                              wordBreak: "break-word",
                            }}
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            style={{
                              width: "400px",
                              wordBreak: "break-word",
                            }}
                          >
                            Description
                          </th>
                          <th scope="col">Billable Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectData.cost?.map((item) => (
                          <>
                            <tr>
                              <td
                                style={{
                                  width: "200px",
                                  wordBreak: "break-word",
                                }}
                              >
                                {item.cost_item_name}
                              </td>
                              <td
                                style={{
                                  width: "400px",
                                  wordBreak: "break-word",
                                }}
                              >
                                {item.cost_description}
                              </td>
                              <td>₹{item.cost_billable_price}</td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="alert alert-primary mb-1">
                    <p className="mb-0">
                      {/* <span className="fw-semibold">NOTES:</span> */}
                      <span id="note">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <div>
                            <div>Agreement Created By : testing name</div>
                          </div>
                          <div>
                            {/* <div>
                                  {" "}
                                  Agreement Approved by :{" "}
                                  {agData?.approved_by_name} -{" "}
                                  {agData?.approved_by_id}
                                </div> */}

                            <div>&nbsp;on : 22-23-2002</div>
                          </div>
                        </div>{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="alert alert-info">
                    <p className="mb-0">
                      {/* <span className="fw-semibold">NOTES:</span> */}
                      <span id="note">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <div>
                            <div>Agreement Approved by : Naveen chandra</div>
                          </div>
                          <div>
                            {/* <div>
                                  {" "}
                                  Agreement Approved by :{" "}
                                  {agData?.approved_by_name} -{" "}
                                  {agData?.approved_by_id}
                                </div> */}

                            <div>&nbsp;on : 22-12-299</div>
                          </div>
                        </div>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        ) : (
          ""
        )}

        {type == "newBusiness" && modalType == "clientIdb" ? (
          <ModalBody>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    color: "#121212",
                    fontSize: 15,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Client Personal Details</div>
                </div>
                <div style={{ display: "flex", gap: "80px" }} className="fs-12">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }} className="mt-3">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Client Name
                      </div>
                      <div style={{ color: "#151515", fontWeight: 600 }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;{projectData.client_name}
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Mail ID
                      </div>
                      <div style={{ color: "#9B9B9B" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;{projectData.client_email}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div style={{ display: "flex" }} className="mt-3">
                        <div
                          style={{
                            minWidth: "150px",
                            fontSize: "12px",
                            color: "#151515",
                            fontWeight: 300,
                          }}
                        >
                          Phone
                        </div>
                        <div style={{ color: "#151515" }}>
                          :&nbsp;&nbsp;&nbsp;&nbsp;{projectData.client_phone}
                        </div>
                      </div>

                      <div style={{ display: "flex" }} className="mt-2">
                        <div
                          style={{
                            minWidth: "150px",
                            fontSize: "12px",
                            color: "#151515",
                            fontWeight: 300,
                          }}
                        >
                          LinkedIn
                        </div>
                        <div style={{ color: "#151515" }}>
                          :&nbsp;&nbsp;&nbsp;&nbsp;https://linkedIn897634/in/en/
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
              ></div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    color: "#121212",
                    fontSize: 15,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Client Professional Details</div>
                  <div style={{ cursor: "pointer" }}>
                    {/* <i className="ri-download-2-line"></i> */}
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: "120px" }}
                  className="fs-12"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }} className="mt-3">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        Designation
                      </div>
                      <div style={{ color: "#151515", fontWeight: 600 }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;
                        {projectData.client_designation}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div style={{ display: "flex" }} className="mt-3">
                        <div
                          style={{
                            minWidth: "150px",
                            fontSize: "12px",
                            color: "#151515",
                            fontWeight: 300,
                          }}
                        >
                          Since
                        </div>
                        <div style={{ color: "#151515" }}>
                          :&nbsp;&nbsp;&nbsp;&nbsp;23/04/2023
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
              ></div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    color: "#121212",
                    fontSize: 15,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>GST Details</div>
                  <div style={{ cursor: "pointer" }}>
                    {/* <i className="ri-download-2-line"></i> */}
                  </div>
                </div>
                <div
                  style={{ display: "flex", gap: "130px" }}
                  className="fs-12"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }} className="mt-3">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        GST
                      </div>
                      <div style={{ color: "#151515", fontWeight: 300 }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;18AABCU9603R1ZM
                      </div>
                    </div>

                    <div style={{ display: "flex" }} className="mt-2">
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "12px",
                          color: "#151515",
                          fontWeight: 300,
                        }}
                      >
                        State
                      </div>
                      <div style={{ color: "#151515" }}>
                        :&nbsp;&nbsp;&nbsp;&nbsp;Karnataka
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                      className="mt-3"
                    >
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            minWidth: "150px",
                            fontSize: "12px",
                            color: "#151515",
                            fontWeight: 300,
                          }}
                        >
                          City
                        </div>
                        <div style={{ color: "#151515" }}>
                          :&nbsp;&nbsp;&nbsp;&nbsp;Bengaluru
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ padding: "15px", borderBottom: "1px dotted #D5D5D5" }}
              ></div>
            </div>
          </ModalBody>
        ) : (
          ""
        )}

        {type == "core-founder" && modalType == "coreIdb" ? (
          <ModalBody>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <label>Select users:</label>
                <Select
                  closeMenuOnSelect={true}
                  isMulti
                  value={selectedOptions}
                  options={options}
                  onChange={handleSelectChange}
                />
              </div>
              <div>
                <div style={{ float: "right" }}>
                  <Button
                    onClick={() => {
                      setApprove(true);
                      setmodal_animationFlip(!modal_animationFlip);
                    }}
                    style={{
                      backgroundColor: "#405189",
                      color: "#FFFFFF",
                      minWidth: "60px",
                      height: "35px",
                    }}
                  >
                    <i className="ri-download-fill align-bottom mt-2"></i>
                    &nbsp;sent
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
        ) : (
          ""
        )}

        {type == "newaddproject" && (
          <>
            <Row style={{ padding: "2%" }}>
              <Col xs="6">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ color: "#405189" }}>Project Title</div>
                  <div>
                    <Input
                      value={formDataBus.project_title}
                      onChange={(e) =>
                        setFormDataBus({
                          ...formDataBus,
                          project_title: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col xs="6">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ color: "#405189" }}>Project Type</div>
                  <div>
                    <select
                      className="form-select"
                      id="entity"
                      required
                      value={formDataBus.project_vertical}
                      onChange={(e) =>
                        setFormDataBus({
                          ...formDataBus,
                          project_vertical: e.target.value,
                        })
                      }
                    >
                      <option value="Field Based">Field Based</option>
                      <option value="Day Model">Day Model</option>
                      <option value="Digital">Digital</option>
                      <option value="Task Based">Task Based</option>
                      <option value="Day Based">Day Based</option>
                    </select>
                  </div>
                </div>
              </Col>
            </Row>

            <Row style={{ padding: "2%" }}>
              <Col xs="6">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div style={{ color: "#405189" }}>Services</div>
                  <div>
                    {/* <Input value={formDataBus.project_service} /> */}
                    <select
                      className="form-select"
                      id="entity"
                      required
                      value={formDataBus.project_service}
                      onChange={(e) =>
                        setFormDataBus({
                          ...formDataBus,
                          project_service: e.target.value,
                        })
                      }
                    >
                      <option value="Merchant Onboarding">
                        Merchant Onboarding
                      </option>
                      <option value="Background Verification">
                        Background Verification
                      </option>
                      <option value="Tele Marketing">Tele Marketing</option>
                      <option value="Last Mile Delivery">
                        Last Mile Delivery
                      </option>
                      <option value="Customer Acquisition">
                        Customer Acquisition
                      </option>
                      <option value="Stock Audits">Stock Audits</option>
                      <option value="Geo Tagging">Geo Tagging</option>
                      <option value="BTL Activation">BTL Activation</option>
                      <option value="Picker And Packers">
                        Picker And Packers
                      </option>
                      <option value="Survey Collection">
                        Survey Collection
                      </option>
                      <option value="Product Sampling">Product Sampling</option>
                      <option value="Influencer Marketing">
                        Influencer Marketing
                      </option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Content Moderation">
                        Content Moderation
                      </option>
                      <option value="Warehouse Services">
                        Warehouse Services
                      </option>
                    </select>
                  </div>
                </div>
              </Col>
              <Col xs="6">
                <Row>
                  <Col>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div style={{ color: "#405189" }}>Start Date</div>
                      <div>
                        {/* <Input value={formDataBus.project_start_date} /> */}
                        <Flatpickr
                          // value=
                          // defaultValue={formDataBus.project_start_date}
                          onChange={(e) => {
                            setStartDateStatus(true);

                            setFormDataBus({
                              ...formDataBus,

                              project_start_date: moment(e[0]).format(
                                "YYYY-MM-DD"
                              ),
                            });
                          }}
                          className="form-control"
                          options={{
                            dateFormat: "d M, Y",
                          }}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col>
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div style={{ color: "#405189" }}>End Date</div>
                      <div>
                        {/* <Input value={formDataBus.project_end_date} /> */}
                        <Flatpickr
                          // defaultValue={formDataBus.project_end_date}
                          onChange={(e) => {
                            setEndDateStatus(true);
                            setFormDataBus({
                              ...formDataBus,
                              project_end_date: moment(e[0]).format(
                                "YYYY-MM-DD"
                              ),
                            });
                          }}
                          className="form-control"
                          options={{
                            dateFormat: "d M, Y",
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (Object.values(objsingleSpoc).includes("")) {
                  warningnotify("please fill the Details");
                  return "";
                }

                objsingleSpoc.id = uuid();
                objsingleSpoc.email = "";
                objsingleSpoc.contact = "";
                objsingleSpoc.linkedIn = "";

                setSpocObj([...spocObj, objsingleSpoc]);

                setObjSingleSpoc({
                  spoc_name: "",
                  spoc_email: "",
                  spoc_contact: "",
                });
              }}
            >
              <Row style={{ padding: "2%" }}>
                <Col xs="12">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "#F2F2F2",
                      padding: "1%",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ color: "#121212", fontWeight: 600 }}>
                      Add Client SPOC Details
                    </div>
                    <div>
                      <button
                        className="btn  waves-effect waves-light ms-4 "
                        style={{
                          backgroundColor: "#ec5c24",
                        }}
                      >
                        + Add more
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row style={{ padding: "2%" }}>
                <Col xs="4">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ color: "#405189" }}>Name</div>
                    <div>
                      <Input
                        type="text"
                        value={objsingleSpoc.spoc_name}
                        onChange={(e) =>
                          setObjSingleSpoc({
                            ...objsingleSpoc,
                            spoc_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </Col>
                <Col xs="4">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ color: "#405189" }}>Email</div>
                    <div>
                      <Input
                        type="email"
                        value={objsingleSpoc.spoc_email}
                        onChange={(e) =>
                          setObjSingleSpoc({
                            ...objsingleSpoc,
                            spoc_email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </Col>

                <Col xs="4">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ color: "#405189" }}>Phone</div>
                    <div>
                      <Input
                        type="number"
                        value={objsingleSpoc.spoc_contact}
                        onChange={(e) =>
                          setObjSingleSpoc({
                            ...objsingleSpoc,
                            spoc_contact: e.target.value,
                          })
                        }
                        onInput={(e) =>
                          (e.target.value = Math.max(
                            0,
                            parseInt(e.target.value).toString().slice(0, 10)
                          ))
                        }
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </form>

            <Row>
              <Col xs={"12"} style={{ padding: "4%" }}>
                <Card style={{ padding: "0" }}>
                  <CardBody style={{ padding: "0" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "15px",
                          background: "#F0F4FF",
                          borderRadius: "2px",
                        }}
                      >
                        <div>Name</div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email
                        </div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Phone
                        </div>
                        <div>Action</div>
                      </div>

                      {spocObj?.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "12px",
                          }}
                        >
                          <div style={{ width: "200px" }}>{item.spoc_name}</div>
                          <div style={{ width: "320px" }}>
                            {item.spoc_email}
                          </div>
                          <div style={{ width: "250px" }}>
                            {item.spoc_contact}
                          </div>
                          <div
                            style={{ marginRight: "10px" }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <i
                              style={{ color: "red", fontSize: "12px" }}
                              className="ri-delete-bin-fill fs-10"
                            ></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row style={{ padding: "2%" }}>
              <Col xs="12">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="btn  waves-effect waves-light ms-4"
                    style={{
                      backgroundColor: "#ec5c24",
                    }}
                    disabled={but}
                    onClick={() => {
                      handleClickProjectDet();
                      setbut(true);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        alignContent: "flex-start",
                        gap: "3px",
                      }}
                    >
                      <div>
                        {" "}
                        <i className="ri-download-fill"></i>
                      </div>
                      <div> Save</div>
                    </div>
                  </button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FlipModal;
