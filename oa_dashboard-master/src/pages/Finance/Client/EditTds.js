import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { details } from "../../../assets/utils/farmingBase";
import { api, farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";
import { update_company_details } from "../../../assets/utils/Business";

const EditTds = ({ open, setOpen, data, setCheck, check }) => {
  const [det, setDet] = useState({});

  useEffect(() => {
    const link = farming.farming_URL + details + "/" + data?.company_id;
    axios
      .get(link)
      .then((res) => setDet(res.data.data))
      .catch((err) => console.log(err));
  }, [data]);

  console.log(det, "details");

  const handleUpdate = () => {
    const link = api.ONX_URL + update_company_details;
    det.company_id = data?.company_id;
    axios
      .patch(link, det)
      .then((res) => {
        successnotify("success");
        setOpen(false);
        setCheck(!check);
      })
      .catch((err) => warningnotify("oops something went wrong...!"));
    console.log(det);
  };
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        toggle={() => {
          setOpen(false);
        }}
        centered={true}
        size="md"
      >
        <ModalHeader
          className="p-3"
          toggle={() => {
            setOpen(false);
          }}
        >
          Edit TDS Details
        </ModalHeader>

        <ModalBody>
          <>
            <Row className="align-items-center g-3 ">
              <Col lg={6}>
                <Label>Certificate Number</Label>
                <Input
                  type="text"
                  value={det?.certificate_number}
                  onChange={(e) =>
                    setDet({ ...det, certificate_number: e.target.value })
                  }
                  name="fullname"
                  required
                />
              </Col>
              <Col lg={6}>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={det?.tds_est_amt}
                  onChange={(e) =>
                    setDet({ ...det, tds_est_amt: e.target.value })
                  }
                  name="fullname"
                  required
                />
              </Col>
            </Row>

            <button
              //   type="submit"
              style={{
                float: "right",
                marginTop: "24px",
                width: "100px",
                backgroundColor: "#ec5c24",
              }}
              className="btn d-flex gap-2 justify-content-center text-light"
              onClick={handleUpdate}
              //   disabled={remark == ""}
            >
              {/* <i className="ri-add-line align-bottom"></i> */}
              Update
            </button>
          </>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditTds;
