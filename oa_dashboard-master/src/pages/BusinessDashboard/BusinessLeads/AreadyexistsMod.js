import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const AreadyexistsMod = ({ open, setOpen, search }) => {
  const history = useHistory();
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        toggle={() => setOpen(false)}
        centered={true}
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => setOpen(false)}
        ></ModalHeader>

        <ModalBody>
          <div className="text-center ">
            <p className="fs-20">Client already exists</p>
            <Button
              color="link"
              onClick={() =>
                history.push(
                  `/business-dashboard/addclient/${search[0]?.client_id}`
                )
              }
            >
              Client Details
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AreadyexistsMod;
