import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import QcProjectTable from "./QcProjectTable";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { api, farming } from "../../globalConfig";
import { extract_token } from "../../assets/utils/common";
import LeadApproved from "./LeadApproved";
import axios from "axios";

const QcProjects = () => {
  document.title = "Taskmo | Quality";

  const [open, setOpen] = React.useState(null);
  const [leadstatus, setLeadStatus] = React.useState("enable");
  const [startdate, setStartDate] = React.useState(undefined);
  const [enddate, setEndDate] = React.useState(undefined);
  const [apply, setApply] = React.useState(false);
  const [leadApprovemod, setLeadApprovemod] = React.useState(false);
  const [userNumber, setUserNumber] = React.useState(null);
  console.log(leadstatus, startdate, enddate, 123);

  const handleFilterModal = () => {
    setOpen(!open);
    setStartDate("");
    setEndDate("");
  };

  const handleQcChange = (e) => {
    setLeadStatus(e.target.value);
  };

  const handleDate = (value) => {
    // console.log(moment(value[0]).format('YYYY-MM-DD'),'date')
    // console.log(moment(value[1]).format('YYYY-MM-DD'),'date')
    console.log(value, "startdatestart", value[0], value[1]);
    setStartDate(moment(value[0]).format("YYYY-MM-DD"));
    setEndDate(moment(value[1]).format("YYYY-MM-DD"));
  };

  const handleApply = () => {
    setApply(!apply);
    setOpen(!open);
  };

  React.useEffect(() => {
    const pathName = api.VENDOR_URL + extract_token;

    axios
      .get(pathName)
      .then((res) => {
        setUserNumber(res.data.mobile_number);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="page-content">
        {/* <ToastContainer /> */}

        <Container fluid>
          <Card>
            <CardHeader
              className="d-flex justify-content-between"
              style={{ marginTop: "10px", padding: "13px" }}
            >
              <h5 className="card-title mb-0 fs-20">QC Projects</h5>
              <div>
                {userNumber === "8310918967" && (
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#ec5c24",
                      color: "whitesmoke",
                      transition: "background-color 0.3s ease",
                      marginRight: "10px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dd4319")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ec5c24")
                    }
                    onClick={() => {
                      setLeadApprovemod(!leadApprovemod);
                    }}
                  >
                    <i
                      className="  ri-checkbox-circle-line
                    "
                      style={{
                        // display:'inline-block',
                        marginRight: "4px",
                        marginTop: "1px",
                        fontSize: "13px",
                      }}
                    ></i>
                    LA
                  </button>
                )}
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#ec5c24",
                    color: "whitesmoke",
                    transition: "background-color 0.3s ease",
                    marginRight: "220px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#dd4319")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ec5c24")
                  }
                  onClick={() => {
                    handleFilterModal();
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
              </div>
            </CardHeader>
            <CardBody>
              <QcProjectTable
                leadstatus={leadstatus}
                startdate={startdate}
                enddate={enddate}
                apply={apply}
              />
            </CardBody>
          </Card>
        </Container>
        <Modal
          id="signupModals"
          tabIndex="-1"
          isOpen={open}
          toggle={() => {
            setOpen();
          }}
          centered={true}
        >
          <ModalHeader
            toggle={() => {
              setOpen();
            }}
          >
            <h5 style={{ color: "#3f5289 " }}>Select Date</h5>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <div>
                  <Label className="form-label mb-1">Range</Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                    }}
                    onChange={handleDate}
                  />
                </div>
              </Col>
              <Col xs="6">
                <div>
                  <Label className="form-label mb-1">Lead Status</Label>

                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    onChange={(e) => handleQcChange(e)}
                  >
                    {/* <option selected>Choose...</option> */}
                    <option selected value="enable">
                      enable
                    </option>
                    <option value="disable">disable</option>
                    <option value="closed">closed</option>
                    <option value="none">none</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="mt-3 d-flex justify-content-end">
                <button
                  className="btn"
                  style={{ backgroundColor: "#ec5c24" }}
                  onClick={() => {
                    handleApply();
                  }}
                  disabled={enddate === "" ? true : false}
                >
                  Apply
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <LeadApproved
          leadApprovemod={leadApprovemod}
          setLeadApprovemod={setLeadApprovemod}
        />
      </div>
    </>
  );
};

export default QcProjects;
