import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

//import Images

import avatar2 from "../../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../../../assets/images/users/avatar-10.jpg";

import btc from "../../../../assets/images/svg/crypto-icons/btc.svg";
import eth from "../../../../assets/images/svg/crypto-icons/eth.svg";
import ltc from "../../../../assets/images/svg/crypto-icons/ltc.svg";
import xmr from "../../../../assets/images/svg/crypto-icons/xmr.svg";
import ant from "../../../../assets/images/svg/crypto-icons/ant.svg";
import sol from "../../../../assets/images/svg/crypto-icons/sol.svg";
import fil from "../../../../assets/images/svg/crypto-icons/fil.svg";
import aave from "../../../../assets/images/svg/crypto-icons/aave.svg";
import ada from "../../../../assets/images/svg/crypto-icons/ada.svg";
import axios from "axios";
import {
  close_training,
  fse_training_list,
} from "../../../../assets/utils/sow";
import { api } from "../../../../globalConfig";
import { APIClient } from "../../../../assets/config/sessionToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicTable = (props) => {
  const data = props.data;
  const date = new Date();

  const handleClickCloseTraining = (d) => {
    const path = api.OA_URL + close_training;
    const PostData = {
      train_id: d.training_id,
    };

    axios
      .patch(path, PostData)
      .then((res) => {
        toast("Closed success", {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-success text-white",
        });
        props.setCheck(!props.check);
      })
      .catch((err) => console.log(err, "err"));
  };
  const handleDelete = ({ training_id }) => {
    const path = api.OA_URL + close_training;
    const dataEnter = {
      train_id: training_id,
    };
    axios
      .patch(path, dataEnter)
      .then((res) => {
        if (res.data.error) {
          toast("Already closed", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("Closed", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
          props.setCheck(!props.check);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetchFSE = ({ training_id }) => {
    const path = api.OA_URL + fse_training_list;

    const sample = new APIClient();

    sample
      .get(path, { train_id: training_id })
      .then((res) => {
        if (res.data.error) {
          toast(res.data.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-danger text-white",
          });
        } else {
          props.setCheck(!props.check);
          props.set_widgets_activities(res.data.data);
          props.set_tog_varying(!props.tog_varying);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Title</span>,
      selector: (row) => "(" + row.title + ")" + " " + row?.project_title,
      sortable: true,
      width: "500px",
    },
    {
      name: <span className="font-weight-bold fs-13">Start Date</span>,
      selector: (row) => row.start_date,
      sortable: true,
      width: "150px",
    },

    {
      name: <span className="font-weight-bold fs-13">Training Status</span>,
      // selector: (row) => row.training_status,
      width: "200px",
      center: true,
      cell: (d) => {
        return (
          <div style={{ textAlign: "center" }}>
            {d.training_status == "ongoing" &&
            moment(date).format("DD-MM-YYYY HH:mm") <
              moment(d.start_date).format("DD-MM-YYYY HH:mm") ? (
              <span className="badge text-bg-warning">Scheduled</span>
            ) : d.training_status == "ongoing" ||
              (moment(date).format("DD-MM-YYYY HH:mm") >=
                moment(d.start_date).format("DD-MM-YYYY HH:mm") &&
                moment(date).format("DD-MM-YYYY HH:mm") <=
                  moment(d.end_date).format("DD-MM-YYYY HH:mm")) ? (
              <span className="badge text-bg-success">Ongoing</span>
            ) : d.training_status == "completed" ||
              d.training_status == "closed" ||
              moment(date).format("DD-MM-YYYY HH:mm") <
                moment(d.end_date).format("DD-MM-YYYY HH:mm") ? (
              <span className="badge text-bg-danger">Completed</span>
            ) : (
              <span className="badge text-bg-danger">Completed</span>
            )}
          </div>
        );
      },

      sortable: true,
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Title</span>,
    //   selector: (row) => row.title,
    //   sortable: true,
    // },

    {
      name: <span className="font-weight-bold fs-13">Slots Filled</span>,
      // selector: (row) => row.count,
      cell: (d) => <div>{d.applied_count}</div>,
      sortable: true,
      width: "100px",
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Applied Count</span>,
    //   selector: (row) => row.applied_count,
    //   sortable: true,
    //   width: "100px",
    // },
    // {
    //   name: <span className="font-weight-bold fs-13">Training Link</span>,
    //   // selector: (row) => row.training_link,
    //   width: "100px",
    //   center: true,
    //   cell: (d) => (
    //     <div style={{ textAlign: "center" }}>
    //       <a href={d.training_link} target="_blank">
    //         {" "}
    //         <button
    //           type="button"
    //           className="btn btn-secondary waves-effect waves-light p-1 px-2"
    //         >
    //           Link
    //         </button>
    //       </a>
    //     </div>
    //   ),
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      width: "100px",
      cell: (d) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="edit-item-btn"
                onClick={() => handleFetchFSE(d)}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                View Training
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
                <a href={d?.training_link} target="_blank">
                  <i className="ri-link align-bottom me-2 text-muted"></i>
                  Training Link
                </a>
              </DropdownItem>
              <DropdownItem className="remove-item-btn">
                <a href={d.training_doc} target="_blank">
                  <i className="ri-file-2-fill align-bottom me-2 text-muted"></i>
                  Training Document
                </a>
              </DropdownItem>
              {d.applied_count == 0 && !(d.training_status == "completed") && (
                <DropdownItem
                  className="remove-item-btn"
                  onClick={() => handleClickCloseTraining(d)}
                >
                  <i className="ri-file-2-fill align-bottom me-2 text-muted"></i>
                  {"close training"}
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
      // width: "100px",
    },
  ];

  return <DataTable columns={columns} data={data} pagination />;
};

export { BasicTable };
