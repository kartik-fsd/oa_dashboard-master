import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const BadDebtModal = ({ open2, setOpen2 }) => {
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open2}
        size="sm"
        toggle={() => {
          setOpen2(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen2(false);
          }}
        >
          {/* <h5 style={{ color: "#3f5289 " }}>Update Payment</h5> */}
        </ModalHeader>

        <ModalBody>
          <p className="m-0 mt-2 fs-18 text-center fw-bold">Are You Sure </p>
        </ModalBody>
        <ModalHeader className="justify-content-end ">
          <div>
            <button
              type="submit"
              className="btn btn-success waves-effect waves-light mb-4 "
              // onClick={handleSubmitPayment}
            >
              Yes
            </button>
            <button
              type="submit"
              className="btn btn-danger waves-effect waves-light mb-4 ms-2 "
              onClick={() => setOpen2(false)}
            >
              No
            </button>
          </div>
        </ModalHeader>
      </Modal>
    </div>
  );
};

export default BadDebtModal;
