import axios from "axios";
import { use } from "i18next";
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { toast } from "react-toastify";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import {
  client_details,
  createClient,
  digital_client_details,
  update_client,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import "./client.css";
import EditTds from "./EditTds";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      minWidth: "120px",
      center: true,
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  table: {
    style: {
      minHeight: "400px",
    },
  },
};

const ClientTable = ({ modal_edit2, set_modal_edit2 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [modal_edit, set_modal_edit] = useState(false);
  const [handleAdd, setHandleAdd] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [check, setCheck] = useState(false);

  const handleClientAdd = (e) => {
    const { name, value } = e.target;
    setHandleAdd({ ...handleAdd, [name]: value });
  };
  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    console.log(handleAdd, "checking");
    handleAddNewClient(handleAdd);
  };

  const initEditData = {
    fullname: "",
    emailid: "",
    phoneno: "",
    designation: "",
    department: "",
    gstno: "",
    companyname: "",
    brand_name: "",
    state: "",
    billing_address: "",
  };

  const [dataEdit, setDataEdit] = useState(initEditData);
  const [upateState, setUpdateState] = useState(false);

  const {
    fullname,
    emailid,
    phoneno,
    designation,
    department,
    gstno,
    companyname,
    brand_name,
    state,
    billing_address,
  } = dataEdit;

  console.log(dataEdit, "checking");

  const handleClientEdit = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const handleopenEdit = (d) => {
    console.log(d);

    setDataEdit(d);
    set_modal_edit(true);
  };

  const columns = [
    {
      name: (
        <div className="d-flex justify-content-center w-100">
          Company Details
        </div>
      ),
      selector: (row) => row["invoice_number"],
      sortable: true,
      width: "350px",
      cell: (d) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              {d?.brand_logo ? (
                <img
                  src={d?.brand_logo}
                  alt=""
                  className="rounded-circle avatar-sm"
                />
              ) : (
                <div className="avatar-sm">
                  <div
                    className="avatar-title rounded-circle bg-soft"
                    style={{ color: "#762418", backgroundColor: "#fde8d7" }}
                  >
                    {d?.bd_name[0] ?? ""}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div
                className="fs-12 my-1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  className="badge badge-soft"
                  style={{
                    fontSize: "8px",
                    color: "#762418",
                    backgroundColor: "#f5aa7c",
                    width: "fit-content",
                    fontWeight: 400,
                  }}
                >
                  {d?.company_unique_id}
                </span>
                {d?.bd_name}
              </div>
              <div className="fs-10 text-muted">{d?.cmp_name}</div>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <div
                  className="fs-10 text-muted"
                  id={"UncontrolledTooltip" + d.client_unique_id}
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                  }}
                >
                  {d?.company_address}
                </div>
                <UncontrolledTooltip
                  placement="top"
                  target={"UncontrolledTooltip" + d?.client_unique_id}
                  className="custom-tooltip"
                >
                  <span className="text-dark">{d?.company_address}</span>
                </UncontrolledTooltip>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   name: "Client ID",
    //   selector: (row) => row.clientid,
    //   width: "80px",
    //   center: true,
    // },
    {
      name: (
        <div>
          Spoc Details
          <span>
            <i className=" ri-user-line ms-2 align-middle"></i>
          </span>
        </div>
      ),
      selector: (row) => row.client_name,
      // width: "160px",
      left: true,
      cell: (d) => (
        <div>
          <div
            className="fs-12 mt-1"
            style={{ display: "flex", flexDirection: "column", gap: 5 }}
          >
            <span
              className="badge badge-soft ms-1"
              style={{
                fontSize: "8px",
                backgroundColor: "#f9cdaf",
                color: "#762418",
                width: "fit-content",
                fontWeight: 400,
              }}
            >
              {d?.client_unique_id}
            </span>
            {d.client_name}{" "}
          </div>
          <div className="fs-10 text-muted">{d.client_email}</div>
          <div className="fs-10 text-muted">{d.client_phone}</div>
        </div>
      ),
    },
    // {
    //   name: "Client Email",
    //   selector: (row) => row.client_email,
    //   // width: "160px",
    //   left: true,
    // },
    // {
    //   name: "Brand Details",
    //   selector: (row) => row.fullname,
    //   center: true,

    //   cell: (d) => (
    //     <div
    //       className={
    //         "d-flex flex-column justify-content-center align-items-center"
    //       }
    //     >
    //       {d.brand_logo ? (
    //         <div>
    //           <img src={d.brand_logo} alt="" className="rounded avatar-sm" />
    //         </div>
    //       ) : (
    //         <div className="avatar-sm">
    //           <div className="avatar-title rounded-circle bg-soft-primary ">
    //             {d.brand_name[0]}
    //           </div>
    //         </div>
    //       )}

    //       <div style={{ wordWrap: "break-word" }}>{d.brand_name}</div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "Phone No.",
    //   selector: (row) => row.client_phone,
    //   // width: "100px",
    //   center: true,
    // },
    {
      name: "Location",
      selector: (row) => row.company_city,
      // width: "100px",
      left: true,
      cell: (d) => (
        <div>
          <div className="fs-12 text-capitalize">
            {capitalizeWords(d.company_city)}
          </div>
          <div className="fs-10 text-muted">{d.company_state}</div>
        </div>
      ),
    },
    // {
    //   name: "Billing Address",
    //   selector: (row) => row.billing_address,
    //   width: "180px",
    //   center: true,
    //   cell: (d) => (
    //     <div>
    //       <div style={{ wordWrap: "break-word" }}>{d.billing_address}</div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "G.S.T No.",
    //   selector: (row) => row.gst,
    //   left: true,
    //   cell: (d) => <div style={{ color: "#b83016"}}>{d.gst}</div>,
    // },
    // {
    //   name: "Company Name",
    //   selector: (row) => row.companyname,
    //   center: true,
    // },
    {
      name: "",
      center: true,
      cell: (d) => (
        <div>
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle style={{ background: "#fff", border: "none" }}>
              <i
                className="ri-more-fill align-middle"
                style={{ color: "black" }}
              ></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              {/* <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => handleopenEdit(d)}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit Client
              </DropdownItem> */}
              <DropdownItem
                className="edit-item-btn d-flex align-items-center"
                onClick={() => {
                  setOpen(!open);
                  setData(d);
                }}
              >
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                Edit TDS Details
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  const updateClientData = () => {
    let editclientApi = farming.farming_URL + update_client;
    setIsLoading(true);
    axios
      .put(editclientApi, dataEdit)
      .then((res) => {
        set_modal_edit(false);
        getClientData();

        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
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
  const handleAddNewClient = (data) => {
    let apiAddClient = farming.farming_URL + createClient;
    axios
      .post(apiAddClient, data)
      .then((res) => {
        set_modal_edit2(false);
        if (res.data?.error) {
          toast("Something went wrong", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-warning text-white",
          });
        } else {
          toast("success", {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: false,
            className: "bg-success text-white",
          });
        }
      })
      .catch((err) =>
        toast(err.response.data.message, {
          position: "top-center",
          hideProgressBar: true,
          closeOnClick: false,
          className: "bg-warning text-white",
        })
      )
      .finally(() => {});
  };

  const getClientData = () => {
    let clientApi = farming.farming_URL + digital_client_details;
    setIsLoading(true);
    axios
      .get(clientApi)
      .then((res) => {
        setIsLoading(false);
        setClientData(res.data.client ?? []);
        console.log(res.data.client, "clientapi");
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getClientData();
  }, [check]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataEdit, "checking");
    updateClientData();
  };
  const tableData = {
    columns,
    data: clientData,
  };

  return (
    <>
      <DataTableExtensions
        {...tableData}
        export={false}
        filterPlaceholder={`Search`}
        className="filter_text"
        style={{ paddingRight: "25px important" }}
      >
        <DataTable
          columns={columns}
          data={clientData}
          theme="VendorTable"
          pagination
          expandableRows={false}
          expandableRowsHideExpander //hide the arrow icon on the left
          //   progressPending={isLoading}
          expandOnRowClicked={true}
          customStyles={customStyles}
          highlightOnHover={true}
        />
      </DataTableExtensions>

      {modal_edit2 && (
        <Modal
          id="signupModals"
          tabIndex="-1"
          isOpen={modal_edit2}
          toggle={() => {
            set_modal_edit2(false);
          }}
          centered={true}
          size="lg"
        >
          <ModalHeader
            className="p-3"
            toggle={() => {
              set_modal_edit2(false);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                width: "700px",
                justifyContent: "space-between",
              }}
            >
              <div className="mb-2" style={{ marginTop: "10px" }}>
                Add client data
              </div>
            </div>
          </ModalHeader>

          <ModalBody>
            <>
              <form onSubmit={handleSubmitAdd}>
                <Row className="align-items-center g-3 mt-2">
                  <Col lg={4}>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="fullname"
                      required
                    />
                  </Col>

                  <Col lg={4}>
                    <Label>Email ID</Label>
                    <Input
                      type="email"
                      onChange={handleClientAdd}
                      name="emailid"
                      required
                    />
                  </Col>

                  <Col lg={4}>
                    <Label>Phone Number </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="phoneno"
                      required
                    />
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  <Col lg={4}>
                    <Label>Designation </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="designation"
                      required
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>Department</Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="department"
                      required
                    />
                  </Col>

                  <Col lg={4}>
                    <Label>GST NO.</Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="gstno"
                      required
                    />
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  <Col lg={4}>
                    <Label>Company Name </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="companyname"
                      required
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>Brand Name </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="brand_name"
                      required
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>Website</Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="website"
                      required
                    />
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  <Col lg={4}>
                    <Label>Industry </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="industry"
                      required
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>Organization </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="organization"
                      required
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>State</Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="state"
                      required
                    />
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  <Col lg={6}>
                    <Label>CIN </Label>
                    <Input
                      type="text"
                      onChange={handleClientAdd}
                      name="cin"
                      required
                    />
                  </Col>
                  <Col lg={6}>
                    <Label
                      htmlFor="exampleFormControlTextarea5"
                      className="form-label"
                    >
                      About Company
                    </Label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea5"
                      rows="1"
                      onChange={handleClientEdit}
                      name="about_company"
                      required
                    ></textarea>
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  {/* <Col>
                    <Label>Billing Address</Label>
                    <textarea
                      type="text"
                      onChange={handleClientEdit}
                      name="billing_address"
                    />
                  </Col> */}

                  <Col>
                    <div>
                      <Label
                        htmlFor="exampleFormControlTextarea5"
                        className="form-label"
                      >
                        Billing Address
                      </Label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea5"
                        rows="3"
                        onChange={handleClientAdd}
                        name="billing_address"
                        required
                      ></textarea>
                    </div>
                  </Col>

                  <Col>
                    <div>
                      <Label
                        htmlFor="exampleFormControlTextarea5"
                        className="form-label"
                      >
                        Corporate Address
                      </Label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea5"
                        rows="3"
                        onChange={handleClientAdd}
                        name="billing_address"
                        required
                      ></textarea>
                    </div>
                  </Col>
                </Row>

                <button
                  type="submit"
                  style={{
                    float: "right",
                    marginTop: "10px",
                    width: "100px",
                    backgroundColor: "#ec5c24",
                  }}
                  className="btn d-flex gap-2 justify-content-center"
                  //   disabled={remark == ""}
                >
                  <i className="ri-add-line align-bottom"></i>
                  Client
                </button>
              </form>
            </>
          </ModalBody>
        </Modal>
      )}
      {modal_edit && (
        <Modal
          id="signupModals"
          tabIndex="-1"
          isOpen={modal_edit}
          toggle={() => {
            set_modal_edit(false);
          }}
          centered={true}
          size="lg"
        >
          <ModalHeader
            className="p-3"
            toggle={() => {
              set_modal_edit(false);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                width: "700px",
                justifyContent: "space-between",
              }}
            >
              <div className="mb-2" style={{ marginTop: "10px" }}>
                Edit client data
              </div>
            </div>
          </ModalHeader>

          <ModalBody>
            <>
              <form onSubmit={handleSubmit}>
                <Row className="align-items-center g-3 mt-2">
                  <Col lg={4}>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="fullname"
                      value={fullname}
                    />
                  </Col>

                  <Col lg={4}>
                    <Label>Email ID</Label>
                    <Input
                      type="email"
                      onChange={handleClientEdit}
                      name="emailid"
                      value={emailid}
                    />
                  </Col>

                  <Col lg={4}>
                    <Label>Phone Number </Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="phoneno"
                      value={phoneno}
                    />
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  <Col lg={4}>
                    <Label>Designation </Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="designation"
                      value={designation}
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>Department</Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="department"
                      value={department}
                    />
                  </Col>

                  <Col lg={4}>
                    <Label>GST NO.</Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="gstno"
                      value={gstno}
                    />
                  </Col>
                </Row>

                <Row className="align-items-center g-3 mt-1">
                  <Col lg={4}>
                    <Label>Company Name </Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="companyname"
                      value={companyname}
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>Brand Name </Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="brand_name"
                      value={brand_name}
                    />
                  </Col>
                  <Col lg={4}>
                    <Label>State</Label>
                    <Input
                      type="text"
                      onChange={handleClientEdit}
                      name="state"
                      value={state}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center g-3 mt-1">
                  {/* <Col>
                    <Label>Billing Address</Label>
                    <textarea
                      type="text"
                      onChange={handleClientEdit}
                      name="billing_address"
                    />
                  </Col> */}

                  <Col>
                    <div>
                      <Label
                        htmlFor="exampleFormControlTextarea5"
                        className="form-label"
                      >
                        Billing Address
                      </Label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea5"
                        rows="3"
                        onChange={handleClientEdit}
                        name="billing_address"
                        value={billing_address}
                      ></textarea>
                    </div>
                  </Col>
                </Row>

                <button
                  disabled={false}
                  type="submit"
                  style={{
                    float: "right",
                    marginTop: "10px",
                    width: "100px",
                    backgroundColor: "#ec5c24",
                  }}
                  className="btn d-flex gap-2 justify-content-center text-light"
                  //   onClick={() => handleAdd()}
                  //   disabled={remark == ""}
                >
                  {/* <i className="ri-add-line align-bottom"></i> */}
                  Update
                </button>
              </form>
            </>
          </ModalBody>
        </Modal>
      )}
      <EditTds
        open={open}
        setOpen={setOpen}
        data={data}
        setCheck={setCheck}
        check={check}
      />
    </>
  );
};

export default ClientTable;
