import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Badge,
  ModalHeader,
  Modal,
  ModalBody,
} from "reactstrap";

import Select from "react-select";

//Simple bar
import SimpleBar from "simplebar-react";
import ModalFormSpocs from "../../ManagerDashboard/ModalForm/ModalFormOA";

// import BreadCrumb from "../../../Components/Common/BreadCrumb";

// import product1 from "../../../assets/images/products/img-1.png";
// import product6 from "../../../assets/images/products/img-6.png";
// import product8 from "../../../assets/images/products/img-8.png";

import { productDetailsWidgets, reviews } from "../../../common/data/ecommerce";

import { Swiper, SwiperSlide } from "swiper/react";
import classnames from "classnames";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Interweave } from "interweave";
import { api, farming } from "../../../globalConfig";
import {
  create_supply_request,
  sow_oa_assigned,
} from "../../../assets/utils/dashboard";
import axios from "axios";
import TableSupportAgent from "../../TableComponent/TableSupportAgent";
import { cityIn, stateIn } from "../../../assets/utils/SupplyApi";
import { toast } from "react-toastify";
import SupplyTableData from "../../TableComponent/SupplyTableData";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const PricingWidgetList = (props) => {
  return (
    <React.Fragment>
      <Col lg={12} sm={6} className="me-2 p-2">
        <div className="p-2 border border-dashed rounded">
          <div className="d-flex align-items-center">
            <div className="avatar-sm me-2">
              <div className="avatar-title rounded bg-transparent text-success fs-24">
                <i className={props.pricingDetails.icon}></i>
              </div>
            </div>
            <div className="flex-grow-1">
              <p className="text-muted mb-1">{props.pricingDetails.label} :</p>

              {/* {props.index == 1 && (
                <div className="mb-0">
                  {props.data.network_status == ""
                    ? "-"
                    : props.data.network_status}
                </div>
              )}
              {props.index == 2 && (
                <div className="mb-0">
                  {props.data.app_status == "" ? "-" : props.data.app_status}
                </div>
              )}
              {props.index == 3 && (
                <div className="mb-0">
                  {props.data.payment_type == "" ||
                  props.data.payment_type == null
                    ? "-"
                    : props.data.payment_type}
                </div>
              )} */}
            </div>
            {props.index == 0 && (
              <div className="mb-0 w-25 fs-20 fw-bold">
                {props.data.cpl == 0 ? "-" : props.data.cpl}
              </div>
            )}
            {props.index == 1 && (
              <div className="mb-0 w-25 fs-20 fw-bold">
                {props.data.vendor_cpl == 0 ? "-" : props.data.vendor_cpl}
              </div>
            )}
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

function EcommerceProductDetail({ data, youtube }) {
  const path = useLocation();
  const final = path.pathname.slice(1);

  const history = useHistory();
  const split = final.split("/");
  const { id } = useParams();
  const sowId = id.split("-")[0];
  let youtubeiFrame = youtube.replace("watch?v=", "embed/");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [ttop, setttop] = useState(false);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [open_spoc, set_open_spoc] = useState(false);
  const [open_supply, set_open_supply] = useState(false);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [open_oa, set_open_oa] = useState(false);
  const [open_oa1, set_open_oa1] = useState(false);
  const [total_oa, set_total_oaopen_oa] = useState([]);
  const [oaList, setOaList] = useState([]);
  const [rel, setRel] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [supplycity, setSupplyCity] = React.useState({});
  const [citybool, setCitybool] = React.useState(false);
  const [cityList, setCityList] = React.useState({});
  const [open_supportable, set_open_supportable] = React.useState(false);
  const oaListURL = api.OA_URL + sow_oa_assigned;

  console.log(data, "oaList");

  const handleSupplyRequest = (e) => {
    e.preventDefault();
    console.log(supplycity);
    supplycity.sow_id = sowId;
    delete supplycity.stateName;
    delete supplycity.city;
    delete supplycity.state;

    console.log(supplycity, "supplycity");
    let sendsupplyapi = api.VENDOR_URL + create_supply_request;
    axios
      .post(sendsupplyapi, supplycity)
      .then((res) => {
        set_open_supply(false);
        toast("success", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        console.log(res);
      })
      .catch((err) => {
        toast("Something went wrong", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };

  const handleChangeSupplyRequest = (e) => {
    if (e.label) {
      if (e.id == "state") {
        setSupplyCity({ ...supplycity, state: e.value, stateName: e.label });
        setCitybool(!citybool);
      }
      if (e.id == "city") {
        setSupplyCity({ ...supplycity, city: e.value, city_id: e.value });
      }
    } else {
      const { name, value } = e.target;
      console.log(name, value, "supplycity");
      setSupplyCity({ ...supplycity, [name]: value });
    }
  };

  React.useEffect(() => {
    console.log("hello", supplycity);
    let apicity = farming.farming_URL + cityIn + supplycity.stateName;

    setCityList(false);
    axios
      .get(apicity)
      .then((res) => {
        setCityList(true);
        setCityList(res.data.state);
      })
      .catch((err) => setCityList(false));
  }, [citybool, supplycity.stateName]);

  React.useEffect(() => {
    console.log("hello2");
    let stateApi = farming.farming_URL + cityIn + "all";
    axios
      .get(stateApi)
      .then((res) => {
        setState(res.data.state);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    axios
      .get(oaListURL, { params: { sow_id: sowId } })
      .then((res) => {
        set_total_oaopen_oa(res.data.oaList);
        const arrData = res.data.oaList;
        const firstData = arrData.slice(0, 4);
        const lastArray = arrData.slice(4, arrData.length).length;
        setOaList(arrData);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [check, rel]);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  console.log(total_oa, "youtubeiFrame");

  return (
    <div className="page-content" style={{ padding: 0, height: "100%" }}>
      <Container fluid style={{ height: "100%" }}>
        {/* <BreadCrumb title="Product Details" pageTitle="Ecommerce" /> */}

        <Row style={{ height: "100%" }}>
          <Col lg={12}>
            <Card className="">
              {/* <div className="ribbon-three ribbon-three-danger">
                <span>Trending</span>
              </div> */}
              <CardBody>
                <Row>
                  <Col xl={8} style={{ width: "100%" }}>
                    <div className="mt-xl-0 mt-5">
                      <Row>
                        <Col md={12} className="flex-grow-1">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "25px",
                            }}
                          >
                            <div>
                              <img
                                style={{ width: "60px", height: "60px" }}
                                src={data.brand_logo}
                                alt=""
                                className="rounded-circle avatar-xs"
                              />
                            </div>
                            <div>
                              <h5>{data?.project_title} </h5>
                              {/* <h6>{data.payment_type}</h6> */}
                            </div>
                            {/* <div>
                              <Badge color="success" className="badge-label">
                                <i className="mdi mdi-circle-medium"></i>
                                {data?.sow_status}
                              </Badge>
                            </div> */}
                            {/* <Col md={2} className="flex-shrink-0">
                              <div>
                                <Tooltip
                                  placement="top"
                                  isOpen={ttop}
                                  target="TooltipTop"
                                  toggle={() => {
                                    setttop(!ttop);
                                  }}
                                >
                                  Youtube
                                </Tooltip>
                                <div
                                  // href="apps-ecommerce-add-product"
                                  id="TooltipTop"
                                  className="btn btn-soft-primary"
                                  onClick={() => setOpen(true)}
                                >
                                  <i className="ri-live-fill align-bottom"></i>
                                </div>
                              </div>
                            </Col> */}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Project ID</div>
                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data?.sow_id}
                                </span>
                              </div>
                            </div>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Started on</div>
                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data?.start_date}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Category</div>
                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data.payment_type}
                                </span>
                              </div>
                            </div>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Network</div>
                              <div>
                                <span className="text-dark">
                                  :&nbsp;{" "}
                                  {data.network_status.split("_")[0] == "open"
                                    ? "Open"
                                    : "Close"}{" "}
                                  -{" "}
                                  {data.app_status == "show" ? "Show" : "Hide"}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}> Tasker CPL </div>

                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data?.cpl}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Grouped CPL </div>

                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data?.vendor_cpl}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Managed CPL </div>

                              <div>
                                <span className="text-dark">
                                  :&nbsp; {Number(data?.cpl) * 0.4}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>
                                Project Expenses{" "}
                              </div>

                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data?.project_expense}
                                </span>
                              </div>
                            </div>

                            {/* <div style={{ display: "flex" }}>
                              <div style={{ width: "100px" }}>VCPL </div>
                              <div>
                                <span className="text-dark">
                                  :&nbsp; {data?.vendor_cpl}
                                </span>
                              </div>
                            </div> */}

                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>Sales Leads </div>
                              <div>
                                <span
                                  // onClick={() => set_open_oa1(true)}
                                  // style={{ cursor: "pointer" }}
                                  className="text-dark text-capitalize"
                                >
                                  :&nbsp; {data?.sales_lead}
                                </span>
                              </div>
                            </div>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "130px" }}>KAM </div>
                              <div>
                                <span
                                  // onClick={() => set_open_oa1(true)}
                                  // style={{ cursor: "pointer" }}
                                  className="text-dark text-capitalize"
                                >
                                  :&nbsp; {data?.kam_name}
                                </span>
                              </div>
                            </div>
                            {/* <div style={{ display: "flex" }}>
                              <div style={{ width: "100px" }}>Sales Lead </div>
                              <div>
                                <span
                                  onClick={() => set_open_oa1(true)}
                                  style={{ cursor: "pointer" }}
                                  className="text-dark"
                                >
                                  :&nbsp; Name{" "}
                                </span>
                              </div>
                            </div> */}

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-5px",
                              }}
                            >
                              {sowId != "new" && data?.user_type != "spoc" ? (
                                <>
                                  {" "}
                                  <div style={{ width: "150px" }}>Support </div>
                                  <div
                                    className=" d-flex justify-content-between"
                                    style={{ width: "65%" }}
                                  >
                                    <span
                                      onClick={() => set_open_oa(true)}
                                      style={{ cursor: "pointer" }}
                                      className="text-info d-flex align-items-center "
                                    >
                                      :&nbsp;{" "}
                                      {
                                        oaList?.filter(function (element) {
                                          return element.status == "active";
                                        }).length
                                      }{" "}
                                      Associates{" "}
                                    </span>
                                    <div>
                                      {" "}
                                      &nbsp;{" "}
                                      <i
                                        className=" ri-add-circle-line   fs-20 cursor-pointer"
                                        style={{ color: "#b83016" }}
                                        onClick={() => set_open_spoc(true)}
                                      ></i>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>

                            {/* <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-5px",
                              }}
                            >
                              <div style={{ width: "100px" }}>Supply </div>
                              <div
                                className=" d-flex justify-content-between"
                                style={{ width: "65%" }}
                              >
                                <span
                                  onClick={() => set_open_supportable(true)}
                                  style={{ cursor: "pointer" }}
                                  className="text-info d-flex align-items-center "
                                >
                                  :&nbsp; Request{" "}
                                </span>
                                <div>
                                  {" "}
                                  &nbsp;{" "}
                                  <i
                                    className=" ri-add-circle-line   fs-20 cursor-pointer"
                                    style={{color: "#b83016"}}
                                    onClick={() => set_open_supply(true)}
                                  ></i>
                                </div>
                              </div>
                            </div> */}
                          </div>

                          {/* <div className="hstack gap-3 d-flex mt-2">
                            <p>
                              CPL:{" "}
                              <span className="text-dark">{data?.cpl}</span>
                            </p>
                            <p>
                              VCPL:{" "}
                              <span className="text-dark">
                                {data?.vendor_cpl}
                              </span>
                            </p>
                          </div> */}
                        </Col>
                      </Row>
                      {/* <div className="d-flex align-items-center">
                        <span className="mr-2" style={{ marginRight: "8px" }}>
                          Support:
                        </span>
                        <Row className="d-flex align-items-center justify-content-between w-100">
                          <Col md={10}>
                            <div className="avatar-group">
                              {oaList?.firstData?.map((item, key) => (
                                <React.Fragment key={key}>
                                  {item.profile_image ? (
                                    <div
                                      className="avatar-group-item"
                                      onClick={() => set_open_oa(true)}
                                    >
                                      <img
                                        src={item.profile_image}
                                        alt=""
                                        className="rounded-circle avatar-xs"
                                      />
                                    </div>
                                  ) : (
                                    <div className="avatar-group-item">
                                      <div
                                        className="avatar-xs"
                                        onClick={() => set_open_oa(true)}
                                      >
                                        <span
                                          className={
                                            "avatar-title rounded-circle text-white " +
                                            item.bgcolor
                                          }
                                        >
                                          {item?.full_name
                                            .charAt(0)
                                            .toUpperCase()}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                              {oaList?.lastArray > 0 ? (
                                <div className="avatar-group-item cursor-pointer">
                                  <div onClick={() => set_open_oa(true)}>
                                    <div className="avatar-xs">
                                      <span
                                        className={
                                          "avatar-title rounded-circle  "
                                        }
                                        style={{ background: "#edeeff",color: "#b83016" }}
                                      >
                                        +{oaList?.lastArray}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Col>
                          <Col md={2}>
                            <i
                              className=" ri-add-circle-line align-bottom  fs-20 cursor-pointer"
                              style={{color: "#b83016"}}
                              onClick={() => set_open_spoc(true)}
                            ></i>
                          </Col>
                        </Row>
                      </div> */}

                      {/* <Row className="mt-2" sx={12}>
                        {productDetailsWidgets?.map((pricingDetails, key) => (
                          <PricingWidgetList
                            data={data}
                            index={key}
                            pricingDetails={pricingDetails}
                            key={key}
                          />
                        ))}
                      </Row> */}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        toggle={() => {
          setOpen(false);
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setOpen(false);
          }}
        >
          Training Details
        </ModalHeader>

        <ModalBody>
          <div className="ratio ratio-16x9">
            {/* <iframe
              src={"https://www.youtube.com/embed/" + youtube}
              title="YouTube video"
              allowFullScreen
            ></iframe> */}
            {/* <video
              width="320"
              height="240"
              controls
              crossOrigin="anonymous | use-credentials"
            >
              <source src={youtube} type="video/mp4" />
            </video> */}
            <div className="ratio ratio-16x9">
              <iframe
                src={youtubeiFrame}
                title="YouTube video"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open_spoc}
        toggle={() => {
          set_open_spoc(!open_spoc);
        }}
        top="true"
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_open_spoc(!open_spoc);
          }}
        >
          Add Support Associate
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">
            <ModalFormSpocs
              set_open={set_open_spoc}
              open={open_spoc}
              sow_id={sowId}
              setCheck={setCheck}
              check={check}
            />
          </div>
        </ModalBody>
      </Modal>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open_oa}
        toggle={() => {
          set_open_oa(!open_oa);
        }}
        top="true"
        size="lg"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_open_oa(!open_oa);
          }}
        >
          Support Associate List
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">
            <TableSupportAgent
              oaList={total_oa}
              setRel={setRel}
              setCheck={setCheck}
              check={check}
            />
          </div>
        </ModalBody>
      </Modal>

      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open_oa1}
        toggle={() => {
          set_open_oa1(!open_oa);
        }}
        top="true"
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_open_oa1(!open_oa1);
          }}
        >
          Sales Associate List
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">dummydata</div>
        </ModalBody>
      </Modal>

      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open_supply}
        toggle={() => {
          set_open_supply(!open_supply);
        }}
        // top="true"
        modalClassName="flip"
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            set_open_supply(!open_supply);
          }}
        >
          Supply Request
        </ModalHeader>

        <ModalBody>
          <div className="mt-2">
            <form onSubmit={handleSupplyRequest}>
              <Row className="mb-4">
                <Col lg={12}>
                  <Label className="mt-1">State</Label>
                  <Select
                    aria-label=".form-select-sm example"
                    onChange={handleChangeSupplyRequest}
                    options={state}
                    isClearable={false}
                  ></Select>
                </Col>
                <Col lg={12} className="mt-1">
                  <Label className="mt-1">City</Label>
                  <Select
                    aria-label=".form-select-sm example"
                    onChange={handleChangeSupplyRequest}
                    options={cityList}
                    isClearable={false}
                  ></Select>
                </Col>
                <Col lg={12} className="mt-1">
                  <Label className="mt-1">Count</Label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailInput"
                    onChange={handleChangeSupplyRequest}
                    name="count"
                  />
                </Col>
              </Row>
              <Row>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-success d-flex align-items-center gap-2"
                    // onClick={submitManager}
                  >
                    <i className="ri ri-checkbox-circle-line fs-18"></i>
                    Submit
                  </button>
                </div>
              </Row>
            </form>
          </div>
        </ModalBody>
      </Modal>

      {/* support copy table */}
    </div>
  );
}

export default EcommerceProductDetail;
