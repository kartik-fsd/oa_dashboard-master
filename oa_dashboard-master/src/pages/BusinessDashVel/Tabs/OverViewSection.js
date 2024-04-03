import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import styles from "./ImageSize.module.css";

//import images
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import image4 from "../../../assets/images/small/img-4.jpg";
import image5 from "../../../assets/images/small/img-5.jpg";

//SimpleBar
import SimpleBar from "simplebar-react";
import { Interweave } from "interweave";
import { date } from "yup";
import MileStone from "./MileStone";
import CostTable from "./CostTable";
import { api } from "../../../globalConfig";
import { chat_remark } from "../../../assets/utils/Business";
import axios from "axios";
import ChatSmall from "./ChatSmall";
import CommentBox from "./CommentBox";

const OverViewSection = ({ data }) => {
  const createMarkup = (data) => {
    return { __html: data };
  };

  return (
    <React.Fragment>
      <Row className={styles.img}>
        <Col xl={12} lg={12}>
          {/* <Card>
            <CardBody>
              <div className="text-muted">
                <h6 className="mb-3 fw-semibold text-capitalize">
                  {data?.company_title}
                </h6>
                <p>{data?.company_discription}</p>
              </div>
            </CardBody>
          </Card> */}
          <Card>
            <CardBody>
              <div className="text-muted">
                <div className="pb-3 border-bottom border-bottom-dashed mb-4">
                  <Row>
                    <Col
                      lg={4}
                      sm={6}
                      className="d-flex justify-content-between"
                    >
                      <div className="d-flex gap-2 align-items-center">
                        <p className="m-0 text-capitalize fw-medium">
                          Start Date :
                        </p>
                        <h5 className="fs-15 mb-0">
                          {data?.project_start_date}
                        </h5>
                      </div>
                      <div className="vr"></div>
                    </Col>
                    <Col
                      lg={4}
                      sm={6}
                      className="d-flex justify-content-between"
                    >
                      <div className="d-flex gap-2 align-items-center">
                        <p className="m-0 text-capitalize fw-medium">
                          End Date :
                        </p>
                        <h5 className="fs-15 mb-0">{data?.project_end_date}</h5>
                      </div>
                      <div className="vr"></div>
                    </Col>
                    <Col
                      lg={4}
                      sm={6}
                      className="d-flex justify-content-between"
                    >
                      <div className="d-flex gap-4 align-items-center">
                        <p className="m-0 text-capitalize fw-medium">
                          Difficulty :
                        </p>

                        {data?.difficulty_level == "High" ? (
                          <div className="badge  bg-danger fs-12">High</div>
                        ) : data?.project_status == "Low" ? (
                          <div className="badge  bg-success fs-12">Low</div>
                        ) : (
                          <div className="badge  bg-warning fs-12">Medium</div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
                <h6 className="mb-3 fw-semibold text-capitalize">
                  What you are supposed to do ?
                </h6>
                <div
                  dangerouslySetInnerHTML={createMarkup(data?.supposed_to_do)}
                />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What you are required to do ?
                </h6>
                <Interweave content={data?.requirements} />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What are your Qualifying Criteria ?
                </h6>
                <Interweave content={data?.qualifying_criteria} />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What are your Rejection Criteria ?
                </h6>
                <Interweave content={data?.rejection_criteria} />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What are your Market Population ?
                </h6>
                <Interweave content={data?.market_population} />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What are your Market Penetration and Growth ?
                </h6>
                <Interweave content={data?.market_penetration_and_growth} />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What are your Market Acceptance ?
                </h6>
                <Interweave content={data?.market_acceptance} />

                {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}

                {/* <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  What are your MileStones ?
                </h6> */}
                {/* <Interweave content={data?.milestones} /> */}
                {/* do it in table above one */}

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  Deliverables :
                </h6>
                <MileStone mdata={data?.milestones} />

                <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4">
                  Attachments :
                </h6>
                <div className="d-flex">
                  {data?.attachment?.map((item, i) => (
                    <div
                      key={i}
                      className="border rounded border-dashed p-2 me-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title bg-light text-secondary rounded fs-24">
                              <i
                                className={
                                  item.attachment_type == "file"
                                    ? "ri-folder-zip-line"
                                    : "ri-image-fill"
                                }
                                style={{ color: "#3f5189" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="fs-13 mb-1">
                            <Link
                              to={item.a}
                              className="text-body text-truncate d-block"
                            >
                              {item?.attachment_name ?? ""}
                            </Link>
                          </h5>
                        </div>
                        <div className="flex-shrink-0 ms-2">
                          <div className="d-flex gap-1">
                            <a
                              href={item?.attachment_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button
                                type="button"
                                className="btn btn-icon text-muted btn-sm fs-18"
                              >
                                <i
                                  className="ri-download-2-line"
                                  style={{ color: "#3f5189" }}
                                ></i>
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* <h6 className="pt-3 mb-3 fw-semibold text-capitalize border-top border-top-dashed mt-4 d-flex gap-2">
                Commercial Bond :
                <span>
                  <code>Table Items</code>
                </span>
              </h6>
              <CostTable cdata={data?.cost} /> */}
            </CardBody>
          </Card>
          {/* <Card>
            <CardHeader>
              <h5>Deliverables :</h5>
            </CardHeader>
            <CardBody>
              <MileStone mdata={data?.milestones} />
            </CardBody>
          </Card> */}

          {/* <Card style={{ minHeight: "20px" }}>
            <CardHeader>
              <h5>Cost :</h5>
            </CardHeader>
            <CardBody>
              <CostTable cdata={data?.cost} />
            </CardBody>
          </Card> */}
        </Col>
        {/* <Col xl={4} lg={4}>
          <Card>
            <CardHeader>
              <h5>Remarks</h5>
            </CardHeader>
            <CardBody>
              <CardBody className="p-0">
                <ChatSmall project_data={data?.lead_id} />
                
              </CardBody>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Attachments</h4>
              
            </CardHeader>

            <CardBody>
              <div className="vstack gap-2">
                {data?.attachment?.map((item, i) => (
                  <div key={i} className="border rounded border-dashed p-2">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title bg-light text-secondary rounded fs-24">
                            <i
                              className={
                                item.attachment_type == "file"
                                  ? "ri-folder-zip-line"
                                  : "ri-image-fill"
                              }
                              style={{ color: "#3f5189" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="fs-13 mb-1">
                          <Link
                            to={item.a}
                            className="text-body text-truncate d-block"
                          >
                            {item?.attachment_name ?? ""}
                          </Link>
                        </h5>
                      </div>
                      <div className="flex-shrink-0 ms-2">
                        <div className="d-flex gap-1">
                          <a
                            href={item?.attachment_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <button
                              type="button"
                              className="btn btn-icon text-muted btn-sm fs-18"
                            >
                              <i
                                className="ri-download-2-line"
                                style={{ color: "#3f5189" }}
                              ></i>
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col> */}
        <CommentBox project_data={data?.lead_id} />
      </Row>
    </React.Fragment>
  );
};

export default OverViewSection;
