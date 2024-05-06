import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Tooltip,
  UncontrolledCarousel,
  UncontrolledDropdown,
} from "reactstrap";

import classnames from "classnames";
import Countdown from "react-countdown";
import { Link, useParams } from "react-router-dom";

// Import Images
import Img1 from "../../../assets/images/nft/img-01.jpg";
import Img2 from "../../../assets/images/nft/img-02.jpg";
import Img3 from "../../../assets/images/nft/img-03.jpg";
import Img5 from "../../../assets/images/no_image.png";
import Img6 from "../../../assets/images/nft/img-06.jpg";

import ImgGif3 from "../../../assets/images/nft/gif/img-3.gif";
import ImgGif4 from "../../../assets/images/nft/gif/img-4.gif";

import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";

import SImg10 from "../../../assets/images/small/img-10.jpg";
import SImg11 from "../../../assets/images/small/img-11.jpg";
import SImg12 from "../../../assets/images/small/img-12.jpg";
import DownArrow from "../../../assets/images/downarrow.gif";

//SimpleBar
import SimpleBar from "simplebar-react";
import UpgradeAccountNotise from "../../DashboardAnalytics/UpgradeAccountNotise";
import EcommerceProductDetail from "../../Ecommerce/EcommerceProducts/EcommerceProductDetail";
import axios from "axios";
import { api } from "../../../globalConfig";
import { single_sow } from "../../../assets/utils/sow";
import { Interweave } from "interweave";
import { Context } from "../../../App";

