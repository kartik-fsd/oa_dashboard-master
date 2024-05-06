import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { api } from "../../../globalConfig";
import { update_company_details } from "../../../assets/utils/Business";
import axios from "axios";
import { successnotify, warningnotify } from "../../Toasts";
import { useParams } from "react-router-dom";

const industryType = [
  { label: "Transport & Logistic Tech", value: "Transport & Logistic Tech" },
  {
    label: "E - Commerce / Marketplace",
    value: "E - Commerce / Marketplace",
  },
  { label: "Fintech", value: "Fintech" },
  { label: "Foodtech", value: "Foodtech" },
  { label: "Ecommerce", value: "Ecommerce" },
  { label: "Service Tech", value: "Service Tech" },
  { label: "Mobility", value: "Mobility" },
  { label: "Health Tech", value: "Health Tech" },
  {
    label: "Fintech & Financial services",
    value: "Fintech & Financial services",
  },
  { label: "Energy / Power", value: "Energy / Power" },
  { label: "Beauty & Hygiene", value: "Beauty & Hygiene" },
  { label: "Agritech", value: "Agritech" },
  { label: "Retail / Consumer brand", value: "Retail / Consumer brand" },
  {
    label: "Healthtech and healthcare Services",
    value: "Healthtech and healthcare Services",
  },
  { label: "Retail & FMCGs", value: "Retail & FMCGs" },
  {
    label: "Social(Social network, dating apps, matrimonials, etc)",
    value: "Social(Social network, dating apps, matrimonials, etc)",
  },
  { label: "Gaming", value: "Gaming" },
  {
    label: "Edtech and Education Services",
    value: "Edtech and Education Services",
  },
  { label: "Cyber Security", value: "Cyber Security" },
  { label: "Electric Vehicles", value: "Electric Vehicles" },
  { label: "Hardware / Manufacturing", value: "Hardware / Manufacturing" },
  { label: "Social Commerce", value: "Social Commerce" },
  {
    label: "Travel, toursism, & hospitality",
    value: "Travel, toursism, & hospitality",
  },
  { label: "CleanTech", value: "CleanTech" },
  { label: "Proptech / Real Estate", value: "Proptech / Real Estate" },
  { label: "Enterprise tech", value: "Enterprise tech" },
  { label: "Defence tech", value: "Defence tech" },
  { label: "Spacetech", value: "Spacetech" },
  { label: "Others", value: "Others" },
];

const fundStatus = [
  {
    label: "Mezzanine funding and bridge loans",
    value: "Mezzanine funding and bridge loans",
  },
  { label: "Enterprise", value: "Enterprise" },
  {
    label: "Series D funding and beyond",
    value: "Series D funding and beyond",
  },
  { label: "MNC", value: "MNC" },
  { label: "Series A funding", value: "Series A funding" },
  { label: "Bootstrapping", value: "Bootstrapping" },
  { label: "Seed funding stage", value: "Seed funding stage" },
  { label: "Series B funding", value: "Series B funding" },
  { label: "Series C funding", value: "Series C funding" },
  { label: "Pre-seed funding stage", value: "Pre-seed funding stage" },
  { label: "IPO", value: "IPO" },
];

