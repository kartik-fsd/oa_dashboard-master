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
import { update_company_details } from "../../../assets/utils/Business";
import { api } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const AboutCompMod = ({ open, setOpen, data, check, setCheck }) => {
  const [editData, setEditData] = React.useState({});
  const { id } = useParams();

  console.log(data, "datq123");

  const handleUpdate = () => {
    const link = api.ONX_URL + update_company_details;
    editData.company_id = id;
    axios
      .patch(link, editData)
      .then((res) => {
        successnotify("success");
        setOpen(false);
        setCheck(!check);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));
    console.log(editData);
  };
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => setOpen(false)}
        centered={true}
        size={"lg"}
      >
        <ModalHeader toggle={() => setOpen(false)}>
          Company Description
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <div>
                {/* <label htmlFor="startdate" className="form-label">
                  About Company
                </label> */}
                <textarea
                  style={{ width: "100%", height: "120px" }}
                  defaultValue={data.company_discription}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      company_discription: e.target.value,
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
            className="btn  waves-effect waves-light"
            style={{ backgroundColor: "#ec5c24" }}
            onClick={handleUpdate}
            disabled={Object.values(editData).includes("") ? true : false}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AboutCompMod;
