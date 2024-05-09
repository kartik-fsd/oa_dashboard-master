import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  hourly_leads_chart_oa,
  list_of_sow_oa,
  oa_assign_sow,
  overall_fse_enroll,
  overall_leads_chart_oa,
  search_oa,
  training_chart,
  training_chart_daily,
} from "../../../../assets/utils/sow";
import { api } from "../../../../globalConfig";
import DataTable from "react-data-table-component";
import StatsContent from "../../../Dashboard/stats/StatsContent";
import TaskerChart from "../../../EditSow/TaskerChart";
const OaAssign = () => {
  const { id } = useParams();
  const [check, setCheck] = React.useState(true);
  const [tableData, setTableData] = React.useState([]);
  const [cardMap, setCardMap] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [userSows, setUserSows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [oaList, setOaList] = React.useState([]);
  //graphs api's
  const pathName = api.OA_URL + training_chart + `?sow_id=${id}`;
  const trainingDailyUrl = api.OA_URL + training_chart_daily + `?sow_id=${id}`;
  const hourlyName = api.OA_URL + hourly_leads_chart_oa + `?sow_id=${id}`;
  const overallName = api.OA_URL + overall_leads_chart_oa + `?sow_id=${id}`;
  const overallEnroll = api.OA_URL + overall_fse_enroll + `?sow_id=${id}`;
  //opening full screen modal
  const [modal_fullscreen1, setmodal_fullscreen1] = React.useState(false);
  const [graphToken, setGraphToken] = React.useState("");
  function tog_fullscreen1() {
    setmodal_fullscreen1(!modal_fullscreen1);
  }

  const handleAssign = (oaid) => {
    const apilink = api.VENDOR_URL + oa_assign_sow;
    const postData = {
      sow_id: id,
      oa_id: oaid,
    };

    axios
      .post(apilink, postData)
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const callClickFunction = (d) => {
    const token = d?.token;
    setGraphToken(token);
    tog_fullscreen1();

    const config = {
      headers: { "x-access-token": ` ${token}` },
    };
    fetch(pathName, config)
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.log(err));
  };
  const handleSearch = () => {
    const apilink = api.VENDOR_URL + search_oa;
    axios
      .get(apilink, { params: { mobile_number: search } })
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
  const data = oaList;
  const columns = [
    {
      name: "Profile Image",
      selector: (row) => row.profile_image,
      cell: (d) => (
        <div>
          {d.profile_image !== "" ? (
            <div>
              <img
                src={d.profile_image}
                alt=""
                className="rounded-avatar-xs"
                width="40px"
                height={"40px"}
              />
            </div>
          ) : (
            <div className="avatar-xs">
              <div
                className="avatar-title rounded bg-soft-secondary text-secondary"
                style={{ width: "40px", height: "35px" }}
              >
                {d.full_name[0]}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      name: "Full Name",
      selector: (row) => row.full_name,
      cell: (d) => (
        <div>
          {" "}
          <div>{d.full_name}</div>
          <div>({d.oa_id})</div>
        </div>
      ),
    },
    {
      name: "Pending Leads",
      selector: (row) => row.pending_leads,
      cell: (d) => <div>{d.pending_leads}</div>,
    },
    {
      name: "Total Leads",
      selector: (row) => row.total_leads,
      cell: (d) => <div>{d.total_leads}</div>,
    },
    {
      name: "Approved Leads",
      selector: (row) => row.approved_leads,
      cell: (d) => <div>{d.approved_leads}</div>,
    },
  ];
  React.useState(() => {
    const apilink = api.VENDOR_URL + list_of_sow_oa;
    axios
      .get(apilink, { params: { sow_id: id } })
      .then((res) => {
        setOaList(res.data.oa_list);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <React.Fragment>
        {/* <ToastContainer /> */}
        <div className="d-flex justify-content-between align-items-center w-80 px-4 mb-3">
          <h5 className="card-title mb-0">OA Table details</h5>
          <div className="flex-shrink-0">
            <button
              className="btn btn-danger add-btn"
              onClick={() => setOpen(true)}
            >
              <i className="ri-add-line align-bottom"></i> Assign OA
            </button>
          </div>
        </div>
        <DataTable
          data={data}
          columns={columns}
          pagination
          onRowClicked={callClickFunction}
        />

        <Modal
          className="modal-lg"
          id="signupModals"
          tabIndex="-1"
          isOpen={open}
          toggle={() => {
            setOpen(false);
            setUserSows([]);
          }}
          centered={true}
        >
          <ModalHeader
            className="p-3"
            toggle={() => {
              setOpen(false);
              setUserSows([]);
            }}
          >
            ASSIGN OA
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
                  // onClick={handleClickOAAssign}
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
                            userSows[0]?.id
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
                      onClick={() => handleAssign(userSows[0]?.id)}
                    >
                      Assign
                    </button>
                  </Col>
                </Row>
              </Card>
            )}
          </ModalBody>
        </Modal>
        {/* modal data */}
        <Modal
          size="xl"
          isOpen={modal_fullscreen1}
          toggle={() => {
            tog_fullscreen1();
          }}
          className="modal-fullscreen"
          id="fullscreeexampleModal"
        >
          <div style={{ padding: "20px", overflowX: "scroll" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h2>OA Wise Stats</h2>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  tog_fullscreen1();
                }}
                className="fs-20"
              >
                {" "}
                X
              </div>
            </div>

            <TaskerChart token={graphToken} />
          </div>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default OaAssign;
