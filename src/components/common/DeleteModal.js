import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const DeleteModal = ({
  show,
  onSubmitClick,
  onCloseClick,
  statement,
  value,
}) => {
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <div>
            <img
              src={"/delete-files-loop.gif"}
              alt="deleteimage"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">{statement}</p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>

          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={() => onSubmitClick(value)}
          >
            Yes, Delete It!
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
