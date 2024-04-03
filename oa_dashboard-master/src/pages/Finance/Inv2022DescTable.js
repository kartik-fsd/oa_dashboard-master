import React from "react";

const Inv2022DescTable = () => {
  return (
    <div className="mt-5">
      <table style={{ width: "100%", border: "1px solid #000" }}>
        <tr style={{ height: "20px" }}>
          <th colSpan={"3"} className="text-center">
            Details
          </th>
          <th colSpan={"3"} className="text-end m-3">
            <span style={{ marginRight: "35px" }}>Price</span>
          </th>
        </tr>
        <tr style={{ border: "1px solid #000", height: "30px" }}>
          <th style={{ paddingLeft: "12px" }}>Edit</th>
          <th>Delete</th>
          <th>Desc</th>
          <th>Qty</th>
          <th>Cost</th>
          <th>
            <span className="ms-3">Sum</span>
          </th>
        </tr>
        <tr style={{ border: "1px solid #000", height: "45px" }}>
          <td style={{ paddingLeft: "12px" }}>
            <i
              className=" bx bxs-edit "
              style={{ fontSize: "24px", color: "#663595", cursor: "pointer" }}
              onClick={() => {
                "";
              }}
            ></i>
          </td>
          <td>
            <i
              className="bx bx-trash"
              style={{ fontSize: "24px", color: "#FF4444", cursor: "pointer" }}
              onClick={() => {
                "";
              }}
            ></i>
          </td>
          <td>
            <p className="m-0">
              PPD - Delivery Associates for the period of 11th to 17th April +
              Taskmo charges @4.5%
            </p>
          </td>
          <td style={{ width: "40px", textAlign: "center" }}>
            <p className="m-0 ">11</p>
          </td>
          <td style={{ width: "85px" }}>
            <p className="m-0">42000</p>
          </td>
          <td style={{ width: "85px" }}>
            <p className="m-0">4242525</p>
          </td>
        </tr>
        <tr style={{ height: "30px" }}>
          <td colSpan={"4"} className="text-end">
            Sub Total
          </td>
          <td colSpan={"2"} className="text-end">
            <p style={{ margin: "0px", marginRight: "24px" }}>4252452</p>
          </td>
        </tr>
        <tr style={{ height: "30px" }}>
          <td colSpan={"4"} className="text-end">
            Tax
          </td>
          <td className="text-end">
            <p style={{ margin: "0px", marginRight: "24px" }}>18%</p>
          </td>
          <td className="text-end">
            <p style={{ margin: "0px", marginRight: "24px" }}>4252452</p>
          </td>
        </tr>
        <tr>
          <td colSpan={"4"} className="text-end">
            Total
          </td>
          <td colSpan={"2"} className="text-end">
            <p style={{ margin: "0px", marginRight: "24px" }}>3223433</p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Inv2022DescTable;
