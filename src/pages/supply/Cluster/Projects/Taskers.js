import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import CountUp from "react-countup";
import { ToastContainer, toast } from "react-toastify";
import {
  fse_oa_assign,
  fse_search,
  sow_fse_list,
} from "../../../../assets/utils/sow";
import { api } from "../../../../globalConfig";
import { BasicTable } from "../../../Dashboard/training/DataTables/datatableCom";
import { APIClient } from "../../../../assets/config/sessionToken";

const Taskers = ({ type }) => {
  const { id } = useParams();
  //   let sow = id.split("-")[0]
  let sow = "12";

  const [check, setCheck] = React.useState(true);
  const [tableData, setTableData] = React.useState([]);
  const [cardMap, setCardMap] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userSows, setUserSows] = React.useState([]);
  const [switchData, setSwitchData] = React.useState(false);

  const promise = new APIClient();

  const pathname = api.OA_URL + sow_fse_list;
  const searchFseUrl = api.OA_URL + fse_search;
  const assignFseUrl = api.OA_URL + fse_oa_assign;

  useEffect(() => {
    let dataCheck = "only_leads";

    promise
      .get(pathname, { sow_id: sow, switch_type: dataCheck })
      .then((res) => {
        setTableData(res.data?.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id, check]);

  const handleSearch = () => {
    promise
      .get(searchFseUrl, { mobile_number: search })
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
          setUserSows({});
        } else {
          setUserSows(res.data?.tasker);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAssign = (data) => {
    const dataEnter = {
      sow_id: id.split("-")[0],
      user_id: data,
    };

    axios
      .post(assignFseUrl, dataEnter)
      .then((res) => {
        setUserSows([]);
        if (res.data?.error) {
          toast(res.data.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          toast("Added success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChange = (e) => {
    let dataCheck = e ? "" : "only_leads";

    promise
      .get(pathname, { sow_id: sow, switch_type: dataCheck })
      .then((res) => {
        setTableData(res.data?.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <React.Fragment>
      {/* <ToastContainer /> */}

      <div className="d-flex justify-content-between align-items-center w-80 px-4">
        <h5 className="card-title mb-0"></h5>
      </div>

      <Card>
        <CardHeader style={{ paddingBottom: "10px" }}>
          <div className="d-flex flex-column">
            <div className="d-flex gap-2 align-items-center">
              <div
                className="form-check form-switch form-switch-"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  style={{ width: "30px" }}
                  onChange={(e) => {
                    setSwitchData(e.target.checked);
                    handleChange(e.target.checked);
                  }}
                  // checked={
                  //   rowData?.sow_status !== "accepted" ? "checked" : ""
                  // }
                />
                {/* <Label
              className="form-check-label fs-14"
              htmlFor="flexSwitchCheckDefault"
            >
              Leads only
            </Label> */}
              </div>
              <h5 className="mt-2 ">
                {switchData ? "All Taskers" : "Active Taskers"}
              </h5>
            </div>

            {/* <div></div> */}
            <div
              className="d-flex align-items-center gap-2"
              // style={{ marginBottom: "40px" }}
            >
              <div className="d-flex align-items-center gap-1 fs-12">
                <span
                  className="rounded-circle"
                  style={{
                    background: "#ba94f9",
                    width: "10px",
                    height: "10px",
                  }}
                ></span>
                <span>Direct</span>
              </div>
              <div className="d-flex align-items-center gap-1 fs-12">
                <span
                  className="rounded-circle"
                  style={{
                    background: "#FFA45E",
                    width: "10px",
                    height: "10px",
                  }}
                ></span>
                <span>Group</span>
              </div>
              <div className="d-flex align-items-center gap-1 fs-12">
                <span
                  className="rounded-circle"
                  style={{
                    background: "#63bbbe",
                    width: "10px",
                    height: "10px",
                  }}
                ></span>
                <span>Managed</span>
              </div>
              {/* <div className="d-flex align-items-center gap-1 fs-12">
              <span
                className="rounded-circle"
                style={{ background: "red", width: "10px", height: "10px" }}
              ></span>
              <span>Not Assigned</span>
            </div> */}
            </div>
          </div>
          <div
            className="flex-shrink-0"
            style={{
              float: "right",
              marginRight: "220px",
              marginTop: "-38px",
            }}
          >
            {type == "oa" || type == "spoc" ? (
              <button
                className="btn btn-danger add-btn"
                onClick={() => setOpen(true)}
              >
                <i className="ri-add-line align-bottom"></i> Assign Tasker
              </button>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardBody>
          <BasicTable data={tableData} className="p-2" />
        </CardBody>
      </Card>
      <Modal
        className="modal-lg"
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setUserSows([]);
        }}
        centered
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setOpen(false);
            setUserSows([]);
          }}
        >
          ASSIGN TASKER
        </ModalHeader>

        <ModalBody>
          <Row className="d-flex mx-1">
            <InputGroup>
              <InputGroupText>Mobile Number</InputGroupText>
              <Input
                type="text"
                maxLength={10}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupText
                style={{ cursor: "pointer" }}
                onClick={handleSearch}
              >
                <i className="ri-search-line fs-20"></i>
              </InputGroupText>
            </InputGroup>
          </Row>
          {userSows[0]?.profile_image && (
            <Card className="m-3">
              <Row className="align-items-start g-3 mx-2 py-3">
                <Col md={10}>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {!(userSows[0]?.profile_image == "null") ? (
                        userSows[0]?.profile_image.includes("https") ? (
                          <img
                            className="rounded-circle avatar-md"
                            alt="200x200"
                            src={userSows[0].profile_image}
                          />
                        ) : (
                          <img
                            className="rounded-circle avatar-md"
                            alt="200x200"
                            src={`https://isp.taskmo.in/fieldon_images/${userSows[0]?.profile_image}`}
                          />
                        )
                      ) : (
                        ""
                      )}
                      {userSows[0]?.profile_image == "null" && (
                        <div className="avatar-md">
                          <div className="avatar-title rounded-circle text-warning">
                            {userSows[0]?.fse_name[0]}
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
                        {`${userSows[0]?.fse_name} ${"("} ${
                          userSows[0]?.user_id
                        } ${")"}`}
                      </h5>
                      <div className="d-flex flex-wrap">
                        {(userSows || []).map(
                          (sow) =>
                            sow.brand_logo && (
                              <div key={sow.sow_id}>
                                <img
                                  className="rounded-circle avatar-xxs"
                                  alt="sow_tag"
                                  src={sow.brand_logo}
                                  style={{ marginRight: "10px" }}
                                />
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="d-flex justify-content-end align-items-center h-100">
                  <button
                    className="btn btn-danger add-btn"
                    onClick={() => handleAssign(userSows[0]?.user_id)}
                  >
                    Assign
                  </button>
                </Col>
              </Row>
            </Card>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Taskers;
