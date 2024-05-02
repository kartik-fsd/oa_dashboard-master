import React, { useContext, useState } from "react";
import { Card, CardBody, Col, Label, Row } from "reactstrap";
import StepperLeads from "../StepperLeads";
import Select from "react-select";
import moment from "moment";
import LeadDetEdit from "./LeadDetEdit";
import { api } from "../../../globalConfig";
import {
  request_approval,
  search_approval_list,
  update_lead_details,
} from "../../../assets/utils/Business";
import axios from "axios";
import { Context } from "../../../App";
import { useParams } from "react-router-dom";
import { dataAravindApproval } from "../../../assets/utils/TaskmoUrl";
import MaturningMain from "./MaturningMain";
import { find } from "lodash";
import { successnotify, warningnotify } from "../../Toasts";

const LeadDetView = ({ data, setCheck, check }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const [showCommercialCal, setShowCommercialCal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [opt, setOpt] = React.useState([]);
  const [context, setContext] = useContext(Context);
  const [seletecUserIdArr, setSelectedUserIdArr] = useState([]);
  const { id } = useParams();
  const request_by_id = context.oaDetials.id;
  const current_date = context.currentDate;
  const request_approval_url = api.TASKMO_URL + request_approval;

  const showcomCalc = (data) => {
    if (!data.lead_maturing) {
      setShowCommercialCal(false);
      return "";
    }
    // let findData = data?.lead_maturing.every(
    //   (item) => item.lead_acknowledgement_status != "fasak"
    // );

    let findData = data?.lead_maturing?.map(
      (item) => item.lead_acknowledgement_status
    );

    if (findData && findData.every((i) => i == "approved")) {
      setShowCommercialCal(true);
    } else if (findData) {
      setShowCommercialCal(false);
    }
  };

  React.useEffect(() => {
    showcomCalc(data);
  }, [id, data]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
          <span
            className="badge badge-soft ms-1 me-1"
            style={{
              backgroundColor: "#f07d47",
            }}
          >
            {item.team_name}
          </span>
          -<span className="text-muted ms-1">{item.role_designation}</span>
        </span>
      </div>
    );
  };

  React.useEffect(() => {
    const link = api.TASKMO_URL + search_approval_list;
    axios
      .get(link, { params: { search: "bh" } })
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

  const approvalSendFunction = () => {
    const link = api.TASKMO_URL + update_lead_details;
    if (seletecUserIdArr.length > 0) {
      let itemtests = seletecUserIdArr.map((item) => {
        return {
          lead_id: Number(id),
          project_id: 0,
          request_to_id: item.data.portal_user_id,
          request_by_id: context.oaDetials.portal_user_id,
          lead_acknowledgement_type: "lead_maturing",
          notification_type: "approval",
        };
      });

      const body = {
        lead_id: Number(id),
        lead_maturing_status: "1",
        lead_maturing_date: current_date,
        updated_at: current_date,
      };
      axios
        .post(dataAravindApproval, itemtests)
        .then((res) => {
          successnotify("success");
          setCheck(!check);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .patch(link, body)
        .then((res) => console.log("approval send"))
        .catch((err) => console.log(err));
    } else {
      warningnotify("Please select Business Head before sending");
    }
  };

  const options = [
    {
      value: "chocolate",
      label: (
        <div className="d-flex gap-2 align-items-center">
          <img
            src={"/user-dummy-img.jpg"}
            alt="img"
            height="30px"
            width="30px"
            style={{ borderRadius: "50%" }}
          />
          <span className="text-dark fw-semibold">
            djfdfjkehdik{" "}
            <span
              className="badge badge-soft ms-1 me-1"
              style={{ backgroundColor: "#f07d47" }}
            ></span>
            -<span className="text-muted ms-1">jsbdjeh</span>
          </span>
        </div>
      ),
    },
  ];
  const handleApproveRequest = () => {
    axios
      .get(request_approval_url)
      .then((res) => {
        successnotify("Success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Card>
        <CardBody>
          {/* Special access to approve all requests*/}
          {context.oaDetials?.role == "head" ? (
            <div>
              <h5 className=" mb-3 mt-4" style={{ color: "#b83016" }}>
                Approve all request
              </h5>
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
                        onClick={handleApproveRequest}
                      >
                        Confirm
                      </button>
                    </div>
                  </Col>
                </div>
              </Col>
            </div>
          ) : (
            <></>
          )}
          {/* {data?.lead_maturing?.every(
            (item) => item?.lead_acknowledgement_status == "approved"
          ) && data.lead_maturing_status == "1" ? (
            <>
              <MaturningMain data={data} setCheck={setCheck} check={check} />
            </>
          ) : (
            <></>
          )} */}
          <MaturningMain data={data} setCheck={setCheck} check={check} />

          <Row>
            {/* {data.lead_nurturing_status == 1 &&
            data.lead_maturing_status == 0 ? ( */}

            <Col xs="12" className="mt-5">
              <div className="d-flex justify-content-between">
                <h5 className=" mb-4" style={{ color: "#b83016" }}>
                  Lead Nurturing
                </h5>
                {data?.lead_maturing_status == "0" &&
                !data?.project_intro_status ? (
                  <div>
                    <i
                      className=" ri-edit-box-line fs-20  cursor-pointer"
                      style={{ color: "#b83016" }}
                      onClick={() => setOpen(!open)}
                    ></i>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <p style={{ fontWeight: "500" }}>What are we supposed to do?</p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: data.supposed_to_do }}
                />
              </p>
              <hr style={{ marginTop: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500" }}>What are the requirments?</p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div dangerouslySetInnerHTML={{ __html: data.requirements }} />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500" }}>
                What are the qualifying criteria?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: data.qualifying_criteria }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500" }}>
                What are the rejection criteria?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: data.rejection_criteria }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500" }}>
                What are your market population?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                  dangerouslySetInnerHTML={{ __html: data.market_population }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <p style={{ fontWeight: "500" }}>
                What are your market penetration and growth?
              </p>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.market_penetration_and_growth,
                  }}
                />
              </p>
              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <h5 className="mb-4 " style={{ color: "#b83016" }}>
                Difficulty level
              </h5>
              <div className="d-flex gap-4 align-items-center">
                <label className="m-0 d-flex align-items-center">
                  <input
                    type="radio"
                    name="option"
                    value="Low"
                    checked={data.difficulty_level == "Low" ? true : false}
                    onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: "8px" }}>Low</span>
                </label>
                <br />
                <label className="m-0 d-flex align-items-center">
                  <input
                    type="radio"
                    name="option"
                    value="Medium"
                    checked={data.difficulty_level == "Medium" ? true : false}
                    onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: "8px" }}>Medium</span>
                </label>
                <br />
                <label className="m-0 d-flex align-items-center">
                  <input
                    type="radio"
                    name="option"
                    value="High"
                    checked={data.difficulty_level == "High" ? true : false}
                    onChange={handleOptionChange}
                  />
                  <span style={{ marginLeft: "8px" }}>High</span>
                </label>
              </div>

              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
            <Col xs="12" className="mt-2">
              <h5 className="mb-4 " style={{ color: "#b83016" }}>
                Deliverables
              </h5>
              <div>
                <table className="table caption-top table-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">City/Language</th>
                      <th scope="col">Month-Year</th>
                      <th scope="col">Quantity</th>
                      {/* <th scope="col">Payment</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.milestones?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>{item.type_value}</td>
                          <td>{moment(item.month).format("YYYY-MM-DD")}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <LeadDetEdit
        open={open}
        setOpen={setOpen}
        data={data}
        setCheck={setCheck}
        check={check}
      />
    </div>
  );
};

export default LeadDetView;
