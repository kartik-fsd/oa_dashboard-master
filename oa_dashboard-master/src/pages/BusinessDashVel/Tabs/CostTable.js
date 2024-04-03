import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { Table } from "reactstrap";

const CostTable = ({ cdata }) => {
  // const columns = [
  //   {
  //     name: "Item Name",
  //     selector: (row) => row.cost_item_name,
  //   },
  //   {
  //     name: "Billable Price",
  //     selector: (row) => row.cost_billable_price,
  //   },
  //   {
  //     name: "Payable Price",
  //     selector: (row) => row.cost_payable_price,
  //   },
  //   {
  //     name: "Cost Status",
  //     selector: (row) => row.cost_status,
  //   },
  //   {
  //     name: "Cost Status",
  //     selector: (row) => row.cost_type,
  //   },
  //   {
  //     name: "Created Date",
  //     selector: (row) => moment(row.created_at).format("DD-MMM-YYYY"),
  //   },
  // ];
  return (
    <div className="table-responsive mt-4 mt-xl-0">
      <Table className="table-hover table-striped align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Billable Price</th>
            <th scope="col">Payable Price</th>
            <th scope="col"> Type</th>
            <th scope="col"> Status</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {cdata?.length > 0 ? (
            cdata.map((data) => (
              <>
                <tr>
                  <td>{data.cost_item_name}</td>
                  <td>{data.cost_billable_price}</td>
                  <td>{data.cost_payable_price}</td>
                  <td>{data.cost_type}</td>
                  <td>
                    <span
                      className={
                        data.cost_status == "active"
                          ? "mx-1 badge bg-success"
                          : data.cost_status == "inactive"
                          ? "mx-1 badge bg-danger"
                          : "mx-1 badge bg-warning"
                      }
                    >
                      {data.cost_status}
                    </span>
                  </td>
                  <td>{moment(data.month).format("DD-MMM-YYYY")}</td>
                </tr>
              </>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CostTable;
