import axios from "axios";
import React from "react";
import { useContext } from "react";
import CountUp from "react-countup";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Context } from "../../../App";
import {
  card_data,
  sp_document_list,
  sp_document_verify_list,
} from "../../../assets/utils/mepApi";
import { asmlist } from "../../../assets/utils/SupplyApi";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { farming, api } from "../../../globalConfig";

import { AddTsmMod } from "./CmModals";
import CmTable from "./CmTable";
import CmTable2 from "./Projects/CmTable2";

const CmOverview = () => {
  document.title = "OnX | Supply";
  const [open, setOpen] = React.useState(false);
  const [asmList, setAsmList] = React.useState([]);
  const [fliter, setFilter] = React.useState("onboarded");
  const [fliterOn, setFilterOn] = React.useState("none");
  const [data, setData] = React.useState([]);
  const [cardData, setCardData] = React.useState({});
  const [spList, setSpList] = React.useState([]);

  const [onboardData, setOnboardData] = React.useState([]);
  const location = useLocation();
  const { id } = useParams();

  const [context, setContext] = useContext(Context);
  console.log(context.oaDetials.role, "obj");
  React.useEffect(() => {
    const link = api.VENDOR_URL + sp_document_list;
    axios
      .get(link, { params: { type: fliterOn } })
      .then((res) => {
        setOnboardData(res.data.sp_lists);
      })
      .catch((err) => console.log(err));
  }, [fliterOn]);
  React.useEffect(() => {
    const link = id
      ? farming.farming_URL + asmlist + "/" + fliter + "?cm_id=" + id
      : farming.farming_URL + asmlist + "/" + fliter;
    axios
      .get(link)
      .then((res) => setData(res.data.tsms))
      .catch((err) => console.log(err));
  }, [fliter]);

  React.useEffect(() => {
    const link = id
      ? api.VENDOR_URL + card_data + "?cm_id=" + id
      : api.VENDOR_URL + card_data;
    axios
      .get(link)
      .then((res) => setCardData(res.data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    const link = api.VENDOR_URL + sp_document_verify_list;

    axios
      .get(link)
      .then((res) => setSpList(res.data.sp_lists))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page-content">
      <BreadCrumb title={"Supply overview"} pageTitle="Project Leads" />

      <Container fluid>
        {/* <Row>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden bg-soft-success " 
                   style={{
                                  color: "#b83016",
                                  
                                }}>
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>Active TSM</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp
                      start={0}
                      end={cardData.cardData}
                      decimals={0}
                      duration={3}
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden bg-soft-danger "
                   style={{color: "#b83016"}}>
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>Inactive TSM</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp
                      start={0}
                      end={cardData.inactive_onboarded}
                      decimals={0}
                      duration={3}
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden bg-soft-warning "        style={{
                                  color: "#b83016"
                                }}>
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>New TSM</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp
                      start={0}
                      end={cardData.new_onboarded}
                      decimals={0}
                      duration={3}
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={"3"}>
            <Card className="card-animate overflow-hidden bg-soft-secondary "
                   style={{
                                  color: "#b83016"
                                }}
            >
              <CardBody style={{ zIndex: "1" }}>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ fontWeight: "600" }}
                >
                  <p style={{ margin: "0px" }}>Total TSM</p>
                  <p style={{ margin: "0px" }}>
                    <CountUp
                      start={0}
                      end={cardData.total_team}
                      decimals={0}
                      duration={3}
                    />
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}

        {location.pathname != "/hr/onboarding" ? (
          <Row className="mb-4">
            {/* <h5 className="mb-3 fw-semibold">Select Bank</h5> */}

            <div className="hstack gap-1 flex justify-content-between">
              <Col xs="3">
                <div className="form-check card-radio" style={{ width: "90%" }}>
                  {/* <input
                  id="listGroupRadioGrid3"
                  name="listGroupRadioGrid"
                  type="radio"
                  className="form-check-input"
                /> */}
                  <label
                    className="form-check-label"
                    htmlFor="listGroupRadioGrid3"
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-1">
                        <div className="avatar-xs">
                          <div
                            className="avatar-title bg-soft  fs-18 rounded"
                            style={{
                              color: "#b83016",
                              backgroundColor: "#f07d47",
                            }}
                          >
                            <i className="mdi mdi-briefcase-check-outline text-light"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1 text-muted fs-12">Total TSM</h6>
                        <b className="pay-amount fs-18">
                          {cardData.total_team}
                        </b>
                      </div>
                      <div className="flex-shrink-0 align-self-center">
                        <span className={"fs-12 badge badge-soft-success"}>
                          <i
                            className={
                              "fs-12 align-middle me-1  ri-record-circle-line"
                            }
                          ></i>
                          {cardData.new_onboarded}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </Col>
              {/* <Col xs="3">
                <div className="form-check card-radio" style={{ width: "90%" }}>
                 
                  <label
                    className="form-check-label"
                    htmlFor="listGroupRadioGrid1"
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-1">
                        <div className="avatar-xs">
                          <div className="avatar-title bg-soft-success text-success fs-18 rounded">
                            <i className="mdi mdi-briefcase-check-outline"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1 text-muted fs-12">Active TSM</h6>
                        <b className="pay-amount fs-18">
                          {cardData.new_onboarded}
                        </b>
                      </div>
                    </div>
                  </label>
                </div>
              </Col> */}
              <Col xs="3">
                <div className="form-check card-radio" style={{ width: "90%" }}>
                  {/* <input
                  id="listGroupRadioGrid3"
                  name="listGroupRadioGrid"
                  type="radio"
                  className="form-check-input"
                /> */}
                  <label
                    className="form-check-label"
                    htmlFor="listGroupRadioGrid3"
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-1">
                        <div className="avatar-xs">
                          <div className="avatar-title bg-soft-info text-info fs-18 rounded">
                            <i className="mdi mdi-briefcase-clock-outline"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1 text-muted fs-12">Only TSM</h6>
                        <b className="pay-amount fs-18">
                          {cardData.inactive_onboarded}
                        </b>
                      </div>
                      <div className="flex-shrink-0 align-self-center">
                        <span className={"fs-12 badge badge-soft-success"}>
                          <i
                            className={
                              "fs-12 align-middle me-1  ri-record-circle-line text-center"
                            }
                          ></i>
                          {cardData.total_vendor_onboarded}
                          <span></span>
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </Col>
              <Col xs="3">
                <div
                  className="form-check card-radio "
                  style={{ width: "90%" }}
                >
                  {/* <input
                  id="listGroupRadioGrid2"
                  name="listGroupRadioGrid"
                  type="radio"
                  className="form-check-input"
                /> */}
                  <label
                    className="form-check-label"
                    htmlFor="listGroupRadioGrid2"
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-1">
                        <div className="avatar-xs">
                          <div className="avatar-title bg-soft-info text-secondary fs-18 rounded">
                            <i className="mdi mdi-briefcase-remove-outline"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1 text-muted fs-12">Only Vendor</h6>
                        <b className="pay-amount fs-18">
                          {cardData.total_onboarded}
                        </b>
                      </div>
                      <div className="flex-shrink-0 align-self-center">
                        <span className={"fs-12 badge badge-soft-success"}>
                          <i
                            className={
                              "fs-12 align-middle me-1  ri-record-circle-line "
                            }
                          ></i>
                          {cardData.total_sp_onboarded}
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </Col>
            </div>
          </Row>
        ) : (
          <></>
        )}
        <Row>
          {location.pathname == "/hr/onboarding" ? (
            <Row>
              <Col xs="6">
                <Card className="">
                  <CardHeader
                    className="d-flex justify-content-between align-items-center"
                    style={{ marginTop: "10px", padding: "6px" }}
                  >
                    <h5 className="card-title ms-4 fs-20">
                      {" "}
                      {location.pathname == "/hr/onboarding"
                        ? "New Profile"
                        : "Man Power"}
                    </h5>

                    <div>
                      {/* {location.pathname != "/hr/onboarding" ? (
                        <UncontrolledDropdown
                          // direction="start"
                          className="dropdown d-inline-block "
                        >
                          <DropdownToggle className="btn  btn-sm" tag="button">
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
                              style={{ marginRight: "8px" }}
                            >
                              <i className=" ri-filter-line align-bottom me-1"></i>
                              Filter
                            </button>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("none");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-warning"></i>
                              New
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("onboarded");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-success"></i>
                              Active
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("inactive");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill  align-bottom me-2 text-danger"></i>
                              Inactive
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilter("hold");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 "        style={{
                                  color: "#b83016"
                                }}></i>
                              Hold
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      ) : (
                        <UncontrolledDropdown
                          // direction="start"
                          className="dropdown d-inline-block "
                        >
                          <DropdownToggle className="btn  btn-sm" tag="button">
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
                              style={{
                                marginRight: "-70px",
                                visibility: "hidden",
                              }}
                              onClick={() => {
                                "";
                              }}
                            >
                              <i className=" ri-filter-line align-bottom me-1"></i>
                              Filter
                            </button>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilterOn("none");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-warning"></i>
                              New
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilterOn("needs_review");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-info"></i>
                              Needs Review
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilterOn("rejected");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-danger"></i>
                              Rejected
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilterOn("duplicate");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill  align-bottom me-2 text-secondary"></i>
                              Duplicate
                            </DropdownItem>
                            <DropdownItem
                              className="edit-item-btn d-flex align-items-center"
                              onClick={() => {
                                setFilterOn("verified");
                              }}
                            >
                              <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-success"></i>
                              Verified
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      )} */}
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#ec5c24",
                          color: "whitesmoke",
                          transition: "background-color 0.3s ease",
                          marginRight: "220px",
                          visibility:
                            location.pathname == "/hr/onboarding"
                              ? "hidden"
                              : "visible",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#dd4319")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#ec5c24")
                        }
                        onClick={() => setOpen(!open)}
                        disabled={context.oaDetials.role == "cm" ? false : true}
                      >
                        <i className=" ri-add-fill align-middle me-1"></i>
                        SP
                      </button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CmTable
                      data={data}
                      role={context.oaDetials.role}
                      onboardData={onboardData}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xs="6">
                {location.pathname == "/hr/onboarding" ? (
                  <CmTable2 data={spList} />
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          ) : (
            <Row>
              <Card className="">
                <CardHeader
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: "10px", padding: "6px" }}
                >
                  <h5 className="card-title ms-4 fs-20">
                    {" "}
                    {location.pathname == "/hr/onboarding"
                      ? "New Profile"
                      : "Man Power"}
                  </h5>

                  <div>
                    {location.pathname != "/hr/onboarding" ? (
                      <UncontrolledDropdown
                        // direction="start"
                        className="dropdown d-inline-block "
                      >
                        <DropdownToggle className="btn  btn-sm" tag="button">
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#ec5c24",
                              color: "whitesmoke",
                              transition: "background-color 0.3s ease",
                              marginRight: "8px",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#dd4319")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "#ec5c24")
                            }
                          >
                            <i className=" ri-filter-line align-bottom me-1"></i>
                            Filter
                          </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilter("none");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-warning"></i>
                            New
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilter("onboarded");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-success"></i>
                            Active
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilter("inactive");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill  align-bottom me-2 text-danger"></i>
                            Inactive
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilter("hold");
                            }}
                          >
                            <i
                              className=" ri-checkbox-blank-circle-fill align-bottom me-2 "
                              style={{
                                color: "#b83016",
                              }}
                            ></i>
                            Hold
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ) : (
                      <UncontrolledDropdown
                        // direction="start"
                        className="dropdown d-inline-block "
                      >
                        <DropdownToggle className="btn  btn-sm" tag="button">
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#ec5c24",
                              color: "whitesmoke",
                              transition: "background-color 0.3s ease",
                              marginRight: "-70px",
                              visibility: "hidden",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#dd4319")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "#ec5c24")
                            }
                            onClick={() => {
                              "";
                            }}
                          >
                            <i className=" ri-filter-line align-bottom me-1"></i>
                            Filter
                          </button>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilterOn("none");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-warning"></i>
                            New
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilterOn("needs_review");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-info"></i>
                            Needs Review
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilterOn("rejected");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-danger"></i>
                            Rejected
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilterOn("duplicate");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill  align-bottom me-2 text-secondary"></i>
                            Duplicate
                          </DropdownItem>
                          <DropdownItem
                            className="edit-item-btn d-flex align-items-center"
                            onClick={() => {
                              setFilterOn("verified");
                            }}
                          >
                            <i className=" ri-checkbox-blank-circle-fill align-bottom me-2 text-success"></i>
                            Verified
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    )}
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#ec5c24",
                        color: "whitesmoke",
                        transition: "background-color 0.3s ease",
                        marginRight: "220px",
                        visibility:
                          location.pathname == "/hr/onboarding"
                            ? "hidden"
                            : "visible",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#dd4319")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#ec5c24")
                      }
                      onClick={() => setOpen(!open)}
                      disabled={context.oaDetials.role == "cm" ? false : true}
                    >
                      <i className=" ri-add-fill align-middle me-1"></i>
                      SP
                    </button>
                  </div>
                </CardHeader>
                <CardBody>
                  <CmTable
                    data={data}
                    role={context.oaDetials.role}
                    onboardData={onboardData}
                  />
                </CardBody>
              </Card>
            </Row>
          )}
        </Row>
      </Container>
      <AddTsmMod setOpen={setOpen} open={open} />
    </div>
  );
};

export default CmOverview;
