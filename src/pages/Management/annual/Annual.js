import axios from "axios";
import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { annual_supply } from "../../../assets/utils/managementapi";
import { api } from "../../../globalConfig";
import AnnualTable from "./AnnualTable";

const Annual = () => {
  const [annualList, setAnnualList] = React.useState({});

  React.useEffect(() => {
    const link = api.VENDOR_URL + annual_supply;

    axios
      .get(link, { params: { fy: "FY24" } })
      .then((res) => setAnnualList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-content">
      <Card>
        <CardHeader>
          <h5>Annual</h5>
        </CardHeader>
        <CardBody>
          <AnnualTable data={annualList} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Annual;
