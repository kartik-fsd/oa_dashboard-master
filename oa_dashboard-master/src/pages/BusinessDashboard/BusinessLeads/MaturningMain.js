import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
  CustomInput,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { api } from "../../../globalConfig";
import {
  agreement_list,
  commercial_calculator,
  cost_update,
  create_cost,
  create_po,
  po_update,
  project_detail_update,
  search_approval_list,
  update_lead_details,
} from "../../../assets/utils/Business";
import { useEffect } from "react";
import axios from "axios";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Context } from "../../../App";
import { useParams } from "react-router-dom";
import {
  agreement_list_select,
  dataAravindApproval,
} from "../../../assets/utils/TaskmoUrl";
import { successnotify, warningnotify } from "../../Toasts";
import FlipModal from "../../BusinessDashVel/FlipModal";
import moment from "moment";
import { upload_issue_proof } from "../../../assets/utils/sow";

const MaturningMain = ({ data, setCheck, check }) => {
  const [leadPfdStatus, setLeadPfdStatus] = useState(false);
  const paramData = useParams();
  console.log(data, "testingdata");
  //modal flip
  const [modal_animationFlip, setmodal_animationFlip] = useState(false);
  const [open, setOpen] = useState(false);
  const [stateForUpdate, setStateForUpdate] = useState(false);
  const [fileUploadData, setFileUploadData] = useState("");
  const [modalType, setModalType] = useState("");
  function tog_animationFlip(d = "") {
    setModalType(d);
    setmodal_animationFlip(!modal_animationFlip);
  }

  console.log(leadPfdStatus, "testingpfd");
  let test = data.lead_pfd_status?.map(
    (item) => item.lead_acknowledgement_status
  );
  // console.log(data.lead_pfd_status, "testingone", test);

  const getPfdStatus = (test) => {
    if (test && !test.includes("pending")) {
      // console.log("yes", "testingone");
      setLeadPfdStatus(true);
    } else {
      // console.log("no", "testingone");
      setLeadPfdStatus(false);
    }
  };
  React.useEffect(() => {
    getPfdStatus(test);
  }, []);

  const [sum, setGetSumFront] = useState(0);
  const [commerClac, setCommerCalc] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsError] = useState(false);
  const [gradeDet, setGradeDet] = useState("");
  const [a, setA] = useState(
    data.cc_status_lead == "1" ? +data.time_to_search : 0
  );
  const [b, setB] = useState(
    data.cc_status_lead == "1" ? +data.time_to_reach : 0
  );
  const [c, setC] = useState(
    data.cc_status_lead == "1" ? +data.time_to_pitch : 0
  );
  const [d, setD] = useState(
    data.cc_status_lead == "1" ? +data.time_to_download : 0
  );
  const [e, setE] = useState(
    data.cc_status_lead == "1" ? +data.time_to_sell : 0
  );
  const [f, setF] = useState(
    data.cc_status_lead == "1" ? +data.time_to_relax : 0
  );
  const [opt, setOpt] = React.useState([]);
  const [seletecUserIdArr, setSelectedUserIdArr] = useState([]);
  const [grade, setGrade] = useState("");
  const [context, setContext] = useContext(Context);
  const [editComm, setEditComm] = useState(false);
  const [editCommercial, setEditCommercial] = useState(false);
  const { id } = useParams();

  console.log(id, "calc");

  const colorStyles = {
    control: (styles) => ({ ...styles, height: "38px" }),
  };

  const [poObject, setPoObject] = React.useState({
    project_id: data?.project_id,
  });
  const [costObject, setCostObject] = React.useState({
    project_id: data?.project_id,
  });
  useEffect(() => {
    const link = api.TASKMO_URL + commercial_calculator;
    setIsLoading(true);
    axios
      .get(link)
      .then((res) => {
        setIsLoading(false);
        setCommerCalc(res.data.calculator);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));

    // arr = commerClac?.find((it) => 45 > it.slab_from && 45 < it.slab_to);
  }, []);
  React.useEffect(() => {
    setGetSumFront(
      Number(a) + Number(b) + Number(c) + Number(d) + Number(e) + Number(f)
    );
  }, [sum, a, b, c, d, e, f]);

  React.useEffect(() => {
    const link = api.TASKMO_URL + search_approval_list;
    axios
      .get(link, { params: { search: "pfd" } })
      .then((res) => {
        const dataEnter = [];
        res.data?.search_list.forEach((item) => {
          const sample = {
            value: item.full_name,
            label: item.full_name,
            data: { ...item },
          };
          dataEnter.push(sample);
        });
        console.log(dataEnter, "testindende4ter");
        setOpt(dataEnter);
      })

      .catch((err) => console.log(err));
  }, []);

  const GetValueData = () => {
    console.log(commerClac, sum, "tesitngsum");
    let ot;
    if (commerClac == undefined) {
      return 0;
    } else {
      ot = commerClac?.filter(
        (it) =>
          Number(sum) >= Number(it.slab_from) &&
          Number(sum) <= Number(it.slab_to)
      );
      if (Number(sum) < 40) {
        return "185-250";
      }
      if (Number(sum) > 200) {
        return "1000-1250";
      }

      return ot.length > 0 ? ot[0].quotation : 0;
    }
  };

  const GetValueDataGrade = () => {
    console.log(commerClac, sum, "tesitngsum");
    let ot;
    if (commerClac == undefined) {
      return 0;
    } else {
      ot = commerClac?.filter(
        (it) =>
          Number(sum) >= Number(it.slab_from) &&
          Number(sum) <= Number(it.slab_to)
      );
      if (Number(sum) < 40) {
        return "Grade 1";
      }
      if (Number(sum) > 200) {
        return "Grade 5";
      }

      return ot.length > 0 ? ot[0].grade : 0;
    }
  };
  const GetValueDataValue = () => {
    console.log(commerClac, sum, "tesitngsum");
    let ot;
    if (commerClac == undefined) {
      return 0;
    } else {
      ot = commerClac?.filter(
        (it) =>
          Number(sum) >= Number(it.slab_from) &&
          Number(sum) <= Number(it.slab_to)
      );
      if (Number(sum) < 40) {
        return "100";
      }
      if (Number(sum) > 200) {
        return "500";
      }

      return ot.length > 0 ? ot[0].grade_value : 0;
    }
  };

  const formatOptionData = (it) => {
    let item = it.data;
    console.log(item, "fasak");
    return (
      <div>
        <img
          src={item.profile}
          height="30px"
          alt=""
          width="30px"
          style={{ borderRadius: "50%" }}
        />
        <span className="text-dark fw-semibold text-capitalize mx-2">
          {item.full_name}
          <span className="badge badge-soft-primary ms-1 me-1">
            {item.team_name}
          </span>
          -<span className="text-muted ms-1">{item.role_designation}</span>
        </span>
      </div>
    );
  };

  const formatOptionData2 = (it) => {
    let item = it.data;

    return (
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{ width: "100px" }}>
          {" "}
          <span className="badge text-bg-primary" style={{ width: "80px" }}>
            {item.agreement_unique_id}
          </span>
        </div>
        <div style={{ textTransform: "capitalize" }}>
          {item.agreement_title}
        </div>
        <div style={{ width: "150px" }}>
          {" "}
          <span className="badge rounded-pill text-bg-success">
            {item.agreement_status}
          </span>
        </div>
      </div>
    );
  };

  const handleSubmitCommercial = () => {
    const link = api.TASKMO_URL + update_lead_details;
    const body = {
      lead_id: id,
      time_to_search: a,
      time_to_reach: b,
      time_to_pitch: c,
      time_to_download: d,
      time_to_sell: e,
      time_to_relax: f,
      grade: GetValueDataGrade(),
      quotation: GetValueData(),
      cc_status: 1,
      grade_value: GetValueDataValue(),
      cc_status_date: context.currentDate,
    };
    console.log(body, "body");

    axios
      .patch(link, body)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
      })
      .catch((err) => console.log(err));
  };

  const defaultDate = moment(data?.normal_po_validity).format("YYYY-MM-DD");

  const [AgreementSelect, setAgreementSelect] = useState([]);
  const [agreeLoading, setAgreeLoading] = useState(false);
  const [agreeMentDropDown, setAgreeMentDropDown] = useState(null);
  const link = api.TASKMO_URL + update_lead_details;
  const apiData = api.TASKMO_URL + agreement_list_select;
  const project_detail_update_url = api.TASKMO_URL + project_detail_update;
  const create_po_url = api.TASKMO_URL + create_po;
  const create_cost_url = api.TASKMO_URL + create_cost;
  const cost_update_url = api.TASKMO_URL + cost_update;
  const po_update_url = api.TASKMO_URL + po_update;

  const getAgreementDataDetails = () => {
    setAgreeLoading(true);
    axios
      .get(apiData)
      .then((res) => {
        setAgreementSelect(res.data.agreement_list);
        setAgreeLoading(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAgreeLoading(false);
      });
  };

  const handleClickUpdate = () => {
    let body = {
      project_id: data?.project_id,
      agreement_id: agreeMentDropDown?.data?.agreement_id,
    };
    axios
      .patch(project_detail_update_url, body)
      .then((res) => {
        setCheck(!check);

        successnotify("Successfully Updated");
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getAgreementDataDetails();
  }, []);

  const handlePfd = () => {
    let itemtests = seletecUserIdArr?.map((item) => {
      return {
        lead_id: Number(id),
        project_id: 0,
        request_to_id: item.data.portal_user_id,
        request_by_id: context.oaDetials.portal_user_id,
        lead_acknowledgement_type: "lead_pfd_status",
        notification_type: "approval",
      };
    });

    const body2 = {
      lead_id: Number(id),
      lead_pfd_status: 1,
    };

    axios
      .post(dataAravindApproval, itemtests)
      .then((res) => {
        setCheck(!check);
        successnotify("Approval Sent");
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .patch(link, body2)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleCommercialConfirm = () => {
    let itemtests = [
      {
        lead_id: Number(id),
        project_id: data?.project_id ?? 0,
        request_to_id: "87",
        request_by_id: context.oaDetials.portal_user_id,
        lead_acknowledgement_type: "commercial_action",
        notification_type: "notify",
      },
    ];
    axios
      .post(dataAravindApproval, itemtests)
      .then((res) => {
        successnotify("Approval Sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProjectConfirm = () => {
    let itemtests = [
      {
        lead_id: Number(id),
        project_id: data?.project_id ?? 0,
        request_to_id: "97",
        request_by_id: context.oaDetials.portal_user_id,
        lead_acknowledgement_type: "lead_pfd_status",
        notification_type: "notify",
      },
    ];
    axios
      .post(dataAravindApproval, itemtests)
      .then((res) => {
        successnotify("Approval Sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreatePo = () => {
    console.log(poObject, "poObject");
    axios
      .post(create_po_url, poObject)
      .then((res) => {
        setCheck(!check);
        successnotify("Success");
      })
      .catch((err) => console.log(err))

      .finally(() => {
        setPoObject({ project_id: data?.project_id });
      });
  };
  const handleUpdatePo = () => {
    poObject.po_id = data?.po_id;
    delete poObject.project_id;
    console.log(poObject, "poObject");
    axios
      .patch(po_update_url, poObject)
      .then((res) => {
        setCheck(!check);
        successnotify("Success");
        setOpen(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPoObject({ project_id: data?.project_id });
      });
  };
  const handleCreateCost = () => {
    console.log(costObject, "poObject");
    axios
      .post(create_cost_url, costObject)
      .then((res) => {
        setCheck(!check);
        successnotify("Success");
      })
      .catch((err) => console.log(err));
  };

  const handleProjectConfirmation = (status) => {
    const currentDate = new Date();
    const body = {
      project_id: data?.project_id,
      project_intro_status: status,
      project_intro_date: moment(currentDate).format("YYYY-MM-DD"),
    };
    const dataEnter = {
      lead_id: Number(id),
      lead_approval_status: status == 1 ? "approved" : "pending",
      lead_approval_date: moment(currentDate).format("YYYY-MM-DD"),
    };

    axios
      .patch(project_detail_update_url, body)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
      })
      .catch((err) => console.log(err));
    axios
      .patch(link, dataEnter)
      .then((res) => {
        console.log("confirmed leads");
      })
      .catch((err) => console.log(err));
  };

  return isLoading || agreeLoading ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div>
      {data?.cc_status_lead == "1" ? (
        <div>
          {!data?.project_id ? (
            <></>
          ) : (
            <div>
              {/* Project Initiation start  */}

              {(!!data?.agreement_id || !!data?.po_id) &&
              (context.oaDetials?.role == "super_admin" ||
                context.oaDetials?.role == "head") &&
              !data?.project_intro_status ? (
                <Row className="mb-4">
                  <Col xs="12" className="mb-2">
                    <h5 className="text-primary mb-3 mt-4">
                      Project Initiation{" "}
                    </h5>
                  </Col>
                  <Col xs="12" className="mb-2">
                    <div className="d-flex w-100">
                      <Col xs={6}>
                        <p>Please check all the details before confirming</p>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-success"
                            style={{ marginBottom: "20px" }}
                            onClick={() => handleProjectConfirmation("1")}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            style={{ marginBottom: "20px" }}
                            onClick={() => handleProjectConfirmation("0")}
                          >
                            Reject
                          </button>
                        </div>
                      </Col>
                    </div>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
              {(!!data?.agreement_id || !!data?.po_id) &&
              context.oaDetials?.role != "super_admin" &&
              !data?.project_intro_status &&
              data?.lead_approval_status != "approved" ? (
                <Row className="mb-4">
                  <Col xs="12" className="mb-2">
                    <h5 className="text-primary mb-3 mt-4">
                      Project Initiation{" "}
                    </h5>
                  </Col>
                  <Col xs="12" className="mb-2">
                    <Row>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary"
                          style={{ marginBottom: "20px" }}
                          onClick={handleProjectConfirm}
                        >
                          Project Approval
                        </button>
                      </div>
                    </Row>
                  </Col>
                </Row>
              ) : (!!data?.agreement_id || !!data?.po_id) &&
                context.oaDetials?.role != "super_admin" &&
                !data?.project_intro_status &&
                data?.lead_approval_status != "approved" ? (
                <Row className="mb-4">
                  <Col xs="12" className="mb-2">
                    <h5 className="text-primary mb-3 mt-4">
                      Project Initiation{" "}
                    </h5>
                  </Col>
                  <Col xs="12" className="mb-2">
                    <div>
                      <p>Project activated ! </p>
                    </div>
                  </Col>
                </Row>
              ) : (
                <></>
              )}

              {/* Agreement Start */}

              {/* <h5 className="text-primary ">Maturing</h5>
      <hr className="mb-4" /> */}
              <Col xs="12" className="mb-2">
                <h5 className="text-primary mb-3 mt-4">Agreement Details </h5>
              </Col>
              {!data?.project_intro_status ? (
                <Row className="mb-4">
                  <Col xs="10">
                    <Label className="mt-1">Agreement</Label>
                    <Select
                      aria-label=".form-select-sm example"
                      onChange={(e) => setAgreeMentDropDown(e)}
                      options={AgreementSelect}
                      formatOptionLabel={formatOptionData2}
                      isClearable
                    ></Select>
                  </Col>
                  <Col xs="1" className="d-flex align-items-end">
                    <button
                      disabled={!agreeMentDropDown}
                      onClick={handleClickUpdate}
                      className="btn btn-primary"
                    >
                      UPDATE
                    </button>
                  </Col>
                  {!data?.agreement_id ? (
                    <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                  ) : (
                    <></>
                  )}
                </Row>
              ) : (
                <></>
              )}

              {!data?.agreement_id ? (
                <></>
              ) : (
                <Row className="mb-4">
                  <Col xs="12">
                    <Card>
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
                            <div style={{ width: "15%" }}>Type</div>
                            <div style={{ width: "47%" }}>Description</div>
                            <div style={{ width: "20%" }}>Expiry Date</div>
                            <div style={{ width: "10%" }}>
                              &nbsp;&nbsp;&nbsp;Status
                            </div>
                            <div style={{ width: "10%" }}>Attachment</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px",
                            }}
                          >
                            <div style={{ width: "28%" }}>
                              <div>{data?.agreement_title}</div>
                              <div>
                                <span className="badge text-bg-primary">
                                  {data?.agreement_unique_id}
                                </span>
                              </div>
                            </div>
                            <div style={{ width: "15%", fontSize: "12px" }}>
                              {data?.agreement_type}
                            </div>
                            <div
                              style={{
                                width: "47%",
                                fontSize: "12px",
                                padding: "5px",
                              }}
                            >
                              {" "}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: data?.agreement_description,
                                }}
                              />
                            </div>
                            <div style={{ width: "20%" }}>
                              <div>{data?.agreement_end_date}</div>
                              <div
                                style={{ color: "#405189", fontSize: "10px" }}
                                // className="text-muted fs-10"
                              >
                                {data?.agree_validity == "Expired"
                                  ? "Expired"
                                  : `Expires in ${data?.agree_validity} days`}
                              </div>
                            </div>
                            <div style={{ width: "12%" }}>
                              <div
                                style={{
                                  backgroundColor: "#23C552",
                                  width: "60px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "5px",
                                  borderRadius: "15px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#FFFFFF",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {data?.agreement_status}
                                </div>
                              </div>
                            </div>
                            <div style={{ width: "8%" }}>
                              <a
                                href={data?.agreement_upload}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <div style={{ color: "blue", fontSize: "8px" }}>
                                  PDF
                                </div>
                                <div>
                                  <i className="ri-download-2-fill fs-15"></i>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                </Row>
              )}

              {/* Purchase Order Start  */}

              {data?.project_id != 0 && !data?.project_intro_status ? (
                !data?.po_id ? (
                  <>
                    <Row>
                      <h5 className="text-primary mb-3 mt-2">Purchase Order</h5>
                    </Row>
                    <Row className="mb-2">
                      <Col xs="12">
                        <Row>
                          <Col xs="6">
                            <Label>Po Title</Label>
                            <Input
                              onChange={(e) =>
                                setPoObject({
                                  ...poObject,
                                  po_title: e.target.value,
                                })
                              }
                              value={poObject?.po_title}
                              name="po_value"
                              required
                            />
                          </Col>
                          <Col xs="6">
                            <Label>Po Value</Label>
                            <Input
                              onChange={(e) =>
                                setPoObject({
                                  ...poObject,
                                  po_value: e.target.value,
                                })
                              }
                              value={poObject?.po_value}
                              name="po_value"
                              required
                            />
                          </Col>
                          <Col xs="6" className="mt-4">
                            <Label>Po type</Label>
                            <select
                              onChange={(e) => {
                                console.log(e.target.value, "testing");
                                setPoObject({
                                  ...poObject,
                                  po_type: e.target.value,
                                });
                              }}
                              className="form-select mb-3"
                              aria-label="Default select example"
                            >
                              <option selected>Select Value</option>
                              <option value="direct">Direct</option>
                              <option value="agreement">Agreement</option>
                              <option value="advance_paid">Advance Paid</option>
                              <option value="mail">Mail</option>
                            </select>
                          </Col>

                          <Col xs="6" className="mt-4">
                            <Label>Po Validity</Label>
                            <Flatpickr
                              className="form-control"
                              id="exampleInputdate"
                              onChange={(e) => {
                                setPoObject({
                                  ...poObject,
                                  po_validity: moment(e[0]).format(
                                    "YYYY-MM-DD"
                                  ),
                                });
                              }}
                            />
                            {/* <Input
                      onChange={(e) =>
                        setPoObject({
                          ...poObject,
                          po_validity: e.target.value,
                        })
                      }
                      value={poObject?.po_validity}
                      name="po_validity"
                      required
                    /> */}
                          </Col>

                          <Col xs="6" className="mt-2">
                            <Label>Po Upload</Label>

                            {/* <Input
                      style={{ display: "block" }}
                      type="file"
                      value={poObject?.po_upload}
                    /> */}
                            <div className="input-group">
                              <input
                                style={{ display: "block" }}
                                type="file"
                                className="form-control"
                                id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04"
                                aria-label="Upload"
                                onChange={(e) =>
                                  setFileUploadData(e.target.files[0])
                                }
                              />
                              <button
                                className="btn btn-outline-success"
                                type="button"
                                id="inputGroupFileAddon04"
                                onClick={() => {
                                  console.log(fileUploadData);
                                  let apiData =
                                    api.AWS_URL + upload_issue_proof;
                                  let formDat = new FormData();
                                  formDat.append("file", fileUploadData);
                                  axios
                                    .post(apiData, formDat)
                                    .then((res) => {
                                      successnotify(
                                        "Data Uploaded Successfully"
                                      );
                                      setPoObject({
                                        ...poObject,
                                        po_upload: res.data.url,
                                      });
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              >
                                Button
                              </button>
                            </div>
                          </Col>

                          {!data?.project_intro_status && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <button
                                className="btn btn-primary"
                                style={{ marginBottom: "20px" }}
                                onClick={handleCreatePo}
                              >
                                Add PO
                              </button>
                            </div>
                          )}
                        </Row>
                      </Col>
                      <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className="mb-4">
                      <Col xs="12" className="mb-2 fs-18 d-flex">
                        <Col xs="6">
                          <h5 className="text-primary mb-3 mt-2">
                            Purchase Order
                          </h5>
                        </Col>
                        {!data?.project_intro_status ? (
                          <Col xs="6">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <i
                                className=" ri-edit-box-line fs-20 text-primary cursor-pointer"
                                // onClick={() => setOpen(!open)}
                                onClick={() => {
                                  // successnotify("Edit Enabled");
                                  setOpen(true);
                                }}
                              ></i>
                            </div>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </Col>
                      <Col xs="12">
                        <Card>
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
                                  <div>{data?.po_title}</div>
                                  <div>
                                    <span className="badge text-bg-primary">
                                      {data?.po_unique_id}
                                    </span>
                                  </div>
                                </div>
                                <div style={{ width: "28%" }}>
                                  <div>{data?.po_value}</div>
                                </div>
                                <div
                                  style={{ width: "27%", fontSize: "12px" }}
                                  className="text-capitalize"
                                >
                                  {data?.po_type?.split("_").join(" ")}
                                </div>
                                <div style={{ width: "25%" }}>
                                  <div>{data?.po_created_at}</div>
                                  {/* <div
                                    style={{
                                      color: "#405189",
                                      fontSize: "10px",
                                    }}
                                    // className="text-muted fs-10"
                                  >
                                    Expires in 320 days
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                    </Row>
                  </>
                )
              ) : (
                ""
              )}
              {/*    "cost_item_name":"cost_item_name",
    "cost_description":"cost_description",
    "cost_billable_price": "cost_billable_price",
    "cost_payable_price": "cost_payable_price",
    "cost_type":"cost_type"*/}

              {/* Commercial Bond start  */}

              {data?.project_id != 0 ? (
                <>
                  <Col xs="12" className="mb-2 fs-18 d-flex">
                    <Col xs="6">
                      <h5 className="text-primary mb-3 mt-2">
                        Commercial Bond
                      </h5>
                    </Col>
                    {!data?.project_intro_status ? (
                      <Col xs="6">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="btn btn-primary"
                            style={{ marginBottom: "20px" }}
                            onClick={handleCreateCost}
                          >
                            Add Cost
                          </button>
                        </div>
                      </Col>
                    ) : (
                      <></>
                    )}
                  </Col>
                  {!data?.project_intro_status ? (
                    <Row className="mb-2">
                      <Col xs="12">
                        <Row>
                          <Col xs="6" className="mt-4">
                            <Label>Item Name</Label>
                            <Input
                              onChange={(e) =>
                                setCostObject({
                                  ...costObject,
                                  cost_item_name: e.target.value,
                                })
                              }
                              value={costObject?.cost_item_name}
                              name="cost_item_name"
                              required
                            />
                          </Col>
                          <Col xs="6" className="mt-4">
                            <Label>Description</Label>
                            <Input
                              onChange={(e) =>
                                setCostObject({
                                  ...costObject,
                                  cost_description: e.target.value,
                                })
                              }
                              value={costObject?.cost_description}
                              name="cost_description"
                              required
                            />
                          </Col>
                          <Col xs="6" className="mt-4">
                            <Label>Billable Price</Label>
                            <Input
                              onChange={(e) =>
                                setCostObject({
                                  ...costObject,
                                  cost_billable_price: e.target.value,
                                })
                              }
                              value={costObject?.cost_billable_price}
                              name="cost_billable_price"
                              required
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                  <Row className="my-4">
                    {data?.commercials?.length > 0 ? (
                      <Col xs="12">
                        <Card>
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
                                <div style={{ width: "27%" }}>Type</div>
                                <div style={{ width: "27%" }}>Description</div>
                                <div style={{ width: "27%" }}>
                                  Billable Price
                                </div>
                                <div style={{ width: "23%" }}>Date</div>
                                <div style={{ width: "7%" }}>
                                  {!data?.project_intro_status ? (
                                    <i
                                      className=" ri-edit-box-line fs-20 text-primary cursor-pointer"
                                      // onClick={() => setOpen(!open)}
                                      onClick={() => {
                                        // successnotify("Edit Enabled");
                                        setEditCommercial(true);
                                      }}
                                    ></i>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div>
                                {(data?.commercials || []).map((cost) => (
                                  <Row key={cost?.cost_unique_id}>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        margin: "10px",
                                      }}
                                    >
                                      <div style={{ width: "28%" }}>
                                        <div className="text-capitalize">
                                          {cost?.cost_item_name}
                                        </div>
                                        <div>
                                          <span className="badge text-bg-primary">
                                            {cost?.cost_unique_id}
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "27%",
                                          fontSize: "12px",
                                        }}
                                        className="text-capitalize"
                                      >
                                        {cost?.cost_type}
                                      </div>
                                      <div
                                        style={{
                                          width: "27%",
                                          fontSize: "12px",
                                        }}
                                        className="text-capitalize"
                                      >
                                        {cost?.cost_description}
                                      </div>
                                      <div
                                        style={{
                                          width: "27%",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {cost?.cost_billable_price}
                                      </div>
                                      <div style={{ width: "25%" }}>
                                        <div>{cost?.cost_date}</div>
                                        {/* <div
                                          style={{
                                            color: "#405189",
                                            fontSize: "10px",
                                          }}
                                          // className="text-muted fs-10"
                                        >
                                          Expires in 320 days
                                        </div> */}
                                      </div>

                                      <div
                                        style={{
                                          width: "10%",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {editCommercial &&
                                        !data?.project_intro_status ? (
                                          <i
                                            className="ri-delete-bin-line fs-20 text-danger cursor-pointer"
                                            onClick={() => {
                                              const dataEnter = {
                                                cost_id: cost.cost_id,
                                                cost_status: "inactive",
                                              };
                                              axios
                                                .patch(
                                                  cost_update_url,
                                                  dataEnter
                                                )
                                                .then((res) => {
                                                  setCheck(!check);
                                                  successnotify("Updated");
                                                })
                                                .catch((err) => {
                                                  console.log(err);
                                                });
                                            }}
                                          ></i>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </Row>
                                ))}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                        {data?.lead_approval_status != "approved" && (
                          <Row className="my-4">
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-primary"
                                style={{ marginBottom: "20px" }}
                                onClick={handleCommercialConfirm}
                              >
                                Send Commercial
                              </button>
                            </div>
                          </Row>
                        )}
                      </Col>
                    ) : (
                      <></>
                    )}
                  </Row>

                  <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                </>
              ) : (
                ""
              )}
            </div>
          )}
          {data?.lead_pfd_status?.every(
            (item) => item?.lead_acknowledgement_status == "approved"
          ) && (
            <>
              {/* Project Details start  */}

              {!data?.project_id ? (
                <Row>
                  <Col xs={12} className="mt-4">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <button
                        className="btn btn-primary waves-effect waves-light ms-4 "
                        style={{ width: "170px" }}
                        onClick={tog_animationFlip}
                      >
                        + &nbsp;&nbsp;Project
                      </button>
                    </div>
                  </Col>
                  <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                </Row>
              ) : (
                <Row>
                  <Col xs={12}>
                    <h5 className="text-primary mb-3 mt-2">Project Details</h5>
                    <Card style={{ boxShadow: "none" }}>
                      <CardBody
                        style={{
                          boxShadow: "none",
                          border: "1px solid #CDD6ED",
                          borderRadius: "3px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}
                              >
                                <div
                                  style={{ color: "#7B7B7B", fontSize: "10px" }}
                                >
                                  Title
                                </div>
                                <div>{data?.project_title}</div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <div
                                  style={{ color: "#7B7B7B", fontSize: "10px" }}
                                >
                                  ID
                                </div>
                                <div>
                                  <span
                                    className="badge text-bg-primary"
                                    style={{
                                      backgroundColor: "#7E97DD",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {data?.project_unique_id}
                                  </span>
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#7B7B7B",
                                    fontSize: "10px",
                                  }}
                                >
                                  Creation D&T
                                </div>
                                <div>{data?.project_created_at}</div>
                              </div>
                            </div>
                          </div>
                          {data?.spoc_detail?.length > 0 ? (
                            <div>
                              <Card style={{ padding: "0" }}>
                                <CardBody style={{ padding: "0" }}>
                                  <div>
                                    <div
                                      style={{
                                        background: "#F0F4FF",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: "10px",
                                      }}
                                    >
                                      <div style={{ color: "#121212" }}>
                                        Client SPOC Name
                                      </div>
                                      <div style={{ color: "#121212" }}>
                                        Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                      </div>
                                      <div style={{ color: "#121212" }}>
                                        Phone&nbsp;&nbsp;&nbsp;&nbsp;
                                      </div>
                                    </div>
                                    {data?.spoc_detail?.map((spoc) => (
                                      <>
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            padding: "20px 10px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#121212",
                                              width: "350px",
                                            }}
                                          >
                                            {spoc.spoc_name}
                                          </div>
                                          <div
                                            style={{
                                              color: "#121212",
                                              width: "350px",
                                            }}
                                          >
                                            {spoc.spoc_email}
                                          </div>
                                          <div style={{ color: "#121212" }}>
                                            {spoc.spoc_contact}
                                          </div>
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
                </Row>
              )}
            </>
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Project Feasibility Discussion start  */}

      {data?.cc_status_lead == "1" ? (
        <>
          <Row className="">
            <h5 className="text-primary mb-3 mt-4">
              Project Feasibility Discussion
            </h5>
            {data?.hot_lead_status == "0" ? (
              <>
                <Col xs="10" className="mt-2 mb-2">
                  <Select
                    aria-label=".form-select-sm example"
                    onChange={(e) => setSelectedUserIdArr(e)}
                    isMulti
                    options={opt}
                    formatOptionLabel={formatOptionData}
                    isClearable
                  ></Select>
                </Col>
                <Col xs="2" className="d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light ms-4"
                    style={{ width: "80%", marginBottom: "10px" }}
                    onClick={() => handlePfd()}
                    disabled={seletecUserIdArr?.length > 0 ? false : true}
                  >
                    Send
                  </button>
                </Col>
              </>
            ) : (
              <></>
            )}
          </Row>
          {data?.pfd_status == "1" ? (
            <Row>
              <Col xs="12">
                <div>
                  <table className="table table-nowrap mt-4">
                    <thead>
                      <tr className="table-primary">
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Invitation</th>
                        <th scope="col">status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.lead_pfd_status?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.user_name}</td>
                            <td>{item.user_number}</td>
                            <td>
                              <div>
                                <p className="m-0">{item?.buser_name}</p>
                                <p className="text-muted m-0 mt-1 fs-12">
                                  {
                                    item.lead_acknowledgement_status_approved_date
                                  }
                                </p>
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div>sent</div>
                                <div
                                  style={{
                                    height: "18px",
                                    width: "18px",
                                    borderRadius: "50%",
                                    background: "#eb6464",
                                    marginLeft: "6px",
                                    textAlign: "center",
                                    padding: "2px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                  }}
                                >
                                  {item.notification_count}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge rounded-pill ${
                                  item.lead_acknowledgement_status == "approved"
                                    ? "badge-soft-success"
                                    : "badge-soft-warning"
                                }`}
                                style={{ minWidth: "70px" }}
                              >
                                {item.lead_acknowledgement_status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Col>
              <hr style={{ marginTop: "32px", marginBottom: "32px" }} />
            </Row>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      <Row className="mt-4">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {" "}
            <h5 className="text-primary mb-4">Commercial Details</h5>
          </div>
          {!data?.project_intro_status ? (
            <div>
              {" "}
              {data.cc_status_lead == "1" ? (
                !editComm ? (
                  <>
                    <i
                      className=" ri-edit-box-line fs-20 text-primary cursor-pointer"
                      // onClick={() => setOpen(!open)}
                      onClick={() => {
                        // successnotify("Edit Enabled");
                        setEditComm(true);
                      }}
                    ></i>
                  </>
                ) : (
                  <></>
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <Col xs="6">
          <div>
            <table className="table table-nowrap">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Particulars</th>
                  <th scope="col" style={{ numberAlign: "center" }}>
                    Value (min)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "5px" }}>Time to Search</td>
                  <td style={{ padding: "5px" }}>
                    <input
                      type="number"
                      readOnly={data.cc_status_lead == "1" && !editComm}
                      className="form-control"
                      id="basiInput"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      style={{ height: "32px" }}
                    />
                  </td>
                </tr>

                <tr className="table-light">
                  <td style={{ padding: "5px" }}>Time to Reach</td>
                  <td style={{ padding: "5px" }}>
                    <input
                      readOnly={data.cc_status_lead == "1" && !editComm}
                      type="number"
                      value={b}
                      className="form-control"
                      id="basiInput"
                      onChange={(e) => setB(e.target.value)}
                      style={{ height: "32px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Time to Pitch</td>
                  <td style={{ padding: "5px" }}>
                    <input
                      readOnly={data.cc_status_lead == "1" && !editComm}
                      type="number"
                      className="form-control"
                      id="basiInput"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      style={{ height: "32px" }}
                    />
                  </td>
                </tr>
                <tr className="table-light">
                  <td style={{ padding: "5px" }}>Time to download/Onboard</td>
                  <td style={{ padding: "5px" }}>
                    <input
                      readOnly={data.cc_status_lead == "1" && !editComm}
                      type="number"
                      className="form-control"
                      id="basiInput"
                      value={d}
                      onChange={(e) => setD(e.target.value)}
                      style={{ height: "32px" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Time to Sell/Reconnect</td>
                  <td style={{ padding: "5px" }}>
                    <input
                      readOnly={data.cc_status_lead == "1" && !editComm}
                      type="number"
                      className="form-control"
                      id="basiInput"
                      value={e}
                      onChange={(e) => setE(e.target.value)}
                      style={{ height: "32px" }}
                    />
                  </td>
                </tr>
                <tr className="table-light">
                  <td style={{ padding: "5px" }}>Time to Relax</td>
                  <td style={{ padding: "5px" }}>
                    <input
                      readOnly={data.cc_status_lead == "1" && !editComm}
                      type="number"
                      value={f}
                      className="form-control"
                      id="basiInput"
                      onChange={(e) => setF(e.target.value)}
                      style={{ height: "32px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col xs="6" className="d-flex  justify-content-center">
          <div
            style={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="d-flex gap-2">
              <div
                style={{
                  flexGrow: "1",
                  padding: "24px",
                  background: "#f0f4ff",
                  borderRadius: "12px",
                }}
              >
                <p className="m-0 text-center">Time to complete?</p>
                <p className="text-center">(Min)</p>
                <span
                  className="badge badge-soft-primary d-flex align-items-center justify-content-center px-4  fs-16"
                  style={{ height: "40px" }}
                >
                  {sum}
                </span>
              </div>
              <div
                style={{
                  flexGrow: "1",
                  padding: "24px",
                  background: "#f0f4ff",
                  borderRadius: "12px",
                }}
              >
                <p className="m-0 text-center">How much to quote?</p>
                <p className="text-center invisible">(Min)</p>
                <span
                  className="badge badge-soft-primary d-flex align-items-center justify-content-center px-4  fs-16"
                  style={{ height: "40px" }}
                >
                  {/* {
                    commerClac?.filter(
                      (it) =>
                        Number(sum) > Number(it.slab_from) &&
                        Number(sum) < Number(it.slab_to)
                    ).quotation
                  } */}

                  {/* {console.log(
                    commerClac.filter(
                      (it) => Number(it.slab_from) >= Number(sum || 0)
                    ),
                    "sum"
                  )} */}
                  {GetValueData()}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 ">
              <div
                style={{
                  flexGrow: "0.3",
                  padding: "24px",
                  background: "#f0f4ff",
                  borderRadius: "12px",
                }}
              >
                <p className="m-0 text-center">Which grade of taskers </p>
                <p className="text-center ">does it require?</p>
                <span
                  className="badge badge-soft-primary d-flex align-items-center justify-content-center px-4  fs-16"
                  style={{ height: "40px" }}
                >
                  {GetValueDataGrade()}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flexGrow: "1",
                marginBottom: "15px",
              }}
            >
              {data?.cc_status_lead == "0" || editComm ? (
                <button
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                  // style={{ marginBottom: "auto" }}
                  onClick={() => {
                    setEditComm(false);
                    handleSubmitCommercial();
                  }}
                >
                  Apply
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Col>
        <hr className="my-4"></hr>

        {modal_animationFlip && (
          <FlipModal
            modal_animationFlip={modal_animationFlip}
            setmodal_animationFlip={setmodal_animationFlip}
            tog_animationFlip={tog_animationFlip}
            modalType={modalType}
            type={"newaddproject"}
            data={[]}
            dataFromnewAddProject={data}
            setCheck={setCheck}
            check={check}
          />
        )}
        {open && (
          <Modal
            size="lg"
            id="signupModals"
            tabIndex="-1"
            isOpen={open}
            toggle={() => {
              setOpen(false);
            }}
            centered
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                setOpen(false);
              }}
            >
              Purchase Order
            </ModalHeader>
            {/* <Alert color="success" className="rounded-0 mb-0">
                    <p className="mb-0">Up to <span className="fw-semibold">50% OFF</span>, Hurry up before the stock ends</p>
                </Alert> */}
            <ModalBody>
              <Row className="mb-2">
                <Col xs="12">
                  <Row>
                    <Col xs="6">
                      <Label>Po Title</Label>
                      <Input
                        onChange={(e) =>
                          setPoObject({
                            ...poObject,
                            po_title: e.target.value,
                          })
                        }
                        defaultValue={data?.po_title}
                        value={poObject?.po_title}
                        name="po_value"
                        required
                      />
                    </Col>
                    <Col xs="6">
                      <Label>Po Value</Label>
                      <Input
                        onChange={(e) =>
                          setPoObject({
                            ...poObject,
                            po_value: e.target.value,
                          })
                        }
                        defaultValue={data?.po_value}
                        value={poObject?.po_value}
                        name="po_value"
                        required
                      />
                    </Col>
                    <Col xs="6" className="mt-4">
                      <Label>Po type</Label>
                      <select
                        onChange={(e) => {
                          console.log(e.target.value, "testing");
                          setPoObject({
                            ...poObject,
                            po_type: e.target.value,
                          });
                        }}
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option selected disabled>
                          Select Value
                        </option>
                        <option
                          value="direct"
                          selected={data?.po_type == "direct" ? true : false}
                        >
                          Direct
                        </option>
                        <option
                          value="agreement"
                          selected={data?.po_type == "agreement" ? true : false}
                        >
                          Agreement
                        </option>
                        <option
                          value="advance_paid"
                          selected={
                            data?.po_type == "advance_paid" ? true : false
                          }
                        >
                          Advance Paid
                        </option>
                        <option
                          value="mail"
                          selected={data?.po_type == "mail" ? true : false}
                        >
                          Mail
                        </option>
                      </select>
                    </Col>

                    <Col xs="6" className="mt-4">
                      <Label>Po Validity</Label>
                      <Flatpickr
                        className="form-control"
                        id="exampleInputdate"
                        options={{
                          defaultDate: [defaultDate],
                        }}
                        onChange={(e) => {
                          setPoObject({
                            ...poObject,
                            po_validity: moment(e[0]).format("YYYY-MM-DD"),
                          });
                        }}
                      />
                    </Col>
                    <Col xs="6" className="mt-2">
                      <Label>Po Upload</Label>
                      <div className="input-group">
                        <input
                          style={{ display: "block" }}
                          type="file"
                          className="form-control"
                          id="inputGroupFile04"
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                          onChange={(e) => setFileUploadData(e.target.files[0])}
                        />
                        <button
                          className="btn btn-outline-success"
                          type="button"
                          id="inputGroupFileAddon04"
                          onClick={() => {
                            console.log(fileUploadData);
                            let apiData = api.AWS_URL + upload_issue_proof;
                            let formDat = new FormData();
                            formDat.append("file", fileUploadData);
                            axios
                              .post(apiData, formDat)
                              .then((res) => {
                                successnotify("Data Uploaded Successfully");
                                setPoObject({
                                  ...poObject,
                                  po_upload: res.data.url,
                                });
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Button
                        </button>
                      </div>
                    </Col>

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        className="btn btn-primary"
                        style={{ marginBottom: "20px" }}
                        onClick={handleUpdatePo}
                      >
                        Update PO
                      </button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        )}
      </Row>
    </div>
  );
};

export default MaturningMain;
