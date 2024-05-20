import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { qcbulkUpload } from "../../assets/utils/farmingBase";
import { api, farming } from "../../globalConfig";
import { extract_token } from "../../assets/utils/common";
import { CSVLink } from "react-csv";
import axios from "axios";

const LeadApproved = (props) => {
  const { leadApprovemod, setLeadApprovemod } = props;
  const [userData, setUserData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [datadown, setDataDown] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const hiddenFileInput = React.useRef(null);
  const handleClickuploadtraining = () => {
    hiddenFileInput.current.click();
  };
  const handleChangeuploadtraining = (e) => {
    const link = farming.farming_URL + qcbulkUpload;
    console.log(e.target.files[0], "files000");
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    setIsLoading(true);
    axios
      .put(link, formData)
      .then((res) => {
        console.log(res.data.users, "testing");
        setUserData(res?.data?.users);
        setIsLoading(false);
        setDataDown(true);
        //   window.location.reload();
      })
      .catch((err) => {
        setIsErr(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={leadApprovemod}
        size="md"
        toggle={() => {
          setLeadApprovemod(!leadApprovemod);
        }}
        // centered={true}
      >
        {/* <ModalHeader
          toggle={() => {
            setLeadApprovemod(!leadApprovemod);
          }}
        >
          
        </ModalHeader> */}
        <ModalBody>
          {isLoading ? (
            <>Loading...</>
          ) : isErr ? (
            <>something went wrong...!</>
          ) : (
            <Row className="mt-1">
              <Col className="d-flex justify-content-between align-items-center">
                <p
                  style={{ fontSize: "18px", fontWeight: "500", margin: "0px" }}
                >
                  Lead Status Approved
                </p>

                {!datadown && (
                  <button
                    type="button"
                    className="btn waves-effect waves-light text-light"
                    style={{ backgroundColor: "#ec5c24" }}
                    onClick={() => hiddenFileInput.current.click()}
                  >
                    <i
                      className=" ri-upload-2-fill
"
                    ></i>
                  </button>
                )}
                <input
                  hidden
                  type="file"
                  htmlFor="lablelab"
                  style={{ display: " none" }}
                  onChange={handleChangeuploadtraining}
                  ref={hiddenFileInput}
                />
                {datadown && (
                  <CSVLink
                    data={userData}
                    filename={"my-file.csv"}
                    className="down_load_btn  mt-2"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn waves-effect waves-light text-light"
                      style={{ backgroundColor: "#ec5c24" }}
                      onClick={() => ""}
                    >
                      <i className="  ri-download-2-fill"></i>
                    </button>
                  </CSVLink>
                )}
              </Col>
            </Row>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LeadApproved;
