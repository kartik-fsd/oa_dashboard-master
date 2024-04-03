import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { block_vendor } from "../../../assets/utils/dashboard";
import { api } from "../../../globalConfig";

const InactiveModal = ({ inactiveMod, setInactiveMod, userData }) => {
  const [data, setData] = React.useState({});
  console.log(userData, "user");

  const handlesubmit = () => {
    const link = api.OA_URL + block_vendor;
    const body = {
      sow_id: userData.sow_id,
      asm_id: userData.asm_id,
      asm_status: "blocked",
      remark: data.comment,
      type: userData.type == 3 ? "tsm" : "vendor",
      creater_type: "operations",
      current_status: "accepted",
    };

    console.log(body, "body");
    axios
      .post(link, body)
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          toast("successfully updated", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setInactiveMod(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        });
      });
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={inactiveMod}
        toggle={() => {
          setInactiveMod(!inactiveMod);
        }}
        centered
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setInactiveMod(!inactiveMod);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Block SP</h5>
        </ModalHeader>

        <ModalBody>
          <div>
            <label htmlFor="exampleFormControlTextarea5" className="form-label">
              Comment
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea5"
              placeholder="Leave a comment here"
              rows="3"
              onChange={(e) => {
                data.comment = e.target.value;
                setData({ ...data });
              }}
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => handlesubmit()}>
            save
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InactiveModal;
