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
import moment from "moment";
import { useParams } from "react-router-dom";
import { api } from "../../../globalConfig";
import { update_client_details } from "../../../assets/utils/Business";
import axios from "axios";
import { successnotify, warningnotify } from "../../Toasts";

const ClientProf = ({ open, setOpen, data, setCheck, check }) => {
  const defaultDate = moment(data.client_since).format("YYYY-MM-DD");
  const [editData, setEditData] = React.useState({});
  const { id } = useParams();

  console.log(data.client_since, "date");

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
          Client Professional Details
        </ModalHeader>
        <ModalBody>
          {/* <h5 className="mb-3">Client Professional Details</h5> */}
          <Row>
            <Col xs="6" className="mb-4">
              <div>
                <label htmlFor="comp" className="form-label">
                  Designation
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="link"
                  placeholder=""
                  defaultValue={data.client_designation}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      client_designation: e.target.value,
                    })
                  }
                />
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Label className="form-label ">Since</Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    defaultDate: [defaultDate],
                  }}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      client_since: moment(e[0]).format("YYYY-MM-DD"),
                    })
                  }
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn waves-effect waves-light"
            // disabled={Object.keys(compDet)?.length > 0 ? false : true}
            style={{ backgroundColor: "#ec5c24" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ClientProf;
