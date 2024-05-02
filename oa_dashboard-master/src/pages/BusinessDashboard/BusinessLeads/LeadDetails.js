import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../../components/common/BreadCrumb";
import StepperLeads from "../StepperLeads";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Flatpickr from "react-flatpickr";
import "./lead.css";
import { v4 as uuid } from "uuid";
import moment from "moment";

const LeadDetails = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState({});
  const [mileStoneData, setMileStoneData] = React.useState([]);

  let [testObj, setTestObj] = React.useState({
    month: new Date(),
    type_value: "",
  });

  console.log(selectedOption, "data133");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const editorConfig = {
    minHeight: "12px",
  };

  const handleUpdate = () => {
    if (selectedOption !== "") data.difficulty_level = selectedOption;
  };

  const handleClickAdd = () => {
    let obj = { ...testObj, id: uuid() };
    if (!Object.keys(testObj).includes("month")) {
      Object.month = new Date();
    }
    console.log(obj, "finalobj");

    setMileStoneData([...mileStoneData, obj]);
    testObj.type_value = "";
    setTestObj({});
  };

  return (
    <div>
      {/* <Card>
        <Row>
          <Col xs="6">
            <CardBody className="pb-0 px-4">
              <Row className="mb-3">
                <div className="col-md">
                  <Row className="align-items-center g-3">
                    <div className="col-md-auto">
                      <div className="avatar-md">
                        <div className="avatar-title bg-white rounded-circle">
                          {
                            <img
                              src={"/user-dummy-img.jpg"}
                              alt=""
                              className="avatar-md"
                              style={{ borderRadius: "50%" }}
                            />
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-md">
                      <div>
                        <h4 className="fw-bold">
                          Project title
                          <span>&nbsp;-&nbsp;{1234}</span>
                        </h4>
                        <div
                          className="hstack  flex-wrap mt-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ width: "200px" }}>
                            Source of Lead :
                            <span
                              className="fw-medium text-dark"
                              style={{ wordBreak: "break-all" }}
                            >
                              {12348564367}
                            </span>
                          </div>
                          <div className="vr" style={{ height: "16px" }}></div>
                          <div style={{ width: "200px" }}>
                            <div>
                              Created by :&nbsp;
                              <span className="fw-medium  text-dark">1234</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="hstack  flex-wrap mt-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ width: "200px" }}>
                            Name :
                            <span
                              className="fw-medium text-dark"
                              style={{ wordBreak: "break-all" }}
                            >
                              testing vgfygf
                            </span>
                          </div>
                          <div className="vr" style={{ height: "16px" }}></div>
                          <div>
                            <div style={{ width: "200px" }}>
                              Phone :&nbsp;
                              <span className="fw-medium  text-dark">
                                1234344
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="hstack  flex-wrap mt-2"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div style={{ width: "200px" }}>
                            Email :
                            <span className="fw-medium text-dark">
                              examp@gmail.com
                            </span>
                          </div>
                          <div className="vr" style={{ height: "16px" }}></div>
                          <div>
                            <div style={{ width: "200px" }}>
                              Job role :&nbsp;
                              <span className="fw-medium  text-dark">
                                Assosiate director
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </Row>
            </CardBody>
          </Col>
          <Col
            xs="6"
            className="d-flex align-items-center justify-content-center"
          >
            <div
              className="d-flex flex-column"
              style={{
                border: "1px solid #e4e9f6",
                padding: "16px",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "45px",
                  fontSize: "9px",
                  marginBottom: "8px",
                }}
              >
                <div className="d-flex flex-column align-items-center gap-1">
                  <span className="ms-4">Nurturing</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span>Maturing</span>
                  <span style={{ fontSize: "8px" }}></span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span>Hot Lead</span>
                  <span style={{ fontSize: "8px" }}></span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span>Project Initiation</span>
                  <span style={{ fontSize: "8px" }}></span>
                </div>
              </div>
              <div style={{ alignSelf: "center" }}>{<StepperLeads />}</div>
              <div style={{ display: "flex", gap: "45px", fontSize: "9px" }}>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span className="ms-3">{"12-12-2022"}</span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span>{"12-12-2022"}</span>
                  <span style={{ fontSize: "8px" }}></span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span>{"12-12-2022"}</span>
                  <span style={{ fontSize: "8px" }}></span>
                </div>
                <div className="d-flex flex-column align-items-center gap-1">
                  <span>{"12-12-2022"}</span>
                  <span style={{ fontSize: "8px" }}></span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card> */}
      <Card>
        <CardHeader>
          <h5 style={{ color: "#b83016" }}>Lead Nurturing</h5>
        </CardHeader>
        <CardBody>
          <Col xs="12" className="mb-4">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              What are we supposed to do?
            </h5>
            <div id="ck">
              <CKEditor
                editor={ClassicEditor}
                // data={single.qc_script}

                onChange={(event, editor) => {
                  data.suppose = editor.getData();
                  setData({ ...data });
                }}
              />
            </div>
          </Col>
          <Col xs="12" className="mb-4">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              What are the requirement?
            </h5>
            <div id="ck">
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  data.requirment = editor.getData();
                  setData({ ...data });
                }}
              />
            </div>
          </Col>
          <Col xs="12" className="mb-4">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              What are the qualifying criteria?
            </h5>
            <div id="ck">
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  data.qualifying = editor.getData();
                  setData({ ...data });
                }}
              />
            </div>
          </Col>
          <Col xs="12" className="mb-4">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              What are the rejection criteria?
            </h5>
            <div id="ck">
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  data.rejection = editor.getData();
                  setData({ ...data });
                }}
              />
            </div>
          </Col>
          <Col xs="12" className="mb-4">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              Market population?
            </h5>
            <div id="ck">
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  data.population = editor.getData();
                  setData({ ...data });
                }}
              />
            </div>
            <hr className="mt-5"></hr>
          </Col>
          <Col xs="12">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              Difficulty level?
            </h5>
            <div className="d-flex gap-4 align-items-center">
              <label className="m-0 d-flex align-items-center">
                <input
                  type="radio"
                  name="option"
                  value="Low"
                  checked={selectedOption === "Low"}
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
                  checked={selectedOption === "Medium"}
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
                  checked={selectedOption === "High"}
                  onChange={handleOptionChange}
                />
                <span style={{ marginLeft: "8px" }}>High</span>
              </label>
            </div>
            <hr className="mt-4"></hr>
          </Col>
          <div>
            <Col xs="12">
              <div className="d-flex justify-content-between">
                <h5 className="mb-4 " style={{ color: "#b83016" }}>
                  Deliverables
                </h5>
                <div>
                  <button
                    disabled={
                      Object.keys(testObj).includes("type") &&
                      testObj.type !== "" &&
                      Object.keys(testObj).includes("type_value") &&
                      testObj.type_value !== "" &&
                      Object.keys(testObj).includes("quantity") &&
                      testObj.quantity !== ""
                        ? false
                        : true
                    }
                    type="button"
                    className="btn  waves-effect waves-light btn-sm"
                    style={{
                      backgroundColor: "#ec5c24",
                    }}
                    onClick={handleClickAdd}
                  >
                    Add
                  </button>
                </div>
              </div>

              <Row>
                <Col xs="4">
                  <Label>Type</Label>
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    value={
                      testObj.type == undefined ? "Select Type" : testObj.type
                    }
                    onChange={(e) => {
                      if (
                        e.target.value == "city"
                          ? delete testObj.language
                          : delete testObj.city
                      )
                        setTestObj({
                          ...testObj,
                          type: e.target.value,
                          type_value: "",
                        });
                    }}
                  >
                    <option selected value="selectype">
                      Select Type
                    </option>
                    <option value="city">City</option>
                    <option value="language">Language</option>
                  </select>
                </Col>
                <Col xs="4">
                  <Label>
                    {testObj.type == "city"
                      ? "City"
                      : testObj.type == "language"
                      ? "Language"
                      : "select Type"}
                  </Label>
                  <Input
                    value={testObj.type_value}
                    onChange={(e) => {
                      testObj.type == "city"
                        ? delete testObj.language
                        : delete testObj.city;

                      setTestObj({
                        ...testObj,
                        type_value: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col xs="4">
                  <Label>Month Year</Label>
                  <Flatpickr
                    onChange={(e) => {
                      setTestObj({ ...testObj, month: e[0] });
                    }}
                    value={
                      testObj.month == undefined ? new Date() : testObj.month
                    }
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    name="end_date"
                    id="podate2"
                    //   onChange={onEndDateChange}
                  />
                </Col>
                <Col xs="4" className="mt-2">
                  <div>
                    <label htmlFor="basiInput" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="basiInput"
                      placeholder="0"
                      // value={
                      //   testObj.quantity == undefined ? 0 : testObj.quantity
                      // }
                      onChange={(e) => {
                        setTestObj({ ...testObj, quantity: e.target.value });
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <hr className="mt-5"></hr>
            </Col>
          </div>

          <Col xs="12" className="mt-2">
            <h5 className="mb-4 " style={{ color: "#b83016" }}>
              Deliverables
            </h5>
            <div>
              {mileStoneData?.length == 0 ? (
                <div style={{}}>No TableData Found</div>
              ) : (
                <table className="table caption-top table-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">City/Language</th>
                      <th scope="col">Month-Year</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Delete</th>
                      {/* <th scope="col">Payment</th> */}
                    </tr>
                  </thead>
                  {/* <tbody>
                  {data.milestones?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.type_value}</td>
                        <td>{moment(item.month).format("YYYY-MM-DD")}</td>
                        <td>{item.quantity}</td>
                        <td>delete icon</td>
                      </tr>
                    );
                  })}
                </tbody> */}

                  <tbody>
                    {mileStoneData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>{item.type_value}</td>
                          <td>{moment(item.month).format("YYYY-MM-DD")}</td>
                          <td>{item.quantity}</td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let ot = mileStoneData.filter(
                                (it) => it.id !== item.id
                              );
                              setMileStoneData(ot);
                              console.log(item.id, "testing");
                            }}
                          >
                            <i className="ri-delete-bin-fill text-danger fs-20"></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <hr style={{ marginTop: "24px", marginBottom: "24px" }}></hr>
          </Col>

          <Col xs="12" className="d-flex justify-content-end">
            <button
              type="button"
              className="btn  waves-effect waves-light "
              style={{ backgroundColor: "#ec5c24" }}
            >
              Update
            </button>
          </Col>
        </CardBody>
      </Card>
    </div>
  );
};

export default LeadDetails;
