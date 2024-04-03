import React from "react";
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
import Select from "react-select";
import moment from "moment";
import { farming } from "../../globalConfig";
import { createInvoice } from "../../assets/utils/farmingBase";
import axios from "axios";
import { successnotify, warningnotify } from "../Toasts";
import Inv2022DescTable from "./Inv2022DescTable";

const BillModal = ({ billMod, setBillMod }) => {
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={billMod}
        size="md"
        toggle={() => {
          setBillMod(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setBillMod(false);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Update Date</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="6">
              <div>
                <Label className="form-label mb-0">Start Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                />
              </div>
            </Col>
            <Col xs="6">
              <div>
                <Label className="form-label mb-0">End Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              "";
            }}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const CreateInvoiceModal = ({ invMod, setInvMod, clientData }) => {
  const [clientId, setClientId] = React.useState("");
  const [poNum, setPoNum] = React.useState("");
  const [poDate, setPoDate] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const colorStyles = {
    control: (styles) => ({ ...styles, height: "38px" }),
  };

  //   const handleChangeinvoice = (e) => {
  //     console.log(e.label, e, "123");
  //     if (e.label) {
  //       setGenInvForm({ ...genInvForm, user_id: e.value });
  //     } else {
  //       const { name, value } = e.target;
  //       setGenInvForm({ ...genInvForm, [name]: value });
  //     }
  //   };

  const handleChangeId = (e) => {
    console.log(e);
    setClientId(e.value);
  };

  const poNumChange = (e) => {
    setPoNum(e.target.value);
  };

  const poDateChange = (e) => {
    console.log(e);
    const podate = moment(e[0]).format("YYYY-MM-DD");
    setPoDate(podate);
  };

  const onStartDateChange = (e) => {
    const startdate = moment(e[0]).format("YYYY-MM-DD");
    setStartDate(startdate);
  };

  const onEndDateChange = (e) => {
    const enddate = moment(e[0]).format("YYYY-MM-DD");
    setEndDate(enddate);
  };

  const togMod = () => {
    setClientId("");
    setPoNum("");
    setPoDate("");
    setStartDate("");
    setEndDate("");
    setInvMod(false);
  };
  const handleCreateInv = () => {
    let link = farming.farming_URL + createInvoice;
    const body = {
      is_manual: "yes",
      general_number: "998397",
      created_on: new Date(),
      user_id: clientId,
      po_no: poNum,
      po_date: poDate,
      start_date: startDate,
      end_date: endDate,
    };
    if (clientId == "") {
      delete body.user_id;
    }

    if (startDate == "") {
      delete body.start_date;
    }

    if (endDate == "") {
      delete body.end_date;
    }
    console.log(body, "123");
    const comp = Object.keys(body);
    console.log(comp, "comp");

    const boo = comp.includes("user_id", "start_date", "end_date");
    console.log(boo);
    if (boo) {
      //   axios
      //     .post(link, body)
      //     .then((res) => {
      //       console.log(res.data);
      //       togMod();
      //       successnotify("success");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       togMod();
      //       warningnotify("oops something went wrong...!");
      //     });
    } else {
      togMod();
      warningnotify("please enter all the details");
    }
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={invMod}
        size="lg"
        toggle={() => {
          togMod();
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            togMod();
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Update Date</h5>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col xs="6">
              <div>
                <label
                  htmlFor="updateclientid"
                  id="updateclientid"
                  className="form-label"
                >
                  Update Client Id
                </label>
                <Select
                  styles={colorStyles}
                  id="updateclientid"
                  options={clientData}
                  isSearchable
                  onChange={handleChangeId}
                />
              </div>
            </Col>
            <Col xs="6">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  PO Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  onChange={poNumChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label " htmlFor="podate" id="podate">
                  PO Date
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  name="po_date"
                  id="podate"
                  onChange={poDateChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4" htmlFor="podate1" id="podate1">
              <div>
                <Label className="form-label ">Billing Start Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  name="start_date"
                  id="podate1"
                  onChange={onStartDateChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label " htmlFor="podate2" id="podate2">
                  Billing End Date
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                  name="end_date"
                  id="podate2"
                  onChange={onEndDateChange}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={handleCreateInv}
          >
            Generate
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const EditInvModal = ({ editMod, setEditMod }) => {
  const colorStyles = {
    control: (styles) => ({ ...styles, height: "38px" }),
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={editMod}
        size="xl"
        toggle={() => {
          setEditMod(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setEditMod(false);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Edit Invoice</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="6">
              <div>
                <label
                  htmlFor="updateclientid"
                  id="updateclientid"
                  className="form-label"
                >
                  Update Client Id
                </label>
                <Select
                  styles={colorStyles}
                  id="updateclientid"
                  // options={clientData}
                  isSearchable
                  // onChange={handleChangeId}
                />
              </div>
            </Col>
            <Col xs="6">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  E-Invoice Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  // onChange={poNumChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label ">Billing Start Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label ">Billing End Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  PO Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  // onChange={poNumChange}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label">PO Date</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d M, Y",
                  }}
                />
              </div>
            </Col>

            <Col xs={"12"}>
              <Inv2022DescTable />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              "";
            }}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export { BillModal, CreateInvoiceModal, EditInvModal };
