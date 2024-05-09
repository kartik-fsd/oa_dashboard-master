import axios from "axios";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  update_invoice,
  update_payment_status,
  upload_attachment,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const PaymentModal = ({ setOpen, open, userData, setCheck, check, paysum }) => {
  const [payment, setPayment] = React.useState("");
  const [attachment, setAttachment] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const hiddenFile = React.useRef(null);
  const [datechange, setDateChange] = React.useState("");
  const [fupload, setFileUpload] = React.useState("");
  const [debt, setDebt] = React.useState(null);
  const [recv, setRecv] = React.useState(null);

  console.log(payment, "pay");

  const remainArr = Object.keys(userData);

  console.log(userData, Number(userData["0-30"]), "testingbefore");

  let remainingAmount = 0;
  if (Number(userData["0-30"]) > 0) {
    remainingAmount += Number(userData["0-30"]);
  } else if (Number(userData["31-60"]) > 0) {
    remainingAmount += Number(userData["31-60"]);
  } else if (Number(userData["61-90"]) > 0) {
    remainingAmount += Number(userData["61-90"]);
  } else if (Number(userData["91-180"]) > 0) {
    remainingAmount += Number(userData["91-180"]);
  } else if (Number(userData["181-365"]) > 0) {
    remainingAmount += Number(userData["181-365"]);
  } else {
    remainingAmount += Number(userData["365+"]);
  }

  const inputField = document.getElementById("myInput");
  // file upload

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const indianNumbers = (num, len) => {
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: len,
    });
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const link = farming.farming_URL + upload_attachment;
    const formData = new FormData();
    formData.append("file", fileUploaded);

    axios
      .post(link, formData)
      .then((res) => {
        setAttachment(res.data.attachment);
        setFileName(res.data.name);
      })
      .catch((err) => console.log(err));
    setFileUpload(fileUploaded.name);
  };

  console.log(datechange, "testing");

  const handleFileClick = () => {
    hiddenFile.current.click();
  };

  const handleFileChange = (e) => {
    const link = farming.farming_URL + upload_attachment;
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(link, formData)
      .then((res) => {
        setAttachment(res.data.attachment);
        setFileName(res.data.name);
      })
      .catch((err) => console.log(err));
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  //   const handleSubmitPayment = () => {
  //     if (payment != "") {
  //       const body = {
  //         is_paid: payment,
  //         inv_id: userData.invoice_id,
  //       };
  //       console.log(body, "body123");
  //       const link = farming.farming_URL + update_payment_status;
  //         axios
  //           .put(link, body)
  //           .then((res) => {
  //             setCheck(!check);
  //             setOpen(false);
  //             successnotify("success");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             warningnotify("oops something went wrong...!");
  //           });
  //     } else {
  //       warningnotify("option not selected");
  //     }
  //   };
  const upPay = () => {
    const body = {
      is_paid:
        Number(payment).toFixed(2) == Number(remainingAmount).toFixed(2)
          ? "yes"
          : "partial",
      inv_id: userData.invoice_id,
      attachment: attachment,
      amount: payment == "" ? 0 : payment,
      remaining_amount: remainingAmount - payment,
      remark: remark,
      // received_on: datechange,
    };
    console.log(body, "2345");
    if (debt || recv) {
      onSubmitClick();
    }
    const link = farming.farming_URL + update_payment_status;
    axios
      .put(link, body)
      .then((res) => {
        setCheck(!check);
        setOpen(false);
        successnotify("success");
        setDateChange("");
        setFileUpload("");
      })
      .catch((err) => {
        console.log(err);
        warningnotify("oops something went wrong...!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.bad_debt == "yes" && payment == "") {
      const body = {
        is_paid:
          Number(payment).toFixed(2) == Number(remainingAmount).toFixed(2)
            ? "yes"
            : "partial",
        inv_id: userData.invoice_id,
        attachment: attachment,
        amount: payment == "" ? 0 : payment,
        remaining_amount: remainingAmount - payment,
        remark: remark,
        // received_on: datechange,
      };
      console.log(body, "2345");
      if (debt || recv) {
        onSubmitClick();
      }
      console.log("move");
      const link = farming.farming_URL + update_payment_status;
      // axios
      //   .put(link, body)
      //   .then((res) => {
      //     setCheck(!check);
      //     setOpen(false);
      //     successnotify("success");
      //     setDateChange("");
      //     setFileUpload("");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     warningnotify("oops something went wrong...!");
      //   });
    } else {
      upPay();
      console.log("uppay");
    }
  };

  const onSubmitClick = (value) => {
    const link = farming.farming_URL + update_invoice;
    const body = {
      invoice_id: userData.invoice_id,
      bad_debt: userData.bad_debt == "no" && debt ? "yes" : "no",
    };

    axios
      .post(link, body)
      .then((res) => {
        setCheck(!check);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const dis = () => {
  //   if (remainArr.length > 0) {
  //     if (userData.bad_debt == "yes") {
  //       return payment > 0 ? false : true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  const customStyles = {
    table: {
      style: {
        minHeight: "100px",
      },
    },
  };

  const paycolumns = [
    {
      name: "Sl No",
      selector: "slno",
      cell: (d) => (
        <div
          className="fs-12  badge rounded-pill badge-soft"
          style={{ backgroundColor: "f07d47" }}
        >
          {d.slno}
        </div>
      ),
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "Amount",
      selector: "amount",
      cell: (d) => (
        <div className="fs-12 fw-bold text-success">
          &#x20B9;&nbsp;{indianNumbers(d.amount, 2)}
        </div>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "Remark",
      selector: "remark",
      cell: (d) => <div className="fs-12 ">{d.remark}</div>,
      sortable: true,
      // width: "80px",
    },
    {
      name: "Recived Date",
      selector: "date",
      cell: (d) => (
        <div className="fs-12 " style={{ color: "#b83016" }}>
          {d.date}
        </div>
      ),
      sortable: true,
      width: "130px",
    },
    {
      name: "Attachment",
      selector: "attachment",
      cell: (d) => (
        <div className="fs-12 " style={{ color: "#b83016" }}>
          {d.attachment ? (
            <a href={d.attachment}>
              <i className=" ri-download-cloud-2-fill fs-24 text-secondary ms-4"></i>
            </a>
          ) : (
            <i className=" ri-cloud-off-fill fs-24 ms-4 text-muted"></i>
          )}
        </div>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },
  ];

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          setOpen(false);
          setPayment("");
          setDebt(null);
          setRecv(null);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
            setPayment("");
            setDebt(null);
            setRecv(null);
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Update Payment</h5>
        </ModalHeader>
        {paysum.length > 0 ? (
          <div className="mx-5 mt-2 mb-4 border border-muted rounded px-3">
            <DataTable
              columns={paycolumns}
              data={paysum}
              style={{ minHeight: "100px !important" }}
              theme="VendorTable"
              className="paysum"
              progressPending={false}
              expandOnRowClicked={true}
              highlightOnHover={true}
              customStyles={customStyles}
            />
          </div>
        ) : (
          <></>
        )}

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Row className="align-items-start">
              <Col xs={"6"} className="mb-2">
                {/* <div>
                <label htmlFor="number" className="form-label">
                  Status
                </label>
                <select
                  name="status"
                  className="form-select mb-3"
                  // defaultValue={edit.status}
                  aria-label="Default select example"
                  required
                  onChange={handlePaymentChange}
                >
                  <option selected value="" disabled>
                    select
                  </option>
                  <option value="partial">partially paid</option>
                  <option value="yes">paid</option>
                </select>
              </div> */}
                {/* <div> */}
                {/* <label htmlFor="basiInput" className="form-label ">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="basiInput"
                    min={0}
                    max={Number(userData.remaining_amount)}
                    onChange={handlePaymentChange}
                  />
                  <p className="text-muted mt-1 fs-10">
                    Maximum Amount To Be Selected {userData.amount}
                  </p>
               
               </div> */}

                <div>
                  <label htmlFor="formtextInput" className="form-label">
                    Amount
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="myInput"
                    min={0}
                    max={Number(remainingAmount)}
                    step="0.01"
                    onChange={handlePaymentChange}
                    disabled={
                      userData.bad_debt == "yes"
                        ? userData.bad_debt == "yes" && !recv
                        : debt
                    }
                  />
                  <div id="passwordHelpBlock" className="form-text fs-10">
                    Amount Must be less than {parseFloat(remainingAmount)}.
                  </div>
                </div>
              </Col>
              <Col xs={"6"}>
                <label htmlFor="basiInput" className="form-label ">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="basiInput"
                  onChange={(e) => setRemark(e.target.value)}
                />
                <div id="passwordHelpBlock" className="form-text fs-10">
                  Enter Remarks
                </div>
              </Col>
              <Col xs={"6"}>
                <div className="d-flex gap-2 aign-items-center mb-2">
                  <div>
                    {userData.bad_debt == "no" ? (
                      <input
                        type="checkbox"
                        // defaultChecked={userData.bad_debt == "no" ? false : true}
                        onChange={(e) => {
                          setDebt(e.target.checked);
                          setPayment("");
                          inputField.value = "";
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        // defaultChecked={userData.bad_debt == "no" ? false : true}
                        onChange={(e) => {
                          setRecv(e.target.checked);
                          setPayment("");
                          inputField.value = "";
                        }}
                      />
                    )}
                  </div>
                  <div className="fs-11 text-muted">
                    {userData.bad_debt == "no"
                      ? "Mark as bad debt"
                      : "Move to Recievables"}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col xs={6}>
                <div>
                  <Label htmlFor="exampleInputdate" className="form-label">
                    Input Date
                  </Label>
                  <Input
                    type="date"
                    max={moment(new Date()).format("YYYY-MM-DD")}
                    className="form-control"
                    id="exampleInputdate"
                    onChange={(e) => setDateChange(e.target.value)}
                  />
                </div>
              </Col> */}

              <Col xs={"6"}>
                <div>
                  <Label htmlFor="iconrightInput" className="form-label">
                    File Upload
                  </Label>
                  <div className="form-icon right">
                    <Input
                      type="text"
                      value={fupload}
                      className="form-control form-control-icon"
                      id="iconrightInput"
                      placeholder="file upload"
                    />
                    <i
                      onClick={handleClick}
                      className="ri-upload-cloud-2-fill"
                    ></i>
                  </div>
                </div>

                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalHeader className="justify-content-end">
            <button
              type="submit"
              className="btn btn- waves-effect waves-light mb-4 "
              disabled={userData.bad_debt == "yes" && !recv}
              // onClick={handleSubmitPayment}
            >
              Update
            </button>
          </ModalHeader>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentModal;
