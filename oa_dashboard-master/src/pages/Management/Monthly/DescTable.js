import axios from "axios";
import React from "react";
import {
  delete_description,
  inv_description,
  update_description,
} from "../../../assets/utils/farmingBase";
import DeleteModal from "../../../components/common/DeleteModal";
import { farming } from "../../../globalConfig";
import { successnotify, warningnotify } from "../../Toasts";
// import DeleteModal from "../../../common/DeleteModal";
const DescTable = ({ Editdata, handleSubmitAdd, editData, add }) => {
  const [desc, setDesc] = React.useState([]);
  const [confirmDelete, setConfirmdelete] = React.useState(false);
  const [editedData, setEditedData] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [descid, setDescId] = React.useState("");
  const [invId, setInvId] = React.useState("");
  const [check, setCheck] = React.useState(true);
  const [changQty, setChangQty] = React.useState(true);
  const [changCst, setChangCst] = React.useState(true);
  const [defQty, setDefQty] = React.useState("");
  const [defCst, setDefCst] = React.useState("");
  const [updt, setUpdt] = React.useState(false);

  console.log(check, "check");

  console.log(desc, "desc");

  console.log(editedData, "edtdata");

  React.useEffect(() => {
    const postData = {
      inv_id: editData.invoice_id,
    };
    axios
      .post(farming.farming_URL + inv_description, postData)
      .then((res) => {
        setDesc(res.data.desc);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [Editdata, handleSubmitAdd, confirmDelete, add, updt]);

  // console.log(desc, qty, cost);

  const onCloseClick = () => {
    setShow(!show);
  };

  const onSubmitClick = () => {
    const link = farming.farming_URL + delete_description;
    const deleteData = {
      desc_id: descid,
      inv_id: editData.invoice_id,
    };
    axios
      .post(link, deleteData)
      .then((res) => {
        setConfirmdelete(!confirmDelete);
        setShow(false);
        warningnotify("Deleted");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let amount;
  const handleUpdate = () => {
    const link = farming.farming_URL + update_description;

    if (!changQty) {
      amount = editedData["quantity"] * defCst;
      editedData.amount = amount;
    }
    if (!changCst) {
      amount = editedData["cost"] * defQty;
      editedData.amount = amount;
    }
    if (!changQty && !changCst) {
      amount = editedData["quantity"] * editedData["cost"];
      editedData.amount = amount;
    }

    const body = {
      ...editedData,
      desc_id: descid,
      inv_id: invId,
    };

    console.log(body, "body12345");

    axios
      .post(link, body)
      .then((res) => {
        successnotify("successfully updated");
        setCheck(!check);
        setUpdt(!updt);
      })
      .catch((err) => {
        warningnotify("oops something went wrong...!");
      })
      .finally(() => {
        setChangCst(true);
        setChangQty(true);
      });
  };

  const TAX_RATE = 0.18;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function subtotal(items) {
    return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(desc);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  function addLineBreak() {
    var input = document.getElementById("myInput");
    var maxLength = 10; // Set the maximum length for line break

    if (input.value.length > maxLength) {
      var currentValue = input.value;
      var newValue =
        currentValue.substring(0, maxLength) +
        "\n" +
        currentValue.substring(maxLength);
      input.value = newValue;
    }
  }

  return (
    <>
      <div className="mt-5">
        <table
          style={{ width: "100%", border: "1px solid #000", border: "none" }}
        >
          <tr style={{ height: "20px" }}>
            <th
              colSpan={"3"}
              className="text-center"
              style={{
                backgroundColor: "#F3F6F9",
                boxShadow: "2px 2px 7px 0 rgb(0, 0, 0, 0)",
                padding: "0.75rem",
              }}
            >
              Details
            </th>
            <th
              colSpan={"3"}
              className="text-end m-3"
              style={{
                backgroundColor: "#F3F6F9",
                boxShadow: "2px 2px 7px 0 rgb(0, 0, 0, 0)",
                padding: "0.75rem",
              }}
            >
              <span style={{ marginRight: "35px" }}>Price</span>
            </th>
          </tr>
          <tr style={{ border: "none", height: "30px" }}>
            <th style={{ paddingLeft: "12px" }}>Edit</th>
            <th>Delete</th>
            <th>Desc</th>
            <th>
              <span style={{ marginRight: "40px" }}>Qty</span>
            </th>
            <th>
              <span style={{ marginRight: "50px" }}>Cost</span>
            </th>
            <th>
              <span className="ms-5">Sum</span>
            </th>
          </tr>
          {desc.map((item) => {
            return (
              <>
                <tr
                  style={{
                    border: "none",
                    borderBottom: "dashed 1px #e9ebec",
                    height: "45px",
                  }}
                >
                  <td style={{ paddingLeft: "12px" }}>
                    {descid !== item.desc_id || check ? (
                      <i
                        className=" bx bxs-edit "
                        style={{
                          fontSize: "24px",
                          color: "#663595",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setDescId(item.desc_id);
                          setInvId(item.inv_id);
                          setCheck(!check);
                          setDefQty(item.quantity);
                          setDefCst(item.cost);
                        }}
                      ></i>
                    ) : (
                      <i
                        className=" bx bxs-edit text-success "
                        style={{
                          fontSize: "24px",
                          // color: "#663595",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleUpdate();
                        }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <i
                      className="bx bx-trash"
                      style={{
                        fontSize: "24px",
                        color: "#FF4444",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShow(!show);
                        setDescId(item.desc_id);
                        setInvId(item.inv_id);
                      }}
                    ></i>
                  </td>
                  <td>
                    {descid !== item.desc_id || check ? (
                      <p className="m-0">
                        {/* PPD - Delivery Associates for the period of 11th to 17th
                    April + Taskmo charges @4.5% */}
                        {item.description}
                      </p>
                    ) : (
                      <input
                        type="text"
                        defaultValue={item.description}
                        className="form-control"
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            description: e.target.value,
                          })
                        }
                      />
                    )}
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    {descid !== item.desc_id || check ? (
                      <p style={{ margin: "0px 36px 0px 0px " }}>
                        {item.quantity}
                      </p>
                    ) : (
                      <input
                        type="text"
                        defaultValue={item.quantity}
                        className="form-control"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            quantity: e.target.value,
                          });
                          setChangQty(false);
                        }}
                      />
                    )}
                  </td>
                  <td style={{ width: "85px" }}>
                    {descid !== item.desc_id || check ? (
                      <p className="m-0" style={{ paddingLeft: 15 }}>
                        {item.cost}
                      </p>
                    ) : (
                      <input
                        type="text"
                        defaultValue={item.cost}
                        className="form-control"
                        onChange={(e) => {
                          setEditedData({
                            ...editedData,
                            cost: e.target.value,
                          });
                          setChangCst(false);
                        }}
                      />
                    )}
                  </td>
                  <td
                    style={{
                      width: "85px",
                      textAlign: "right",
                      paddingRight: 5,
                    }}
                  >
                    {descid !== item.desc_id || check ? (
                      <p className="m-0">{item.amount}</p>
                    ) : (
                      <input
                        type="text"
                        // value={editedData.quantity * editedData.cost}
                        className="form-control"
                        value={
                          !changCst
                            ? editedData.cost * item.quantity
                            : !changQty
                            ? item.cost * editedData.quantity
                            : item.amount
                        }
                        style={{ width: "75%", color: "grey" }}
                        readOnly
                      />
                    )}
                  </td>
                </tr>
              </>
            );
          })}

          <tr style={{ height: "30px" }}>
            <td colSpan={"4"} className="text-end">
              <span style={{ marginRight: "20px" }}>Sub Total</span>
            </td>
            <td colSpan={"2"} className="text-end">
              <p style={{ margin: "0px", textAlign: "right", paddingRight: 5 }}>
                {invoiceSubtotal}
              </p>
            </td>
          </tr>
          <tr style={{ height: "30px" }}>
            <td colSpan={"4"} className="text-end">
              <span style={{ marginRight: "20px" }}>Tax</span>
            </td>
            <td className="text-end">
              <p style={{ margin: "0px", marginRight: "42px" }}>{`${(
                TAX_RATE * 100
              ).toFixed(0)} %`}</p>
            </td>
            <td className="text-end">
              <p style={{ margin: "0px", textAlign: "right", paddingRight: 5 }}>
                {ccyFormat(invoiceTaxes)}
              </p>
            </td>
          </tr>
          <tr style={{ borderTop: "dashed 1px #e9ebec" }}>
            <td colSpan={"4"} className="text-end">
              <span style={{ marginRight: "20px" }}>Total</span>
            </td>
            <td colSpan={"2"} className="text-end">
              <p style={{ margin: "0px", textAlign: "right", paddingRight: 5 }}>
                {ccyFormat(invoiceTotal)}
              </p>
            </td>
          </tr>
        </table>
      </div>
      <DeleteModal
        show={show}
        onCloseClick={onCloseClick}
        onSubmitClick={onSubmitClick}
        statement={"Yow Won't be able to revert"}
      />
    </>
  );
};

export default DescTable;
