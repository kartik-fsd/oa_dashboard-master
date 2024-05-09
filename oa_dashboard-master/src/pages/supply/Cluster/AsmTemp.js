import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Row,
  TabContent,
  Table,
  TabPane,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import axios from "axios";
import { api } from "../../../globalConfig";
import { sp_detials, vendor_fse } from "../../../assets/utils/Business";
import moment from "moment";
import AsmTable from "./AsmTable";
import BreadCrumb from "../../../components/common/BreadCrumb";

const AsmTemp = () => {
  const { id } = useParams();
  const [spDetailsData, setSpDetailsData] = React.useState([]);
  const [fseData, setFseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isErr, setIsErr] = useState(false);
  let apiData = api.VENDOR_URL + sp_detials;
  const getSpDetails = () => {
    axios
      .get(apiData, { params: { id: id } })
      .then((res) => {
        setSpDetailsData(res?.data?.sp_details);
        console.log(res?.data?.sp_details, "checkresp");
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => {});
  };

  const getFseDetails = () => {
    setIsLoading(true);
    let apiData = api.VENDOR_URL + vendor_fse;
    axios
      .post(apiData, { asm_id: id, limit: currentPage })
      .then((res) => {
        setIsLoading(false);
        setFseData(res.data.fse_list);
        setTotalPages(res.data.total_pages);
        console.log(res.data.fse_list, "checkres");
      })
      .catch((err) => setIsErr(true))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getSpDetails();
    getFseDetails();
  }, [currentPage]);

  React.useEffect(() => {
    getFseDetails();
  }, []);
  SwiperCore.use([Autoplay]);

  const [activeTab, setActiveTab] = useState("1");
  const [activityTab, setActivityTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleActivityTab = (tab) => {
    if (activityTab !== tab) {
      setActivityTab(tab);
    }
  };

  document.title = "Profile | OnX";

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title={"TSM List"} pageTitle="Project Leads" />
        <Container fluid>
          <div className="profile-foreground position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg">
              <img src={"/wallpaper.jpg"} alt="" className="profile-wid-img" />
            </div>
          </div>
          <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
            <Row className="g-4">
              <div className="col-auto">
                <div className="avatar-lg">
                  <img
                    src={
                      spDetailsData?.profile_image == "null"
                        ? "/user-dummy-img.jpg"
                        : spDetailsData?.profile_image
                    }
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                    alt="user-img"
                    className="img-thumbnail rounded-circle"
                  />
                </div>
              </div>

              <Col>
                <div className="p-2">
                  <h3 className="text-white mb-1">
                    {spDetailsData?.full_name}
                  </h3>
                  <p className="text-white-75">{spDetailsData?.cluster_name}</p>
                  <div className="hstack text-white-50 gap-1">
                    <div className="me-2 ">
                      <i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle "></i>
                      {spDetailsData?.city}, {spDetailsData?.state}
                    </div>
                    <div>
                      <i className="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>
                      {spDetailsData?.type}
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} className="col-lg-auto order-last order-lg-0">
                <Row className="text text-white-50 text-center">
                  <Col lg={6} xs={4}>
                    <div className="p-2">
                      <h4 className="text-white mb-1">
                        {spDetailsData?.monthly_leads ?? "-"}
                      </h4>
                      <p className="fs-14 mb-0">Monthly Leads</p>
                    </div>
                  </Col>
                  <Col lg={6} xs={4}>
                    <div className="p-2">
                      <h4 className="text-white mb-1">
                        {spDetailsData?.today_leads ?? "-"}
                      </h4>
                      <p className="fs-14 mb-0">Today Leads</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Row>
            <Col lg={12}>
              <div>
                <div className="d-flex">
                  <Nav
                    pills
                    className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        // href="#overview-tab"
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          Overview
                        </span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        // href="#projects"
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        <i className="ri-price-tag-line d-inline-block d-md-none"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          Taskers
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        // href="#documents"
                        className={classnames({ active: activeTab === "4" })}
                        onClick={() => {
                          toggleTab("4");
                        }}
                      >
                        <i className="ri-folder-4-line d-inline-block d-md-none"></i>{" "}
                        <span className="d-none d-md-inline-block">
                          Projects
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  {/* <div className="flex-shrink-0">
                    <Link
                      to="/pages-profile-settings"
                      className="btn btn-success"
                    >
                      <i className="ri-edit-box-line align-bottom"></i> Edit
                      Profile
                    </Link>
                  </div> */}
                </div>

                <TabContent activeTab={activeTab} className="pt-4">
                  <TabPane tabId="1">
                    <Row>
                      <Col xxl={3}>
                        <Card>
                          <CardBody>
                            <h5 className="card-title mb-3">Info</h5>
                            <div className="table-responsive">
                              <Table className="table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <th className="ps-0" scope="row">
                                      Full Name :
                                    </th>
                                    <td className="text-muted">
                                      {spDetailsData?.full_name}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="ps-0" scope="row">
                                      Mobile :
                                    </th>
                                    <td className="text-muted">
                                      +91 {spDetailsData?.mobile_number}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="ps-0" scope="row">
                                      E-mail :
                                    </th>
                                    <td
                                      className="text-muted"
                                      style={{ wordBreak: "break-word" }}
                                    >
                                      {spDetailsData?.email_id}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="ps-0" scope="row">
                                      Location :
                                    </th>
                                    <td className="text-muted">
                                      {spDetailsData?.city},{" "}
                                      {spDetailsData?.state}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th className="ps-0" scope="row">
                                      DOJ :
                                    </th>
                                    <td className="text-muted">
                                      {moment(
                                        spDetailsData?.onboarded_on
                                      ).format("DD-MMM-YYYY")}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xxl={9}>
                        <Card>
                          <CardBody>
                            <h5 className="card-title mb-3">About</h5>
                            <p>
                              Hi I'm Anna Adame, It will be as simple as
                              Occidental; in fact, it will be Occidental. To an
                              English person, it will seem like simplified
                              English, as a skeptical Cambridge friend of mine
                              told me what Occidental is European languages are
                              members of the same family.
                            </p>
                            <p>
                              You always want to make sure that your fonts work
                              well together and try to limit the number of fonts
                              you use to three or less. Experiment and play
                              around with the fonts that you already have in the
                              software you’re working with reputable font
                              websites. This may be the most commonly
                              encountered tip I received from the designers I
                              spoke with. They highly encourage that you use
                              different fonts in one design, but do not
                              over-exaggerate and go overboard.
                            </p>
                            <Row>
                              <Col xs={6} md={4}>
                                <div className="d-flex mt-4">
                                  <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                    <div
                                      className="avatar-title bg-light rounded-circle fs-16 "
                                      style={{ color: "#b83016" }}
                                    >
                                      <i className="ri-user-2-fill"></i>
                                    </div>
                                  </div>
                                  <div className="flex-grow-1 overflow-hidden">
                                    <p className="mb-1">Designation :</p>
                                    <h6 className="text-truncate mb-0">
                                      Lead Designer / Developer
                                    </h6>
                                  </div>
                                </div>
                              </Col>

                              <Col xs={6} md={4}>
                                <div className="d-flex mt-4">
                                  <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                    <div
                                      className="avatar-title bg-light rounded-circle fs-16 "
                                      style={{ color: "#b83016" }}
                                    >
                                      <i className="ri-global-line"></i>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="3">
                    {isLoading ? (
                      "loading"
                    ) : (
                      <Card>
                        <CardBody>
                          <Row>
                            {fseData?.map((item, key) => (
                              <Col xxl={3} sm={6} key={key}>
                                <Card
                                  className={`profile-project-card shadow-none profile-project-${
                                    item.onboard_status == "none"
                                      ? "primary"
                                      : item.onboard_status == "onboarded"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  <CardBody>
                                    <div className="d-flex">
                                      <div className="flex-grow-1 text-muted overflow-hidden">
                                        <h5
                                          className="fs-14 text-truncate"
                                          style={{ fontWeight: "600" }}
                                        >
                                          <span className="text-dark">
                                            {item?.full_name}
                                          </span>
                                        </h5>
                                        <p className="text-muted text-truncate mb-0 fs-10">
                                          Active Since :{" "}
                                          <span className="fw-semibold text-dark">
                                            {item.active_since} Days
                                          </span>
                                        </p>
                                      </div>
                                      {/* <div className="flex-shrink-0 ms-2">
                                        <div
                                          className={`badge badge-soft-${
                                            item.onboard_status == "none"
                                              ? "primary"
                                              : item.onboard_status ==
                                                "onboarded"
                                              ? "success"
                                              : "danger"
                                          } fs-10`}
                                        >
                                          {item.onboard_status == "onboarded"
                                            ? "Active"
                                            : item.onboard_status == "none"
                                            ? "none"
                                            : "Inactive"}
                                        </div>
                                      </div> */}
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        <div>
                                          {" "}
                                          <div>
                                            <a
                                              href="javascript: void(0);"
                                              className="avatar-group-item"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              title="more"
                                            >
                                              <div className="avatar-sm ">
                                                <div className="avatar-title rounded-circle bg-light text-dark">
                                                  {item.completed_count}
                                                </div>
                                              </div>
                                            </a>
                                          </div>{" "}
                                        </div>
                                        <div className="fs-10">completed</div>
                                      </div>
                                    </div>

                                    <div className="d-flex mt-4">
                                      <div className="flex-grow-1">
                                        <div className="d-flex align-items-center gap-2">
                                          <div>
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                              }}
                                            >
                                              <h5 className="fs-12 text-muted mb-0">
                                                Projects :
                                              </h5>

                                              {item.sows.length != 0 ? (
                                                <div>
                                                  <div
                                                    style={{ display: "flex" }}
                                                  >
                                                    <div>
                                                      {item.sows.map(
                                                        (item, i) => (
                                                          <>
                                                            {i < 4 ? (
                                                              <a
                                                                href="javascript: void(0);"
                                                                className="avatar-group-item"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title={`${item.brand_name} ( ${item.sow_id} )`}
                                                              >
                                                                <img
                                                                  src={
                                                                    item.brand_logo
                                                                  }
                                                                  alt=""
                                                                  className="rounded-circle avatar-xxs"
                                                                />
                                                              </a>
                                                            ) : (
                                                              ""
                                                            )}
                                                          </>
                                                        )
                                                      )}
                                                    </div>
                                                    <div>
                                                      {item.sows.length > 5 ? (
                                                        <div>
                                                          <a
                                                            href="javascript: void(0);"
                                                            className="avatar-group-item"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="more"
                                                          >
                                                            <div className="avatar-xxs">
                                                              <div className="avatar-title rounded-circle">
                                                                +
                                                                {Number(
                                                                  item.sows
                                                                    .length
                                                                ) - 5}
                                                              </div>
                                                            </div>
                                                          </a>
                                                        </div>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                "-"
                                              )}
                                            </div>
                                          </div>
                                          <div className="avatar-group">
                                            {(item.member || []).map(
                                              (subitem, key) => (
                                                <div
                                                  className="avatar-group-item"
                                                  key={key}
                                                >
                                                  <div className="avatar-xs">
                                                    <img
                                                      src={subitem.img}
                                                      alt=""
                                                      className="rounded-circle img-fluid"
                                                    />
                                                  </div>
                                                </div>
                                              )
                                            )}

                                            {(item.memberName || []).map(
                                              (element, key) => (
                                                <div
                                                  className="avatar-group-item"
                                                  key={key}
                                                >
                                                  <div className="avatar-xs">
                                                    <div
                                                      className="avatar-title rounded-circle bg-light "
                                                      style={{
                                                        color: "#b83016",
                                                      }}
                                                    >
                                                      {element.memberText}
                                                    </div>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            ))}
                            <Col lg={12}>
                              <Pagination
                                listClassName="justify-content-center"
                                className="pagination-separated mb-0"
                              >
                                <PaginationItem disabled={currentPage == 1}>
                                  {" "}
                                  <PaginationLink to="#">
                                    {" "}
                                    <i
                                      className="mdi mdi-chevron-left"
                                      onClick={() =>
                                        setCurrentPage(Number(currentPage) - 1)
                                      }
                                    />{" "}
                                  </PaginationLink>{" "}
                                </PaginationItem>
                                {new Array(totalPages)
                                  .fill(0)
                                  .map((item, i) => (
                                    <>
                                      <PaginationItem
                                        active={Number(i + 1) == currentPage}
                                        onClick={(e) =>
                                          setCurrentPage(Number(i) + 1)
                                        }
                                      >
                                        {" "}
                                        <PaginationLink to="#">
                                          {" "}
                                          {Number(i) + 1}{" "}
                                        </PaginationLink>{" "}
                                      </PaginationItem>
                                    </>
                                  ))}

                                <PaginationItem
                                  disabled={currentPage == totalPages}
                                >
                                  {" "}
                                  <PaginationLink to="#">
                                    {" "}
                                    <i
                                      className="mdi mdi-chevron-right"
                                      onClick={() =>
                                        setCurrentPage(Number(currentPage) + 1)
                                      }
                                    />{" "}
                                  </PaginationLink>{" "}
                                </PaginationItem>
                              </Pagination>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    )}
                  </TabPane>

                  <TabPane tabId="4">
                    <Card>
                      <CardHeader>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h5 className="card-title mb-0">SOW'S</h5>
                          <div>
                            <div style={{ height: "30px" }}></div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col lg={12}>
                            <AsmTable />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AsmTemp;
