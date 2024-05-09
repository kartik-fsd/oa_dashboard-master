import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { APIClient } from "../../../assets/config/sessionToken";
import { overall_oa_leads } from "../../../assets/utils/dashboard";
import { overall_leads_chart_oa } from "../../../assets/utils/sow";
import { api } from "../../../globalConfig";
import { DashedLine, DashedLine2 } from "../OptionsChart/OptionsChart";

function DashedLineChart({ graphData, monthData }) {
  const [isUserDropdown, setUserDropdown] = React.useState(false);
  const [dataInsert, setDataInsert] = React.useState(graphData);

  const { id } = useParams();

  let pathName = "";

  const handleDropDown = (e, num) => {
    // const pathName = api.OA_URL + overall_oa_leads;
    if (graphData?.access == "manager") {
      pathName =
        api.OA_URL +
        overall_leads_chart_oa +
        `?sow_id=${id}&type=${e[0]}&month=${e[1]}&year=${e[2]}`;
    } else {
      pathName = api.OA_URL + overall_oa_leads + `?type=${e}`;
    }
    axios
      .get(pathName)
      .then((res) => {
        setDataInsert({
          type: num,
          title: e == "month" ? "Month Stats" : "Overall Stats",
          data: res.data?.overall,
          colors: graphData?.colors,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="d-flex justify-content-between">
          <h4 className="card-title mb-0">{dataInsert?.title}</h4>
          {dataInsert?.type == "5" || dataInsert?.type == "6" ? (
            <div className="flex-shrink-0">
              <Dropdown
                className="card-header-dropdown"
                isOpen={isUserDropdown}
                toggle={() => setUserDropdown(!isUserDropdown)}
                direction="start"
              >
                <DropdownToggle
                  tag="a"
                  className="text-reset dropdown-btn"
                  role="button"
                >
                  <span className="text-muted fs-16">
                    <i className="mdi mdi-dots-vertical align-middle"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  {/* <DropdownItem onClick={() => handleDropDown("month", "5")}>
                    Current Month
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropDown("last_month", "5")}
                  >
                    Last Month
                  </DropdownItem> */}
                  {monthData?.map((item) => (
                    <>
                      <DropdownItem
                        onClick={() =>
                          handleDropDown(["month", item.value, item.year], "6")
                        }
                      >
                        {item.label}
                      </DropdownItem>
                    </>
                  ))}
                  <DropdownItem
                    onClick={() => handleDropDown(["year", "0", "0"], "6")}
                  >
                    Overall
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <></>
          )}
        </CardHeader>
        <CardBody>
          {Object.keys(dataInsert).length > 0 ? (
            dataInsert?.type == "3" || dataInsert?.type == "4" ? (
              <DashedLine data={dataInsert} />
            ) : dataInsert?.type == "5" || dataInsert?.type == "6" ? (
              <DashedLine2 data={dataInsert} />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default DashedLineChart;
