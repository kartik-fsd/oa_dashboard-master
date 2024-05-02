import React from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import { update_payment_data } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import moment from "moment";
import axios from "axios";
import { successnotify, warningnotify } from "../../Toasts";

const EditOtherMod = ({ open, setOpen, d, setCheck, check }) => {
  const [data, setData] = React.useState({});
  console.log(d, "lion");
  const handleEdit = (e) => {
    e.preventDefault();
    const link = farming.farming_URL + update_payment_data;
    data.req_id = d.req_id;
    console.log(data, "datacheck");

    axios
      .post(link, data)
      .then((res) => {
        successnotify("success");
        setData("");
        setOpen(false);
        setCheck(!check);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));

    // try {
    //   axios.post(link, data);
    //   successnotify("success");
    //   setData({});
    //   setOpen(false);
    // } catch (error) {
    //   console.log(error);
    //   warningnotify("oops something went wrong...!");
    // }
  };

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          setOpen(false);
          setData({});
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setData({});
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Edit Details</h5>
        </ModalHeader>
        <form onSubmit={handleEdit}>
          <ModalBody>
            <Row>
              <Col xl="12" className="mb-3">
                <label htmlFor="basiInput" className="form-label">
                  Payout Type
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  onChange={(e) => {
                    data.type = e.target.value;
                    setData({ ...data });
                  }}
                >
                  <option selected value={d.type}>
                    {d.type == "manual_payment" ? "Payout" : "Expense"}
                  </option>
                  <option value="manual_payment">Payout</option>
                  <option value="other_expenses">Expense</option>
                </select>
              </Col>

              <Col lg={6} className="mb-3">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Payment Start Date
                  </label>
                  <Flatpickr
                    className="form-control"
                    defaultValue={moment(d.start_date).format("DD-MM-YYYY")}
                    options={{
                      dateFormat: "d-m-Y",
                    }}
                    onChange={(e) => {
                      data.start_date = moment(e[0]).format("YYYY-MM-DD");
                      console.log(moment(e[0]).format("DD-MM-YYYY"), "date");
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col lg={6} className="mb-3">
                <div>
                  {/* <Label className="form-label mb-0">Basic</Label> */}
                  <label htmlFor="basiInput" className="form-label">
                    Payment End Date
                  </label>
                  <Flatpickr
                    className="form-control"
                    defaultValue={moment(d.end_date).format("DD-MM-YYYY")}
                    options={{
                      dateFormat: "d-m-Y",
                    }}
                    onChange={(e) => {
                      data.end_date = moment(e[0]).format("YYYY-MM-DD");
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              {/* <Col lg={6} className="mb-3">
                <div>
                
                  <label htmlFor="basiInput" className="form-label">
                    Payment Processing Date
                  </label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={(e) => {
                        data.payment_date = moment(e[0]).format("DD-MM-YYYY");
                        setData({ ...data });
                    }}
                  />
                </div>
              </Col> */}
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    No Of Leads
                  </label>
                  <input
                    type="text"
                    defaultValue={d.leads}
                    className="form-control"
                    id="labelInput"
                    onChange={(e) => {
                      data.leads = e.target.value;
                      setData({ ...data });
                    }}
                    required
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Cost per Item
                  </label>
                  <input
                    type="text"
                    defaultValue={d.p_cpl}
                    className="form-control"
                    id="labelInput"
                    onChange={(e) => {
                      data.cpl = e.target.value;
                      setData({ ...data });
                    }}
                    required
                  />
                </div>
              </Col>

              {/* <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Total Cost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    value={
                      data.cpl * data.leads > 0 ? data.cpl * data.leads : ""
                    }
                    disabled
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={(e) => {
                        data.remark = e.target.value;
                        setData({ ...data });
                    }}
                  />
                </div>
              </Col> */}
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="submit"
              className="btn waves-effect waves-light"
              style={{ backgroundColor: "#ec5c24" }}
            >
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default EditOtherMod;
