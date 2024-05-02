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
import { farming } from "../../../globalConfig";

const DownloadAcc = ({ open, setOpen }) => {
  const [type, setType] = React.useState("");
  console.log(type, "type");

  const token = sessionStorage.getItem("token");

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="md"
        toggle={() => {
          setOpen(false);
          setType("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setType("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Download</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="8" className="">
              <Label className="form-label " htmlFor="podate2" id="podate2">
                Type
              </Label>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option selected disabled>
                  select
                </option>
                <option value="client">Client Wise</option>
                <option value="invoice">Invoice Wise</option>
              </select>
            </Col>
            <Col xs="4">
              <div className="mt-4">
                <a
                  href={`${farming.farming_URL}/invoatoken/download/accSummary?type=${type}&token=${token}`}
                  download
                >
                  <button
                    type="button"
                    className="btn waves-effect waves-light"
                    style={{
                      backgroundColor: "#ec5c24",
                    }}
                    disabled={type == "" ? true : false}
                  >
                    Download
                  </button>
                </a>
              </div>
            </Col>
          </Row>
        </ModalBody>
        {/* <ModalFooter>
          <a
            href={`${farming.farming_URL}/invoatoken/download/accSummary?type=${type}&token=${token}`}
            download
          >
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
              disabled={type == "" ? true : false}
            >
              Download
            </button>
          </a>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default DownloadAcc;
