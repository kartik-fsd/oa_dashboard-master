import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
  get_sow_issue,
  sow_training,
  sow_training_list,
} from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";
import DataTables from "./DataTables/DataTables";
import Flatpickr from "react-flatpickr";

function Training({ type }) {
  const { id } = useParams();
  const [check, setCheck] = React.useState(true);
  const [tableData, setTableData] = React.useState([]);
  const pathname = api.OA_URL + sow_training_list + `?sow_id=${id}`;
  const date = new Date();
  const timeData = moment(date).format("HH:mm");
  const dataFormat = moment(date).format("YYYY-MM-DD");
  const [disableonlineTraining, setDisableonlineTraining] =
    React.useState(false);

  useEffect(() => {
    axios.get(pathname).then((res) => {
      setTableData(res.data.data);

      // const checkdisabled = res.data.data.map((item) => item.training_status);
      let checkdisabled = res.data.data
        .filter(
          (item) =>
            item.start_test.split(" ")[0] < moment(date).format().split("T")[0]
        )
        .map((item) => item.training_status);

      let otData = checkdisabled.includes("ongoing");
      setDisableonlineTraining(otData);
    });
  }, [id, check, disableonlineTraining]);

  const [modal_signUpModals, setmodal_signUpModals] = useState(false);
  function tog_signUpModals() {
    setmodal_signUpModals(!modal_signUpModals);
  }
  const initState = {
    title: "",
    training_link: "",
    date: "",
    time: "",
  };
  const [formData, setFormData] = useState(initState);
  const handleChange = (e) => {
    if (e.target == undefined) {
      const name = "date";
      const value = moment(e[0]).format("YYYY-MM-DD");
      setFormData({ ...formData, [name]: value });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const timeArray = [
    ["11:00", "11:30"],
    ["11:00", "12:00"],
    ["11:30", "12:00"],
    ["12:00", "12:30"],
    ["12:00", "13:00"],
    ["12:30", "13:00"],
    ["13:00", "13:30"],
    ["13:00", "14:00"],
    ["13:30", "14:00"],
    ["14:00", "14:30"],
    ["14:00", "15:00"],
    ["14:30", "15:00"],
    ["15:00", "15:30"],
    ["15:00", "16:00"],
    ["15:30", "16:00"],
    ["16:00", "16:30"],
    ["16:00", "17:00"],
    ["16:30", "17:00"],
    ["17:00", "17:30"],
    ["17:00", "18:00"],
    ["17:30", "18:00"],
    ["18:00", "18:30"],
    ["18:00", "19:00"],
    ["18:30", "19:00"],
    ["19:00", "19:30"],
    ["19:00", "20:00"],
    ["19:30", "20:00"],
  ];

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(":");
    const period = +hour < 12 ? "AM" : "PM";
    const adjustedHour = +hour % 12 || 12; // Convert "00" to "12" for AM
    return `${adjustedHour}:${minute} ${period}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, training_link, date, time, training_type } = formData;
    const RealTime = timeArray[time - 1];
    const postData = {
      sow_id: id,
      title,
      training_link,
      date,
      training_type,
      start: date + " " + RealTime[0],
      end: date + " " + RealTime[1],
    };
    const pathName = api.VENDOR_URL + sow_training;
    axios
      .post(pathName, postData)
      .then((res) => {
        if (res.data.error) {
          toast(res.data.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("Successfully added", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setCheck(!check);
        }

        setmodal_signUpModals(false);
      })
      .catch((err) => {
        console.log(err.response);
        setmodal_signUpModals(false);
      });
  };

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex align-items-center w-80 px-4 mb-3">
          <h5 className="card-title mb-0 flex-grow-1"></h5>
          <div className="flex-shrink-0">
            {type == "oa" || type == "spoc" ? (
              <button
                className="btn btn-danger add-btn"
                onClick={() => tog_signUpModals()}
                disabled={disableonlineTraining}
              >
                <i className="ri-add-line align-bottom"></i> Create Training
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <>
          <DataTables data={tableData} check={check} setCheck={setCheck} />
        </>
      </Row>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={modal_signUpModals}
        toggle={() => {
          tog_signUpModals();
        }}
        centered={true}
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            tog_signUpModals();
          }}
        >
          CREATE TRAINING
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Row className="align-items-center g-3">
                <Col lg={12}>
                  <Label>Title</Label>
                  <select
                    className="form-select"
                    aria-label=".form-select-sm example"
                    name="title"
                    onChange={handleChange}
                  >
                    <option>Select Language</option>
                    <option value="english">English</option>
                    <option value="हिन्दी">Hindi(हिन्दी)</option>
                    <option value="ಕನ್ನಡ">Kannada(ಕನ್ನಡ)</option>
                    <option value="தமிழ்">Tamil(தமிழ்)</option>
                    <option value="తెలుగు">Telugu(తెలుగు)</option>
                  </select>
                </Col>
              </Row>
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                id="emailInput"
                placeholder="Enter your Link"
                name="training_link"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputdate" className="form-label">
                Date
              </label>
              <Flatpickr
                className="form-control"
                id="exampleInputdate"
                options={{
                  minDate: "today",
                  maxDate: new Date().fp_incr(2),
                }}
                name="date"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <Row className="align-items-center g-3">
                <Col lg={12}>
                  <Label>Time Slot</Label>
                  <select
                    className="form-select"
                    aria-label=".form-select-sm example"
                    name="time"
                    onChange={handleChange}
                  >
                    <option>Select Time Slots</option>
                    {timeArray.map((slot, index) => {
                      const isDisabled =
                        timeData > slot[0] && formData?.date <= dataFormat
                          ? true
                          : false;
                      return (
                        <option
                          key={index}
                          value={index + 1}
                          disabled={isDisabled}
                          style={{
                            backgroundColor: isDisabled ? "#f1f1f1" : "",
                          }}
                        >
                          {convertTo12HourFormat(slot[0])} -{" "}
                          {convertTo12HourFormat(slot[1])}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
            </div>
            <Row className="align-items-center g-3 mb-3">
              <Col lg={12}>
                <Label>Training Type</Label>
                <select
                  className="form-select"
                  aria-label=".form-select-sm example"
                  name="training_type"
                  onChange={handleChange}
                >
                  <option>Select Type</option>
                  <option value="grouped">Grouped</option>
                  <option value="non_grouped">Non Grouped</option>
                </select>
              </Col>
            </Row>
            <div className="text-end">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#ec5c24",
                  color: "whitesmoke",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#dd4319")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#ec5c24")
                }
              >
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default Training;
