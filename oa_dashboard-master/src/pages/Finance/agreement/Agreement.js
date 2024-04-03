import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { PDFViewer } from "react-view-pdf/lib";
import {
  getAgreement,
  getEinvoice,
  upload_agreement,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";
import "./agreement.css";

const Agreement = (data) => {
  const [agreement, setAgreement] = useState("");
  const [einvoice, setEinvoice] = useState("");
  const hiddenFile = useRef(null);
  const hiddenFile2 = useRef(null);

  console.log(data.data.invoice_id, "idd");

  const imageUpload = (e, type) => {
    const link = farming.farming_URL + upload_agreement;
    const axiosData = new FormData();
    axiosData.append("file", e.target.files[0]);
    axiosData.append("id", data.data.invoice_id);
    axiosData.append("type", type);
    axios
      .post(link, axiosData)
      .then((res) => {
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: `success`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // window.location.reload();
        successnotify("success");
      })
      .catch((e) => {
        // Swal.fire({
        //   position: "center",
        //   icon: "error",
        //   title: `something went wrong`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        warningnotify("oops something went erong...!");
      });
  };

  useEffect(() => {
    const link = farming.farming_URL + getAgreement;
    const path = farming.farming_URL + getEinvoice;
    const postData = {
      inv_id: data.data.invoice_id,
    };
    axios
      .post(link, postData)
      .then((res) => {
        setAgreement(res.data.agreement);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .post(path, postData)
      .then((res) => {
        setEinvoice(res.data.e_invoice);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <div className="add_agreement">
        {agreement ? (
          //   <button className="button_agree">
          //     <CloudDoneIcon className="mr-2" />
          //     Agreement Updated
          //   </button>

          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
          >
            <i className=" ri-thumb-up-fill align-middle fs-14 me-2 "></i>{" "}
            Agreement Updated
          </button>
        ) : (
          //   <label className="button_agree">
          //     <CloudUploadIcon className="mr-2" />
          //     Agreement
          //     <input
          //       type="file"
          //       onChange={(e) => {
          //         imageUpload(e, "agreement");
          //       }}
          //     />
          //   </label>
          <>
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
              onClick={() => hiddenFile.current.click()}
            >
              <i className="ri-upload-cloud-2-fill align-middle fs-14 me-2 "></i>
              Agreement
            </button>

            <input
              type="file"
              onChange={(e) => {
                imageUpload(e, "agreement");
              }}
              ref={hiddenFile}
              style={{ display: "none" }}
            />
          </>
        )}
        {einvoice ? (
          //   <button className="button_agree mr-2">
          //     <CloudDoneIcon className="mr-2" />
          //     E-Invoice Updated
          //   </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
          >
            <i className=" ri-thumb-up-fill align-middle fs-14 me-2  "></i>{" "}
            E-Invoice Updated Updated
          </button>
        ) : (
          //   <label className="button_agree mr-2">
          //     <CloudUploadIcon className="mr-2" />
          //     E-Invoice
          //     <input
          //       type="file"
          //       onChange={(e) => {
          //         imageUpload(e, "e_invoice");
          //       }}
          //     />
          //   </label>
          <>
            <button
              type="button"
              className="btn btn-primary  waves-effect waves-light"
              onClick={() => hiddenFile2.current.click()}
            >
              <i className="  ri-upload-cloud-2-fill align-middle fs-14 me-2 "></i>
              E-Invoice
            </button>

            <input
              type="file"
              onChange={(e) => {
                imageUpload(e, "e_invoice");
              }}
              ref={hiddenFile2}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>
      <div className="mt-5 agreement_box">
        <PDFViewer url={einvoice} />
        <PDFViewer url={agreement} />
      </div>
    </div>
  );
};

export default Agreement;
