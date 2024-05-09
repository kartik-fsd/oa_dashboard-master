import axios from "axios";
import moment from "moment";
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createInv } from "../../assets/utils/farmingBase";
import { farming } from "../../globalConfig";
import { successnotify, warningnotify } from "../Toasts";

const CreateInvModal = ({
  open,
  setOpen,
  data,
  setFinCheck,
  finCheck,
  year,
  month,
}) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  console.log(moment(currentDate).format("MMMM"), "gfdt");

  console.log(data, "month");

  // const year = 2023;
  // const month = 3;

  // Get the first date of the specified month
  const firstDateOfMonth = new Date(year, month, 1);

  // Get the last date of the specified month
  const lastDateOfMonth = new Date(year, month + 1, 0);

  const firstDate = moment(firstDateOfMonth).format("YYYY-MM-DD");
  const lastDate = moment(lastDateOfMonth).format("YYYY-MM-DD");

  console.log(firstDate, lastDate, "hje");

  const today = new Date();

  const currentYear = today.getFullYear();
  const financialYearStart = new Date(currentYear, 3, 1); // April 1st
  const currentFinancialYear =
    today < financialYearStart ? currentYear - 1 : currentYear;

  console.log(today, "year");

  const handleCreateInv = async () => {
    const link = farming.farming_URL + createInv;
    const body = {
      start_date: firstDate,
      end_date: lastDate,
      sow_id: data.sow_id,
      billing_status: "project_acc",
      client_id: data.client_id,
      year: currentFinancialYear,
    };

    try {
      const res = await axios.post(link, body);
      successnotify("success");
      setOpen(false);
      setFinCheck(!finCheck);
      console.log(res, "fsdf");
    } catch (error) {
      warningnotify("oops something went wrong...!");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={open}
        size="lg"
        toggle={() => {
          setOpen(false);
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            setOpen(false);
          }}
        >
          <h5 style={{ color: "#0ab39c " }}>Create Invoice</h5>
        </ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <div>
              <img
                src={"/animation_500_lg0rn974 (1).gif"}
                alt="deleteimage"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                {`Are you sure to create invoice account for ${
                  data.project_title
                } for the
                month of ${moment(today).format("MMMM")}`}
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              data-bs-dismiss="modal"
              onClick={() => setOpen(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn w-sm btn-success "
              id="delete-record"
              onClick={() => handleCreateInv()}
            >
              Yes
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateInvModal;
