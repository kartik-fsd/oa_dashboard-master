import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ProcessRequestModal = ({
  reqMod,
  setReqMod,
  processPaymentFunc,
  setPayment_ref,
  payment_ref,
}) => {
  const handlePaymentChange = (e) => {
    setPayment_ref(e.target.value);
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={reqMod}
        size="md"
        toggle={() => {
          setReqMod(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setReqMod(false);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Process Payment</h5>
        </ModalHeader>
        <ModalBody>
          <p className="text-muted fs-5">
            Are you sure you want to Process this payment.
          </p>
          <div>
            <label htmlFor="basiInput" className="form-label">
              Payment Reference
            </label>
            <input
              type="text"
              className="form-control"
              id="basiInput"
              onChange={handlePaymentChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            disabled={payment_ref ? false : true}
            onClick={() => {
              processPaymentFunc();
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            onClick={() => {
              setReqMod(false);
            }}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProcessRequestModal;
