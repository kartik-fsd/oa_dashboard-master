import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
  Spinner,
} from "reactstrap";
import QcManagerTable from "./QcManagerTable";
import { getManagers } from "../../assets/utils/farmingBase";
import { api, farming } from "../../globalConfig";
import moment from "moment";
import axios from "axios";
import { QcFilterModal, QcRangeModal } from "../QcMembers/QcMemberModal";

const QcManagers = () => {
  const [startDateRange, setStartDateRange] = React.useState("");
  const [endDateRange, setEndDateRange] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [managers, setManagers] = React.useState([]);
  const [modalRange, setModalRange] = React.useState(false);

  let today = new Date();
  const startDate = moment(today).format("YYYY-MM-DD");

  const getQcAgents = () => {
    const link = farming.farming_URL + getManagers;
    const body = {
      start_date: startDateRange === "" ? startDate : startDateRange,
      end_date: endDateRange === "" ? startDate : endDateRange,
    };
    setLoading(true);

    axios
      .post(link, body)
      .then((res) => {
        setManagers(res?.data?.qcagents);
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
  }, []);

  const handleDateRange = () => {
    getQcAgents();
  };

  const handleRangeModal = () => {
    setModalRange(!modalRange);
  };
  return (
    <>
      <div className="mt-4 ">
        <Card>
          <CardHeader style={{ padding: "10px" }}>
            <div style={{ display: "flex", gap: "18px" }}>
              <div
                className="d-flex flex-column"
                style={{ width: "160px", visibility: "hidden" }}
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
                        "";
                      }}
                    />
                  </div>
                  <span className=" fs-6 fw-500 mt-2">
                    <strong>All Taskers</strong>
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2"></div>
              </div>
              <div className="d-flex flex-column" style={{ width: "160px" }}>
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
              <button
                className="btn btn-primary"
                style={{ marginRight: "8px" }}
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
            </div>
          </CardHeader>
          <CardBody>
            <QcManagerTable data={managers} />
          </CardBody>
        </Card>

        <QcRangeModal
          modalRange={modalRange}
          setModalRange={setModalRange}
          startDateRange={startDateRange}
          endDateRange={endDateRange}
          setStartDateRange={setStartDateRange}
          setEndDateRange={setEndDateRange}
          handleDateRange={handleDateRange}
        />
      </div>
    </>
  );
};

export default QcManagers;
