import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { crm_access } from "../../assets/utils/sow";
import { api } from "../../globalConfig";

const ClientAccessModal = ({ clientMod, setClientMod, projectId }) => {
  const [data, setData] = React.useState({});
  const [typeData, setTypeData] = React.useState(undefined);

  const handleChangeType = (e) => {
    setTypeData(e.target.value);
    data.user_type = e.target.value;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const link = api.VENDOR_URL + crm_access;
    data.project_id = projectId;
    // data.created_by = userId;
    console.log(data, "lin");

    axios
      .post(link, data)
      .then((res) => {
        if (res.data?.error) {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast(res.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          setClientMod(false);
        }
      })
      .catch((err) => {
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
        size="md"
        id="signupModals"
        // tabIndex=""
        isOpen={clientMod}
        toggle={() => {
          setClientMod(!clientMod);
        }}
        centered={true}
      >
        {/* <ModalHeader
          className="p-3"
          toggle={() => {
            setClientMod(!clientMod);
          }}
        >
          Client Access
        </ModalHeader> */}
        <form onSubmit={handlesubmit}>
          <ModalBody>
            <Row>
              <Col xs={"12"}>
                <div>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    onChange={(e) => {
                      data.full_name = e.target.value;

                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs={"12"} className="mt-3">
                <div>
                  <label htmlFor="number" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    minLength={10}
                    maxLength={10}
                    required
                    onChange={(e) => {
                      data.mobile_number = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs={"12"} className="mt-3">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    onChange={(e) => {
                      data.email_id = e.target.value;
                      setData({ ...data });
                    }}
                  />
                </div>
              </Col>
              <Col xs={"12"} className="mt-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  id="type"
                  required={true}
                  onChange={handleChangeType}
                >
                  <option selected disabled value="">
                    select Type
                  </option>
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                </select>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn"
              style={{
                backgroundColor: "#ec5c24",
                color: "whitesmoke",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dd4319")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ec5c24")}
              type="submit"
            >
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ClientAccessModal;
