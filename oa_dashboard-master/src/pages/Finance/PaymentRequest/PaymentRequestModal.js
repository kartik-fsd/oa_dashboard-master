import axios from "axios";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Swal from "sweetalert2";
import { process_request } from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const PaymentRequestModal = ({
  open,
  setOpen,
  singleData,
  setError,
  error,
  editData,
  setEditData,
  handleCloseEditModal,
  updated,
  setUpdated,
}) => {
  const handleChangeinvoiceEdit = (e) => {
    const { name, value } = e.target;

    if (value == "processed") {
      setError(false);
    }
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let link = farming.farming_URL + process_request;
    editData.remark = editData.remark ? editData.remark : "";
    editData.req_id = singleData.req_id;
    if (editData.status == "failed" && editData.remark == "") {
      setError(true);
      return "";
    } else {
      setError(false);
    }
    if (editData.status) {
      handleCloseEditModal();
      axios
        .post(link, editData)
        .then((res) => {
          successnotify("Updated successfully");

          setUpdated(!updated);
        })
        .catch((e) => {
          warningnotify("something went wrong");
        });
    }
  };

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="md"
        toggle={() => {
          setOpen(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Process Invoice</h5>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                required
                name="status"
                onChange={handleChangeinvoiceEdit}
              >
                <option value="" disabled selected>
                  select
                </option>
                <option value="processed">Processed</option>
                <option value="failed">Failed</option>
                {/* <option value="3">Three</option> */}
              </select>
            </div>
            <div>
              <label htmlFor="basiInput" className="form-label">
                Remark processed
              </label>
              <input
                type="text"
                name="remark"
                className="form-control"
                id="basiInput"
                required
                onChange={handleChangeinvoiceEdit}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {singleData.status != "none" ? (
              <></>
            ) : (
              <button
                type="submit"
                className="btn waves-effect waves-light text-light"
                style={{ backgroundColor: "#ec5c24" }}
                disabled={singleData.status !== "none"}
              >
                Process
              </button>
            )}
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentRequestModal;
