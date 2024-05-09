import React, { useState } from "react";
import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import { farming } from "../../../globalConfig";
import { createPaymentreq } from "../../../assets/utils/farmingBase";
import { successnotify, warningnotify } from "../../Toasts";

const AddPayoutModal = ({
  open4,
  setOpen4,
  updateboolProcess,
  setupdateBoolProcess,
}) => {
  const [data, setData] = useState({});
  const handlesubmit = (event) => {
    event.preventDefault();
    // data["invoice_id"] = invoiceId;
    const link = farming.farming_URL + createPaymentreq;
    if (data.type) {
      console.log(data, "data123");
      //   axios
      //     .post(link, data)
      //     .then((res) => {
      //       successnotify("success");
      //       setupdateBoolProcess(!updateboolProcess);
      //       setOpen4(false);

      //     })
      //     .catch((err) => {
      //       warningnotify("err.response.data.message");
      //     });
    } else {
      warningnotify("Select the type of Payment");
    }
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open4}
        size="lg"
        toggle={() => {
          setOpen4(false);
          setData({});
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen4(false);
            setData({});
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Add Payout Details</h5>
        </ModalHeader>
        <form onSubmit={handlesubmit}>
          <ModalBody>
            <Row>
              <Col xl="6" className="mb-3">
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
                  <option selected disabled value="">
                    select
                  </option>
                  <option value="manual_payment">Manual Payment</option>
                  <option value="other_expenses">Other Expenses</option>
                </select>
              </Col>
              <Col xl="6" className="mb-3">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    SOW ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    onChange={(e) => {
                      data.sow_id = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col lg={4} className="mb-3">
                <div>
                  {/* <Label className="form-label mb-0">Basic</Label> */}
                  <label htmlFor="basiInput" className="form-label">
                    Payment Start Date
                  </label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={(e) => {
                      data.start_date = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col lg={4} className="mb-3">
                <div>
                  {/* <Label className="form-label mb-0">Basic</Label> */}
                  <label htmlFor="basiInput" className="form-label">
                    Payment End Date
                  </label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={(e) => {
                      data.end_date = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col lg={4} className="mb-3">
                <div>
                  {/* <Label className="form-label mb-0">Basic</Label> */}
                  <label htmlFor="basiInput" className="form-label">
                    Payment Processing Date
                  </label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    onChange={(e) => {
                      data.payment_date = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    No Of Leads
                  </label>
                  <input
                    type="text"
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
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Billable Leads{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={(e) => {
                      data.billable_leads = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Billable Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    onChange={(e) => {
                      data.billing_amt = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-3">
                <div>
                  <label htmlFor="labelInput" className="form-label">
                    Total Cost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="labelInput"
                    value={data.cpl * data.leads}
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
              </Col>
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

export default AddPayoutModal;
