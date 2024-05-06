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

import Flatpickr from "react-flatpickr";
import Select from "react-select";
import moment from "moment";

import DescTable from "./DescTable";
import axios from "axios";
import {
  add_description,
  gst_list,
  update_invoice,
} from "../../../assets/utils/farmingBase";
import { farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";

const EditInvModal = ({ editMod, setEditMod, editData, setCheck, check }) => {
  const [addDesc, setAddDesc] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [add, setAdd] = React.useState(true);
  const [eNo, setEno] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [poNo, setPoNo] = React.useState("");
  const [poD, setPoD] = React.useState("");
  const [dueD, setDueD] = React.useState("");
  const [tds, setTds] = React.useState("");
  const [changeinv, setChangeinv] = React.useState(false);
  const [changepo, setChangepo] = React.useState(false);
  const [changestart, setChangeStart] = React.useState(false);
  const [changeend, setChangeEnd] = React.useState(false);
  const [cahngepodate, setCahngePodate] = React.useState(false);
  const [cahngeduedate, setCahngeDuedate] = React.useState(false);
  const [cahngetds, setCahngeTds] = React.useState(false);

  const [loader, setLoader] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [gstDataList, setGstDataList] = React.useState([]);
  const [selectedGstValue, setSelectedGstValue] = React.useState("");

  console.log(gstDataList, "datalist");
  const [indexValue, setIndexValue] = React.useState("");

  console.log(editData, "edt");
  const gstList = async () => {
    let apiData = farming.farming_URL + gst_list;
    setLoader(true);
    try {
      let gstdata = await axios.get(`${apiData}/${editData.client_id}`);
      console.log(gstdata.data.data, "tseting123");
      setGstDataList(gstdata?.data?.data);
      setLoader(false);
    } catch (error) {
      setIsErr(false);
    } finally {
      setLoader(false);
    }
  };

  const defaultgstvalue = () => {
    gstDataList.filter((item, i) =>
      item.value == editData?.gst_id ? setIndexValue(i) : ""
    );
  };

  React.useEffect(() => {
    gstList();
  }, [editData]);
  // const [cahngepono, setPono] = React.useState(false);

  console.log(editData, gstDataList, "dataedit");

  const stDate = editData.st_date?.split("-").join("/");
  const edDate = editData.ed_date?.split("-").join("/");
  const poDate = editData.po_date?.split("-").join("/");
  console.log(editData.ed_date?.split("-").join("/"), "st");

  const tog = () => {
    setEditMod(false);
    setDesc("");
    setQty("");
    setCost("");
    setStartDate("");
    setEndDate("");
    setPoNo("");
    setPoD("");
    setChangeinv("");
  };

  const handleSubmitAdd = () => {
    const addDesc = {
      description: desc,
      quantity: qty,
      cost: cost,
      amount: qty * cost,
      // hsn:"998397"
    };

    addDesc.inv_id = editData.invoice_id;
    addDesc.amount = addDesc.cost * addDesc.quantity;
    addDesc.hsn = "998397";

    let compulsary = Object.keys(addDesc).includes(
      "cost",
      "description",
      "quantity"
    );

    console.log(addDesc, "desc");
    if (compulsary) {
      const link = farming.farming_URL + add_description;
      axios
        .post(link, addDesc)
        .then((res) => {
          successnotify("success");
          setAdd(!add);
          setDesc("");
          setQty("");
          setCost("");
          setAddDesc(!addDesc);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmitEdit = () => {
    const link = farming.farming_URL + update_invoice;
    const dataEdit = {};
    dataEdit.invoice_id = editData.invoice_id;
    dataEdit.gst_id = selectedGstValue;

    if (changestart) dataEdit.start_date = startDate;
    if (changeend) dataEdit.end_date = endDate;
    if (cahngepodate) dataEdit.po_date = poD;
    if (changeinv) dataEdit.e_invoice_no = eNo;
    if (changepo) dataEdit.po_no = poNo;
    if (cahngeduedate) dataEdit.due_date = dueD;
    if (cahngetds) dataEdit.tds_per = tds;

    console.log(dataEdit, "dataedit123");
    axios
      .post(link, dataEdit)
      .then((res) => {
        tog();
        // setAdd(!add);
        setCheck(!check);
        successnotify("success");
      })
      .catch((err) => {
        warningnotify("oops something went wrong...!");

        console.log((err) => {});
      })
      .finally(() => {
        setChangeEnd(false);
        setChangeStart(false);
        setChangepo(false);
        setChangeinv(false);
        setCahngePodate(false);
        setCahngeDuedate(false);
        setCahngeTds(false);
      });
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, height: "38px" }),
  };
  return loader ? (
    <>...loading</>
  ) : isErr ? (
    <>something went wrong</>
  ) : (
    <div>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={editMod}
        size="xl"
        toggle={() => {
          tog();
          setIndexValue();
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            tog();
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Edit Invoice</h5>
        </ModalHeader>
        <ModalBody>
          <Row>
            {/* <Col xs="6">
              <div>
                <label
                  htmlFor="updateclientid"
                  id="updateclientid"
                  className="form-label"
                >
                  Update Client Id
                </label>
                <Select
                  styles={colorStyles}
                  id="updateclientid"
                  // options={clientData}
                  isSearchable
                  // onChange={handleChangeId}
                />
              </div>
            </Col> */}
            <Col xs="6">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  E-Invoice Number
                </label>
                <input
                  defaultValue={editData.e_invoice_no}
                  type="text"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  onChange={(e) => {
                    setEno(e.target.value);
                    setChangeinv(true);
                  }}
                />
              </div>
            </Col>
            <Col xs="6">
              <div>
                <Label className="form-label ">Billing Start Date</Label>
                <Flatpickr
                  defaultValue={editData.st_date}
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  onChange={(e) => {
                    setStartDate(moment(e[0]).format("YYYY-MM-DD"));
                    setChangeStart(true);
                  }}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label ">Billing End Date</Label>
                <Flatpickr
                  defaultValue={editData.ed_date}
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  onChange={(e) => {
                    setEndDate(moment(e[0]).format("YYYY-MM-DD"));
                    setChangeEnd(true);
                  }}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  PO Number
                </label>
                <input
                  defaultValue={editData.po_no}
                  type="text"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  onChange={(e) => {
                    setPoNo(e.target.value);
                    setChangepo(true);
                  }}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label ">PO Date</Label>
                <Flatpickr
                  defaultValue={
                    editData.po_date == "00-00-0000" ? "" : editData.po_date
                  }
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  onChange={(e) => {
                    setPoD(moment(e[0]).format("YYYY-MM-DD"));
                    setCahngePodate(true);
                  }}
                />
              </div>
            </Col>
            <Col xs="6" className="mt-4">
              <div>
                <Label className="form-label ">Due Date</Label>
                <Flatpickr
                  defaultValue={
                    editData.po_due == "00-00-0000" ? "" : editData.due
                  }
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  onChange={(e) => {
                    setDueD(moment(e[0]).format("YYYY-MM-DD"));
                    setCahngeDuedate(true);
                  }}
                />
              </div>
            </Col>

            <Col xs="6" className="mt-4">
              <div>
                <label htmlFor="ponumber" id="ponumber" className="form-label">
                  TDS
                </label>
                {/* <input
                  defaultValue={editData.tds_per}
                  type="text"
                  className="form-control"
                  name="po_no"
                  id="ponumber"
                  onChange={(e) => {
                    setTds(e.target.value);
                    setCahngeTds(true);
                  }}
                /> */}
              </div>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                onChange={(e) => {
                  setTds(e.target.value);
                  setCahngeTds(true);
                }}
              >
                {/* <option selected disabled>
                  select
                </option> */}
                <option value="0" selected={editData.tds_per == 0}>
                  0
                </option>

                <option value="0.25" selected={editData.tds_per == 0.25}>
                  0.25
                </option>

                <option value="0.5" selected={editData.tds_per == 0.5}>
                  0.5
                </option>
                <option value="0.75" selected={editData.tds_per == 0.75}>
                  0.75
                </option>
                <option value="1" selected={editData.tds_per == 1}>
                  1
                </option>

                <option value="2" selected={editData.tds_per == 2}>
                  2
                </option>
                <option value="5" selected={editData.tds_per == 5}>
                  5
                </option>
                <option value="10" selected={editData.tds_per == 10}>
                  10
                </option>
              </select>
            </Col>
            <Col xs="6" className="mt-4">
              <label htmlFor="ponumber" id="ponumber" className="form-label">
                GST
              </label>
              <Select
                options={gstDataList}
                // value={defaultgstvalue()}
                defaultValue={
                  editData.gst_id !== 0
                    ? gstDataList?.find((it) => it.value === editData.gst_id)
                    : null
                }
                onChange={(e) => setSelectedGstValue(e?.value)}
              />
            </Col>

            <Col xs={"12"}>
              <DescTable editData={editData} add={add} />
            </Col>
            <Col xs="12" className="mt-4">
              <button
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                onClick={() => {
                  setAddDesc(!addDesc);
                }}
              >
                Add Description
              </button>
              {addDesc ? (
                <Row className="mt-4">
                  <Col xs="8">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Description
                      </label>
                      <input
                        value={desc}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col xs="4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        HSN
                      </label>
                      <input
                        value={998397}
                        type="number"
                        className="form-control"
                        id="basiInput"
                        readOnly
                        disabled
                      />
                    </div>
                  </Col>
                  <Row className="mt-4">
                    <Col xs="10">
                      <Row>
                        <Col xs="4">
                          <div>
                            <label htmlFor="basiInput" className="form-label">
                              Quantity
                            </label>
                            <input
                              value={qty}
                              type="number"
                              className="form-control"
                              id="basiInput"
                              onChange={(e) => setQty(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col xs="4">
                          {" "}
                          <div>
                            <label htmlFor="basiInput" className="form-label">
                              Cost
                            </label>
                            <input
                              value={cost}
                              type="number"
                              className="form-control"
                              id="basiInput"
                              onChange={(e) => setCost(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col xs="4">
                          <div>
                            <label htmlFor="basiInput" className="form-label">
                              Amount
                            </label>
                            <input
                              value={qty * cost > 0 ? qty * cost : ""}
                              type="number"
                              className="form-control"
                              id="basiInput"
                              readOnly
                              disabled
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    {/* <Col xs="2">
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                      onClick={() => {
                        "";
                      }}
                    >
                      Add Description
                    </button>
                  </Col> */}
                    <Col xs="2">
                      <div>
                        <label
                          htmlFor="basiInput"
                          className="form-label invisible"
                        >
                          Quantity
                        </label>
                        <button
                          type="button"
                          className="btn waves-effect waves-light text-light"
                          style={{ backgroundColor: "#ec5c24" }}
                          onClick={() => {
                            handleSubmitAdd();
                          }}
                        >
                          Add Description
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Row>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn waves-effect waves-light text-light"
            style={{ backgroundColor: "#ec5c24" }}
            onClick={() => {
              handleSubmitEdit();
            }}
          >
            Update
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export { EditInvModal };
