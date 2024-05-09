import React from "react";
import {
  Button,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "./ubr.css";
import { api, farming } from "../../../globalConfig";
import {
  create_ubr_inv,
  getsowUbr,
  ubrSowid,
} from "../../../assets/utils/farmingBase";
import axios from "axios";
import { dangernotify, successnotify, warningnotify } from "../../Toasts";
import { defer } from "lodash";
import moment from "moment";

const UbrModal = ({ open, setOpen }) => {
  const [ubrSow, setUbrSow] = React.useState([]);
  const [addDesc, setAddDesc] = React.useState(false);
  console.log(addDesc, "testingononno");
  const [desc, setDesc] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [sowId, setSowId] = React.useState(null);
  const [sowidd, setSowIdd] = React.useState(null);
  const [ubrData, setUbrData] = React.useState([]);
  const [selectmpaIds, setSelectMpaIds] = React.useState([]);
  const [ubrChang, setUbrchang] = React.useState("");
  const [remAmt, setRemAmt] = React.useState("");
  const [totUbr, setTotUbr] = React.useState("");
  const [addedData, setAddedData] = React.useState([]);
  const [ronly, setRonly] = React.useState(false);
  const [ubr_transaction, setUbrTransaction] = React.useState([]);
  const [inv_desc, setInvDesc] = React.useState([]);
  //loader
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErr, setIsErr] = React.useState(false);
  const [sumc, calSumc] = React.useState(0);
  const [invData, setInvData] = React.useState({ billing_status: "billed" });

  const [mainLoader, setMainLoader] = React.useState(false);

  console.log(invData, "invdatadata");
  const [def, setDef] = React.useState(
    ubrData?.length > 0 ? Array(ubrData?.length).fill("") : []
  );

  console.log(
    ubrData?.length > 0 ? Array(ubrData.length).fill("") : [],
    "wew",
    ubrData
  );
  console.log(def, "def");

  const handleSubmitFinal = () => {
    let obj = {};
    obj.inv_data = invData;
    obj.inv_desc = inv_desc;
    obj.ubr_transaction = ubr_transaction;

    let apiData = farming.farming_URL + create_ubr_inv;
    setMainLoader(true);
    axios
      .post(apiData, obj)
      .then((res) => {
        setMainLoader(false);
        successnotify("successfully added");
        setOpen(false);
      })
      .catch((err) => {
        dangernotify("something went wrong");
        console.log(err);
      })
      .finally(() => setMainLoader(false));
  };

  const setSelectSowId = (e) => {
    e ? setSowId(e.value) : setSowId("");
    setDef(ubrData?.length > 0 ? Array(ubrData?.length).fill("") : []);
    setTotUbr(0);
    // console.log(e.value, "ee");
  };

  const getUbr = () => {
    const link = farming.farming_URL + getsowUbr;
    setIsLoading(true);
    axios
      .get(link, { params: { sow_id: sowId } })
      .then((res) => {
        setIsLoading(false);
        setUbrData(res.data.ubrdata);
        let clientid = res.data.ubrdata[0]?.client_id;
        setInvData({ ...invData, client_id: clientid });
        console.log(res.data.ubrdata, "datatesting");
        let ids =
          res?.data?.ubrdata &&
          res.data.ubrdata.map((item) => ({
            mpa_id: item.mpa_id,
            month: item.month,
            label: item.mpa_id,
            value: item.mpa_id,
          }));
        setSelectMpaIds(ids);
        console.log(ids, "testingids", res.data.ubrdata);
      })
      .catch((err) => {
        setIsErr(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getSowList = () => {
    const link = farming.farming_URL + ubrSowid;
    axios
      .get(link)
      .then((res) => setUbrSow(res.data.sow))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getSowList();
    getUbr();
  }, [sowId]);

  React.useEffect(() => {
    const totalUbr = ubrData.reduce((acc, crr) => {
      return acc + Number(crr.enter_amount);
    }, 0);
    setTotUbr(totalUbr);
    setRemAmt(totalUbr);
    console.log(totalUbr, "tot");
  }, [ubrChang]);

  const formatOptionLabel = ({
    value,
    label,
    brand_name,
    company_name,
    brand_logo,
  }) => (
    <div className="d-flex align-items-start gap-2">
      <img
        src={brand_logo}
        alt="brand-logo"
        className="rounded avatar-xs"
      ></img>

      <div>
        <div className="d-flex gap-2 align-items-center ">
          <p className="m-0 fs-11">{brand_name}</p>
          <span
            className="badge badge-soft"
            style={{ fontSize: "9px", backgroundColor: "#f07d47" }}
          >
            {label}
          </span>
        </div>

        <p className="m-0 fs-10 text-muted">{company_name}</p>
      </div>
    </div>
  );

  const formatOptionLabel2 = ({ value, label, month, mpa_id }) => (
    <div className="d-flex align-items-start gap-2">
      <div>
        <p className="m-0 fs-10 text-muted">
          {mpa_id} - {month}
        </p>
      </div>
    </div>
  );
  const functionDelAmtAdded = () => {
    let test = remAmt;
    console.log(addedData, "fasak");
    if (addedData.length > 0) {
      console.log(addedData);
      let sum = 0;

      let addedDataAmt = addedData?.map((item) => Number(item.amount));
      for (let i = 0; i < addedDataAmt.length; i++) {
        sum = sum + addedDataAmt[i];
      }

      console.log(sum, addedDataAmt, "totaladdedDataAmt", "testingamt");
      if (totUbr - sum < 0) {
        return totUbr;
      }
      return totUbr - sum;
    } else if (addedData.length == 0) {
      if (totUbr - Number(qty * cost) < 0) {
        // dangernotify("amount cannot exceed the total entered");
        console.log(totUbr, qty * cost, "testinfas");
        return totUbr;
      }
    }
    console.log(totUbr, remAmt, qty * cost, "checkout");
    return totUbr;
  };

  const handleSubmitAddTData = () => {
    console.log("testing");
    if (!Number(qty) || !Number(cost) || desc == "")
      return warningnotify("please fill all the  details");
    let data = {
      quantity: +qty,
      description: desc,
      cost: +cost,
      amount: qty * cost,
    };

    setInvDesc([...inv_desc, data]);

    if (addedData.length > 0) {
      let sum = 0;

      let addedDataAmt = addedData?.map((item) => Number(item.amount));
      for (let i = 0; i < addedDataAmt.length; i++) {
        sum = sum + addedDataAmt[i];
      }
      console.log(sum, totUbr, addedDataAmt, "totaladdedDataAmt", "testingamt");

      if (totUbr - sum - Number(data.amount) < 0) {
        dangernotify("amount cannot exceed the total entered");
        return "";
      }
    } else if (addedData.length == 0) {
      if (totUbr - Number(data.amount) < 0) {
        dangernotify("amount cannot exceed the total entered");
        return "";
      } else {
        setAddedData([...addedData, data]);
        setAddDesc(false);
        return successnotify("Description added successfully");
      }
    }
    setAddedData([...addedData, data]);

    console.log(data, "data");
  };

  return (
    <div>
      <Modal
        isOpen={open}
        toggle={() => {
          setRonly(false);
          setOpen(false);
          setSowId("");
          setAddedData([]);
          setTotUbr(0);
          setDef([]);
          setDesc("");
          setQty(0);
          setCost(0);
          setInvDesc([]);
          setUbrTransaction([]);
        }}
        centered={true}
        size={"xl"}
      >
        {/* <ModalHeader toggle={() => setOpen(false)}>Add Client</ModalHeader> */}
        <ModalBody>
          <Row>
            <Col xs="6">
              <Label className="mt-1">SOW ID</Label>
              <Select
                isDisabled={ronly}
                aria-label=".form-select-sm example"
                onChange={(e) => {
                  setInvData({ ...invData, sow_id: e?.value });
                  setSowIdd(e?.value);
                  setSelectSowId(e);
                }}
                options={ubrSow}
                formatOptionLabel={formatOptionLabel}
                isClearable={true}
              ></Select>
            </Col>

            {sowId !== "" && (
              <Col xs="6">
                <Label className="mt-1">Select MpaId</Label>
                <Select
                  aria-label=".form-select-sm example"
                  onChange={(e) =>
                    setInvData({ ...invData, project_acc: e?.value })
                  }
                  options={selectmpaIds}
                  formatOptionLabel={formatOptionLabel2}
                  isClearable={true}
                ></Select>
              </Col>
            )}

            <Row>
              <Col xs="4" className="mt-4">
                <div>
                  <label
                    htmlFor="ponumber"
                    id="ponumber"
                    className="form-label"
                  >
                    PO Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="po_no"
                    id="ponumber"
                    onChange={(e) =>
                      setInvData({ ...invData, po_no: e.target.value })
                    }
                    //   onChange={poNumChange}
                  />
                </div>
              </Col>
              <Col xs="4" className="mt-4">
                <div>
                  <Label className="form-label " htmlFor="podate" id="podate">
                    PO Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    name="po_date"
                    id="podate"
                    //   onChange={poDateChange}
                    onChange={(e) => {
                      console.log(e);
                      setInvData({
                        ...invData,
                        po_date: moment(e[0]).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </Col>
              <Col xs="4" className="mt-4">
                <div>
                  <Label className="form-label " htmlFor="podate2" id="podate2">
                    Due Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    name="due_date"
                    id="podate2"
                    //   onChange={onDueDateChange}
                    onChange={(e) => {
                      setInvData({
                        ...invData,
                        due_date: moment(e[0]).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </Col>
              <Col xs="4" className="mt-4" htmlFor="podate1" id="podate1">
                <div>
                  <Label className="form-label ">Billing Start Date</Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    name="start_date"
                    id="podate1"
                    onChange={(e) => {
                      setInvData({
                        ...invData,
                        start_date: moment(e[0]).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </Col>
              <Col xs="4" className="mt-4">
                <div>
                  <Label className="form-label " htmlFor="podate2" id="podate2">
                    Billing End Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: "d M, Y",
                    }}
                    name="end_date"
                    id="podate2"
                    onChange={(e) => {
                      setInvData({
                        ...invData,
                        end_date: moment(e[0]).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </Col>

              <Col xs="4" className="mt-4">
                <Label className="form-label " htmlFor="podate2" id="podate2">
                  Tds per
                </Label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setInvData({
                      ...invData,
                      tds_per: e.target.value,
                    });
                  }}
                  // onChange={(e) => {
                  //   setTds(e.target.value);
                  // }}
                >
                  {/* <option selected disabled>
                  select
                </option> */}
                  <option value="0" selected>
                    0
                  </option>

                  <option value="0.25">0.25</option>
                  <option value="0.5">0.5</option>
                  <option value="0.75">0.75</option>
                  <option value="1">1</option>

                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </Col>
            </Row>
          </Row>
          <Row>
            <Col xs="12" className="mt-4">
              {ubrData.length != 0 && (
                <table
                  className="table caption-top table-nowrap"
                  id="ubr_table"
                >
                  <thead className="table-light">
                    <tr>
                      <th scope="col">UBR ID</th>
                      <th scope="col">MPA ID </th>
                      <th scope="col">Month </th>
                      <th scope="col">Amount</th>
                      <th scope="col">Enter Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ubrData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.ubr_id}</th>
                          <td>MPA{item.mpa_id}</td>
                          <td>{item.month}</td>
                          <td>
                            {/* {def[index]}  */}
                            {item.amount}
                          </td>
                          <td>
                            <div>
                              <input
                                value={def[index]}
                                readOnly={ronly}
                                type="number"
                                className="form-control"
                                id="basiInput"
                                style={{ width: "900%" }}
                                onChange={(e) => {
                                  if (e.target.value > item.amount) {
                                    warningnotify(
                                      `please enter lees than ${item.amount}`
                                    );
                                  } else {
                                    ubrData.map((it) =>
                                      it.mpa_id == item.mpa_id
                                        ? (it.enter_amount = e.target.value)
                                        : ""
                                    );
                                    setUbrchang(e.target.value);
                                    def[index] = e.target.value;
                                    setDef([...def]);
                                    console.log(e.target.value);
                                  }
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {
                    <tfoot className="table-light">
                      <tr>
                        <td colSpan="4">Total</td>
                        <td>{totUbr}</td>
                      </tr>
                    </tfoot>
                  }
                </table>
              )}
            </Col>

            <Col xs="12" className="mt-4">
              {ubr_transaction.length > 0 && (
                <table
                  className="table caption-top table-nowrap"
                  id="ubr_table"
                >
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Desc</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Cost </th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.description}</th>
                          <td>{item.quantity}</td>
                          <td>{item.cost}</td>
                          <td>{item.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {
                    <tfoot className="table-light">
                      <tr>
                        <td colSpan="3">Total</td>
                        <td>
                          {inv_desc.reduce((acc, i) => acc + i.amount, 0)}
                        </td>
                      </tr>
                    </tfoot>
                  }
                </table>
              )}
            </Col>

            <Col xs="12" className="mt-4">
              <button
                disabled={def.length == 0 || Number(totUbr) == 0}
                type="button"
                className="btn waves-effect waves-light"
                style={{ backgroundColor: "#ec5c24" }}
                onClick={() => {
                  setAddDesc(true);
                  setRonly(true);
                  console.log(ubrData, "ubrdata");
                  let obj = [];
                  for (let i = 0; i < ubrData.length; i++) {
                    if (Number(ubrData[i].enter_amount) <= 0) break;
                    obj.push({
                      ubr_id: ubrData[i].ubr_id,
                      sow_id: sowidd,
                      amount: ubrData[i].enter_amount,
                    });
                  }
                  setUbrTransaction(obj);

                  console.log(obj, "ubrubrbye");
                }}
              >
                Add Description
              </button>
              {addDesc && (
                <>
                  {" "}
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
                                <label
                                  htmlFor="basiInput"
                                  className="form-label"
                                >
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
                                <label
                                  htmlFor="basiInput"
                                  className="form-label"
                                >
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
                                <label
                                  htmlFor="basiInput"
                                  className="form-label"
                                >
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

                        <Col xs="2">
                          {/* <label
                        htmlFor="basiInput"
                        className="form-label invisible"
                      >
                        Quantity
                      </label> */}
                          <button
                            type="button"
                            className="btn waves-effect waves-light mt-4"
                            style={{ backgroundColor: "#ec5c24" }}
                            onClick={() => {
                              handleSubmitAddTData();
                              // setRemAmt(remAmt);
                              setDesc("");
                              setQty(0);
                              setCost(0);
                            }}
                          >
                            Add
                            {/* Description */}
                          </button>
                        </Col>
                      </Row>
                    </Row>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {ronly && (
                <div className="mt-4">
                  <span className="text-danger"> Note :</span>
                  {functionDelAmtAdded() == 0 ? (
                    <span className="text-success">
                      &nbsp;All Details are added to sum{" "}
                    </span>
                  ) : (
                    <span className="text-warning">
                      &nbsp;Amount should be less than
                      {/* {totUbr} */} {functionDelAmtAdded()}
                    </span>
                  )}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                  {mainLoader ? (
                    <>...loading</>
                  ) : (
                    <button
                      disabled={
                        totUbr -
                          inv_desc.reduce((acc, i) => acc + i.amount, 0) ||
                        totUbr == 0
                      }
                      className="btn"
                      style={{
                        backgroundColor: "#ec5c24",
                        color: "whitesmoke",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#dd4319")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#ec5c24")
                      }
                      type="submit"
                      id="button-addon1"
                      onClick={handleSubmitFinal}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UbrModal;

//  <div
//             style={{
//               padding: "21px",
//               paddingBottom: "32px",
//               border: "1px solid #e3c8fc",
//               // marginTop: "24px",
//             }}
//           >
//             <h5 className="mb-3" style={{ color: "#602994" }}>
//               Add New Client
//             </h5>
//             <Row>
//               <Col xs={8}>
//                 <div>
//                   <label htmlFor="entity" className="form-label" required>
//                     Email Address
//                   </label>
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder=""
//                       aria-label="Example text with button addon"
//                       aria-describedby="button-addon1"
//                       required
//                     />

//                     <button
//                       className="btn" style={{
//   backgroundColor: "#ec5c24",
//   color: "whitesmoke",
//   transition: "background-color 0.3s ease",
// }}
// onMouseEnter={(e) =>
//   (e.target.style.backgroundColor = "#dd4319")
// }
// onMouseLeave={(e) =>
//   (e.target.style.backgroundColor = "#ec5c24")
// }
//                       type="submit"
//                       id="button-addon1"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//           </div>
//           <div
//             style={{
//               padding: "21px",
//               paddingBottom: "32px",
//               border: "1px solid #e3c8fc",
//               marginTop: "24px",
//             }}
//           >
//             <h5 className="mb-3" style={{ color: "#602994" }}>
//               Client Personal Details{" "}
//             </h5>

//             <Row className="mt-4">
//               <Col xs="6" className="mb-4">
//                 <div>
//                   <label htmlFor="clt" className="form-label">
//                     Client Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="clt"
//                     placeholder=""
//                   />
//                 </div>
//               </Col>
//               <Col xs="6" className="mb-4">
//                 <div>
//                   <label htmlFor="phn" className="form-label">
//                     Phone
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="phn"
//                     placeholder=""
//                   />
//                 </div>
//               </Col>
//               <Col xs="6" className="mb-4">
//                 <div>
//                   <label htmlFor="desg" className="form-label">
//                     Designation
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="desg"
//                     placeholder=""
//                   />
//                 </div>
//               </Col>
//               <Col xs="6" className="mb-4">
//                 <div>
//                   <label htmlFor="startdate" className="form-label">
//                     Date
//                   </label>
//                   <input type="date" className="form-control" id="startdate" />
//                 </div>
//               </Col>
//               <Col xs="6" className="mb-4">
//                 <div>
//                   <label htmlFor="link" className="form-label">
//                     LinkedIn
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="link"
//                     placeholder=""
//                   />
//                 </div>
//               </Col>
//               <Col xs="6" className="mb-4">
//                 <div>
//                   <label htmlFor="comp" className="form-label">
//                     Company
//                   </label>

//                   <div className="input-group">
//                     <select className="form-select" id="comp">
//                       <option value="1">One</option>
//                       <option value="2">Two</option>
//                       <option value="3">Three</option>
//                     </select>
//                   </div>
//                 </div>
//               </Col>
//               <Col>
//                 <div>
//                   <label htmlFor="comp" className="form-label">
//                     GST
//                   </label>

//                   <div className="input-group">
//                     <select className="form-select" id="comp">
//                       <option value="" selected>
//                         Choose GST
//                       </option>
//                       <option value="1">One</option>
//                       <option value="2">Two</option>
//                       <option value="3">Three</option>
//                     </select>
//                   </div>
//                   <div id="passwordHelpBlock" className="form-text">
//                     <span>
//                       * If not available
//                       <span
//                         style={{
//                           textDecoration: "underline  ",
//                           color: "#561b8b",
//                           cursor: "pointer",
//                         }}
//                         // onClick={handleGstModal}
//                       >
//                         click here
//                       </span>
//                       to add new GST
//                     </span>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             <div className="d-flex justify-content-end gap-2 ">
//               <button
//                 type="button"
//                 className="btn btn-outline-primary btn-label waves-effect waves-light w-xs px-2"
//                 style={{ marginLeft: "10px" }}
//               >
//                 <i className="bx bx-reset fs-16 me-2"></i>
//                 Reset
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary btn-label waves-effect waves-light w-xs px-2"
//                 style={{ marginLeft: "10px" }}
//               >
//                 <i className="bx bx-save fs-16 me-2 pt-1"></i>
//                 Save
//               </button>
//             </div>
//           </div>
