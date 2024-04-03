import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import TieBreakerTable from "./TieBreakerTable";

const TieBreaker = () => {
  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <h5>TieBreaker</h5>
        </CardHeader>
        <CardBody>
          <TieBreakerTable />
        </CardBody>
      </Card>
    </div>
  );
};

export default TieBreaker;
