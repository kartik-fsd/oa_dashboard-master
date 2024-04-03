import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Flatpickr from "react-flatpickr";
import StepperLeads from "../StepperLeads";
import { api } from "../../../globalConfig";
import { update_lead_details } from "../../../assets/utils/Business";
import axios from "axios";
import { successnotify, warningnotify } from "../../Toasts";
import { useParams } from "react-router-dom";
import moment from "moment";
import { v4 as uuid } from "uuid";

const LeadDetEdit = ({ open, setOpen, data, setCheck, check }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [editData, setEditData] = React.useState({});

  let [testObj, setTestObj] = React.useState({
    month: new Date(),
    type_value: "",
  });
  console.log(data, "testingobj");

  const [mileStoneData, setMileStoneData] = React.useState([]);
  React.useEffect(() => {
    setMileStoneData(data?.milestones ?? []);
  }, [data]);

  console.log(mileStoneData, "testingdata");
  const { id } = useParams();
  //   const [tes, setTes] = useState({});

  console.log(id, "edt123");

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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value, "val");
  };

  const handleUpdate = () => {
    const link = api.TASKMO_URL + update_lead_details;
    editData.lead_id = id;
    editData.milestones = JSON.stringify(mileStoneData);
    if (selectedOption) {
      editData.difficulty_level = selectedOption;
    }
    console.log(editData, "edt");

    axios
      .patch(link, editData)
      .then((res) => {
        successnotify("success");
        setCheck(!check);
        setOpen(false);
      })
      .catch((err) => warningnotify("oops something went wrong..!"))
      .finally(setEditData({}));
  };

  const editorConfig = {
    minHeight: "12px",
  };
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => {
          setOpen(false);
          setEditData({});
          setSelectedOption("");
        }}
        centered={true}
        size={"xl"}
      >
        <ModalHeader
          className="bg-light"
          toggle={() => {
            setOpen(false);
            setEditData({});
            setSelectedOption("");
          }}
        >
          <h5 className="text-primary mb-3 ">Lead Nurturing</h5>
        </ModalHeader>
        <ModalBody>
          <div>
            {/* <h5 className="text-primary">Lead Nurturing</h5> */}

            <Col xs="12" className="mb-4">
              <h5 className="mb-4 text-primary">What are we supposed do?</h5>
              <div id="ck">
                <CKEditor
                  editor={ClassicEditor}
                  data={data.supposed_to_do}
                  onChange={(event, editor) => {
                    editData.supposed_to_do = editor.getData();
                    console.log(editor.getData(), "checkfasak");
                    setEditData({ ...editData });
                  }}
                />
              </div>
            </Col>
            <Col xs="12" className="mb-4">
              <h5 className="mb-4 text-primary">What are the requirement?</h5>
              <div id="ck">
                <CKEditor
                  editor={ClassicEditor}
                  data={data.requirements}
                  onChange={(event, editor) => {
                    editData.requirements = editor.getData();
                    setEditData({ ...editData });
                  }}
                />
              </div>
            </Col>
            <Col xs="12" className="mb-4">
              <h5 className="mb-4 text-primary">
                What are the qualifying criteria?
              </h5>
              <div id="ck">
                <CKEditor
                  editor={ClassicEditor}
                  data={data.qualifying_criteria}
                  onChange={(event, editor) => {
                    editData.qualifying_criteria = editor.getData();
                    setEditData({ ...editData });
                  }}
                />
              </div>
            </Col>
            <Col xs="12" className="mb-4">
              <h5 className="mb-4 text-primary">
                What are the rejection criteria?
              </h5>
              <div id="ck">
                <CKEditor
                  editor={ClassicEditor}
                  data={data.rejection_criteria}
                  onChange={(event, editor) => {
                    editData.rejection_criteria = editor.getData();
                    setEditData({ ...editData });
                  }}
                />
              </div>
            </Col>
            <Col xs="12" className="mb-4">
              <h5 className="mb-4 text-primary">Market population?</h5>
              <div id="ck">
                <CKEditor
                  editor={ClassicEditor}
                  data={data.market_population}
                  onChange={(event, editor) => {
                    editData.market_population = editor.getData();
                    setEditData({ ...editData });
                  }}
                />
              </div>
              <hr className="mt-5"></hr>
            </Col>
            <Col xs="12" className="mb-4">
              <h5 className="mb-4 text-primary">
                {" "}
                What are your market penetration and growth?
              </h5>
              <div id="ck">
                <CKEditor
                  editor={ClassicEditor}
                  data={data.market_penetration_and_growth}
                  onChange={(event, editor) => {
                    editData.market_penetration_and_growth = editor.getData();
                    setEditData({ ...editData });
                  }}
                />
              </div>
              <hr className="mt-5"></hr>
            </Col>
            <form>
              <Col xs="12">
                <h5 className="mb-4 text-primary">Difficulty level?</h5>
                <div className="d-flex gap-4 align-items-center">
                  <label className="m-0 d-flex align-items-center">
                    <input
                      type="radio"
                      name="option"
                      value="Low"
                      defaultChecked={
                        data.difficulty_level === "Low" ? true : false
                      }
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
                      // checked={selectedOption === "Medium"}
                      defaultChecked={
                        data.difficulty_level === "Medium" ? true : false
                      }
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
                      // checked={selectedOption === "High"}
                      defaultChecked={
                        data.difficulty_level === "High" ? true : false
                      }
                      onChange={handleOptionChange}
                    />
                    <span style={{ marginLeft: "8px" }}>High</span>
                  </label>
                </div>
                <hr className="mt-4"></hr>
              </Col>
            </form>
            <Col xs="12">
              <div className="d-flex justify-content-between">
                <h5 className="mb-4 text-primary">Deliverables</h5>
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
                    className="btn btn-primary waves-effect waves-light btn-sm"
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
            <h5 className="mb-4 text-primary">Deliverables</h5>
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
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            // disabled={Object.keys(compDet)?.length > 0 ? false : true}
            onClick={handleUpdate}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LeadDetEdit;
