import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import FseDetails from "../../../../components/common/FseDetails";
import classStyle from "../payout.module.css";
import DataTableExtensions from "react-data-table-component-extensions";
import { CSVLink, CSVDownload } from "react-csv";
import { api } from "../../../../globalConfig";
import {
  download_checkin,
  fse_leads_data,
  sow_fse_list,
} from "../../../../assets/utils/sow";
import { useLocation, useParams } from "react-router-dom";
import { APIClient } from "../../../../assets/config/sessionToken";
import Select, { components } from "react-select";
import { assign_tasker } from "../../../../assets/utils/SupplyApi";
import { toast } from "react-toastify";
import AreYouSureModal from "../../../../components/common/AreYouSureModal";

const formatOptionLabel = ({ label, data }) => {
  return (
    <div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div style={{ width: "30px" }}>
          {!data.profile_image.includes("https") ? (
            <>
              <div className="avatar-xxs">
                <div
                  className="avatar-title rounded-circle bg-soft-primary text-primary"
                  style={{ textTransform: "capitalize" }}
                >
                  {data.full_name[0]}
                </div>
              </div>
            </>
          ) : (
            <img
              src={data.profile_image}
              alt={data?.label}
              style={{
                width: "24px",
                height: "24px",
                marginRight: "8px",
                borderRadius: "12px",
              }}
            />
          )}
        </div>

        <div style={{ minWidth: "200px", textTransform: "capitalize" }}>
          {data?.full_name}
        </div>
        <div>
          PID&nbsp;:&nbsp;
          {/* {"("} */}
          {data?.user_id}
          {/* {")"} */}
        </div>
      </div>
    </div>
  );
};

