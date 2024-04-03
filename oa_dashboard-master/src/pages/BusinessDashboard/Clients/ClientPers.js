import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  company_list_dropdown,
  update_client_details,
} from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const ClientPers = ({ open, setOpen, data, setCheck, check }) => {
  const [editData, setEditData] = React.useState({});
  const { id } = useParams();

  const handleUpdate = () => {
    const link = api.TASKMO_URL + update_client_details;
    editData.client_id = id;

    console.log(editData, "editdata");
    axios
      .patch(link, editData)
      .then((res) => {
        successnotify("successfully updated");
        setCheck(!check);
        setOpen(false);
      })
      .catch((err) => warningnotify("oops something went wrong...!"))
      .finally(() => setEditData({}));
  };

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => setOpen(false)}
        centered={true}
        size={"xl"}
      >
        <ModalHeader toggle={() => setOpen(false)}>
          Client Personal Details
        </ModalHeader>
        <ModalBody>
          <div>
            {/* <h5 className="mb-3">Client Personal Details </h5> */}

            <Row className="mt-4">
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="clt" className="form-label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clt"
                    placeholder=""
                    defaultValue={data.client_name}
                    onChange={(e) =>
                      setEditData({ ...editData, client_name: e.target.value })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="phn" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phn"
                    placeholder=""
                    defaultValue={data.client_phone}
                    onChange={(e) =>
                      setEditData({ ...editData, client_phone: e.target.value })
                    }
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="desg" className="form-label">
                    Mail Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desg"
                    placeholder=""
                    defaultValue={data.client_email}
                    readOnly
                    style={{ color: "grey" }}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="link" className="form-label">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    placeholder=""
                    defaultValue={data.client_linkedIn}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        client_linkedIn: e.target.value,
                      })
                    }
                  />
                </div>
              </Col>
              {/* <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="link" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    placeholder=""
                    defaultValue={data.company_state}
                  />
                </div>
              </Col>
              <Col xs="6" className="mb-4">
                <div>
                  <label htmlFor="link" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    placeholder=""
                    defaultValue={data.company_city}
                  />
                </div>
              </Col> */}
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
            // disabled={Object.keys(compDet)?.length > 0 ? false : true}
            onClick={handleUpdate}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ClientPers;
