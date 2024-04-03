import React, { useContext, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import OverViewSection from "./Tabs/OverViewSection";
import OverViewClient from "./Tabs/OverViewClient";
import FlipModal from "./FlipModal";
import InvoiceDetails from "../Finance/Commericals/InvoiceDetails";
import { use } from "i18next";
import { Context } from "../../App";
import { toast } from "react-toastify";
import { api } from "../../globalConfig";
import {
  aravindSowAdd,
  create_sow,
  managers_oa,
  work_id_manager,
} from "../../assets/utils/dashboard";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { helper } from "echarts";

//import images
// import slack from "../../../assets/images/brands/slack.png";
// import OverviewTab from "./OverviewTab";
// import DocumentsTab from "./DocumentsTab";
// import ActivitiesTab from "./ActivitiesTab";
// import TeamTab from "./TeamTab";

const ProjectOverViewSection = ({ data, setCheck, check }) => {
  //context

  const [context, setContext] = useContext(Context);

  //Tab
  const [activeTab, setActiveTab] = useState("1");

  //flipmodal data
  const [modal_animationFlip, setmodal_animationFlip] = useState(false);
  const [formData, setFormData] = React.useState({});
  const [modelData, setModelData] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modal_edit, set_modal_edit] = useState(false);
  const [workteam, setWorkTeam] = React.useState(false);
  const [oashow, setOaShow] = React.useState(false);
  const [managerData, setManagerData] = React.useState([]);
  const [oaData, setOaData] = React.useState([]);
  const [helperReRender, setHelperReRender] = useState(false);

  const createSowUrl = api.OA_URL + create_sow;
  const work_id_manager_url = api.VENDOR_URL + work_id_manager;
  const managers_oa_url = api.VENDOR_URL + managers_oa;

  React.useEffect(() => {
    axios
      .get(work_id_manager_url)
      .then((res) => {
        setManagerData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });

    if (oashow) {
      delete formData.oa_work_id;
      // setOaShow(false)
      axios
        .get(managers_oa_url, { params: { work_team: workteam } })
        .then((res) => {
          // setOaShow(true)
          setOaData(res?.data?.data);
        })
        .catch((err) => console.log(err, "errint"));
    }
  }, [oashow, workteam]);

  function tog_animationFlip(d) {
    setModalType(d);
    setmodal_animationFlip(!modal_animationFlip);
  }

  const handleChange = (e) => {
    if (e.target == undefined) {
      const name = "start_date";
      const value = moment(e[0]).format("YYYY-MM-DD");
      setFormData({ ...formData, [name]: value });
    } else if (e.target.name == "manager_work_id") {
      const data = e.target.value.split(",");
      setWorkTeam(data[1]);
      setFormData({ ...formData, [e.target.name]: data[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChange1 = (e) => {
    const name = "end_date";
    const value = moment(e[0]).format("YYYY-MM-DD");
    setFormData({ ...formData, [name]: value });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    formData.ref_table_name = data.ref_table_name;
    formData.brand_logo = data.brand_logo;
    formData.project_id = data?.main_id;
    formData.add_lead_status = "none";
    formData.ref_project_id = data.project_id;

    axios
      .post(createSowUrl, formData)
      .then((res) => {
        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          // setNextData(false);
          setModelData(false);
          setCheck(!check);
          setHelperReRender(!helperReRender);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card className="mt-n3">
            <div>
              <CardBody className="pb-0 px-4">
                <Row className="mb-3">
                  <div className="col-md">
                    <Row className="align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            {
                              <img
                                src={data?.brand_logo ?? "/logo512.png"}
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
                          <h4 className="fw-bold">
                            {data?.project_title}{" "}
                            <span>&nbsp;-&nbsp;{data?.project_unique_id}</span>
                          </h4>
                          <div className="hstack gap-3 flex-wrap mt-2">
                            <div>
                              Company ID :{" "}
                              <span
                                className="fw-medium text-info"
                                style={{ cursor: "pointer" }}
                                onClick={() => tog_animationFlip("compId")}
                              >
                                {data?.company_unique_id}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              <div>
                                Agreement ID :&nbsp;
                                <span
                                  className="fw-medium  text-info"
                                  style={
                                    context?.oaDetials?.role == "super_admin" ||
                                    context?.oaDetials?.role == "manager" ||
                                    context?.oaDetials?.role == "head"
                                      ? { cursor: "pointer" }
                                      : {
                                          pointerEvents: "none",
                                        }
                                  }
                                  // onClick={() => tog_animationFlip("agreeId")}
                                  onClick={() => set_modal_edit(true)}
                                >
                                  {data?.agreement_unique_id}
                                </span>
                              </div>
                              {data?.commercial_status == "pending" ? (
                                <div
                                  style={{
                                    position: "absolute",
                                    marginTop: "1px",
                                  }}
                                >
                                  <p className="text-danger mt-1 fs-10">
                                    Commercial approval pending
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="vr"></div>
                            {/* <div>
                              Lead ID :{" "}
                              <span className="fw-medium">
                              {data?.lead_unique_id}
                              </span>
                              </div>
                            <div className="vr"></div> */}
                            {/* <div>
                              Commercial ID :{" "}
                              <span
                                className="fw-medium text-info"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  tog_animationFlip("commercialId")
                                }
                              >
                                {data?.commercial_unique_id}
                              </span>
                            </div> */}
                            {/* <div className="vr"></div> */}
                            <div>
                              Lead ID :{" "}
                              <span className="fw-medium">
                                {data?.lead_unique_id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className="col-md-auto">
                    {/* <div className="hstack gap-1 flex-wrap">
                      <div>
                        <div>Client Name: {data.client_name}</div>
                        <div>Client Number: {data.client_phone}</div>
                        <div>Client Email: {data.client_email}</div>
                        <div>Client Designation: {data.client_designation}</div>
                      </div>
                    </div> */}
                    {!data.sow_id > 0 &&
                      context?.oaDetials?.role == "super_admin" && (
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => setModelData(!modelData)}
                        >
                          <i className="ri ri-add-line"></i>
                          Move
                        </button>
                      )}
                  </div>
                </Row>

                {/* <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("1");
                      }}
                      href="#"
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "2" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("2");
                      }}
                      href="#"
                    >
                      Client
                    </NavLink>
                  </NavItem>
                </Nav> */}
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          {/* <TabContent activeTab={activeTab} className="text-muted">
              <TabPane tabId="1">
                {" "}
                <OverViewSection data={data} />
              </TabPane>
              <TabPane tabId="2">
                <OverViewClient data={data} />
              </TabPane>
              
            </TabContent> */}
          <OverViewSection data={data} />
        </Col>
      </Row>
      {modal_animationFlip && (
        <FlipModal
          modal_animationFlip={modal_animationFlip}
          setmodal_animationFlip={setmodal_animationFlip}
          tog_animationFlip={tog_animationFlip}
          modalType={modalType}
          data={data}
        />
      )}
      {modal_edit && (
        <Modal
          id="flipModal"
          tabIndex="-1"
          isOpen={modal_edit}
          toggle={() => {
            set_modal_edit(false);
          }}
          centered={true}
          size="lg"
          modalClassName="flip"
        >
          <ModalBody>
            <InvoiceDetails
              data={context.projectId}
              logo={data?.brand_logo}
              set_modal_edit={set_modal_edit}
              commData={data?.commercial_status}

              // update={update}
              // setUpdate={setUpdate}
            />
          </ModalBody>
        </Modal>
      )}
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modelData}
        toggle={() => setModelData(!modelData)}
        centered={true}
        size="lg"
      >
        <ModalHeader className="p-3" toggle={() => setModelData(!modelData)}>
          New Project
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <>
              <div className="mb-3">
                <Row className="align-items-center g-3">
                  <Col lg={6}>
                    <Label> Start Date</Label>
                    <Flatpickr
                      placeholder="Select Start Date"
                      className="form-control"
                      id="exampleInputdate"
                      name="startdate"
                      onChange={handleChange}
                    />
                  </Col>

                  {/* <Col lg={6}>
                    <Label>End Date</Label>
                    <Flatpickr
                      placeholder="Select End Date"
                      className="form-control"
                      id="exampleInputdate"
                      options={{
                        minDate: formData.startdate,
                      }}
                      name="enddate"
                      onChange={handleChange1}
                    />
                  </Col> */}

                  <Col lg={6}>
                    <Label>Project Title</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="project_title"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>

              <div className="mb-3">
                <Row className="align-items-center g-3">
                  {/* <Col lg={6}>
                    <Label>Project Title</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="project_title"
                      onChange={handleChange}
                    />
                  </Col> */}
                  <Col xs={4}>
                    <Label>Tasker CPL</Label>
                    <input
                      type="number"
                      className="form-control"
                      id="emailInput"
                      name="xleads"
                      onChange={handleChange}
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="xleads"
                      onChange={handleChange}
                    /> */}
                    {/* <select
                      className="form-select"
                      aria-label=".form-select-sm example"
                      name="xleads"
                      onChange={handleChange}
                    >
                      <option>Select Tasker</option>

                      <option value="100">Bronze</option>
                      <option value="150">Silver</option>
                      <option value="250">Gold</option>
                      <option value="350">Diamond</option>
                      <option value="500">Platinum</option>
                     
                    </select> */}
                  </Col>
                  <Col xs={4}>
                    <Label>Project Expense</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="project_expense"
                      onChange={handleChange}
                    />
                  </Col>

                  <Col xs={4}>
                    <Label> Group CPL</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailInput"
                      name="vendor_cpl"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center g-3 mt-2">
                  <Col lg={6}>
                    <Label>Manager</Label>
                    <select
                      className="form-select"
                      aria-label=".form-select-sm example"
                      name="manager_work_id"
                      onChange={(e) => {
                        handleChange(e);
                        setOaShow(true);
                      }}
                    >
                      <option>Select Manager</option>

                      {managerData?.map((item) => (
                        <option
                          key={item?.employee_id}
                          value={[item?.workids_id, item?.team_name]}
                        >
                          {item?.full_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  {oashow ? (
                    <Col lg={6}>
                      <Label>KAM</Label>
                      <select
                        className="form-select"
                        aria-label=".form-select-sm example"
                        name="oa_work_id"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option>Select Manager</option>

                        {oaData?.map((item) => (
                          <option
                            key={item?.employee_id}
                            value={item?.workids_id}
                          >
                            {item?.full_name}
                          </option>
                        ))}
                      </select>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>

                <div className="d-flex justify-content-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-secondary d-flex align-items-center gap-2"
                  >
                    <i className="ri ri-check-line"></i>
                    Submit
                  </button>
                </div>
              </div>
            </>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ProjectOverViewSection;
