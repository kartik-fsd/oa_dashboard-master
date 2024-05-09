import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { Table } from "reactstrap";
const MileStone = ({ mdata }) => {
  return (
    <div className="table-responsive mt-4 mt-xl-0">
      <Table className="table-hover table-striped align-middle table-nowrap mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Month</th>
            <th scope="col">Quantity</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {mdata?.length > 0 ? (
            mdata.map((data) => (
              <>
                <tr>
                  <td>{data.type}</td>
                  <td>{moment(data.month).format("DD-MMM-YYYY")}</td>
                  <td>{data.quantity}</td>
                  <td>{data.type_value}</td>
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

export default MileStone;