const CompanyDetEdit = ({ open, setOpen, data, check, setCheck }) => {
  const [entity, setEntity] = React.useState("");
  const [editData, setEditData] = React.useState({});
  const { id } = useParams();

  console.log(data, "dat123");

  const defaultDate = moment(data.start_date).format("YYYY-MM-DD");

  const defValue = industryType?.find(
    (item) => item.value == data.industry_type
  );
  const fundDef = fundStatus?.find((item) => item.value == data.funding_status);

  console.log(fundDef, "defvalue");

  const handleUpdate = () => {
    const link = api.ONX_URL + update_company_details;
    editData.company_id = id;
    axios
      .patch(link, editData)
      .then((res) => {
        successnotify("success");
        setOpen(false);
        setCheck(!check);
      })
      .catch((err) => warningnotify("oops something went wrong...!"))
      .finally(() => setEditData({}));
  };
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setEditData({});
        }}
        centered={true}
        size={"xl"}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setEditData({});
          }}
        >
          Company Details
        </ModalHeader>
        <ModalBody>
          <Row className="mt-4">
            <Col xs="6" className="mb-4">
              {/* <div>
                <label htmlFor="entity" className="form-label">
                  Entity Type
                </label>

                <div className="input-group">
                  <select
                    className="form-select"
                    id="entity"
                    // required

                    onChange={(e) => {
                      setEntity(e.target.value);
                      setEditData({ ...editData, entity_type: e.target.value });
                    }}
                  >
                    <option
                      selected={
                        data.entity_type == "Proprietorship" ? true : false
                      }
                      value="Proprietorship"
                    >
                      Proprietorship
                    </option>
                    <option
                      value="Private Limited"
                      selected={
                        data.entity_type == "Private Limited" ? true : false
                      }
                    >
                      Private Limited
                    </option>
                    <option
                      value="Public Limited"
                      selected={
                        data.entity_type == "Public Limited" ? true : false
                      }
                    >
                      Public Limited
                    </option>
                    <option
                      value="LLP"
                      selected={data.entity_type == "LLP" ? true : false}
                    >
                      LLP
                    </option>
                    <option
                      value="NGO"
                      selected={data.entity_type == "LLP" ? true : false}
                    >
                      NGO
                    </option>
                  </select>
                </div>
              </div> */}
              <div>
                <label htmlFor="web" className="form-label">
                  Entity Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="web"
                  placeholder=""
                  value={data.entity_type}
                  readOnly
                  // onChange={(e) =>
                  //   setEditData({ ...editData, webiste_link: e.target.value })
                  // }
                />
              </div>
            </Col>
            <Col xs="6" className="mb-4">
              <div>
                <label htmlFor="entity" className="form-label" required>
                  {data.entity_type == "Proprietorship"
                    ? "GST"
                    : data.entity_type == "Private Limited" ||
                      data.entity_type == "Public Limited"
                    ? "Company Registration Number"
                    : data.entity_type == "LLP"
                    ? "LLP Number"
                    : "NGO Name"}
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      data.entity_type == "Private Limited"
                        ? data.company_registration_number
                        : data.entity_type == "Public Limited"
                        ? data.company_registration_number
                        : data.entity_type == "Proprietorship"
                        ? data.gst
                        : data.entity_type == "LLP"
                        ? data.llp_number
                        : data.ngo_name
                    }
                    // readOnly={true}
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    readOnly
                    // required
                    // onChange={(e) => {
                    //   setEntity(e.target.value);
                    //   setEditData({
                    //     ...editData,
                    //     [data.entity_type == "Private Limited"
                    //       ? "company_registration_number"
                    //       : data.entity_type == "Public Limited"
                    //       ? "company_registration_number"
                    //       : data.entity_type == "Proprietorship"
                    //       ? "gst"
                    //       : data.entity_type == "LLP"
                    //       ? "llp_number"
                    //       : "ngo_name"]: e.target.value,
                    //   });
                    // }}
                  />
                </div>
              </div>
            </Col>

            {/* <Col xs="6" className="mb-4">
              <div>
                <label htmlFor="ind" className="form-label">
                  Industry Type
                </label>

                <div className="input-group">
                  <select className="form-select" id="ind">
                    {industryType.map((item, index) => {
                      return (
                        <option value="1" key={index}>
                          One
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </Col> */}
            <Col lg={6}>
              <Label className="mt-1"> Industry Type</Label>
              <Select
                aria-label=".form-select-sm example"
                // onChange={handleCompanyList}
                options={industryType}
                // value={defValue}
                defaultValue={defValue}
                isClearable={true}
                onChange={(e) =>
                  setEditData({ ...editData, industry_type: e.value })
                }
              ></Select>
            </Col>
            <Col lg={6} className="mb-4">
              <Label className="mt-1"> Funding Status</Label>
              <Select
                aria-label=".form-select-sm example"
                options={fundStatus}
                // value={defValue}
                defaultValue={fundDef}
                isClearable={true}
                onChange={(e) =>
                  setEditData({ ...editData, funding_status: e.value })
                }
              ></Select>
            </Col>
            {/* <Col xs="6" className="mb-4">
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
            </Col> */}
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
                  defaultValue={data.webiste_link}
                  onChange={(e) =>
                    setEditData({ ...editData, webiste_link: e.target.value })
                  }
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
                  defaultValue={data.company_linkedIn}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      company_linkedIn: e.target.value,
                    })
                  }
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
                  defaultValue={data.company_tds}
                  onChange={(e) =>
                    setEditData({ ...editData, company_tds: e.target.value })
                  }
                />
              </div>
            </Col>
            {/* <Col xs="6" className="mb-4">
              <div>
                <label htmlFor="startdate" className="form-label">
                  Company Start Date
                </label>
                <input type="date" className="form-control" id="startdate" />
              </div>
            </Col> */}
            <Col lg={6}>
              <div>
                <Label className="form-label ">Company Start Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    defaultDate: [defaultDate],
                  }}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      company_start_date: moment(e[0]).format("YYYY-MM-DD"),
                    })
                  }
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn waves-effect waves-light"
            style={{ backgroundColor: "#ec5c24" }}
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CompanyDetEdit;
