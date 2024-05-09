import moment from "moment/moment";
import React from "react";
import ReactDatePicker from "react-datepicker";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { farming } from "../../../globalConfig";
import "./dailyMod.css";
import { useLocation } from "react-router-dom";

const DailyDowloadMod = ({ open, setOpen, switchData }) => {
  const location = useLocation();
  const [startDate, setStartDate] = React.useState(new Date());
  const [type, setType] = React.useState("");

  console.log(location.pathname, "testinlocation", type);

  const token = sessionStorage.getItem("token");
  const month = moment(startDate).format("MM");
  const year = moment(startDate).format("YYYY");

  console.log(switchData, "type");

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input value={value} onClick={onClick} className="example-custom-input" />
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="md"
        toggle={() => {
          setOpen(false);
          setType("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setType("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Download</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            {location.pathname == "/finance/project/active" ? (
              ""
            ) : (
              <Col xs="12">
                <div>
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option selected disabled>
                      select
                    </option>
                    <option value="month">Week wise</option>
                    <option value="week">Day wise</option>
                  </select>
                </div>
              </Col>
            )}
            <Col
              xs={location.pathname == "/finance/project/active" ? "8" : "12"}
            >
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM-yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showFourColumnMonthYearPicker
                customInput={<ExampleCustomInput />}
              />
            </Col>

            {location.pathname == "/finance/project/active" ? (
              <Col xs="4">
                <a
                  href={
                    location.pathname == "/finance/project/active"
                      ? `${farming.farming_URL}/invoatoken/download/invActiveproj?month=${month}&year=${year}&token=${token}`
                      : `${farming.farming_URL}/supplytoken/download/projectionof${type}?month=${month}&year=${year}&token=${token}`
                  }
                  download
                >
                  <button
                    type="button"
                    className="btn waves-effect waves-light"
                    style={{ backgroundColor: "#ec5c24" }}
                    disabled={
                      location.pathname == "/finance/project/active"
                        ? false
                        : type == ""
                        ? true
                        : false
                    }
                  >
                    <i className=" ri-download-2-line align-middle me-1"></i>
                    Download
                  </button>
                </a>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </ModalBody>
        <ModalFooter>
          {location.pathname != "/finance/project/active" &&
          location.pathname != "/founders/monthly-summary" ? (
            <a
              href={
                location.pathname == "/finance/project/active"
                  ? `${farming.farming_URL}/invoatoken/download/invActiveproj?month=${month}&year=${year}&token=${token}`
                  : `${farming.farming_URL}/supplytoken/download/projectionof${type}?month=${month}&year=${year}&token=${token}`
              }
              download
            >
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={
                  location.pathname == "/finance/project/active"
                    ? false
                    : type == ""
                    ? true
                    : false
                }
              >
                <i className=" ri-download-2-line align-middle me-1"></i>
                Download
              </button>
            </a>
          ) : location.pathname == "/founders/monthly-summary" ? (
            <a
              href={`${farming.farming_URL}/supplytoken/download/projectionof${type}1?month=${month}&year=${year}&token=${token}`}
              download
            >
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={
                  location.pathname == "/finance/project/active"
                    ? false
                    : type == ""
                    ? true
                    : false
                }
              >
                <i className=" ri-download-2-line align-middle me-1"></i>
                Download
              </button>
            </a>
          ) : (
            ""
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DailyDowloadMod;
