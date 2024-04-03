import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fse_leads_data, oa_leads_stats } from "../../../../assets/utils/sow";
import { api } from "../../../../globalConfig";
import PayoutsChart from "../../../Dashboard/ProjectPayout/PayoutsChart";

const Leads = () => {
  const [cardMap, setCardMap] = React.useState([]);
  const { id } = useParams();

  const [check, setCheck] = React.useState(true);
  const [tableData, setTableData] = React.useState([]);

  const [leadsstats, setLeadsstats] = useState({});

  const pathname = api.OA_URL + fse_leads_data;
  const leadspath = api.OA_URL + oa_leads_stats;

  useEffect(() => {
    // alert("hii");
    axios
      .get(leadspath, { params: { sow_id: id } })
      .then((res) => {
        setLeadsstats(res.data);
        const arr = [];
        const obj = res.data;

        arr.push({
          label: "Total Leads",
          labelClass: "muted",
          counter: obj?.total_leads,
          decimals: 0,
          separator: ",",
          suffix: "",
          icon: "mdi mdi-briefcase-check-outline",
          iconClass: "primary",
          percentage: `+ ${obj?.total_leads_today}`,
          percentageClass: "primary",
          prefix: "",
        });
        arr.push({
          label: "Approved Leads",
          labelClass: "muted",
          counter: obj?.approved_leads,

          icon: "ri ri-thumb-up-line",
          iconClass: "success",
          percentage: `+ ${obj?.approved_leads_today}`,
          percentageClass: "success",
          decimals: 0,
          separator: ",",
          suffix: "",
          prefix: "",
        });
        arr.push({
          icon: "mdi mdi-briefcase-clock-outline pending-icon",
          iconClass: "warning",
          label: "Pending Leads",
          labelClass: "muted",
          counter: obj?.pending_leads,
          decimals: 0,
          percentage: `+ ${obj?.pending_leads_today}`,
          percentageClass: "warning",
          separator: ",",
          suffix: "",
          prefix: "",
        });
        // arr.push({
        //   icon: "mdi mdi-fire pending-icon",
        //   iconClass: "danger",
        //   label: "Hot Leads",
        //   labelClass: "muted",
        //   counter: obj.pending_leads,
        //   decimals: 0,
        //   separator: ",",
        //   suffix: "",
        //   prefix: "",
        // });

        setCardMap([...arr]);
      })
      .catch((err) => console.log(err));
  }, [id, check]);
  return (
    <div>
      <PayoutsChart cardMap={cardMap} leadsstats={leadsstats} />
    </div>
  );
};

export default Leads;