const BasicTable = (props) => {
  const data = props.data;
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [dataArray, setDataArray] = React.useState({});
  const [viewArray, setViewArray] = React.useState([]);
  const [colArray, setColArray] = React.useState([]);
  const [imageData, setImageData] = React.useState("");
  const [rowData, setRowData] = React.useState({});
  const [switchData, setSwitchData] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tableDataArray, setTableDataArray] = React.useState([]);
  const [empDet, setEmpDet] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [allTaskerData, setAllTaskerData] = React.useState([]);
  console.log(allTaskerData, "testingdatga");
  const [atUserId, setAtuserId] = React.useState("");
  const [atLeadId, setAtLeadId] = React.useState("");

  // areyousure modal data for assign tasker
  const [open3, setOpen3] = useState(false);
  const closeConfirm3 = () => {
    setOpen3(!open3);
  };

  const downloadUrl = api.OA_URL + download_checkin + `?sow_id=${id}`;
  const pathname = api.OA_URL + fse_leads_data;

  const promise = new APIClient();
  const location = useLocation();
  let sowwID = location?.pathname?.split("/")[2].split("-")[0];
  const getTaskersData = () => {
    setIsLoading(true);
    let pathname = api.OA_URL + sow_fse_list;

    axios
      .get(pathname, { params: { sow_id: sowwID, switch_type: "" } })
      .then((res) => {
        setIsLoading(false);
        // console.log(res.data.data, "testingdatga");
        let ot = res.data.data.map((item) => ({
          label: item.user_id,
          value: item.user_id,
          data: { ...item },
        }));

        setAllTaskerData(ot);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleLeads = (row) => {
    setRowData(row);
    const urlData = row?.table_data + `&lead_id=${row?.main_lead}`;

    axios
      .get(urlData)
      .then((res) => {
        setOpen(true);
        const colString = res.data.col;
        const colData = colString.slice(0, -1).split(",");
        const string = res.data.view;
        const data = string.slice(0, -1).split(",");
        setViewArray(data);

        setColArray(colData);
        setDataArray(res.data.leads[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    promise
      .get(pathname, { sow_id: id, overall: switchData && "partial" })
      .then((res) => {
        setTableDataArray(res.data?.leads);
      });
  };
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Lead Id</span>,
      selector: (row) => row.main_lead,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Date</span>,
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Merchant Name</span>,
      selector: (row) => row.merchant_name,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Tasker Name</span>,
      selector: (row) => row.full_name,
      sortable: true,
      cell: (d) => (
        <div className="">
          <span> {d.full_name}</span>
          <span className="fs-12 "></span>
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">QC L1</span>,
      selector: (row) => row.client_status,
      sortable: true,
      omit: true,
      cell: (d) => (
        <div>
          {d.client_status == "pending" ? (
            <span className="badge text-bg-warning" style={{ width: "70px" }}>
              {d.client_status}
            </span>
          ) : d.client_status == "approved" ? (
            <span className="badge text-bg-success" style={{ width: "70px" }}>
              {d.client_status}
            </span>
          ) : d.client_status == "rejected" ? (
            <span className="badge text-bg-danger" style={{ width: "70px" }}>
              {d.client_status}
            </span>
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Client QC</span>,
      selector: (row) => row.internal_qc_status,
      sortable: true,
      cell: (d) => (
        <div>
          {d.internal_qc_status == "pending" ? (
            <span className="badge text-bg-warning" style={{ width: "70px" }}>
              {d.internal_qc_status}
            </span>
          ) : d.internal_qc_status == "approved" ? (
            <span className="badge text-bg-success" style={{ width: "70px" }}>
              {d.internal_qc_status}
            </span>
          ) : d.internal_qc_status == "rejected" ? (
            <span className="badge text-bg-danger" style={{ width: "70px" }}>
              {d.internal_qc_status}
            </span>
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Final QC</span>,
      selector: (row) => row.final_qc,
      sortable: true,
      cell: (d) => (
        <div>
          {d.final_qc == "pending" ? (
            <span className="badge text-bg-warning" style={{ width: "70px" }}>
              {d.final_qc}
            </span>
          ) : d.final_qc == "approved" ? (
            <span className="badge text-bg-success" style={{ width: "70px" }}>
              {d.final_qc}
            </span>
          ) : d.final_qc == "rejected" ? (
            <span className="badge text-bg-danger" style={{ width: "70px" }}>
              {d.final_qc}
            </span>
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: true,
      width: "100px",
      cell: (row) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end ">
              <DropdownItem
                onClick={() => {
                  handleLeads(row);
                }}
                className="d-flex align-items-center"
              >
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>View
                Details
              </DropdownItem>
              {!row.user_id ? (
                <DropdownItem
                  onClick={() => {
                    setModalOpen(true);
                    setAtLeadId(row?.main_lead);
                    getTaskersData();
                  }}
                  className="d-flex align-items-center"
                >
                  <i className="ri-add-line align-bottom me-2 text-muted"></i>
                  Assign Tasker
                </DropdownItem>
              ) : (
                ""
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  const tableData = {
    columns: columns,
    data:
      window.location.pathname == "/business-dashboard/project-details"
        ? data
        : tableDataArray.length > 0
        ? tableDataArray
        : data,
  };
  //, background: "#F3F3F8"

  // const handleDownload = () => {
  //   axios
  //     .get(downloadUrl, { params: { sow_id: id.split("-")[0] } })
  //     .then((res) => {})
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };

  const handleAddEmpDetWithModal = (e) => {
    e.preventDefault();
    setOpen3(true);
  };

  const handleEmpChange = (e) => {
    const { name, value } = e.target;
    setEmpDet({ ...empDet, [name]: value });
  };

  const handleAddEmpDet = () => {
    let apidata = assign_tasker;

    let body = {
      user_id: atUserId,
      sow_id: sowwID,
      lead_id: atLeadId,
    };

    axios
      .put(apidata, body)
      .then((res) => {
        if (res.data.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast(res?.data?.message, {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
        }
        promise.get(pathname, { sow_id: id, overall: false }).then((res) => {
          setTableDataArray(res.data?.leads);
        });
        setModalOpen(false);
      })
      .catch((err) => console.log(err, "err"));
    // const link = api.VENDOR_URL + add_vendor;

    // const body = empDet;

    // const comp = Object.values(body).length >= 4;

    // if (comp) {
    //   axios
    //     .post(link, body)
    //     .then((res) => {
    //       if (res.data.error) {
    //         warningnotify(res.data.message);
    //       } else {
    //         const dataEnter = {
    //           asm_id: res.data?.vendor_id,
    //         };
    //         axios
    //           .post(sendWhatsappForSp, dataEnter)
    //           .then((res) => {
    //             successnotify("success");
    //             setOpen(false);
    //           })
    //           .catch((err) => {
    //             warningnotify("oops something went wrong...!");
    //           });
    //       }
    //     })
    //     .catch((err) => {
    //       warningnotify("oops something went wrong...!");
    //     });
    // } else {
    //   warningnotify("Please Enter All Details");
    // }
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <Card>
            <CardHeader style={{ marginBottom: "-5px" }}>
              <div
                className="form-check form-switch form-switch-primary"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  style={{ width: "30px" }}
                  onChange={(e) => {
                    setSwitchData(e.target.checked);
                    handleChange(e.target.checked);
                  }}
                  // checked={
                  //   rowData?.sow_status !== "accepted" ? "checked" : ""
                  // }
                />
                <Label
                  className="form-check-label fs-14"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {switchData ? "Not Completed Tasks " : "Completed Tasks"}
                </Label>
              </div>
              <div
                style={{
                  float: "right",
                  marginTop: "-5px",
                  marginRight: "220px",
                }}
              >
                <a
                  href={downloadUrl}
                  className="btn btn-primary mx-3"
                  type="submit"
                  id="button-addon1"
                  // onClick={handleDownload}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className=" ri-download-2-line align-middle me-1"></i>
                  Checkin
                </a>
                <CSVLink className="btn btn-primary " data={data}>
                  <i className=" ri-download-2-line align-middle me-1"></i>
                  Download
                </CSVLink>
              </div>
            </CardHeader>
            <CardBody>
              <DataTableExtensions
                {...tableData}
                export={false}
                filterPlaceholder={`Search`}
                // style={{
                //   paddingRight: "25px !important",
                //   marginRight: "130px !important",
                // }}
              >
                <DataTable columns={columns} data={data} pagination />
              </DataTableExtensions>
            </CardBody>
          </Card>
          <Modal
            // id="signupModals"
            size="lg"
            // className="modal-fullscreen"
            // id="exampleModalFullscreen"
            tabIndex="-1"
            isOpen={open}
            toggle={() => {
              setOpen(false);
            }}
            centered={true}
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                setOpen(false);
              }}
            >
              {rowData && <FseDetails rowData={rowData} />}
            </ModalHeader>
            <ModalBody style={{ overflowX: "scroll" }}>
              <Row>
                <Col md={12} className="d-flex justify-content-between">
                  {/* <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">QC Recording</h5>
                    </CardHeader>
                    <CardBody style={{ minHeight: "150px" }}>
                      <h6>recording coming soon</h6>
                    </CardBody>
                  </Card> */}
                  {/* <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">
                        QC L1 -{" "}
                        <span>
                          {rowData?.internal_qc_status == "pending" ? (
                            <span
                              className="badge text-bg-warning"
                              style={{ width: "70px" }}
                            >
                              {rowData?.internal_qc_status}
                            </span>
                          ) : rowData?.internal_qc_status == "approved" ? (
                            <span
                              className="badge text-bg-success"
                              style={{ width: "70px" }}
                            >
                              {rowData?.internal_qc_status}
                            </span>
                          ) : rowData?.internal_qc_status == "rejected" ? (
                            <span
                              className="badge text-bg-danger"
                              style={{ width: "70px" }}
                            >
                              {rowData?.internal_qc_status}
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      </h5>
                    </CardHeader>
                    <CardBody style={{ minHeight: "70px" }}>
                      <h6 className="mute">
                        {rowData?.qc_remark?.length > 0
                          ? rowData?.qc_remark
                          : "No Remarks added"}
                      </h6>
                    </CardBody>
                  </Card> */}
                  <Card style={{ flexBasis: "350px" }}>
                    <CardHeader>
                      <h5 className="card-title mb-0">
                        QC L2 -{" "}
                        <span>
                          {rowData?.client_status == "pending" ? (
                            <span
                              className="badge text-bg-warning"
                              style={{ width: "70px" }}
                            >
                              {rowData?.client_status}
                            </span>
                          ) : rowData?.client_status == "approved" ? (
                            <span
                              className="badge text-bg-success"
                              style={{ width: "70px" }}
                            >
                              {rowData?.client_status}
                            </span>
                          ) : rowData?.client_status == "rejected" ? (
                            <span
                              className="badge text-bg-danger"
                              style={{ width: "70px" }}
                            >
                              {rowData?.client_status}
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      </h5>
                    </CardHeader>
                    <CardBody style={{ minHeight: "70px" }}>
                      <h6 className="mute">
                        {rowData?.client_status?.length > 0
                          ? rowData?.client_status
                          : "No Remarks added"}
                      </h6>
                    </CardBody>
                  </Card>
                  <Card style={{ flexBasis: "350px" }}>
                    <CardHeader>
                      <h5 className="card-title mb-0">
                        QC L3 -{" "}
                        <span>
                          {rowData?.final_qc == "pending" ? (
                            <span
                              className="badge text-bg-warning"
                              style={{ width: "70px" }}
                            >
                              {rowData?.final_qc}
                            </span>
                          ) : rowData?.final_qc == "approved" ? (
                            <span
                              className="badge text-bg-success"
                              style={{ width: "70px" }}
                            >
                              {rowData?.final_qc}
                            </span>
                          ) : rowData?.final_qc == "rejected" ? (
                            <span
                              className="badge text-bg-danger"
                              style={{ width: "70px" }}
                            >
                              {rowData?.final_qc}
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      </h5>
                    </CardHeader>
                    <CardBody style={{ minHeight: "70px" }}>
                      <h6 className="mute">
                        {rowData?.final_qc?.length > 0
                          ? rowData?.final_qc
                          : "No Remarks added"}
                      </h6>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={12}>
                  <table style={{ width: "100%" }}>
                    <tr className={classStyle.tr_leads} key="111">
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          Lead Name
                        </p>
                      </td>
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          Lead Details
                        </p>
                      </td>
                    </tr>
                    <tr className={classStyle.tr_leads} key="121">
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          main lead id
                        </p>
                      </td>
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          {dataArray?.main_lead_id}
                        </p>
                      </td>
                    </tr>
                    <tr className={classStyle.tr_leads} key="131">
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          activity date
                        </p>
                      </td>
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          {dataArray?.activity_date}
                        </p>
                      </td>
                    </tr>
                    <tr className={classStyle.tr_leads} key="141">
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          customer name
                        </p>
                      </td>
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          {dataArray?.customer_name}
                        </p>
                      </td>
                    </tr>
                    <tr className={classStyle.tr_leads} key="151">
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          customer number
                        </p>
                      </td>
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          {dataArray?.customer_number}
                        </p>
                      </td>
                    </tr>
                    <tr className={classStyle.tr_leads} key="161">
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          final qc status
                        </p>
                      </td>
                      <td className={classStyle.td_leads}>
                        <p style={{ margin: "0", color: "#495057" }}>
                          {dataArray?.final_qc_status}
                        </p>
                      </td>
                    </tr>
                    {colArray &&
                      colArray?.map((col, index) => {
                        return (
                          <>
                            <tr className={classStyle.tr_leads} key={index}>
                              <td className={classStyle.td_leads}>
                                <p style={{ margin: "0", color: "#495057" }}>
                                  {col.split("_").join(" ")}
                                </p>
                              </td>
                              <td className={classStyle.td_leads}>
                                <p style={{ margin: "0", color: "#495057" }}>
                                  {dataArray?.[`${col}`]}
                                </p>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    {viewArray &&
                      viewArray?.map((col, index) => {
                        return (
                          <>
                            <tr className={classStyle.tr_leads} key={index}>
                              <td className={classStyle.td_leads}>
                                <p style={{ margin: "0", color: "#495057" }}>
                                  {col.split("_").join(" ")}
                                </p>
                              </td>
                              <td className={classStyle.td_leads}>
                                {/* <p style={{ margin: "0", color: "#495057" }}>
                                {dataArray?[`${col}`]}
                              </p> */}
                                {/* <button
                                type="button"
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => {
                                  setOpen2(true);
                                  setImageData(dataArray?[`${col}`]);
                                }}
                              >
                                View
                              </button> */}

                                {
                                  <img
                                    // style={{display:'inline-block',padding:'8px 0 8px 0'}}
                                    src={dataArray?.[`${col}`]}
                                    alt=""
                                    className="rounded avatar-md py-2"
                                    onClick={() => {
                                      setOpen2(true);
                                      setImageData(dataArray?.[`${col}`]);
                                    }}
                                  />
                                }
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </table>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={open2}
            toggle={() => {
              setOpen2(false);
            }}
            centered={true}
          >
            <img src={imageData} className="img-fluid" alt="image_pho" />
          </Modal>
          <Modal
            isOpen={modalOpen}
            toggle={() => {
              setModalOpen(false);
            }}
            centered={true}
          >
            <ModalHeader
              className="p-3"
              toggle={() => {
                setModalOpen(false);
                // setOpen(false);
              }}
            >
              Assign Tasker
            </ModalHeader>
            <form onSubmit={handleAddEmpDetWithModal}>
              <ModalBody>
                <Row>
                  <Col xl={"12"}>
                    <div className="mt-3">
                      <label htmlFor="basiInput" className="form-label">
                        User ID
                      </label>
                      <Select
                        options={allTaskerData}
                        // components={{ Option }}

                        // options={options}
                        formatOptionLabel={formatOptionLabel}
                        onChange={(e) => {
                          setAtuserId(e.value);
                        }}
                      />
                      {/* <input
                        type="number"
                        className="form-control"
                        id="basiInput"
                        name="user_id"
                        required
                        onChange={handleEmpChange}
                      /> */}
                    </div>
                  </Col>
                  {/* <Col xl={"12"} className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="basiInput"
                    name="email_id"
                    required
                    onChange={handleEmpChange}
                  />
                </div>
              </Col>
              <Col xl={"12"} className="mt-4">
                <div>
                  <label htmlFor="basiInput" className="form-label">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="basiInput"
                    name="aadhar_number"
                    pattern="^\d{12}$"
                    required
                    onChange={handleEmpChange}
                  />
                </div>
              </Col> */}
                </Row>
              </ModalBody>
              <ModalFooter>
                <button
                  type="submit"
                  className="btn btn-success waves-effect waves-light d-flex align-items-center gap-2"
                >
                  <i className="ri ri-checkbox-circle-line fs-18"></i>
                  Submit
                </button>
              </ModalFooter>
            </form>
          </Modal>
        </Container>
        <AreYouSureModal
          onCloseClick={closeConfirm3}
          show={open3}
          onSubmitClick={() => {
            handleAddEmpDet();
            setOpen3(false);
          }}
          value={"verify"}
          statement={`You want to Assign Taskser!`}
        />
      </div>
    </React.Fragment>
  );
};

export { BasicTable };
