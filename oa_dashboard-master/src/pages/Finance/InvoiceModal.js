import moment from "moment";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "./invoice.css";
const InvoiceModal = ({ invMod, setInvMod, inData, innId, year }) => {
  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={invMod}
        fullscreen
        toggle={() => {
          setInvMod(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setInvMod(false);
          }}
        >
          {/* <h5 style={{ color: "#3f5289 " }}>Edit</h5> */}
        </ModalHeader>
        <ModalBody>
          <div className="inv_contain">
            <span className="tax_head">Tax Invoice</span>
            <div className="mt-3 mb-4 d-flex justify-content-between">
              <img
                src={window.location.origin + "/taskmo_new.png"}
                alt="ott"
                className="logo_left_css"
              />
              <div className="date_data_css">
                <span className="right_tax_css">
                  #TMB/{year}/{innId}
                </span>
                <span className="right_tax_css">
                  Date: {moment(inData.date).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column">
              <span className="head_bill_css">Bill To</span>
              <span className="legal_name_css">{inData.companyname}</span>
              <span className="legal_name_css widt_css">{inData.address}</span>
              <div>
                <span className="head_bill_css mt-1">GSTIN : </span>
                <span className="legal_name_css">{inData.gst}</span>
              </div>
              <div>
                <span className="head_bill_css">Place of Supply : </span>
                <span className="legal_name_css">{inData.state}</span>
              </div>
            </div>
            <table
              className="table table-bordered my-3"
              style={{ width: "100%" }}
            >
              <thead className="bg-gray-200">
                <tr>
                  <th scope="col" style={{ width: "50%" }}>
                    <b
                      className="float-left"
                      style={{ fontSize: "15px", fontWeight: 700 }}
                    >
                      Description
                    </b>
                  </th>
                  <th style={{ width: "25%" }}>
                    <b
                      className="float-right"
                      style={{ fontSize: "15px", fontWeight: 700 }}
                    >
                      HSN/SAC
                    </b>
                  </th>
                  <th style={{ width: "25%" }}>
                    <b
                      className="float-right"
                      style={{ fontSize: "15px", fontWeight: 700 }}
                    >
                      Amount (Rs.)
                    </b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{ verticalAlign: "bottom !important", width: "50%" }}
                  >
                    <h1 className="text-dark">
                      <b
                        style={{
                          marginBottom: "5px",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {inData.description}
                      </b>
                    </h1>
                  </td>
                  <td
                    style={{ verticalAlign: "middle !important", width: "25%" }}
                  >
                    <b
                      className="float-right"
                      style={{ fontSize: "16px", textAlign: "center" }}
                    >
                      {998397}
                    </b>
                  </td>
                  <td
                    style={{ verticalAlign: "middle !important", width: "25%" }}
                  >
                    <b
                      className="float-right"
                      style={{ fontSize: "16px", textAlign: "center" }}
                    >
                      {inData.amount}
                    </b>
                  </td>
                </tr>

                {inData.state === "Karnataka (KA)" ? (
                  <>
                    <tr>
                      <td>
                        <b
                          style={{ marginBottom: "5px", fontSize: "14px" }}
                          className="float-right"
                        >
                          CGST (9%)
                        </b>
                      </td>
                      <td>
                        <b
                          style={{ marginBottom: "5px", fontSize: "16px" }}
                          className="float-right"
                        ></b>
                      </td>
                      <td>
                        <b
                          style={{ marginBottom: "5px", fontSize: "16px" }}
                          className="float-right"
                        >
                          {inData.cgst}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b
                          style={{ marginBottom: "5px", fontSize: "14px" }}
                          className="float-right"
                        >
                          SGST (9%)
                        </b>
                      </td>
                      <td>
                        <b
                          style={{ marginBottom: "5px", fontSize: "16px" }}
                          className="float-right"
                        ></b>
                      </td>
                      <td>
                        <b
                          style={{ marginBottom: "5px", fontSize: "16px" }}
                          className="float-right"
                        >
                          {inData.sgst}
                        </b>
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td>
                      <b
                        style={{ marginBottom: "5px", fontSize: "14px" }}
                        className="float-right"
                      >
                        IGST (18%)
                      </b>
                    </td>
                    <td>
                      <b
                        style={{ marginBottom: "5px", fontSize: "16px" }}
                        className="float-right"
                      ></b>
                    </td>
                    <td>
                      <b
                        style={{ marginBottom: "5px", fontSize: "16px" }}
                        className="float-right"
                      >
                        {inData.igst}
                      </b>
                    </td>
                  </tr>
                )}

                <tr className="bg-gray-100">
                  <td>
                    <b
                      style={{ marginBottom: "5px", fontSize: "14px" }}
                      className="float-right"
                    >
                      Total Amount
                    </b>
                  </td>
                  <td>
                    <b
                      style={{ marginBottom: "5px", fontSize: "14px" }}
                      className="float-right"
                    ></b>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>
                    <b
                      style={{ marginBottom: "5px", fontSize: "16px" }}
                      className="float-right"
                    >
                      {inData.totalAmount}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-center">
                    <b
                      style={{
                        marginBottom: "5px",
                        fontSize: "15px",
                        float: "right",
                      }}
                      className="float-right; "
                    >
                      Amount In Words : {inData.amount_in_words} only
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ paddingBottom: "15px" }}>
              <div className="invoice-summary">
                <span>
                  <img
                    src={window.location.origin + "/Seal.png"}
                    alt=""
                    width="200"
                    border="0"
                    style={{
                      width: "100%",
                      maxWidth: "150px",
                      height: "auto",
                      marginTop: "5px",
                      float: "right",
                    }}
                  />
                </span>
              </div>
            </div>
            <table
              className="table mb-4"
              style={{ width: "99%", borderBottom: "1px solid #898585" }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "100%",
                      borderRight: "1px solid #DEE2E6",
                      borderTop: "1px solid #DEE2E6",
                    }}
                  >
                    <h4 className="font-weight-bold text-dark">
                      Account Details:
                    </h4>
                    <h4
                      className="text-dark"
                      style={{ fontSize: "15px", marginBottom: "0rem" }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "15px",
                        }}
                      >
                        Account Name :
                      </span>
                      &nbsp;
                      <span style={{ fontSize: "15px" }}>
                        STELLARSLOG TECHNOVATION PVT LTD
                      </span>
                      <br />
                      <span
                        style={{
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "15px",
                        }}
                      >
                        Bank Name :
                      </span>
                      &nbsp;
                      <span style={{ fontSize: "15px" }}>Canara Bank </span>
                      <br />
                      <span
                        style={{
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "15px",
                        }}
                      >
                        Account No. :
                      </span>
                      &nbsp;
                      <span style={{ fontSize: "15px" }}>0414261017351</span>
                      <br />
                      <span
                        style={{
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "15px",
                        }}
                      >
                        IFSC Code :
                      </span>
                      &nbsp;{" "}
                      <span style={{ fontSize: "15px" }}>CNRB0000414</span>
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "12px", marginBottom: "0rem" }}>
                STELLARSLOG TECHNOVATION PVT LTD
                <br />
                Mohan Chambers, #31, 1st Main Road, 3rd Phase JP Nagar,
                Bangalore - 560078 <br />
                GSTIN : 29AAWCS4663E1ZP
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default InvoiceModal;
