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
// import { farming } from "../../../globalConfig";
// import "./dailyMod.css";

const MpDownload = ({ open, setOpen, switchData }) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [type, setType] = React.useState("");

  const token = sessionStorage.getItem("token");
  const month = moment(startDate).format("MM");
  const year = moment(startDate).format("YYYY");

  console.log(switchData, "type");

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input value={value} onClick={onClick} className="example-custom-input" />
  ));

  console.log("hii");

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
            {/* <Col xs="12">
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
            </Col> */}
            <Col xs="12">
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
          </Row>
        </ModalBody>
        <ModalFooter>
          <a
            // href={`${farming.farming_URL}/supplytoken/download/projectionof${type}?month=${month}&year=${year}&token=${token}`}
            download
          >
            <button
              type="button"
              className="btn waves-effect waves-light"
              style={{ backgroundColor: "#ec5c24" }}
              //   disabled={type == "" ? true : false}
            >
              <i className=" ri-download-2-line align-middle me-1"></i>
              Download
            </button>
          </a>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MpDownload;
