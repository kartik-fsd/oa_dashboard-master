import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Label, Row } from "reactstrap";
import {
  insert_manager_target,
  lsit_of_managers,
} from "../../../assets/utils/dashboard";
import { api } from "../../../globalConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import moment from "moment";

function ManagerAdd(props) {
  const [managerList, setManagerList] = useState([]);
  const [managerDetails, setManagerDetails] = useState({});
  const [loop, set_loop] = useState([]);

  const managersListUrl = api.VENDOR_URL + lsit_of_managers;
  const insertManagerTargetUrl = api.VENDOR_URL + insert_manager_target;

  useEffect(() => {
    axios
      .get(managersListUrl)
      .then((res) => {
        setManagerList(res.data?.oa_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (index) => {
    // const dataDelete = loop;
    loop[`${index}`].status = false;
    set_loop([...loop]);
  };
  const handleChange2 = (e, index) => {
    loop[`${index}`].target_date = moment(e[0]).format("YYYY-MM-DD");
  };

  const handleChange3 = (e, index) => {
    loop[`${index}`].manager_target = e.target.value;
  };

  const submitManager = (e) => {
    e.preventDefault();
    const filterFinal = loop.filter((loo) => loo.status == true);

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
        props.set_modal_signUpModals(false);
        props.setNextData(true);
        props.setShow(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div>
        <Container>
          <Row>
            <Row className="mb-4">
              <Col lg={4}>
                <Label>Select Manager</Label>
                <Select
                  value={managerDetails}
                  onChange={(managerDetails) => {
                    setManagerDetails(managerDetails);
                  }}
                  options={managerList}
                  id="choices-single-default"
                  className="js-example-basic-single mb-0 py-2 fs-18 h-100"
                  name="state"
                />
              </Col>
              <Col lg={4}>
                <Label>Select KAM</Label>
                <Select
                  value={managerDetails}
                  onChange={(managerDetails) => {
                    setManagerDetails(managerDetails);
                  }}
                  options={managerList}
                  id="choices-single-default"
                  className="js-example-basic-single mb-0 py-2 fs-18 h-100"
                  name="state"
                />
              </Col>
              <Col
                className="d-flex justify-content-start align-items-end"
                md={4}
              >
                {managerDetails?.id && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      set_loop([
                        ...loop,
                        {
                          sow_id: props.sowId,
                          manager_id: managerDetails.id,
                          status: true,
                        },
                      ]);
                    }}
                    className="btn btn-secondary mb-2 d-flex align-items-center gap-2"
                  >
                    <i className="ri ri-add-line"></i>
                    Add Target
                  </button>
                )}
              </Col>
            </Row>

            {loop?.map(
              (loo, index) =>
                loo.status && (
                  <div key={index}>
                    <div className="mb-3" key={index}>
                      <Row className="align-items-center g-3">
                        <Col lg={6}>
                          <Label
                            className="d-flex align-items-center gap-2 cursor-pointer"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            Select Month
                            <span className="ri ri-indeterminate-circle-line text-danger fs-16"></span>
                          </Label>
                          <Flatpickr
                            placeholder="Select End Date"
                            className="form-control"
                            id="exampleInputdate"
                            options={{
                              minDate: loo.startdate,
                            }}
                            name=""
                            onChange={(e) => handleChange2(e, index)}
                          />
                        </Col>

                        <Col lg={6}>
                          <Label>Target</Label>
                          <input
                            type="number"
                            className="form-control"
                            id="emailInput"
                            name="cpl"
                            onChange={(e) => handleChange3(e, index)}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                )
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

export default ManagerAdd;
