import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import {
  insert_manager_target,
  lsit_of_managers,
  sow_close_target,
  sow_get_target,
} from "../../../assets/utils/dashboard";
import { api } from "../../../globalConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Slider from "react-rangeslider";
import Nouislider from "nouislider-react";
import "react-rangeslider/lib/index.css";
import SlidersComp from "./SlidersComp";
import { v4 as uuid } from "uuid";
import { filter } from "lodash";
import "react-toastify/dist/ReactToastify.css";

function ManagerEdit(props) {
  const refComp = useRef(null);

  const [managerList, setManagerList] = useState([]);
  const [managerDetails, setManagerDetails] = useState(props.managerData);
  const [loop, set_loop] = useState([]);
  const [targetData, setTargetData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [def, setdef] = useState(15);
  const [def2, setdef2] = useState(15);

  const managersListUrl = api.VENDOR_URL + lsit_of_managers;
  const insertManagerTargetUrl = api.VENDOR_URL + insert_manager_target;
  const deleteSowTarget = api.OA_URL + sow_close_target;
  const getTarget = api.OA_URL + sow_get_target;

  React.useEffect(() => {
    axios
      .get(getTarget, { params: { sow_id: managerDetails.sow_id } })
      .then((res) => {
        console.log(res.data.target, "targetdatares");
        setTargetData(res.data?.target);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  console.log(def, "def");

  const handleDelete = (index) => {
    // const dataDelete = loop;
    loop[`${index}`].status = false;
    set_loop([...loop]);
  };
  const handleChange2 = (e, index) => {
    // console.log(e.target.value, index, "handleChange2");
    loop[`${index}`].target_date = e.target.value + "-01";
  };

  const handleChange3 = (e, index) => {
    loop[`${index}`].manager_target = e.target.value;
  };
  const handleChange4 = (e, index) => {
    loop[`${index}`].training_slot = e.target.value;
  };
  const handleChange5 = (e, index) => {
    loop[`${index}`].tasker_ratio = e.target.value;
    loop[`${index}`].sp_ratio = 100 - e.target.value;
  };
  const handleChange6 = (e, index) => {
    loop[`${index}`].es_stats = e.target.value;
  };

  const submitManager = (e) => {
    e.preventDefault();
    const filterFinal = loop.filter((loo) => loo.status == true);
    console.log(Object.keys(filterFinal[0]).length, "filterFinal");

    for (let i = 0; i < filterFinal.length; i++) {
      let ot = !Object.keys(filterFinal[i]).includes(
        "manager_target",
        "target_data"
      );

      if (ot) {
        toast("Please Fill all the Details", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
        return "";
      }
    }

    axios.post(insertManagerTargetUrl, filterFinal).then((res) => {
      if (res.data?.error) {
        toast("Something went wrong", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      } else {
        toast("success", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        props.set_modal_edit(false);
      }
    });
  };

  const handleAxiosDelete = (e) => {
    const dataDelete = deleteSowTarget + `?target_id=${e}`;
    axios
      .patch(dataDelete)
      .then((res) => {
        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div>
        <Container>
          <Row>
            <Row className="mb-4">
              <Col lg={4}>
                <Label>Selected Manager</Label>
                <Input
                  type="text"
                  name="projecttitle"
                  defaultValue={managerDetails.manager_name}
                  readOnly
                />
              </Col>
              <Col lg={4}>
                <Label>Selected KAM</Label>
                <Input
                  type="text"
                  name="projecttitle"
                  defaultValue={managerDetails.oa_name}
                  readOnly
                />
              </Col>
              <Col
                className="d-flex justify-content-start align-items-end"
                md={4}
              >
                {managerDetails?.oa_name && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      set_loop([
                        ...loop,
                        {
                          sow_id: managerDetails.sow_id,
                          es_stats: 25,
                          training_slot: 30,
                          tasker_ratio: 60,
                          sp_ratio: 40,
                          manager_id:
                            managerDetails.manager_id > 0
                              ? managerDetails.manager_id
                              : 0,
                          status: true,
                          id: uuid(),
                        },
                      ]);
                    }}
                    className="btn btn-secondary d-flex align-items-center gap-2"
                  >
                    <i className="ri ri-add-line"></i>
                    Add Target
                  </button>
                )}
              </Col>
              {/* <Col lg={6} className="mt-4">
                <div
                  className="p-3"
                  style={{ border: "1px solid #3478f1", borderRadius: "6px" }}
                >
                  <p style={{ margin: "0px" }}>Tasker ratio & SP ratio</p>
                  <div className="d-flex  justify-content-between">
                    <span className="float-left mt-4">{def}</span>
                    <span className="float-right  mt-4">{100 - def}</span>
                  </div>
                  <Slider
                    value={def}
                    size={"small"}
                    orientation="horizontal"
                    onChange={(value) => {
                      setdef(value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={6} className="mt-4">
                <div
                  className="p-3"
                  style={{ border: "1px solid #3478f1", borderRadius: "6px" }}
                >
                  <p style={{ margin: "0px" }}>ES</p>
                  <div className="d-flex  justify-content-between">
                    <span className="float-left mt-4">{def2}</span>
                    <span className="float-right  mt-4">{5}</span>
                  </div>
                  <Slider
                    value={def2}
                    size={"small"}
                    min={1}
                    max={5}
                    orientation="horizontal"
                    onChange={(value) => {
                      setdef2(value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={4} className="mt-4">
                <Label>Training Slot</Label>
                <Input type="text" name="projecttitle" />
              </Col> */}
            </Row>

            {loop?.map(
              (loo, index) =>
                loo.status && (
                  <div key={loo.id}>
                    <div className="mb-3" key={index}>
                      <Row className="align-items-center g-3">
                        <Col lg={4}>
                          <Label
                            className="d-flex align-items-center gap-2 cursor-pointer"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            Select Month
                            <span className="ri ri-indeterminate-circle-line text-danger fs-16"></span>
                          </Label>
                          {/* <Flatpickr
                            placeholder="Select Month"
                            className="form-control"
                            id="MonthEnter"
                            ref={refComp}
                            name="calender"
                            onChange={(e) => {
                              handleChange2(e, index);
                            }}
                          /> */}
                          <input
                            type="month"
                            name="calender"
                            id="month-select"
                            onChange={(e) => {
                              handleChange2(e, index);
                            }}
                            style={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "40px",
                              border: "1px solid lightgrey",
                              padding: "0 16px",
                              cursor: "pointer",
                            }}
                          />
                        </Col>

                        <Col lg={2}>
                          <Label>Training</Label>
                          <input
                            type="number"
                            className="form-control"
                            id="emailInput"
                            name="cpl"
                            onChange={(e) => handleChange4(e, index)}
                          />
                        </Col>
                        <Col lg={2}>
                          <Label>{"Direct (%)"}</Label>
                          <input
                            type="number"
                            className="form-control"
                            id="emailInput"
                            name="cpl"
                            onChange={(e) => handleChange5(e, index)}
                          />
                        </Col>
                        <Col lg={2}>
                          <Label>{"Earnings (%)"}</Label>
                          <input
                            type="number"
                            className="form-control"
                            id="emailInput"
                            name="cpl"
                            onChange={(e) => handleChange6(e, index)}
                          />
                        </Col>

                        <Col lg={2}>
                          <Label>Count</Label>
                          <input
                            type="number"
                            className="form-control"
                            id="emailInput"
                            name="cpl"
                            onChange={(e) => handleChange3(e, index)}
                          />
                        </Col>
                        {/* {loo.status && (
                          <SlidersComp
                            loop={loop}
                            set_loop={set_loop}
                            ind={index}
                          />
                        )} */}
                      </Row>
                    </div>
                  </div>
                )
            )}
            {targetData && (
              <div>
                <Table
                  className="table-bordered align-middle table-nowrap mb-0 overflow-auto"
                  style={{ height: "200px" }}
                >
                  <thead>
                    <tr>
                      <th scope="col fs-5">Month</th>
                      <th scope="col fs-5">Training</th>
                      <th scope="col fs-5">Direct</th>
                      <th scope="col fs-5">Earning</th>
                      <th scope="col fs-5">Count</th>
                      <th scope="col fs-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(targetData || []).map((item) => (
                      <>
                        <tr>
                          <td className="fw-medium">{item.target_month}</td>
                          <td>{item.training_slot}</td>

                          <td>{item.tasker_ratio}</td>
                          <td>{item.es_stats}</td>
                          <td>{item.manager_target}</td>
                          <td className="text-center">
                            <UncontrolledDropdown className="dropdown d-inline-block">
                              <DropdownToggle
                                className="btn btn-soft-secondary btn-sm"
                                tag="button"
                              >
                                <i className="ri-more-fill align-middle"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                  className="edit-item-btn"
                                  onClick={() => {
                                    handleAxiosDelete(item.assign_id);
                                  }}
                                >
                                  <i className="ri-delete-bin-line align-bottom me-2 text-muted"></i>
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Row>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={submitManager}
            >
              <i className="ri ri-checkbox-circle-line fs-18"></i>
              Submit
            </button>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ManagerEdit;

{
  /* <div className="mb-3" key={index}>
                  <Row className="align-items-center g-3">
                    <Col lg={6}>
                      <Label
                        className="d-flex align-items-center gap-2 cursor-pointer"
                        onClick={() => {
                          handleAxiosDelete(loo.assign_id);
                        }}
                      >
                        Select Month
                        <span className="ri ri-indeterminate-circle-line text-danger fs-16"></span>
                      </Label>
                      <Input
                        type="text"
                        readOnly
                        name="projecttitle"
                        value={loo.target_date}
                      />
                      <input
                        type="month"
                        name="calender"
                        id="month-select"
                        onChange={(e) => {
                          handleChange2(e, index);
                        }}
                        value={loo.target_date}
                        style={{
                          borderRadius: "5px",
                          width: "100%",
                          height: "40px",
                          border: "1px solid lightgrey",
                          padding: "0 16px",
                        }}
                        readOnly
                      />
                    </Col>

                    <Col lg={6}>
                      <Label>Target</Label>
                      <Input
                        type="text"
                        readOnly
                        name="projecttitle"
                        value={loo.manager_target}
                      />
                    </Col>
                  </Row>

                  added the tr,spratio,training slot
                  <Row style={{ marginTop: "10px" }}>
                    <Col lg={4}>
                      <Label>Tasker Ratio</Label>
                      <Input
                        type="text"
                        readOnly
                        name="projecttitle"
                        value={loo.tasker_ratio}
                      />
                    </Col>

                    <Col lg={4}>
                      <Label>SP Ratio</Label>
                      <Input
                        type="text"
                        readOnly
                        name="projecttitle"
                        value={loo.sp_ratio}
                      />
                    </Col>

                    <Col lg={4}>
                      <Label>Training Slot</Label>
                      <Input
                        type="text"
                        readOnly
                        name="projecttitle"
                        value={loo.training_slot}
                      />
                    </Col>
                  </Row>

                  adding the new es data
                  <Row style={{ marginTop: "10px" }}>
                    <Col lg={2}>
                      <Label>ES - 1</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="es1"
                        name="es1"
                        readOnly
                        value={loo.es_1}
                      />
                    </Col>
                    <Col lg={2}>
                      <Label>ES - 2</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="es2"
                        name="es2"
                        readOnly
                        value={loo.es_2}
                      />
                    </Col>

                    <Col lg={2}>
                      <Label>ES - 3</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="es3"
                        name="es3"
                        readOnly
                        value={loo.es_3}
                      />
                    </Col>
                    <Col lg={2}>
                      <Label>ES - 4</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="es4"
                        name="es4"
                        readOnly
                        value={loo.es_4}
                      />
                    </Col>

                    <Col lg={2}>
                      <Label>ES - 5</Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="es5"
                        name="es5"
                        readOnly
                        value={loo.es_5}
                      />
                    </Col>
                  </Row>
                </div> */
}
