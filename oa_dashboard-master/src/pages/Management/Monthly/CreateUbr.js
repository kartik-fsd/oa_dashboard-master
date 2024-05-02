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
import moment from "moment";
import { api, farming } from "../../../globalConfig";
import { createUbr } from "../../../assets/utils/farmingBase";
import axios from "axios";
import { successnotify, warningnotify } from "../../Toasts";
import { object } from "yup";

const CreateUbr = ({ open, setOpen, table, lastDate }) => {
  const [data, setData] = React.useState({});
  const keyArr = Object.keys(data);
  const keyValu = Object.values(data);

  //   console.log(keyArr, "table");

  const handleCreate = () => {
    const link = farming.farming_URL + createUbr;
    data.sow_id = table.sow_id;
    data.mpa_id = table.invoice_id;
    data.mpa_date = lastDate;
    console.log(data, "data");

    axios
      .post(link, data)
      .then((res) => {
        successnotify("created successfully");
        setOpen(false);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));
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
          <h5 style={{ color: "#3f5289 " }}>Create UBR</h5>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col xs="6">
              <div>
                <label
                  htmlFor="exampleFormControlTextarea5"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea5"
                  rows="5"
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                ></textarea>
              </div>
            </Col>
            <Col xs="6">
              <div>
                <label htmlFor="basiInput" className="form-label">
                  Billable Date
                </label>
                <Flatpickr
                  className="form-control"
                  // defaultValue={moment(d.end_date).format("DD-MM-YYYY")}
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  onChange={(e) => {
                    data.billable_date = moment(e[0]).format("YYYY-MM-DD");
                    setData({ ...data });
                  }}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="basiInput" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="basiInput"
                  onChange={(e) => setData({ ...data, amount: e.target.value })}
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
            onClick={() => handleCreate()}
            disabled={
              keyArr.includes("amount") &&
              keyArr.includes("billable_date") &&
              !keyValu.includes("")
                ? false
                : true
            }
          >
            Create
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateUbr;
