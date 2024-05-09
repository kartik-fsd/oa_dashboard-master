import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DailyTable from "./DailyTable";

const DailyModal = ({ open, setOpen }) => {
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="xl"
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
          <h5 style={{ color: "#3f5289 " }}>Daily Summary</h5>
        </ModalHeader>
        <ModalBody>
          <DailyTable />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DailyModal;
