import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  PopoverBody,
  PopoverHeader,
  Row,
  UncontrolledDropdown,
  UncontrolledPopover,
  UncontrolledTooltip,
  Tooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  Alert,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  close_training,
  fse_attendance,
  sow_training,
} from "../../../../assets/utils/sow";
import { api } from "../../../../globalConfig";
import moment from "moment";

import {
  BasicTable,
  ScrollVertical,
  ScrollHorizontal,
  AlternativePagination,
  FixedHeaderDatatables,
  ModalDataDatatables,
  AjaxDatatables,
} from "./datatableCom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "react-rating";
import { fse_training_list } from "../../../../assets/utils/sow";
const lodash = require("lodash");

const DataTables = ({ data, check, setCheck, check2, setCheck2 }) => {
  const { id } = useParams();
  const [tog_varying, set_tog_varying] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const [textError, setTextError] = useState({});
  const [radioState, setRadioState] = useState("");
  const [compId, setCompId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [attendance, setAttendance] = useState("");

  const pathName = api.OA_URL + fse_training_list;

  function attendanceHandle() {
    set_tog_varying(!tog_varying);
    setRadioState("");
    setCompId("");
    setSelectedUserId("");
    setTextError({});
  }
  const initState = { passcode: "absent" };
  const [formData, setFormData] = useState(initState);
  const [widgetsActivities, set_widgets_activities] = useState([]);
  const [completeStatus, setCompleteStatus] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // var data_completion_status = widgetsActivities.map(
  //   (item) => item.completion_status
  // );

  let data_completion_status = lodash.groupBy(
    widgetsActivities,
    "completion_status"
  );

  React.useEffect(() => {
    const current_date = new Date();

    if (
      moment(current_date).format("YYYY-MM-DD h:mm:ss") >=
      moment(widgetsActivities[0]?.start_date).format("YYYY-MM-DD h:mm:ss")
    ) {
      setLoadingApi(false);
    } else {
      setLoadingApi(true);
    }
  }, [widgetsActivities]);

  const handleAttendance = (e) => {
    const path = api.OA_URL + fse_attendance;
    setLoadingApi(true);
    const dataEnter = {
      user_id: e.user_id,
      comp_id: e.completion_id,
      sow_id: id,
      passcode: formData?.passcode ? formData?.passcode : "",
      status: radioState,
    };
    if (!formData?.passcode) {
      textError["error"] = true;
      textError["message"] = "Please enter passcode";
      setTextError({ ...textError });
    } else {
      if (data_completion_status["none"]?.length == 1) {
        const path = api.OA_URL + close_training;
        const PostData = {
          train_id: e.training_id,
        };

        axios
          .patch(path, PostData)
          .then((res) => setCheck(!check))
          .catch((err) => console.log(err, "err"));
      }
      axios
        .patch(path, dataEnter)
        .then((res) => {
          if (res.data.error) {
            textError["error"] = true;
            textError["message"] = "Please enter correct passcode";
          } else {
            toast("Success", {
              position: "top-center",
              hideProgressBar: true,
              closeOnClick: false,
              className: "bg-success text-white",
            });
            const axiosInsertURL = pathName + `?train_id=${e.training_id}`;
            axios
              .get(axiosInsertURL)
              .then((res) => {
                set_widgets_activities(res.data?.data);
              })
              .catch((err) => console.log(err));
          }
          // setTimeout(() => {
          //   setLoadingApi(false);
          // }, 12000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (
      data_completion_status["none"]?.length == undefined ||
      widgetsActivities[0]?.completion_status == "ongoing"
    ) {
      const path = api.OA_URL + close_training;
      const PostData = {
        train_id: widgetsActivities[0]?.training_id,
      };

      axios
        .patch(path, PostData)
        .then((res) => setCheck(!check))
        .catch((err) => console.log(err, "err"));
    }
  }, [widgetsActivities]);

  return (
    <React.Fragment>
      {/* <ToastContainer /> */}
      {/* <div className="page-content"> */}
      <div>
        <Container fluid>
          {/* <BreadCrumb title="Datatables" pageTitle="Tables" /> */}
          <Row>
            <Col lg={12}>
              <Card>
                {/* <CardHeader>
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Online Training
                    </h5>
                    <div className="flex-shrink-0">
                      <button
                        className="btn btn-danger add-btn"
                        onClick={() => tog_signUpModals()}
                      >
                        <i className="ri-add-line align-bottom"></i> Create
                        Training
                      </button>
                    </div>
                  </div>
                </CardHeader> */}
                {/* <CardHeader>
                  <h5>Training List</h5>
                </CardHeader> */}
                <CardBody>
                  <BasicTable
                    data={data}
                    tog_varying={tog_varying}
                    set_tog_varying={set_tog_varying}
                    set_widgets_activities={set_widgets_activities}
                    check={check}
                    setCheck={setCheck}
                    check2={check2}
                    setCheck2={setCheck2}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div className="modal-dialog modal-xl"> */}
      <Modal
        className="modal-dialog modal-xl"
        id="signupModals"
        tabIndex="-1"
        isOpen={tog_varying}
        toggle={attendanceHandle}
        centered={true}
      >
        <ModalHeader className="p-3" toggle={attendanceHandle}>
          Tasker Attendance List
        </ModalHeader>

        <ModalBody>
          <ListGroup className="border-dashed" flush>
            {widgetsActivities?.map((item, key) => (
              <ListGroupItem className="ps-0" key={key}>
                <Row className="align-items-start g-3">
                  {/* <Col className="col-auto">
                    <div className="avatar-sm p-1 py-2 h-auto bg-light rounded-3">
                      <div className="text-center">
                        <h5 className="mb-0">{item.date}</h5>
                        <div className="text-muted">{item.weekDay}</div>
                      </div>
                    </div>
                  </Col> */}

                  <Col className="col">
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {!(item.profile_image == "null") ? (
                          item.profile_image.includes("https") ? (
                            <img
                              className="rounded-circle avatar-md"
                              alt="200x200"
                              src={item.profile_image}
                            />
                          ) : (
                            <img
                              className="rounded-circle avatar-md"
                              alt="200x200"
                              src={`https://isp.taskmo.in/fieldon_images/${item.profile_image}`}
                            />
                          )
                        ) : (
                          ""
                        )}
                        {item.profile_image == "null" && (
                          <div className="avatar-md">
                            <div className="avatar-title rounded-circle text-warning">
                              {item.full_name[0]}
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        <h5 className="text-reset fs-14 mb-0">
                          {`${item.full_name} ${"("} ${item.user_id} ${")"} - ${
                            item.city
                          } - ${item.mobile_number}`}
                        </h5>
                        <div>
                          {(item?.sows || []).map((sow) => (
                            <>
                              <img
                                className="rounded-circle avatar-xxs"
                                alt="200x200"
                                src={sow.brand_logo}
                                style={{ marginRight: "10px" }}
                              />
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="col">
                    {item.completion_status == "none" ? (
                      <Row>
                        <Col className="col-auto">
                          <div className="form-check form-radio-primary mb-3 ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`formradiocolor1+${item.completion_id}`}
                              id="formradioRight5"
                              value="present"
                              // checked={item.completion_status == "present"}

                              onChange={(e) => {
                                setRadioState(e.target.value);
                                setCompId(item.completion_id);
                                setSelectedUserId(item.user_id);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formradioRight5"
                            >
                              Present
                            </label>
                          </div>
                        </Col>

                        <Col className="col-auto">
                          <div className="form-check form-radio-primary mb-3 ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`formradiocolor1+${item.completion_id}`}
                              id="formradioRight5"
                              value="absent"
                              // checked={item.completion_status == "absent"}

                              onChange={(e) => {
                                setRadioState(e.target.value);
                                setCompId(item.completion_id);
                                setSelectedUserId(item.user_id);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formradioRight5"
                            >
                              Absent
                            </label>
                          </div>
                        </Col>

                        <Col className="col-auto">
                          <div className="form-check form-radio-primary mb-3 ">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`formradiocolor1+${item.completion_id}`}
                              id="formradioRight5"
                              value="rejected"
                              // checked={item.completion_status == "rejected"}
                              onChange={(e) => {
                                setRadioState(e.target.value);
                                setCompId(item.completion_id);
                                setSelectedUserId(item.user_id);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="formradioRight5"
                            >
                              Rejected
                            </label>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <>
                        <Col className="col">
                          {item.completion_status == "rejected" && (
                            <div
                              style={{
                                marginLeft: "100px",
                                fontSize: "20px",
                                width: "140px",
                              }}
                            >
                              <Button
                                color="light"
                                id="tooltipTop"
                                className="badge badge-soft-danger badge-border"
                                onMouseEnter={() => {
                                  setAttendance(item.attendance_remark);
                                }}
                              >
                                <span>Rejected</span>
                              </Button>
                              <UncontrolledTooltip
                                placement="top"
                                target="tooltipTop"
                              >
                                {attendance.length > 0 ? attendance : "No Data"}
                              </UncontrolledTooltip>
                            </div>
                          )}

                          {item.completion_status == "absent" && (
                            <div
                              className="badge badge-soft-warning badge-border"
                              style={{
                                marginLeft: "100px",
                                fontSize: "13px",
                                width: "100px",
                              }}
                            >
                              Absent
                            </div>
                          )}

                          {item.completion_status == "completed" && (
                            <span
                              className="badge badge-soft-success badge-border"
                              style={{
                                marginLeft: "100px",
                                fontSize: "13px",
                                width: "100px",
                              }}
                            >
                              Completed
                            </span>
                          )}
                        </Col>
                      </>
                    )}

                    <Col className="col-sm-auto w-50">
                      <Form>
                        {radioState !== "absent" &&
                          selectedUserId == item.user_id &&
                          radioState !== "rejected" && (
                            <Input
                              style={
                                item.completion_status !== "none"
                                  ? {
                                      cursor: "not-allowed",
                                      filter: "blur(1px)",
                                    }
                                  : {}
                              }
                              type="text"
                              className="form-control mb-0"
                              id="passcode"
                              placeholder={
                                compId == ""
                                  ? ""
                                  : compId == item.completion_id
                                  ? radioState == "present"
                                    ? "enter passcode"
                                    : radioState == "rejected"
                                    ? "enter remark"
                                    : ""
                                  : ""
                              }
                              name="passcode"
                              onChange={handleChange}
                              disabled={
                                compId !== item.completion_id ||
                                radioState == "absent"
                                  ? true
                                  : false
                              }
                              invalid={textError.error ? true : false}
                            />
                          )}

                        {selectedUserId == item.user_id &&
                          radioState == "rejected" && (
                            <Input
                              style={
                                item.completion_status !== "none"
                                  ? {
                                      cursor: "not-allowed",
                                      filter: "blur(1px)",
                                    }
                                  : {}
                              }
                              type="textarea"
                              rows="1"
                              className="form-control mb-0"
                              id="passcode"
                              placeholder={
                                compId == ""
                                  ? ""
                                  : compId == item.completion_id
                                  ? radioState == "present"
                                    ? "enter passcode"
                                    : radioState == "rejected"
                                    ? "enter remark"
                                    : ""
                                  : ""
                              }
                              name="passcode"
                              onChange={handleChange}
                              disabled={
                                compId !== item.completion_id ||
                                radioState == "absent"
                                  ? true
                                  : false
                              }
                              invalid={textError.error ? true : false}
                            />
                          )}
                        <FormFeedback type="invalid">
                          {textError?.message}
                        </FormFeedback>
                      </Form>
                    </Col>
                  </Col>

                  <Col className="col-auto">
                    <div className="flex-shrink-0">
                      {item.completion_status == "none" ? (
                        <button
                          className={
                            !loadingApi
                              ? "btn btn-success add-btn"
                              : "btn btn-light waves-effect"
                          }
                          onClick={() => handleAttendance(item)}
                          style={loadingApi ? { pointerEvents: "none" } : {}}
                          // disabled={
                          //   item.completion_status !== "null" ? false : true
                          // }
                        >
                          <i className="mdi mdi-account-check-outline align-bottom"></i>
                          submit
                        </button>
                      ) : (
                        <>
                          <Col className="col">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: "10px",
                              }}
                            >
                              <div id="rater-step" dir="ltr">
                                <Rating
                                  style={{ fontSize: "30px" }}
                                  initialRating={item.rating}
                                  fractions={2}
                                  emptySymbol="mdi mdi-star-outline text-muted "
                                  fullSymbol="mdi mdi-star text-warning "
                                  readonly
                                />
                              </div>
                              <div>
                                <Button
                                  id="tooltipTop"
                                  style={{
                                    padding: "0",
                                    background: "white",
                                    color: "black",
                                    border: "none",
                                    fontSize: "25px",
                                  }}
                                  onMouseEnter={() => {
                                    setAttendance(item.fse_remark);
                                  }}
                                >
                                  <i className=" ri-information-line"></i>
                                </Button>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="tooltipTop"
                                >
                                  {attendance.length > 0
                                    ? attendance
                                    : "No Data"}
                                </UncontrolledTooltip>
                              </div>
                            </div>
                          </Col>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ModalBody>
      </Modal>
      {/* </div> */}
    </React.Fragment>
  );
};

export default DataTables;