const ItemDetails = (props) => {
  // document.title = "Item Details | OnX";

  const [context, setContext] = useContext(Context);

  const { id } = useParams();
  const [detailsData, setDetailsData] = useState({});
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [youtube, setYoutube] = useState("");
  const [showData, setShowData] = useState(false);
  const [customerMedia, setCustomerMedia] = React.useState([]);
  const [ttop, setttop] = useState(false);
  let youtubeiFrame = youtube.replace("watch?v=", "embed/");
  const [open, setOpen] = useState(false);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  useEffect(() => {
    let params = id;
    if (params == "new") {
      console.log(props, "props");
      params = props.itemprops.sow_id;
    }
    const pathName = api.OA_URL + single_sow + `?sow_id=${params}`;
    setShowData(true);
    axios
      .get(pathName)
      .then((res) => {
        setDetailsData(res.data.data);
        context.projectId = res.data?.data?.ref_project_id;
        setContext({ ...context });
        const split = res.data?.data?.training_video
          ?.split("/")[3]
          ?.split("=")[1];

        setYoutube(res.data?.data?.training_video);
        let dataPush = [];
        if (res.data?.data?.customer.length > 0) {
          for (let i = 0; i < res.data?.data?.customer.length; i++) {
            dataPush.push({
              header: " ",
              altText: `${res.data?.data?.customer[i].title}`,
              caption: `${res.data?.data?.customer[i].description}`,
              key: `${i}+1`,
              src: res.data?.data?.customer[i].media_image,
              media_id: res.data?.data?.customer[i].media_id,
            });
          }
          setCustomerMedia(dataPush);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    Object.keys(detailsData).length !== 0 && (
      <React.Fragment>
        {/* <div className="page-content"> */}
        <Container fluid className="mb-3 p-2">
          {/* <BreadCrumb title="Item Details" pageTitle="NFT Marketplace" /> */}
          <Card className="ribbon-box border shadow-none mb-lg-0 right">
            <CardBody>
              <Row className="g-4">
                <Col lg={4}>
                  <EcommerceProductDetail
                    data={detailsData}
                    youtube={youtube}
                  />
                </Col>
                <Col lg={8}>
                  <div className="sticky-side-div">
                    <Card className="ribbon-box border shadow-none mb-lg-0 right">
                      {detailsData?.is_trending === "yes" && (
                        <div className="ribbon-two ribbon-two-danger">
                          <span>Trending</span>
                        </div>
                      )}
                      <img
                        src={
                          detailsData.header.length !== 0
                            ? detailsData?.header[0].media_image
                            : Img5
                        }
                        alt=""
                        className="img-fluid rounded"
                        style={{ height: "377px", width: "720px" }}
                      />
                      <div className="position-absolute bottom-0 p-3">
                        <div className="position-absolute top-0 end-0 start-0 bottom-0 bg-white opacity-25"></div>
                        {/* <Row className="justify-content-center">
                                                    <Col className="col-3">
                                                        <img src={Img2} alt="" className="img-fluid rounded" />
                                                    </Col>
                                                    <Col className="col-3">
                                                        <img src={Img3} alt="" className="img-fluid rounded" />
                                                    </Col>
                                                    <Col className="col-3">
                                                        <img src={ImgGif3} alt="" className="img-fluid rounded h-100 object-cover" />
                                                    </Col>
                                                    <Col className="col-3">
                                                        <img src={Img6} alt="" className="img-fluid rounded" />
                                                    </Col>
                                                </Row> */}
                      </div>
                    </Card>
                    {/* <div className="hstack gap-2">
                                            <button className="btn btn-success w-100">Place Bid</button>
                                        </div> */}
                  </div>
                </Col>
              </Row>
              <Row className="w-100 p-3">
                <div className="mt-4 text-muted">
                  <h5 className="fs-14">
                    Introduction :{" "}
                    <span>
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
                        className="btn btn-soft"
                        style={{ backgroundColor: "#f5aa7c", color: "#92281a" }}
                        onClick={() => setOpen(true)}
                      >
                        <i className="ri-live-fill align-bottom"></i>
                      </div>
                    </span>
                  </h5>
                  <p>
                    <Interweave content={detailsData?.introduction_text} />
                  </p>
                </div>

                <div className="mt-4 text-muted">
                  <h5 className="fs-14">Target Audience :</h5>
                  <p>
                    <Interweave content={detailsData?.target_audience} />
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowData(true)}
                >
                  <div>
                    <img
                      style={{
                        display: showData ? "none" : "block",
                        height: "100px",
                        width: "80px",
                      }}
                      onClick={() => setShowData(true)}
                      src={DownArrow}
                      alt=""
                      className="rounded avatar-xxs"
                    ></img>
                  </div>
                  <div style={{ display: showData ? "none" : "block" }}>
                    SHOW MORE
                  </div>
                  <div>
                    <img
                      style={{
                        display: showData ? "none" : "block",
                        height: "100px",
                        width: "80px",
                      }}
                      onClick={() => setShowData(true)}
                      src={DownArrow}
                      alt=""
                      className="rounded avatar-xxs"
                    ></img>
                  </div>
                </div>
                <div style={{ display: showData ? "block" : "none" }}>
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Whom to sell? :</h5>
                    <p>
                      <Interweave content={detailsData?.project_desc} />
                    </p>
                  </div>
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">How to sell? :</h5>
                    <p>
                      <Interweave content={detailsData?.payout_criteria} />
                    </p>
                  </div>
                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Terms and conditions :</h5>
                    <p>
                      <Interweave content={detailsData?.other_terms} />
                    </p>
                  </div>

                  <div className="mt-4 text-muted">
                    <h5 className="fs-14">Share Media Images:</h5>
                    <Row className="m-3">
                      <Col sx={12} md={5}>
                        <img
                          src={detailsData?.media[0]?.media_image}
                          alt=""
                          // height={400}
                          style={{ boxShadow: "0 0 3px gray", width: "100%" }}
                          className="imgs_css"
                        />
                      </Col>
                      <Col sx={12} md={7}>
                        <CardBody className="d-flex flex-column align-items-start">
                          <h4 className="card-title mb-2">
                            {detailsData?.media[0]?.title == "undefined"
                              ? ""
                              : detailsData?.media[0]?.title}
                          </h4>
                          <div
                            style={{
                              textAlign: "left",
                              fontSize: "12px",
                              lineHeight: "normal",
                            }}
                          >
                            <Interweave
                              content={detailsData?.media[0]?.description}
                            />
                          </div>
                        </CardBody>
                      </Col>
                    </Row>
                    {/* <Row>
                      <h5 className="fs-14 mt-5">Customer Media Images:</h5>
                      <Row style={{ display: "grid", placeItems: "center" }}>
                        <Col md={4} className="m-3">
                          {customerMedia.length > 0 ? (
                            <>
                              <UncontrolledCarousel
                                dark={true}
                                interval={false}
                                items={customerMedia}
                                style={{
                                  height: "600px",
                                  width: "350px",
                                }}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </Row> */}
                  </div>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Container>
        {/* </div> */}

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
      </React.Fragment>
    )
  );
};

export default ItemDetails;
