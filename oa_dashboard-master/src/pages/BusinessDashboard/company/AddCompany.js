import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import avatar from "../../../assets/images/users/avatar-1.jpg";
import classnames from "classnames";
import BreadCrumb from "../../../components/common/BreadCrumb";
import ClientDetails from "./ClientDetails";
import Addgst from "./Addgst";
import axios from "axios";
import { check_company_entity } from "../../../assets/utils/TaskmoUrl";
import { api } from "../../../globalConfig";
import { useHistory } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import moment from "moment";
import { upload_issue_proof } from "../../../assets/utils/sow";
import { create_company } from "../../../assets/utils/Business";
import { successnotify, warningnotify } from "../../Toasts";
import { v4 as uuid } from "uuid";

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
const AddCompany = () => {
  const history = useHistory();

  const [founderdet, setFounderdet] = React.useState([{ id: 0 }]);
  const [check, setCheck] = React.useState(false);
  const [modelData, setModelData] = React.useState(false);
  const hiddenFile = React.useRef(null);
  const [activeTab, setactiveTab] = useState(1);
  const [activeArrowTab, setactiveArrowTab] = useState(4);
  const [activeVerticalTab, setactiveVerticalTab] = useState(7);
  const [progressbarvalue, setprogressbarvalue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
  const [passedverticalSteps, setPassedverticalSteps] = useState([1]);
  const [entity, setEntity] = React.useState("");
  const [editData, setEditData] = React.useState({});
  const [dataForm, setDataForm] = React.useState({});
  const [dataCompany, setDataCompany] = React.useState([]);
  const [data, setData] = React.useState({});
  const [img, setImg] = React.useState("");
  const [comId, setComId] = React.useState("");
  let [testObj, setTestObj] = React.useState({});
  const [mileStoneData, setMileStoneData] = React.useState([]);

  console.log(editData, "edtdata");

  const check_company_entity_url = api.TASKMO_URL + check_company_entity;

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

  const handleChangeEntity = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleCheck = (event) => {
    event.preventDefault();

    console.log(editData, Object.values(editData)[1], "first");

    axios
      .get(check_company_entity_url, {
        params: {
          entity_type: editData.entity_type,
          type: Object.keys(editData)[1],
          value: Object.values(editData)[1],
        },
      })
      .then((res) => {
        console.log(res, "response_company");
        const dataSearch = res.data?.search;
        if (dataSearch.length == 0) {
          setCheck(true);
        } else {
          setDataCompany(res.data?.search[0]);
          setModelData(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogoClick = () => {
    hiddenFile.current.click();
  };

  // const defValue = industryType?.find(
  //   (item) => item.value == data.industry_type
  // );
  // const fundDef = fundStatus?.find((item) => item.value == data.funding_status);

  console.log(dataCompany, "dataCompany");

  const imageUpload = (e) => {
    const link = api.AWS_URL + upload_issue_proof;
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    // axiosData.append("id", userData.id);

    axios
      .post(link, axiosData)
      .then((res) => {
        console.log(res.data.url, "ddt");
        setImg(res.data.url);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const handleComapnyDetails = () => {
    const link = api.TASKMO_URL + create_company;
    data.brand_logo = img;
    data.founder_details = JSON.stringify(mileStoneData);
    console.log(data);
    const comp = Object.values(data);
    if (comp.length >= 18 && mileStoneData?.length > 0) {
      axios
        .post(link, data)
        .then((res) => {
          successnotify("success");
          toggleTab(2, 50);
          setComId(res.data.message);
        })
        .catch((err) => warningnotify("oops something went wrong...!"));
      // alert("hii");
    } else {
      warningnotify("Plaese enter all the details");
    }

    console.log(data, "123");
  };

  const handleClickAdd = () => {
    let obj = { ...testObj, id: uuid() };
    if (!Object.keys(testObj).includes("month")) {
      Object.month = new Date();
    }
    console.log(obj, "finalobj");

    setMileStoneData([...mileStoneData, obj]);
    testObj.type_value = "";
    setTestObj({});
  };
  console.log(mileStoneData, "milestone");
  return (
    <div className="page-content">
      <BreadCrumb title="Add Company" pageTitle="Sow" />

      <div>
        <Card>
          <CardBody>
            <div style={{ width: "50%", margin: "auto" }}>
              <div className="progress-nav mb-4">
                <Progress value={progressbarvalue} style={{ height: "1px" }} />

                <Nav
                  className="nav-pills progress-bar-tab custom-nav"
                  role="tablist"
                >
                  <NavItem>
                    <NavLink
                      to="#"
                      id="pills-gen-info-tab"
                      className={classnames(
                        {
                          active: activeTab === 1,
                          done: activeTab <= 4 && activeTab >= 0,
                        },
                        "rounded-pill"
                      )}
                      // onClick={() => {
                      //   toggleTab(1, 0);
                      // }}
                      tag="button"
                    >
                      1
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      id="pills-gen-info-tab"
                      className={classnames(
                        {
                          active: activeTab === 2,
                          done: activeTab <= 4 && activeTab > 1,
                        },
                        "rounded-pill"
                      )}
                      // onClick={() => {
                      //   toggleTab(2, 50);
                      // }}
                      tag="button"
                    >
                      2
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      id="pills-gen-info-tab"
                      className={classnames(
                        {
                          active: activeTab === 3,
                          done: activeTab <= 4 && activeTab > 2,
                        },
                        "rounded-pill"
                      )}
                      // onClick={() => {
                      //   toggleTab(3, 100);
                      // }}
                      tag="button"
                    >
                      3
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "140px",
                fontSize: "14px",
                justifyContent: "center",
              }}
            >
              <div className="d-flex flex-column align-items-center gap-1">
                <span style={{ fontWeight: "500" }}>New Company Details</span>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span style={{ fontWeight: "500", marginRight: "25px" }}>
                  New Client Details
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span style={{ marginRight: "20px", fontWeight: "500" }}>
                  GST details
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <TabContent activeTab={activeTab}>
          <TabPane tabId={1}>
            <div>
              <Card>
                <CardBody>
                  <div>
                    <div className="d-flex flex-column justify-content-center align-items-center mb-4 p-4"></div>

                    <form onSubmit={handleCheck}>
                      <Row>
                        <Col>
                          <div>
                            <label htmlFor="entity" className="form-label">
                              Select Entity Type
                            </label>

                            <div className="input-group">
                              <select
                                className="form-select"
                                id="entity"
                                required
                                onChange={(e) => {
                                  setEntity(e.target.value);
                                  setEditData({
                                    ...editData,
                                    entity_type: e.target.value,
                                  });
                                  setData({
                                    ...data,
                                    entity_type: e.target.value,
                                  });
                                }}
                              >
                                <option value="" disabled selected>
                                  Select Entity
                                </option>
                                <option value="NGO">NGO</option>
                                <option value="Proprietorship">
                                  Proprietorship
                                </option>
                                <option value="Private Limited">
                                  Private Limited
                                </option>
                                <option value="Public Limited">
                                  Public Limited
                                </option>
                                <option value="LLP">LLP</option>
                              </select>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            <label
                              htmlFor="entity"
                              className="form-label"
                              required
                            >
                              Enter{" "}
                              {entity == "Proprietorship"
                                ? "GST"
                                : entity == "Private Limited" ||
                                  entity == "Public Limited"
                                ? "Company Registration Number"
                                : entity == "LLP"
                                ? "LLP Number"
                                : "NGO Name"}
                            </label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name={
                                  entity == "Proprietorship"
                                    ? "gst"
                                    : entity == "Private Limited" ||
                                      entity == "Public Limited"
                                    ? "company_registration_number"
                                    : entity == "LLP"
                                    ? "llp_number"
                                    : "ngo_name"
                                }
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                onChange={(e) => {
                                  handleChangeEntity(e);
                                  setData({
                                    ...data,
                                    [data.entity_type == "Private Limited"
                                      ? "company_registration_number"
                                      : data.entity_type == "Public Limited"
                                      ? "company_registration_number"
                                      : data.entity_type == "Proprietorship"
                                      ? "gst"
                                      : data.entity_type == "LLP"
                                      ? "llp_number"
                                      : "ngo_name"]: e.target.value,
                                  });
                                }}
                                required
                              />

                              <button
                                className="btn btn-primary"
                                type="submit"
                                id="button-addon1"
                                onClick={handleCheck}
                                disabled={
                                  Object.values(editData).length > 1 &&
                                  !Object.values(editData).includes("")
                                    ? false
                                    : true
                                }
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
              </Card>

              {check && (
                <>
                  <Card>
                    <CardBody>
                      <div>
                        <h5 className="mb-3">Company Details</h5>
                        <div>
                          <img
                            src={img == "" ? "/user-dummy-img.jpg" : img}
                            alt="img"
                            className="rounded-circle avatar-md"
                          />

                          <button
                            type="button"
                            className="btn btn-primary btn-label waves-effect waves-light "
                            style={{
                              marginLeft: "16px",
                              paddingLeft: "14px",
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
                            onChange={(e) => {
                              imageUpload(e);
                            }}
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    company_name: e.target.value,
                                  })
                                }
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    brand_name: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <Label className="mt-1"> Industry Type</Label>
                            <Select
                              aria-label=".form-select-sm example"
                              // onChange={handleCompanyList}
                              options={industryType}
                              // value={defValue}
                              // defaultValue={defValue}
                              isClearable={true}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  industry_type: e.value,
                                })
                              }
                            ></Select>
                          </Col>
                          <Col lg={6} className="mb-4">
                            <Label className="mt-1"> Funding Status</Label>
                            <Select
                              aria-label=".form-select-sm example"
                              options={fundStatus}
                              // value={defValue}
                              // defaultValue={fundDef}
                              isClearable={true}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  funding_status: e.value,
                                })
                              }
                            ></Select>
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    webiste_link: e.target.value,
                                  })
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    company_tds: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                          <Col xs="6" className="mb-4">
                            <div>
                              <Label className="form-label ">
                                Company Start Date
                              </Label>
                              <Flatpickr
                                className="form-control"
                                options={{
                                  dateFormat: "d M, Y",
                                }}
                                onChange={(e) => {
                                  setData({
                                    ...data,
                                    company_start_date: moment(e[0]).format(
                                      "YYYY-MM-DD"
                                    ),
                                  });
                                  console.log(
                                    moment(e[0]).format("YYYY-MM-DD"),
                                    "ee"
                                  );
                                }}
                              />
                            </div>
                          </Col>
                          <Col xs="12">
                            <div>
                              <label htmlFor="startdate" className="form-label">
                                About Company
                              </label>
                              <textarea
                                style={{ width: "100%", height: "120px" }}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    company_discription: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div>
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    company_pin: e.target.value,
                                  })
                                }
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
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    company_city: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                          <Col xs="6" className="mb-4">
                            <div>
                              <label htmlFor="addrs" className="form-label">
                                Company Address
                              </label>

                              <textarea
                                style={{ width: "100%", height: "128px" }}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    company_address: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                          <Col xs="6" className="mb-4">
                            <Row>
                              <Col xs="12" className="mb-4">
                                <div>
                                  <label htmlFor="state" className="form-label">
                                    State
                                  </label>

                                  <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder=""
                                    onChange={(e) =>
                                      setData({
                                        ...data,
                                        company_state: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </Col>
                              <Col xs="12">
                                <div>
                                  <label htmlFor="state" className="form-label">
                                    Country
                                  </label>

                                  <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder=""
                                    onChange={(e) =>
                                      setData({
                                        ...data,
                                        company_country: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div>
                        {/* <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5>Founder Details</h5>
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={handleAddFounder}
                          >
                            <i className=" ri-add-fill align-middle me-1"></i>
                            Add More
                          </button>
                        </div>

                        {founderdet?.map((item) => {
                          return (
                            <>
                              <Row className="mb-3" key={item}>
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
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
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
                                    <label
                                      htmlFor="found"
                                      className="form-label"
                                    >
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
                              </Row>
                            </>
                          );
                        })} */}
                        <Row>
                          <Col xs="12">
                            <div className="d-flex justify-content-between">
                              <h5 className="mb-4 text-primary">
                                Founder Details
                              </h5>
                              <div>
                                <button
                                  disabled={
                                    Object.keys(testObj).includes(
                                      "founder_name"
                                    ) &&
                                    testObj.founder_name !== "" &&
                                    Object.keys(testObj).includes(
                                      "founder_email"
                                    ) &&
                                    testObj.founder_email !== "" &&
                                    Object.keys(testObj).includes(
                                      "founder_contact"
                                    ) &&
                                    testObj.founder_phone !== "" &&
                                    Object.keys(testObj).includes(
                                      "founder_linkedIn"
                                    ) &&
                                    testObj.founder_linkedIn !== ""
                                      ? false
                                      : true
                                  }
                                  type="button"
                                  className="btn btn-primary waves-effect waves-light btn-sm"
                                  onClick={handleClickAdd}
                                >
                                  Add
                                </button>
                              </div>
                            </div>

                            <Row>
                              <Col xs="6">
                                <div>
                                  <label
                                    htmlFor="basiInput"
                                    className="form-label"
                                  >
                                    Founder Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="basiInput"
                                    // placeholder="0"
                                    // value={
                                    //   testObj.quantity == undefined ? 0 : testObj.quantity
                                    // }
                                    onChange={(e) => {
                                      setTestObj({
                                        ...testObj,
                                        founder_name: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col xs="6">
                                <div>
                                  <label
                                    htmlFor="basiInput"
                                    className="form-label"
                                  >
                                    Founder Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="basiInput"
                                    // placeholder="0"
                                    // value={
                                    //   testObj.quantity == undefined ? 0 : testObj.quantity
                                    // }
                                    onChange={(e) => {
                                      setTestObj({
                                        ...testObj,
                                        founder_email: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col xs="6" className="mt-4">
                                <div>
                                  <label
                                    htmlFor="basiInput"
                                    className="form-label"
                                  >
                                    Founder Contact
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="basiInput"
                                    // placeholder="0"
                                    // value={
                                    //   testObj.quantity == undefined ? 0 : testObj.quantity
                                    // }
                                    onInput={(e) =>
                                      (e.target.value = Math.max(
                                        0,
                                        parseInt(e.target.value)
                                          .toString()
                                          .slice(0, 10)
                                      ))
                                    }
                                    onChange={(e) => {
                                      setTestObj({
                                        ...testObj,
                                        founder_contact: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                              <Col xs="6" className="mt-4">
                                <div>
                                  <label
                                    htmlFor="basiInput"
                                    className="form-label"
                                  >
                                    Founder LinkedIn
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="basiInput"
                                    // placeholder="0"
                                    // value={
                                    //   testObj.quantity == undefined ? 0 : testObj.quantity
                                    // }
                                    onChange={(e) => {
                                      setTestObj({
                                        ...testObj,
                                        founder_linkedIn: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <hr className="mt-5"></hr>
                          </Col>
                          <Col xs="12" className="mt-2">
                            <h5 className="mb-4 text-primary">
                              Founder Details Table
                            </h5>
                            <div>
                              {mileStoneData?.length == 0 ? (
                                <div style={{}}>No TableData Found</div>
                              ) : (
                                <table className="table caption-top table-nowrap">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">Founder Name</th>
                                      <th scope="col">Founder Email</th>
                                      <th scope="col">Founder Contact</th>
                                      <th scope="col">Founder Linkedin</th>
                                      <th scope="col">Delete</th>
                                      {/* <th scope="col">Payment</th> */}
                                    </tr>
                                  </thead>
                                  {/* <tbody>
                  {data.milestones?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.type_value}</td>
                        <td>{moment(item.month).format("YYYY-MM-DD")}</td>
                        <td>{item.quantity}</td>
                        <td>delete icon</td>
                      </tr>
                    );
                  })}
                </tbody> */}

                                  <tbody>
                                    {mileStoneData?.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{item.founder_name}</td>
                                          <td>{item.founder_email}</td>
                                          <td>{item.founder_contact}</td>
                                          <td>{item.founder_linkedIn}</td>
                                          <td
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              let ot = mileStoneData.filter(
                                                (it) => it.id !== item.id
                                              );
                                              setMileStoneData(ot);
                                              console.log(item.id, "testing");
                                            }}
                                          >
                                            <i className="ri-delete-bin-fill text-danger fs-20"></i>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              )}
                            </div>

                            <hr
                              style={{
                                marginTop: "24px",
                                marginBottom: "24px",
                              }}
                            ></hr>
                          </Col>
                        </Row>
                      </div>
                      <div className="d-flex justify-content-end gap-2 ">
                        <button
                          type="button"
                          className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleComapnyDetails()}
                        >
                          <i className="bx bx-save align-middle me-1  fs-14 "></i>
                          Save
                        </button>
                      </div>
                    </CardBody>
                  </Card>
                </>
              )}
            </div>
          </TabPane>

          <TabPane tabId={2}>
            <ClientDetails toggleTab={toggleTab} comId={comId} />
          </TabPane>

          <TabPane tabId={3}>
            <Addgst toggleTab={toggleTab} comId={comId} />
          </TabPane>
        </TabContent>
      </div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modelData}
        toggle={() => setModelData(!modelData)}
        centered={true}
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => setModelData(!modelData)}
        ></ModalHeader>

        <ModalBody>
          <div className="text-center ">
            <p className="fs-20">Company already exists</p>
            <Button
              color="link"
              className="text-capitalize"
              onClick={() =>
                history.push(
                  `/business-dashboard/company/${dataCompany.company_id}`
                )
              }
            >
              {dataCompany.company_name}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddCompany;
