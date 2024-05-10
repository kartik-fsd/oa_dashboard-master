import React, { createContext } from "react";
import { Container, Spinner } from "reactstrap";
import axios from "axios";

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
import { QcMembersTable } from "./QcMembersTable";
import {
  addQcagent,
  serach_fse,
  getQcagents,
  getallqcagents,
} from "../../assets/utils/farmingBase";
import { extract_token } from "../../assets/utils/common";
import { api, farming } from "../../globalConfig";
import { toast } from "react-toastify";
import { QcFilterModal, QcRangeModal } from "./QcMemberModal";
import moment from "moment";

export const GetQcContext = createContext();
export const QcMembers = () => {
  document.title = "OnX | Quality";

  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [switchData, setSwitchData] = React.useState(false);
  const [searchData, setSearchData] = React.useState({});
  const [addQc, setAddQc] = React.useState({
    full_name: searchData.error === false ? searchData.full_name : "",
    email_id: searchData.error === false ? searchData.email_id : "",
    number: searchData.error === false ? searchData.number : "",
    user_type: searchData.error === false ? searchData.user_type : "",
  });
  const [number, setNumber] = React.useState("");
  const [searchfse, setSearchFse] = React.useState("");
  const [modalRange, setModalRange] = React.useState(false);
  const [qcAgents, setQcAgents] = React.useState([]);
  const [startDateRange, setStartDateRange] = React.useState("");
  const [endDateRange, setEndDateRange] = React.useState("");
  const [getqc, setGetQc] = React.useState(false);
  // const [getAllqc, setGetAllQc] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [qcAgentTaskers, setQcAgentTaskers] = React.useState([]);
  const [qcStatus, setQcStatus] = React.useState("all");
  console.log(searchData, "add");
  const successnotify = () =>
    toast("Added QC Agent successfully ", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-success text-white",
    });

  const warningnotify = () =>
    toast("Data already exits", {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      className: "bg-warning text-white",
    });

  const handleChangeTaskers = (e) => {
    console.log(e, "takerT");
  };

  const handleAddQcChange = (e) => {
    const { name, value } = e.target;
    setAddQc({ ...addQc, [name]: value });
    console.log(addQc, "add2");
  };
  const handleQcSubmit = (e) => {
    e.preventDefault();
    const link = farming.farming_URL + addQcagent;
    const body = addQc;
    console.log(body, "checkbody");
    let keys = Object.keys(body);
    for (let i = 0; i < keys.length; i++) {
      if (body[keys[i]] == "") {
        delete body[keys[i]];
      }
    }

    let keys2 = Object.keys(searchData);
    console.log(keys2, "key");
    for (let j = 0; j < keys2.length; j++) {
      if (!body[keys2[j]]) {
        body[keys2[j]] = searchData[keys2[j]];
      }
    }
    delete body["error"];
    console.log(body, "body");

    axios
      .post(link, body)
      .then((res) => {
        if (res?.data?.error) {
          warningnotify();
        } else {
          successnotify();
          closeQcModal();

          setTimeout(() => {
            getallqc();
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchFse(e.target.value);
  };

  const handleRangeModal = () => {
    setModalRange(!modalRange);
  };

  const handleFseSearch = () => {
    const link = farming.farming_URL + serach_fse;
    const body = {
      [number]: searchfse,
    };

    axios
      .post(link, body)
      .then((res) => {
        console.log(res?.data, "testing");
        setSearchData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  const closeQcModal = () => {
    setOpen(false);
    setAddQc({});
    setSearchData({});
  };

  let today = new Date();
  const startDate = moment(today).format("YYYY-MM-DD");

  const getQcAgents = () => {
    const link = farming.farming_URL + getQcagents;
    const body = {
      start_date: startDateRange === "" ? startDate : startDateRange,
      end_date: endDateRange === "" ? startDate : endDateRange,
    };
    setLoading(true);

    axios
      .post(link, body)
      .then((res) => {
        setQcAgents(res?.data?.qcagents);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErr(true);
      });
  };

  React.useEffect(() => {
    getQcAgents();
  }, [getqc]);

  const getallqc = () => {
    const link = farming.farming_URL + getallqcagents;
    const body = { status: qcStatus };

    axios
      .post(link, body)
      .then((res) => setQcAgentTaskers(res?.data?.qcagents))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getallqc();
  }, [getqc]);

  const handleDateRange = () => {
    getQcAgents();
  };

  const handleFilterAllQc = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <GetQcContext.Provider value={{ setGetQc, getqc }}>
      <>
        <div className="mt-4 ">
          <React.Fragment>
            <div className="d-flex justify-content-between align-items-center w-80 px-4">
              {/* <h5 className="card-title mb-0"></h5> */}
            </div>

            <Card>
              <CardHeader style={{ paddingBottom: "10px" }}>
                <div style={{ display: "flex", gap: "18px" }}>
                  <div
                    className="d-flex flex-column"
                    style={{ width: "160px" }}
                  >
                    <div className="d-flex gap-2 align-items-center">
                      <div
                        className="form-check form-switch form-switch-primary"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Input
                          className="form-check-input mt-2"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          style={{ width: "30px" }}
                          onChange={(e) => {
                            setSwitchData(e.target.checked);
                            handleChangeTaskers(e.target.checked);
                          }}
                        />
                      </div>
                      <span className=" fs-6 fw-500 mt-2">
                        {switchData ? (
                          <strong>All Networks</strong>
                        ) : (
                          <strong>Worked Networks</strong>
                        )}
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2"></div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <div className="d-flex align-items-center gap-1 fs-12">
                      <span
                        className="rounded-circle"
                        style={{
                          background: "#00C851",
                          width: "10px",
                          height: "10px",
                        }}
                      ></span>
                      <span>Active</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 fs-12">
                      <span
                        className="rounded-circle"
                        style={{
                          background: "#FF4444",
                          width: "10px",
                          height: "10px",
                        }}
                      ></span>
                      <span>Inactive</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex-shrink-0"
                  style={{
                    float: "right",
                    marginRight: "220px",
                    marginTop: "-40px",
                  }}
                >
                  {switchData ? (
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
                      onClick={() => {
                        handleFilterAllQc();
                      }}
                    >
                      <i
                        className=" ri-filter-line"
                        style={{
                          // display:'inline-block',
                          marginRight: "4px",
                          marginTop: "10px",
                          fontSize: "13px",
                        }}
                      ></i>
                      Filter
                    </button>
                  ) : (
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
                      onClick={() => {
                        handleRangeModal();
                      }}
                    >
                      <i
                        className=" ri-filter-line"
                        style={{
                          // display:'inline-block',
                          marginRight: "4px",
                          marginTop: "10px",
                          fontSize: "13px",
                        }}
                      ></i>
                      Filter
                    </button>
                  )}
                  <button
                    className="btn add-btn"
                    style={{ backgroundColor: "#ec5c24" }}
                    onClick={() => setOpen(true)}
                  >
                    <i className="ri-add-line align-bottom"></i> ADD
                  </button>
                </div>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <div
                    style={{
                      width: "80vw",
                      height: "80vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner style={{ backgroundColor: "#ec5c24" }}>
                      Loading
                    </Spinner>
                  </div>
                ) : err ? (
                  <div
                    style={{
                      width: "80vw",
                      height: "80vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "orangered",
                    }}
                  >
                    oops something went wrong...!
                  </div>
                ) : (
                  <>
                    {switchData ? (
                      <QcMembersTable
                        data={qcAgentTaskers}
                        switchData={switchData}
                        getallqc={getallqc}
                        className="p-2"
                      />
                    ) : (
                      <QcMembersTable
                        data={qcAgents}
                        switchData={switchData}
                        getallqc={getallqc}
                        className="p-2"
                      />
                    )}
                  </>
                )}
              </CardBody>
            </Card>
            <Modal
              className="modal-lg"
              id="signupModals"
              tabIndex="-1"
              isOpen={open}
              toggle={() => {
                closeQcModal();
              }}
              centered
            >
              <ModalHeader
                className="p-3"
                toggle={() => {
                  closeQcModal();
                }}
              >
                Add QC Agents
              </ModalHeader>

              <ModalBody>
                <Row>
                  <Col xs={"6"}>
                    <div>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        onChange={handleNumber}
                      >
                        <option selected>select</option>
                        <option value="mobile_number">mobile number</option>
                        <option value="user_id">P ID</option>
                      </select>
                    </div>
                  </Col>
                  <Col xs={"6"}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Recipient's username with two button addons"
                        placeholder="search"
                        onChange={handleSearch}
                      />

                      <button
                        type="button"
                        className="btn waves-effect waves-light"
                        style={{ backgroundColor: "#ec5c24" }}
                        onClick={handleFseSearch}
                        disabled={
                          searchfse === "" || number === "" ? true : false
                        }
                      >
                        <i className=" ri-search-line"></i>
                      </button>
                    </div>
                  </Col>
                </Row>
                <form onSubmit={handleQcSubmit} className="mt-5">
                  <Row>
                    <Col xs={"6"} className="mb-3">
                      <div>
                        <label htmlFor="labelInput" className="form-label">
                          Name
                        </label>
                        <input
                          name="full_name"
                          type="text"
                          className="form-control"
                          id="labelInput"
                          required
                          defaultValue={searchData.full_name}
                          onChange={handleAddQcChange}
                        />
                      </div>
                    </Col>

                    <Col xs={"6"} className="mb-3">
                      <div>
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          name="email_id"
                          defaultValue={searchData.email_id}
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          onChange={handleAddQcChange}
                        />
                      </div>
                    </Col>
                    <Col xs={"6"} className="mb-3">
                      <div>
                        <label htmlFor="number" className="form-label">
                          Mobile Number
                        </label>
                        <input
                          name="number"
                          defaultValue={searchData.mobile_number}
                          type="number"
                          className="form-control"
                          id="number"
                          required
                          min={10}
                          onChange={handleAddQcChange}
                          onInput={(e) =>
                            (e.target.value = Math.max(
                              0,
                              parseInt(e.target.value).toString().slice(0, 10)
                            ))
                          }
                        />
                      </div>
                    </Col>
                    <Col xs={"6"} className="mb-3">
                      <div>
                        <label htmlFor="number" className="form-label">
                          Type
                        </label>
                        <select
                          name="type"
                          className="form-select mb-3"
                          aria-label="Default select example"
                          required
                          onChange={handleAddQcChange}
                        >
                          <option selected>select type</option>
                          {/* <option value="agency">manager</option> */}
                          <option value="qc">qc agent</option>
                          <option value="viewer">viewer</option>
                        </select>
                      </div>
                    </Col>
                    <Col xs={"12"} className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn waves-effect waves-light"
                        style={{ backgroundColor: "#ec5c24" }}
                        disabled={
                          Object.values(addQc).includes("qc") ||
                          Object.values(addQc).includes("viewer")
                            ? false
                            : true
                        }
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                </form>
              </ModalBody>
            </Modal>
          </React.Fragment>

          <QcRangeModal
            modalRange={modalRange}
            setModalRange={setModalRange}
            startDateRange={startDateRange}
            endDateRange={endDateRange}
            setStartDateRange={setStartDateRange}
            setEndDateRange={setEndDateRange}
            handleDateRange={handleDateRange}
          />
          <QcFilterModal
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            qcStatus={qcStatus}
            setQcStatus={setQcStatus}
            getallqc={getallqc}
          />
        </div>
      </>
    </GetQcContext.Provider>
  );
};

// export default QcMembers;

// onClick={successnotify}
